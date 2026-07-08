---
paths:
  - ".claude/scripts/**"
  - ".claude/settings.json"
---

# Hook Design

JIT discipline when authoring or modifying Claude Code hooks in `.claude/scripts/` or wiring them in `.claude/settings.json`.

## Search Before Write

Before creating a new hook script, search:

```bash
ls .claude/scripts/
rg -l "<event-name>" .claude/scripts/
```

If an existing script already owns the hook event (Stop, PreToolUse, etc.), **extend it** rather than creating a sibling. Multiple hooks per event are OK if they're cleanly separated by concern, but two scripts blocking on similar concerns is sprawl.

## Three-bucket output pattern

For every hook (Stop, PreToolUse, UserPromptSubmit, SessionStart, StopFailure), sort each check into:

1. **Block** (`{"decision": "block", "reason": ...}`): real integrity problems only — doctor errors, missing required files, stale `last_updated`, system change without audit entry, security violations. Forces the model to fix before stopping.
2. **Nudge** (`{"systemMessage": ...}`): soft signals — drift detection, judgment calls, continuity reminders. Visible one-liner, no acknowledgment required from the model.
3. **Silent** (`{}` and exit 0): when nothing fires. No "checks passed" reports.

## Behavior

- Never demand boilerplate footer acknowledgment ("no skill update", "WorkOS maintenance: ..."). The audit log captures changes.
- For security scans (secrets, tokens), prefer **PreToolUse** non-blocking warning over Stop-hook scan. Earliest interception wins — Stop runs after the value is already in the chat log.
- For semantic detection (drift, intent, durable preferences), prime via `UserPromptSubmit` `additionalContext` — invisible to user, model-judged. Don't pattern-match keywords for fuzzy intent.
- For shape detection (prefixed secrets, file paths, structured tokens), regex is the right tool.
- Read JSON from stdin with `json.loads(sys.stdin.read() or "{}")` and swallow `JSONDecodeError` to fail open.
- `chmod +x` on new Python scripts.

## Do Not

- Output to stdout unless emitting valid hook JSON.
- Echo secrets, tokens, or sensitive paths in block reasons or systemMessages.
- Add a new hook to `settings.json` without smoke-testing the script first (`echo '{}' | python3 <script>`).
- Make a hook block solely to force a model acknowledgment footer. Use `systemMessage` instead.

## Verification

- `echo '{}' | python3 <script>` returns valid JSON or `{}`.
- `python3 -c "import json; json.load(open('.claude/settings.json'))"` confirms settings parse.
- New hook entries reference paths via `${CLAUDE_PROJECT_DIR}`.
- Audit entry logged on hook changes.
