#!/usr/bin/env python3
"""Stop-hook for the WorkOS.

Two output modes:
- BLOCK on real integrity problems (forces fix before stopping).
- Non-blocking systemMessage nudge for soft signals.
- Silent when nothing fires.

Blocks on:
- workos-doctor errors (top-level shape, .env not gitignored, dead symlinks, etc.)
- New paths outside the WorkOS root shape
- Touched area/project/lab container missing _overview.md
- _overview.md THIS SESSION edited whose last_updated is stale (>3 days). Scoped via
  the SessionStart baseline (session-baseline.py) so pre-existing working-tree dirt
  no longer false-blocks.
- System file change (.claude/**, CLAUDE.md) without an audit entry

Soft nudges (systemMessage only — no boilerplate acknowledgment required):
- Capture check: counter-gated, NOT every turn. Fires on the first capture-less stop of
  the session, then every CAPTURE_TURN_GATE capture-less stops (turns 1, 5, 10, 15...).
  A capture (in-repo brain/rule/skill/overview write or an auto-memory write) resets the
  counter, so a session that saves as it goes stays quiet. The model then decides whether
  to run /workos-reflect. Avoids nudge-habituation.
- Consolidation: fires when the auto-memory index passes MEMORY_INDEX_LINE_LIMIT,
  pointing at /consolidate-memory before the 200-line load cap hides old entries.
- Workspace content changed without _overview.md or audit update (continuity)

Session state lives in .claude/.workos-hook-state.json (gitignored), keyed by
session_id: baseline paths, capture counter, and the auto-memory mtime watermark.
"""

from __future__ import annotations

import datetime as dt
import json
import os
import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()).resolve()
HOOK_INPUT = sys.stdin.read()

STRUCTURE_DIRS = {"00-brain", "01-inbox", "02-areas", "03-projects", "90-lab", "99-archive"}
ROOT_ALLOWLIST = {
    ".claude",
    ".git",
    ".gitignore",
    ".env",
    ".env.example",
    ".envrc",
    ".mcp.json",
    ".mcp.json.example",
    "AGENTS.md",
    "CLAUDE.md",
    "README.md",
    "GETTING-STARTED.md",
    *STRUCTURE_DIRS,
}
SYSTEM_PREFIXES = (
    ".claude/rules/",
    ".claude/skills/",
    ".claude/scripts/",
    ".claude/settings.json",
    "AGENTS.md",
    "CLAUDE.md",
)
CONTINUITY_PREFIXES = ("00-brain/", "02-areas/", "03-projects/", "90-lab/")
LOCAL_ONLY_PATTERNS = (".env", ".env.", ".mcp.json", ".claude/settings.local.json")
OVERVIEW_STALE_DAYS = 3

# Capture-counter gate: the capture question surfaces on the first capture-less stop
# of a session (turn 1 often shares new content), then every this-many capture-less
# stops — turns 1, 5, 10, 15... A capture (in-repo brain/rule/skill/overview write or
# an auto-memory write) resets the counter, so a session that saves as it goes is quiet.
STATE_FILE = ROOT / ".claude" / ".workos-hook-state.json"
CAPTURE_TURN_GATE = 5
CAPTURE_PREFIXES = ("00-brain/", ".claude/rules/", ".claude/skills/")
# Auto-memory index load cap is 200 lines; consolidate before old entries silently
# fall off the loaded window.
MEMORY_INDEX_LINE_LIMIT = 180

CAPTURE_NUDGE = (
    "capture check — scan what just happened "
    "(shared context, documents/transcripts read, or approved work) for anything durable worth saving: "
    "(1) new business/customer/offer/competitor facts → `00-brain/`; "
    "(2) facts from a doc, transcript, or URL that sharpen the brain → `00-brain/` (note the source); "
    "(3) a project or area that visibly progressed → bump its `_overview.md` (status, next action, `last_updated`); "
    "(4) a correction to how a skill behaves or a repeated workflow → update the skill; a new durable behavior rule → `.claude/rules/`; "
    "(5) a durable, general operating preference → memory. "
    "If something qualifies, run /workos-reflect to route it (Green/Yellow autonomously, ask on Red). If nothing does, stop silently."
)

CONSOLIDATE_NUDGE = (
    "auto-memory index (`MEMORY.md`) is at {n} lines, past the {limit}-line mark — "
    "run /consolidate-memory to merge duplicates, retire stale entries, and rebuild the index "
    "before it reaches the 200-line load cap and old entries silently stop loading"
)


def parse_hook_input() -> dict:
    try:
        return json.loads(HOOK_INPUT or "{}")
    except json.JSONDecodeError:
        return {}


def run(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)


def git_status() -> list[str]:
    result = run(["git", "status", "--porcelain"])
    if result.returncode != 0:
        return []
    return [line for line in result.stdout.splitlines() if line.strip()]


def status_path(line: str) -> str:
    raw = line[3:] if len(line) > 3 else line
    if " -> " in raw:
        raw = raw.split(" -> ", 1)[1]
    return raw.strip().strip('"')


