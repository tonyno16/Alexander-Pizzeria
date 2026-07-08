# 03 · Skills Migration

**Goal:** Bring the founder's skills across **1:1**. These are working automations the founder built and relies on — preserve each as its own skill. The migration's job is **connection integrity** (making sure each ported skill still runs in the new workspace), *not* editorial improvement or consolidation. Default to porting everything the founder wants, intact.

**Audit signals:** `skill_files` (paths under `.claude/skills/` and `.agents/skills/`).

## Default: port 1:1

Offer to port the founder's skills as-is, one source skill → one target skill, names and behavior preserved. Do **not** merge, rewrite, or drop skills on your own initiative — that destroys automations the founder depends on and is the opposite of what they asked for.

| Situation | Default |
|---|---|
| Any source skill the founder wants (the default for all of them). | **port 1:1** — copy the folder verbatim, then fix connections (below). |
| An identical skill already exists in the target and is unchanged. | skip — it's already present (note it; don't duplicate the file). |
| A skill is obviously dead (depends on a tool/workflow that no longer exists). | **mention it and ask** — default is still to port unless the founder says drop it. |
| The founder explicitly asks to consolidate forks/duplicates. | consolidate — but only on their explicit say-so (see below). |

When in doubt, port it. A spare skill is cheap; a silently-dropped automation is a broken promise.

## Port procedure (the real work — connections)

For each skill, the value isn't deciding *whether* to port — it's making sure it still **works** after porting:

1. **Copy the skill folder verbatim** to `target/.claude/skills/<name>/` — `SKILL.md`, `references/`, `scripts/`, `assets/`, all of it. Preserve the name, description, and frontmatter as-is; do not "improve" triggers unless they are actually broken.
2. **Rewrite source-specific paths.** Absolute paths, references to the source folder layout, hardcoded `~/Code/<old-workspace>/...` → target-relative or WorkOS-canonical paths.
3. **Repoint integration references.** If the skill calls an MCP server, confirm that server name exists in the target `.mcp.json` (see [`05-mcps-and-secrets.md`](05-mcps-and-secrets.md)). If it isn't there yet, flag it in the report as a dependency to wire — don't silently leave a skill pointing at a missing server.
4. **Fix internal links.** Helper-script refs, `references/` links, and any pointers to source rules/brain files that may not have migrated — repoint or flag each one.
5. **Check name collisions.** If `<name>` already exists in the target as a different skill (or as a command), don't overwrite — rename the incoming one and note it.
6. **Verify it runs.** `python3 .claude/scripts/workos-doctor.py` reports no skill errors for it; no broken links; description intact.

## Consolidation is opt-in, never the default

After (or while) porting 1:1, you may *notice* obvious forks or duplicates — e.g. `email-strategy` + `email-strategy-47`, or `x-post`/`threads-post`/`linkedin-post` that overlap. You may **surface** these to the founder as an optional cleanup:

> I ported all 7 social skills 1:1. Three of them (`x-post`, `threads-post`, `linkedin-post`) overlap heavily — want me to consolidate those into one, or keep them separate?

Only consolidate, merge, or rewrite with the founder's **explicit yes**. Absent that, every skill stays as its own 1:1 copy. The founder owns this call, not you.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"port-skill|skip-skill-duplicate|consolidate-skill","path_before":"<source rel>","path_after":"<target rel or null>","reason":"<short>","reversal":"rm -rf <path_after> or git revert"}
```

`consolidate-skill` should only ever appear when the founder explicitly approved it.

## Verification

- Every source skill the founder wanted is present in the target and passes doctor checks.
- No skill was merged, rewritten, or dropped without explicit founder approval.
- Every ported skill had source-specific paths rewritten and integration/links repointed (or flagged).
- No skill silently overwrote a target skill or command of the same name.
- Skills that depend on a not-yet-wired MCP server are flagged in the report, not left broken.
