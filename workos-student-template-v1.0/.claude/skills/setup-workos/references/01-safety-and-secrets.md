# 01 · Safety & Secrets

**Goal:** Verify the workspace is safe to commit and that secret handling matches `security.md`. No founder questions here unless something is actually wrong.

**Audit signals:** From `setup_audit.py` JSON — `gitignore`, `env`, `top_level`, `doctor`.

## Checks

### `.gitignore`

Must contain (at minimum):

```
.env
.env.*
!.env.example
secrets/
*.pem
*.key
```

Plus dependency folders (`node_modules/`, `.venv/`, `__pycache__/`, `dist/`, `build/`, `.next/`) and OS junk (`.DS_Store`, `.vscode/`, `.idea/`).

If `setup_audit.py` returns `missing_patterns`, add them. Do **not** silently rewrite the whole file — append missing patterns and tell the founder.

### `.env.example`

Must exist and be safe to commit (placeholder values only, no real keys).

If missing, create a minimal one with `ANTHROPIC_API_KEY=` and any keys the workspace template expects.

### `.env`

If `.env` does not exist:
- Create from `.env.example` with empty values.
- Do **not** ask the founder for keys yet — keys are filled when they wire up a specific tool.

If `.env` does exist:
- Confirm presence by name only. Never read or echo its contents.
- Run `git check-ignore .env` — if it returns non-zero, `.env` is not ignored. Stop and tell the founder this is a safety issue.

### `00-brain/audit/`

Confirm `00-brain/audit/README.md` exists. If not, this is a template defect — flag in setup report.

Confirm `00-brain/audit/workos-audit.jsonl` either exists or can be created on first audit write. The file is in `.gitignore` (local-only).

## Founder interaction

This section is silent if everything passes. The founder doesn't need to confirm `.gitignore` patterns.

Only surface a question if:

- `.env` exists but is NOT git-ignored. → "Heads up: `.env` exists but isn't ignored by git. I'll add it to `.gitignore` now."
- `.gitignore` is missing entirely. → "No `.gitignore` found. I'll create one with safe defaults."
- A file outside `.env` looks secret-bearing. → "Found `<file>` which looks like it has secrets. Should I move it to `.env` or somewhere safer?"

## Audit entries

```json
{"timestamp":"<ISO>","class":"green","actor":"setup-workos","action":"gitignore-fix","path_before":".gitignore","path_after":".gitignore","reason":"added missing patterns: <list>","reversal":"git revert .gitignore"}

{"timestamp":"<ISO>","class":"green","actor":"setup-workos","action":"create-env","path_before":".env.example","path_after":".env","reason":"first-run scaffold with empty values","reversal":"rm .env"}
```

## Verification

- `.gitignore` contains every required pattern.
- `.env.example` exists and is committable.
- `.env` either exists locally with empty values, or there's an audit entry explaining why not.
- `git check-ignore .env` returns 0.
- No secret value appears in any committed file, brain file, or summary.
