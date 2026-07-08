#!/usr/bin/env python3
"""SessionStart hook: snapshot pre-existing state so the Stop hook can scope to *this* session.

Writes `.claude/.workos-hook-state.json` (gitignored), keyed by session_id:
1. All paths already dirty in the working tree BEFORE this session acted — the Stop
   hook subtracts this baseline so its stale-overview block and capture counter never
   false-fire on pre-existing changes.
2. The newest mtime of the auto-memory directory, so the Stop hook can tell whether a
   memory was written this turn (mtime advanced).

A SessionStart for an already-known session (e.g. a compact re-fire) does not clobber
an in-flight counter. Fails open: any error -> `{}`.
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path


ROOT = Path(os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()).resolve()
STATE_FILE = ROOT / ".claude" / ".workos-hook-state.json"


def parse_input() -> dict:
    try:
        return json.loads(sys.stdin.read() or "{}")
    except json.JSONDecodeError:
        return {}


def status_path(line: str) -> str:
    raw = line[3:] if len(line) > 3 else line
    if " -> " in raw:
        raw = raw.split(" -> ", 1)[1]
    return raw.strip().strip('"')


def dirty_paths() -> list[str]:
    """All paths already dirty in the working tree before this session acted."""
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False,
        )
    except OSError:
        return []
    if result.returncode != 0:
        return []
    return [status_path(line) for line in result.stdout.splitlines() if line.strip()]


def resolve_memory_dir() -> Path | None:
    slug = str(ROOT).replace("/", "-")
    bases: list[Path] = []
    cfg = os.environ.get("CLAUDE_CONFIG_DIR")
    if cfg:
        bases.append(Path(cfg))
    bases.append(Path.home() / ".claude")
    for base in bases:
        cand = base / "projects" / slug / "memory"
        if cand.exists():
            return cand
    return None


def newest_memory_mtime() -> float:
    mem = resolve_memory_dir()
    if not mem:
        return 0.0
    try:
        return max((p.stat().st_mtime for p in mem.glob("*.md")), default=0.0)
    except OSError:
        return 0.0


def load_state() -> dict:
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}


def main() -> int:
    data = parse_input()
    session_id = str(data.get("session_id") or "")

    existing = load_state()
    if existing.get("session_id") == session_id and session_id:
        existing["last_memory_mtime"] = newest_memory_mtime()
        state = existing
    else:
        state = {
            "session_id": session_id,
            "baseline_paths": dirty_paths(),
            "capture_counter": 0,
            "last_memory_mtime": newest_memory_mtime(),
        }

    try:
        STATE_FILE.write_text(json.dumps(state), encoding="utf-8")
    except OSError:
        pass

    print("{}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
