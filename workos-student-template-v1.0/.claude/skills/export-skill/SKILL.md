---
name: export-skill
description: "Package one of your skills into a shareable file that installs cleanly in the Claude Desktop app. Use whenever the user says 'export this skill', '/export-skill <name>', 'package this skill', 'make this skill shareable', 'zip up my skill', 'share my skill with a teammate', or 'add my skill to the Authority Hacker library'. Always strips the skill down to Claude-Desktop-safe frontmatter so the person who installs it doesn't hit import errors."
argument-hint: <skill-name>
allowed-tools: Read, Write, Bash, Glob, Grep, AskUserQuestion
---

# Export a Skill

Help the user package one of their own skills so someone else can install it — a teammate, or the Authority Hacker skills library. The export has to be **safe** (it runs on someone else's machine) and **portable** (it has to import into the Claude Desktop app without errors).

The single most common failure when sharing a skill is **bad frontmatter**: the Desktop app only accepts a specific set of YAML keys, and any extra ones (like `version:`, `triggers:`, `requires_secrets:`) make the import fail. So the heart of this skill is producing a clean, Desktop-safe copy — without throwing away the information those extra fields carried.

## When to use

- `/export-skill <skill-name>`
- "export / package / zip this skill"
- "make this skill shareable" / "share it with my team"
- "add this to the Authority Hacker library" / "contribute my skill"

The skill name is a folder under `.claude/skills/`.

## Workflow

Work top to bottom. Each step gates the next — don't zip until the security scan and the frontmatter cleanup are done.

### 1. Locate the skill

```bash
ls -la ".claude/skills/$ARGUMENTS/" 2>/dev/null || ls .claude/skills/
```

If the name doesn't resolve, show the list and ask which one. Confirm there's a `SKILL.md` — without it, it isn't a skill; stop and say so.

### 2. Security scan — runs on someone else's machine

You're about to hand this code to other people. Read every script before packaging:

```bash
find ".claude/skills/$ARGUMENTS" -type f \( -name "*.py" -o -name "*.js" -o -name "*.sh" -o -name "*.ts" \) -exec echo "--- {} ---" \; -exec cat {} \;
```

**Block the export** (tell the user plainly, don't zip) if you find:
- **Hardcoded secrets** — real API keys/tokens in the files. Scan for them:
  ```bash
  grep -rEn "AIza[0-9A-Za-z_-]{30,}|sk-[A-Za-z0-9]{20,}|ntn_[A-Za-z0-9]+|ghp_[A-Za-z0-9]+|Bearer [A-Za-z0-9._-]{20,}|API_KEY\s*=\s*[\"'][^\"']+[\"']" ".claude/skills/$ARGUMENTS" 2>/dev/null
  ```
  If a real key is found, tell the user to replace it with `os.environ.get("KEY_NAME")` and re-run. Never ship a key.
- **Data exfiltration** — posting env vars / file contents / credentials to a non-API server.
- **Credential harvesting** — reading `~/.ssh`, `~/.aws`, keychains, browser profiles.
- **Remote code execution / obfuscation** — `exec`/`eval` of downloaded or base64'd content, `curl … | bash`.
- **System tampering** — writing to `/usr`, `/etc`, `/bin`, editing crontab, changing system file permissions.

If something is suspicious but plausibly legitimate (a subprocess call to `ffmpeg`, a network call to a real API like `api.openai.com`), name it and ask the user to confirm with AskUserQuestion before continuing.

### 3. Stage a clean copy

Never mutate the user's working skill. Copy it to a temp folder and do all cleanup there.

```bash
STAGE=$(mktemp -d)/$ARGUMENTS
mkdir -p "$STAGE"
cp -r ".claude/skills/$ARGUMENTS/." "$STAGE/"
```

Remove development-only scaffolding from the staged copy. Use `find` for the patterned deletes so an unmatched glob can't abort the command under zsh (the default macOS shell):

```bash
cd "$STAGE"
rm -rf .env .config.json __pycache__ .DS_Store .git node_modules .venv venv evals eval-viewer .pytest_cache
find . -name ".env.*" -delete 2>/dev/null
find . -name "*.pyc" -delete 2>/dev/null
find . -type d -name "*-workspace" -exec rm -rf {} + 2>/dev/null
```

### 4. Make the frontmatter Desktop-safe — the important part

Open the staged `SKILL.md`. The Claude Desktop app / claude.ai accept **only** these frontmatter keys ([docs](https://code.claude.com/docs/en/skills)):

```
name, description, when_to_use, disable-model-invocation, user-invocable,
allowed-tools, disallowed-tools, argument-hint, arguments, model, effort,
context, agent, paths, shell
```

The minimum valid frontmatter is just `description`. Anything outside that list makes the import error.

**Rewrite the staged frontmatter to contain only allow-listed keys.** Don't silently delete information — relocate it into the body so the installer still sees it:

- `version:` → drop from frontmatter; record it as a line under a `## About` section in the body (e.g. `Version: 1.2.0`).
- `triggers:` → fold the trigger phrases into the `description` (that's where Desktop reads them anyway) and delete the key.
- `requires_secrets:` → move into a `## Requirements` section in the body as a human-readable list (key name + where to get it + pricing note). The importer reads this to set up `.env`.
- `requires_system:` / dependencies → move into `## Requirements` too (tool name + install command).
- `metadata:`, `license:`, `author:`, `compatibility:`, `hooks:` (Desktop ignores hooks), or any other non-listed key → drop from frontmatter; preserve anything human-meaningful under `## About`.

Keep `name` and `description`. Keep `allowed-tools`/`argument-hint`/etc. only if they were already there and valid. After rewriting, the frontmatter should look boring and minimal — that's the goal.

If you moved secret or dependency info, make sure the body has a clear `## Requirements` section so the person installing knows what keys/tools to set up. (The `import-skill` skill reads exactly this.)

### 5. Generate a clean README for the recipient

Write `README.md` into the staged copy (overwrite any dev-facing one) so whoever receives the file knows what it does, what it needs, and how to install it:

```markdown
# <Skill Name>

<one-line description>

## What it does
<2-3 sentences>

## Requirements
<API keys / tools, or "None">

## Install
1. Download this file.
2. In Claude, run: import this skill (or /import-skill <path-to-this-file>)
3. Follow the prompts to set up any API keys.

Shared via Authority Hacker's AI Accelerator — https://www.authorityhacker.com/ai-accelerator/
```

### 6. Package and report

Zip the staged folder to the user's Downloads (don't bury it):

```bash
OUT="$HOME/Downloads/$ARGUMENTS.zip"
( cd "$(dirname "$STAGE")" && zip -qr "$OUT" "$ARGUMENTS" )
echo "Exported: $OUT"
rm -rf "$(dirname "$STAGE")"
```

Then confirm to the user: the output path, what you stripped from the frontmatter (and where it went), the security-scan result, and a one-line "ready to share / import into Desktop." If you blocked on a security issue, say exactly what and what to fix instead.

## Why the frontmatter cleanup matters (don't skip it)

A skill that works perfectly in your own workspace can still fail to import for someone else, purely because of one unsupported frontmatter key. The export is the right place to fix that — once, automatically — so the person on the other end gets a clean install instead of a cryptic error. Strip aggressively in the frontmatter; preserve generously in the body.
