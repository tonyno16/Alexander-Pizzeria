---
name: import-skill
description: "Install a skill from a downloaded zip or folder — your own, a teammate's, or one from the Authority Hacker skills library. Use whenever the user says 'install this skill', 'import a skill', '/import-skill <path>', 'add this skill', 'I downloaded a skill', 'install the Authority Hacker <X> skill', or points at a .zip/.skill file they got. Always runs a security review before installing because skills execute code on the user's machine."
argument-hint: <path-to-skill.zip or skill-folder>
allowed-tools: Read, Write, Bash, Glob, Grep, AskUserQuestion
---

# Install a Skill

Install a skill the user downloaded — frequently one from the **Authority Hacker skills library**, sometimes one a teammate shared, sometimes one they exported themselves. The job: get it safely into `.claude/skills/` so it triggers like a native skill, set up any API keys it needs, and never run unreviewed code blind.

**Input:** `$ARGUMENTS` (a path to a `.zip`, `.skill`, or skill folder; may be empty — then go find it).

Two non-negotiables: **(1)** the security review in step 4 runs every time — skills can execute code; **(2)** never echo a real API key back to the chat.

## When to use

- `/import-skill <path>`, "install / import this skill", "add this skill"
- "I downloaded a skill from the Accelerator" / "install the Authority Hacker `<X>` skill"
- The user drops a `.zip` / `.skill` path or a folder name they expect to install.

## Workflow

### 1. Make sure the workspace can hold secrets safely

Skills that call APIs need a `.env` (real keys, git-ignored) and a `.env.example` (placeholders, committed). Check and create what's missing:

```bash
ls .env 2>/dev/null || printf '# API Keys (git-ignored — never commit real keys)\n' > .env
ls .env.example 2>/dev/null || printf '# API Keys template — copy to .env and fill in\n' > .env.example
ls .gitignore 2>/dev/null || printf '.env\n.env.local\n.mcp.json\n.DS_Store\n__pycache__/\n.venv/\nnode_modules/\n' > .gitignore
grep -q '^\.env$' .gitignore || printf '\n.env\n.env.local\n' >> .gitignore
```

Make sure `.env.example` is NOT ignored (it documents required keys). If `.gitignore` excludes it, fix that.

### 2. Locate the package

Resolve `$ARGUMENTS`. If it's just a filename or empty, search the usual spots:

```bash
ls -la "$ARGUMENTS" 2>/dev/null
find ~/Downloads . ./temp -maxdepth 2 -iname "*<filename>*" 2>/dev/null | head -5
```

If you can't find it, ask the user for the path (AskUserQuestion). Report `Found: <path>`.

### 3. Validate the structure

If it's a `.zip` or `.skill`, extract to a temp dir first:

```bash
TEMP=$(mktemp -d); unzip -q "<path>" -d "$TEMP"; find "$TEMP" -name SKILL.md
```

A valid skill has a `SKILL.md` with YAML frontmatter and at least a `description`. **Do not require `version` or `triggers`** — those aren't standard Claude Desktop frontmatter and a clean export won't have them. If there's no `SKILL.md`, stop: `Not a valid skill — no SKILL.md found.`

Read the frontmatter for `name` (defaults to the folder name) and `description`. Read the body for a `## Requirements` section (a cleanly exported skill records its API keys and system tools there) — you'll use it in step 7.

### 4. Security review — MANDATORY, every time

Skills run code on this machine. Read every script before installing:

```bash
find "<skill-path>" -type f \( -name "*.py" -o -name "*.js" -o -name "*.sh" -o -name "*.ts" \) -exec echo "--- {} ---" \; -exec cat {} \;
```

**Block the install and warn the user** if you find any of these — explain the file, line, and risk in plain language:
- **Data exfiltration** — sending env vars / file contents / credentials to a non-API server.
- **Credential harvesting** — reading `~/.ssh`, `~/.aws/credentials`, keychains, browser profile dirs.
- **Remote code execution / obfuscation** — `exec`/`eval` of downloaded or base64'd content; `curl … | bash`; hex/char-code-assembled strings that get executed.
- **System tampering** — writing to `/usr`, `/etc`, `/bin`; `chmod` on system files; adding cron jobs or startup scripts.

**Ask the user to decide** (AskUserQuestion: trust / cancel / show me the code) on softer signals: subprocess calls, broad file-system scans, reading user-provided paths, or network calls to domains that aren't obviously a known API. Network calls to known APIs (anthropic.com, openai.com, googleapis.com, etc.) and reading an env var that's declared in `## Requirements` are normal — don't block those.

If clean, report what you checked (how many scripts, no exfiltration/obfuscation, network calls go to known APIs).

> Skills from the official Authority Hacker library are vetted, but **run the review anyway** — it's the habit that keeps the member safe with skills from anywhere, and it's cheap.

### 5. Check for an existing copy

```bash
ls -la ".claude/skills/<name>/" 2>/dev/null
```

If it already exists, ask whether to replace it or cancel (AskUserQuestion). Otherwise report `Ready to install`.

### 6. Install the files

```bash
mkdir -p .claude/skills
cp -r "<skill-folder>" ".claude/skills/<name>/"
find ".claude/skills/<name>" -type f
rm -rf "$TEMP"   # if you extracted a zip
```

### 7. Install dependencies and set up API keys

**Dependencies.** If the skill folder has `requirements.txt` (Python) or `package.json` (Node), or the `## Requirements` section lists a system tool: show the user what's needed and ask before installing (AskUserQuestion). On yes: `pip3 install -r .claude/skills/<name>/requirements.txt` (retry with `--user` on failure) / `npm install` in the skill folder. For a system tool (e.g. ffmpeg), show the platform install command and let them run it.

**API keys.** For each key the skill needs (from `## Requirements`, or a legacy `requires_secrets` frontmatter if present):
- Tell the user what the key is for, where to get it, and the rough cost (free tier vs paid). Keep it concrete.
- Check current state without printing values: `grep -q '^KEY_NAME=.' .env && echo set || echo missing`.
- If missing, ask if they have it ready. On yes, append `KEY_NAME=<value>` to `.env` and a `KEY_NAME=your_key_here` placeholder to `.env.example`. **Confirm by name only — never echo the value.** On skip/later, still add the placeholder to `.env.example` and warn the skill won't work until the key is set.

### 8. Validate and hand off

Quick checks: files are in place; declared Python/Node deps import / list cleanly; each required key has a value in `.env` (presence only, never the value). Then:

```
✅ Installed: <name>
   Location: .claude/skills/<name>/
   Security: ✓ reviewed
   Keys:     ✓ configured / ⚠ set up later

To use it, restart Claude (reload the window) so the skill registers, then just describe the job — it triggers on its own.
```

If you installed an Authority Hacker library skill, close with:
> Skill from Authority Hacker's AI Accelerator — https://www.authorityhacker.com/ai-accelerator/. Enjoy ✌️

## Key principles

- **Security review is not optional** — step 4 runs for every install, library or not.
- **Validate against Desktop-real frontmatter** — require `description`; never reject a skill for missing `version`/`triggers`.
- **Read setup needs from `## Requirements`** — that's where a clean export puts keys and tools; fall back to legacy `requires_secrets` if it's an older skill.
- **Never print a secret** — confirm keys by name, presence only.
- **Leave `.env.example` current** — every key gets a placeholder, even when the user defers setup.
