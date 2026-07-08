# 05 · MCP Servers and `.env` Migration

**Goal:** Bring the founder's working `.env` keys and `.mcp.json` server config across so the new workspace boots with the same integrations the old one had — without re-running every OAuth flow or re-pasting keys from a password manager.

**Audit signals:** `mcp_servers` (names), `env_template_keys`, `red_flags`.

## The rule that matters

There are two very different actions people lump together as "secret handling":

| Action | Verdict |
|---|---|
| Echo, paste, summarize, or hash secret **values** in chat, the migration report, audit log, brain files, `.env.example`, or any committed file. | **Red — never.** |
| Send secrets to a third party (upload, external system, paste into a web tool). | **Red — never.** |
| Copy secrets **between the founder's own gitignored files** on the founder's own machine (source `.env` → target `.env`, source `.mcp.json` → target `.mcp.json`). | **Yellow — confirm once, do it, log structurally.** |

Migration is squarely in the Yellow row. Both endpoints are the same user's local, gitignored files. The risk is leaking values into committed artifacts, not the copy itself.

## One-shot confirmation gate

Before doing any secret work, ask the founder once:

> "I'm about to copy your `.env` and `.mcp.json` from `<source path>` into this workspace. Both source and target are gitignored. I won't echo any values in chat, the report, or the audit log — only key names. OK to proceed?"

If the founder says yes → proceed through the whole secrets phase autonomously (one approval covers all keys and servers).
If no → fall back to the placeholder mode at the end of this doc (template keys only, founder re-adds values).

Log the confirmation:

```json
{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"secrets-phase-approved","path_before":"<source path>","path_after":null,"reason":"founder approved secret copy","reversal":"n/a"}
```

## Pre-flight safety check

Before any copy, run:

```bash
git check-ignore .env .mcp.json 2>&1
```

Both must return their paths (exit 0). If either is not ignored, **stop**, fix the target `.gitignore` first (per [`01-safety-and-secrets.md`](../../setup-workos/references/01-safety-and-secrets.md)), and re-run the check.

## `.env` migration

1. Read source `.env` with the Read tool. (`secret-guard.py` will warn — that's a behavioral nudge for *output*, not a block on the read.)
2. Read target `.env` (creating it from `.env.example` if missing, with empty values).
3. For each non-comment line in source `.env`:
   - If the key is missing from target → append the full `KEY=value` line to target.
   - If the key exists in target with an empty value → fill it from source.
   - If the key exists in target with a different non-empty value → **do not overwrite silently.** List it in the report's "Red Decisions Pending Founder" table as "two different values for `<KEY>`; pick one" and leave the target value unchanged.
4. Also add any source `.env.example` keys missing from target `.env.example` (these are *template* keys, no values — see template policy below).
5. Re-run `git check-ignore .env` after writing. It must still pass.

**At no point** copy a value into chat, the migration report, audit log, or `.env.example`. Refer to keys by name only.

## `.mcp.json` migration

1. Read source `.mcp.json` with the Read tool.
2. Read target `.mcp.json` (creating an empty `{"mcpServers": {}}` if missing).
3. For each server in the source:
   - If the server name is missing from target → port the server block as-is, including any inline values.
   - If the server name exists in target → compare. If configs match, no-op. If they differ, surface in the report's "Red Decisions Pending Founder" table; do not overwrite.
4. After writing, validate JSON: `python3 -c "import json; json.load(open('.mcp.json'))"` must succeed.
5. If a ported server references env vars (`${VAR_NAME}`), confirm those vars are now set in target `.env` (they should be, from the previous step).

If the source `.mcp.json` uses local file paths (e.g. an OAuth cache at `~/.google-drive-mcp/`), confirm those paths exist or list them in the manual-reset section as "OAuth re-auth needed".

## Template policy

Target `.env.example` must contain every key the workspace needs **with empty placeholder values**:

```
NOTION_API_TOKEN=
BENTO_SECRET_KEY=
```

Never write a real value into `.env.example` (it gets committed). After migration, every key present in target `.env` should also be present (key only, empty value) in target `.env.example`.

## OAuth / on-disk credential stores

Some integrations cache OAuth tokens at locations like `~/.google-drive-mcp/`, `~/.config/gh/`, `~/.docker/config.json`. These usually re-bind to the source workspace identity and need re-auth in the new context.

For each detected store:

1. List in the report's "Must Re-Establish Manually" section with the exact command the founder runs to re-auth (`gcloud auth login`, `gh auth login`, etc.).
2. Do **not** copy these stores blindly — they may break in subtle ways or expose tokens scoped to a different working directory.

## Fallback: founder declined the secrets copy

If the founder did not approve the one-shot secrets copy:

1. Copy `.env.example` keys only (no values) into target `.env.example`.
2. Create target `.env` with the same keys, empty values.
3. Add a definition in target `.mcp.json` for each source server, but with placeholder env var references (`${MCP_BENTO_API_KEY}`) and **no inline secret values**.
4. List every key the founder must populate manually in the report's "Must Re-Establish Manually" section.

## Audit entries (values never appear)

```json
{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"copy-env","path_before":"<source>/.env","path_after":".env","reason":"ported <N> keys: NOTION_API_TOKEN, BENTO_SECRET_KEY, ...","reversal":"restore previous .env from local backup or remove appended lines"}

{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"port-mcp-server","path_before":"<source>/.mcp.json","path_after":".mcp.json","reason":"server <name>","reversal":"remove server block from .mcp.json"}

{"timestamp":"<ISO>","class":"red","actor":"migrate-existing-workspace","action":"defer-oauth","path_before":"<source credential store>","path_after":null,"reason":"requires re-auth in new context","reversal":"n/a"}
```

Every audit line names the affected keys/servers, never values.

## Verification

- `git check-ignore .env` returns 0 on the target.
- `git check-ignore .mcp.json` returns 0 (or the file truly contains no secrets and is intentionally committed — confirm with founder).
- Target `.env` has every key from source `.env` that the founder still needs.
- Target `.mcp.json` parses as valid JSON and lists every server the founder still uses.
- Target `.env.example` has every key from target `.env`, with empty values.
- No secret value appears in: target `.env.example`, brain files, migration report, audit JSONL, chat output, `00-brain/` anywhere.
- The "Must Re-Establish Manually" section lists only OAuth/credential-store gaps, not env keys (because those were copied).
- Manual smoke test: load one MCP server in a new Claude session and confirm it works.