def is_local_only(path: str) -> bool:
    return path in LOCAL_ONLY_PATTERNS or any(path.startswith(pattern) for pattern in LOCAL_ONLY_PATTERNS)


def changed_paths(status_lines: list[str]) -> list[str]:
    return [status_path(line) for line in status_lines]


def root_shape_findings(paths: list[str]) -> list[str]:
    findings: list[str] = []
    for path in paths:
        top = path.split("/", 1)[0]
        if top not in ROOT_ALLOWLIST:
            findings.append(f"`{path}` is outside the expected WorkOS top-level shape.")
    return findings


def container_overview_findings(paths: list[str]) -> list[str]:
    findings: list[str] = []
    containers: set[Path] = set()
    for raw in paths:
        parts = Path(raw).parts
        if len(parts) >= 2 and parts[0] in {"02-areas", "03-projects", "90-lab"}:
            containers.add(ROOT / parts[0] / parts[1])
    for container in sorted(containers):
        if container.exists() and container.is_dir() and not (container / "_overview.md").exists():
            findings.append(f"`{container.relative_to(ROOT)}/` is missing `_overview.md`.")
    return findings


def overview_stale_findings(paths: list[str], baseline: set[str]) -> list[str]:
    """Flag _overview.md files that THIS session edited but whose last_updated is stale.

    Scoped to work containers (02-areas/03-projects/90-lab). The 3-day freshness rule
    is a "bump after editing active work" nudge; it must not fire on the stable
    00-brain/_overview.md brain index, which carries last_updated for presence only.

    `baseline` is the set of paths already dirty at SessionStart (captured by
    session-baseline.py). Files in the baseline were not touched this session, so
    flagging them would false-block on pre-existing working-tree changes.
    """
    today = dt.date.today()
    work_tops = ("02-areas/", "03-projects/", "90-lab/")
    findings: list[str] = []
    for path in paths:
        if not path.endswith("/_overview.md") or not path.startswith(work_tops):
            continue
        if path in baseline:
            continue
        full = ROOT / path
        if not full.exists():
            continue
        try:
            text = full.read_text(encoding="utf-8")
        except OSError:
            continue
        match = re.search(r"^last_updated:\s*(.+)$", text, flags=re.MULTILINE)
        if not match:
            continue
        try:
            parsed = dt.date.fromisoformat(match.group(1).strip())
        except ValueError:
            continue
        if (today - parsed).days > OVERVIEW_STALE_DAYS:
            findings.append(
                f"`{path}` was edited but `last_updated: {parsed.isoformat()}` is stale. Bump it to {today.isoformat()}."
            )
    return findings


def doctor_findings() -> tuple[list[str], list[str]]:
    doctor = ROOT / ".claude" / "scripts" / "workos-doctor.py"
    if not doctor.exists():
        return [], ["`.claude/scripts/workos-doctor.py` is missing."]
    result = run(["python3", str(doctor), "--json"])
    try:
        payload = json.loads(result.stdout or "{}")
    except json.JSONDecodeError:
        return [], ["`workos-doctor.py --json` did not return valid JSON."]
    errors = [
        f"`{item.get('path')}`: {item.get('message')}"
        for item in payload.get("findings", [])
        if item.get("severity") == "error"
    ]
    warnings = [
        f"`{item.get('path')}`: {item.get('message')}"
        for item in payload.get("findings", [])
        if item.get("severity") == "warning"
    ]
    return errors, warnings


def needs_system_audit(paths: list[str]) -> bool:
    return any(path.startswith(SYSTEM_PREFIXES) for path in paths)


def has_audit_change(paths: list[str]) -> bool:
    if "00-brain/audit/workos-audit.jsonl" in paths or any(path.startswith("00-brain/audit/") for path in paths):
        return True

    log = ROOT / "00-brain" / "audit" / "workos-audit.jsonl"
    if not log.exists():
        return False

    # Satisfied only by a real, reasoned audit entry whose `paths` intersect the changed
    # system files. NOT satisfied by recency alone — the automatic per-stop session-stop
    # entry has empty `paths`, so it can never stand in for a genuine system-change log.
    # (Previously a 6h mtime shortcut made this always-true, defeating the gate.)
    try:
        lines = log.read_text(encoding="utf-8").splitlines()[-50:]
    except OSError:
        return False

    changed = set(paths)
    for line in lines:
        try:
            entry = json.loads(line)
        except json.JSONDecodeError:
            continue
        entry_paths = set(entry.get("paths") or [])
        if changed & entry_paths:
            return True
    return False


def has_overview_change(paths: list[str]) -> bool:
    return any(path.endswith("/_overview.md") for path in paths)


def needs_continuity_check(paths: list[str]) -> bool:
    return any(path.startswith(CONTINUITY_PREFIXES) for path in paths)


def format_list(items: list[str], limit: int = 8) -> str:
    shown = items[:limit]
    suffix = "" if len(items) <= limit else f"\n- ...and {len(items) - limit} more."
    return "\n".join(f"- {item}" for item in shown) + suffix


