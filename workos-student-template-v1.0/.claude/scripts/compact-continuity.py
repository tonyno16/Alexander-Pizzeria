#!/usr/bin/env python3
"""Inject continuity reminders after Claude Code compacts context."""

from __future__ import annotations

import json
import sys


def main() -> int:
    try:
        payload = json.loads(sys.stdin.read() or "{}")
    except json.JSONDecodeError:
        payload = {}

    source = payload.get("source")
    if source not in {None, "compact", "startup"}:
        return 0

    parts = [
        "Post-compact WorkOS continuity: before acting, reconstruct live state from files instead of trusting the compacted summary. "
        "Read the nearest `_overview.md` for the active area/project/lab, `00-brain/current-state.md` for priorities, and relevant rules before editing. "
        "If continuing unfinished work, identify current goal, touched files, unresolved Red decisions, pending external/task updates, and pending skill/rule changes. "
        "Keep future continuity by updating the owning `_overview.md`, audit log, rule, skill, or canonical brain file when the turn changes durable state."
    ]

    # Surface broken external-tool connections detected by connection-doctor.py
    # at the end of the previous turn. Only emit when there's actually something
    # to fix; clear the file once mentioned so we don't nag forever.
    import os
    from pathlib import Path

    root = Path(os.environ.get("CLAUDE_PROJECT_DIR", "."))
    status_path = root / ".claude" / ".connection-status"
    if status_path.exists():
        try:
            status = json.loads(status_path.read_text(encoding="utf-8"))
            findings = status.get("findings") or []
            if findings:
                lines = [
                    f"- {f.get('server', '?')}: {f.get('hint', '')}".rstrip()
                    for f in findings
                ]
                parts.append(
                    "Broken external-tool connections detected in the last session:\n"
                    + "\n".join(lines)
                    + "\nOffer to walk the user through fixing these before assuming the tools work. "
                    "Do not edit `.env` or install MCPs without explicit approval."
                )
        except (json.JSONDecodeError, OSError):
            pass

    context = "\n\n".join(parts)
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "SessionStart",
                    "additionalContext": context,
                }
            },
            separators=(",", ":"),
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
