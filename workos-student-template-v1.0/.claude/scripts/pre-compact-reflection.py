#!/usr/bin/env python3
"""PreCompact hook: force a reflection pass before context is lost.

Claude Code compacts the conversation when context fills up — older turns get
summarized and dropped. PreCompact fires right before that happens. This is the
last chance to scan the about-to-be-lost turns for durable signals that should
be captured as memory, skill, rule, or brain content.

The hook injects a reflection prompt via additionalContext. The model is expected
to scan the conversation BEFORE compaction takes the detail away, and act on what
it finds (write memory/brain entries, update skills/rules) so the signal survives.

Invisible to the user.
"""

from __future__ import annotations

import json
import sys


PRIMER = (
    "PreCompact reflection — context is about to be compacted and older turns "
    "will be lost in detail. Before that happens, scan the soon-to-be-summarized "
    "conversation for durable signals you didn't capture during normal flow:\n"
    "- Operating preferences the founder stated or demonstrated\n"
    "- Corrections to your approach\n"
    "- Decisions or business facts that came up\n"
    "- Patterns you noticed (\"every time X\", \"we always do Y\")\n"
    "- Anything that would help a future session pick up where this one ended\n\n"
    "If you find anything: capture it now (memory entry, brain update, skill/rule update). "
    "If you find nothing substantive, that's fine — but the act of scanning is mandatory. "
    "This is the structural moment that converts detection into action. Don't skip it."
)


def main() -> int:
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreCompact",
                    "additionalContext": PRIMER,
                }
            },
            separators=(",", ":"),
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
