#!/usr/bin/env python3
"""UserPromptSubmit hook: prime the model to load context before diving into work.

Fires on every prompt. Injects a brief invisible primer (`additionalContext`)
reminding the model to load relevant context just-in-time before responding.

Capture (memory, brain, rule/skill updates) is handled by the end-of-turn
stop hook, not here — the stop hook fires after work is done, when the model
has full context of what happened and the user already has their answer.

Invisible to the user (additionalContext is model-only). No user-facing noise.
"""

from __future__ import annotations

import json
import sys


PRIMER = (
    "Before responding, load the minimum relevant context for this task — "
    "nearest _overview.md, auto memory, and brain files for the topic at hand. "
    "Load just-in-time per context-routing.md; don't stuff the context window."
)


def main() -> int:
    # Always fire — no keyword gate. The model decides what (if anything) to capture.
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "UserPromptSubmit",
                    "additionalContext": PRIMER,
                }
            },
            separators=(",", ":"),
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