def resolve_memory_dir() -> Path | None:
    """Find the out-of-repo auto-memory dir portably (CLAUDE_CONFIG_DIR or ~/.claude)."""
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


def newest_memory_mtime(mem_dir: Path | None) -> float:
    if not mem_dir:
        return 0.0
    try:
        return max((p.stat().st_mtime for p in mem_dir.glob("*.md")), default=0.0)
    except OSError:
        return 0.0


def memory_index_lines(mem_dir: Path | None) -> int:
    if not mem_dir:
        return 0
    idx = mem_dir / "MEMORY.md"
    try:
        return len(idx.read_text(encoding="utf-8").splitlines())
    except OSError:
        return 0


def load_state() -> dict:
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}


def save_state(state: dict) -> None:
    try:
        STATE_FILE.write_text(json.dumps(state), encoding="utf-8")
    except OSError:
        pass


def block(reason: str) -> None:
    print(json.dumps({"decision": "block", "reason": reason}))


def nudge(message: str) -> None:
    """Non-blocking systemMessage. Visible to the user, no action required."""
    print(json.dumps({"systemMessage": message}))


def allow() -> None:
    print("{}")


def main() -> int:
    hook_input = parse_hook_input()
    if hook_input.get("stop_hook_active"):
        allow()
        return 0

    session_id = str(hook_input.get("session_id") or "")
    paths = [p for p in changed_paths(git_status()) if not is_local_only(p)]

    # Session state: baseline (paths dirty before this session) + capture counter
    # + memory-mtime watermark. Seeded by session-baseline.py at SessionStart; if that
    # didn't run for this session, fall back to treating current dirt as baseline so we
    # never false-block or false-count a capture on pre-existing changes.
    mem_dir = resolve_memory_dir()
    state = load_state()
    if state.get("session_id") == session_id and session_id:
        baseline = set(state.get("baseline_paths") or [])
        counter = int(state.get("capture_counter") or 0)
        prev_mtime = float(state.get("last_memory_mtime") or 0.0)
        first_done = bool(state.get("capture_first_done"))
    else:
        baseline = set(paths)
        counter = 0
        prev_mtime = newest_memory_mtime(mem_dir)
        first_done = False

    # Changes this session actually made (current dirt minus the SessionStart baseline).
    session_paths = [p for p in paths if p not in baseline]

    # Hard integrity blockers
    doctor_errors, doctor_warnings = doctor_findings()
    blocking: list[str] = []
    blocking.extend(doctor_errors)
    blocking.extend(root_shape_findings(paths))
    blocking.extend(container_overview_findings(paths))
    blocking.extend(overview_stale_findings(paths, baseline))

    if needs_system_audit(paths) and not has_audit_change(paths):
        blocking.append("System files changed, but no audit log update is visible.")

    if blocking:
        warnings_text = ""
        if doctor_warnings:
            warnings_text = "\n\nAlso review these non-blocking doctor warnings:\n" + format_list(doctor_warnings, 5)
        reason = (
            "WorkOS integrity check before stopping:\n"
            + "\n".join(f"- {item}" for item in blocking)
            + warnings_text
            + "\n\nFix the smallest necessary issue, then continue."
        )
        block(reason)
        return 0

    # Capture counter — did this turn write anything durable (in-repo brain/rule/skill/
    # overview, or an auto-memory file)? If so, reset. If not, increment.
    cur_mtime = newest_memory_mtime(mem_dir)
    captured = (
        any(p.startswith(CAPTURE_PREFIXES) or p.endswith("/_overview.md") for p in session_paths)
        or cur_mtime > prev_mtime
    )
    counter = 0 if captured else counter + 1

    # Soft nudges — no boilerplate acknowledgment required.
    nudges: list[str] = []
    if needs_continuity_check(paths) and not (has_overview_change(paths) or has_audit_change(paths)):
        nudges.append("workspace content changed without an `_overview.md` or audit update — consider one for future continuity")

    # Capture cadence: fire on the first capture-less stop of the session (turn 1 often
    # shares new content worth saving), then every CAPTURE_TURN_GATE stops — i.e. 1, 5,
    # 10, 15... The gate fire resets the counter; the one-time first fire does NOT, so the
    # every-5 rhythm stays on an absolute footing. Capture resets the counter either way.
    if counter >= CAPTURE_TURN_GATE:
        nudges.append(CAPTURE_NUDGE)
        counter = 0
    elif counter >= 1 and not first_done:
        nudges.append(CAPTURE_NUDGE)
        first_done = True

    idx_lines = memory_index_lines(mem_dir)
    if idx_lines > MEMORY_INDEX_LINE_LIMIT:
        nudges.append(CONSOLIDATE_NUDGE.format(n=idx_lines, limit=MEMORY_INDEX_LINE_LIMIT))

    save_state({
        "session_id": session_id,
        "baseline_paths": sorted(baseline),
        "capture_counter": counter,
        "last_memory_mtime": cur_mtime,
        "capture_first_done": first_done,
    })

    if nudges:
        nudge("[WorkOS] " + " · ".join(nudges))
    else:
        allow()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
