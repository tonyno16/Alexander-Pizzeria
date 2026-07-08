# 04 · Rules, Hooks, Scripts, Commands Migration

**Goal:** Merge useful behavior into target `.claude/rules/`, port hooks only after rewriting source-specific paths, leave the rest behind.

**Audit signals:** `rule_files`, `hook_files`, `script_files`, `command_files`.

## Rules

### Decision matrix

| Source rule covers… | Decision |
|---|---|
| A topic already in target `.claude/rules/`, and target is healthier. | `archive-reference` |
| A topic already in target, but source has better content. | `merge` — edit target to absorb source improvements |
| A path-specific behavior (has `paths:` frontmatter) the target lacks. | `port` |
| A global behavior the target lacks but the workspace genuinely needs. | `port` |
| A workflow with steps and verification. | **Not a rule** — convert to a skill via [`03-skills.md`](03-skills.md) |
| Business fact, project state, or strategy. | **Not a rule** — extract to `00-brain/` via [`01-business-context.md`](01-business-context.md) |

### Procedure

1. Search target `.claude/rules/` for an existing file on the same topic.
2. If found → merge into target; do not create a parallel rule.
3. If not found and the rule is durable → port. Strip source-specific paths; use WorkOS canonical paths.
4. Verify against `.claude/rules/rule-authoring.md`: behavioral / durable / scoped / atomic / non-procedural / verifiable / non-contradictory.

## Hooks

Hooks are dangerous to port without inspection — they execute on Claude lifecycle events.

### Decision matrix

| If the hook… | Decision |
|---|---|
| References source-specific absolute paths and there's no clear target equivalent. | `rewrite` or `ignore` |
| Hits a network endpoint, writes outside the workspace, or touches credentials. | **Inspect first.** Ask the founder before porting. |
| Implements business logic still needed (e.g., audit logging, staleness checks). | `port` — but rewrite paths and re-verify. |
| Duplicates an existing target hook. | `archive-reference` |

### Procedure

1. Read the hook source file in full before deciding. Note: every network call, file write, env var read, subprocess invocation.
2. Rewrite hardcoded paths to relative or canonical WorkOS paths.
3. If the hook writes to an external system, ask the founder. Do not silently port.
4. Test the hook by running it manually before wiring it into `settings.json`.

## Scripts

Most one-off scripts in `.claude/scripts/` or `.codex/scripts/` are workspace-specific glue. Default: leave behind unless the script implements a workflow that's still needed.

If a script is genuinely reusable, prefer wrapping it as a skill helper (place in the relevant skill's `scripts/` folder) over a top-level script.

## Commands

`.claude/commands/<name>.md` (also `.agents/commands/`, `.codex/prompts/`) are slash commands the founder types as `/<name>`. These are often the most-missed thing in a migration — muscle memory lives in commands and skills. **Offer to bring them across by default**, then sort each with the matrix below.

### Default: port 1:1

Like skills, commands are the founder's muscle memory — **port them as-is by default**, fixing connections so they still fire. Don't convert, merge, or drop them on your own initiative.

| Situation | Default |
|---|---|
| Any command the founder wants (the default for all of them). | **port 1:1** into `target/.claude/commands/`, then fix connections. |
| An identical command already exists in the target. | skip — already present. |
| The founder explicitly asks to convert a workflow-shaped command into a skill, or to drop one. | do it — only on their say-so. |

### Port procedure

1. Copy `<name>.md` verbatim into `target/.claude/commands/`.
2. Strip source-specific absolute paths; use WorkOS canonical/relative paths.
3. If the command references a skill, file, or rule that didn't migrate, fix the pointer or flag it in the report.
4. Confirm the name doesn't collide with an existing target command **or skill** — rename if it does.

### Conversion is opt-in

Modern WorkOS often encodes multi-step workflows as skills rather than commands, so you may *surface* that a heavy, workflow-shaped command would work better as a skill — but only **offer** it. Convert (or drop) only with the founder's explicit yes. Default is the 1:1 command copy.

## Settings.json

**Do not overwrite target `.claude/settings.json`.** Read the source settings, summarize the hook wiring and permissions in the migration report, and let the founder merge consciously.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"port-rule|merge-rule|port-hook|rewrite-hook|port-script|port-command","path_before":"<source rel>","path_after":"<target rel or null>","reason":"<short>","reversal":"rm or git revert"}
```

Hooks that execute external calls get logged with `class:"red"` and `action:"deferred"` until founder approval.

## Verification

- No target rule was overwritten by a source rule.
- Every ported hook has had source-specific paths rewritten.
- Any hook with network/external behavior was flagged for approval, not silently ported.
- Every source command the founder wanted was ported 1:1 — none converted or dropped without explicit approval.
- Every ported command had source paths rewritten and no name collision with an existing command or skill.
- `settings.json` was not overwritten — changes were proposed to the founder.
- `workos-doctor` reports no rule or hook errors.
