---
name: mcp-setup
description: Connect Claude to an external tool via MCP — walks a non-technical founder through finding the right server, getting a token, and wiring it up safely. Use whenever the founder says "connect X", "add an MCP", "wire up Notion / Gmail / Drive / Stripe / Linear / etc.", "install this MCP", "hook Claude up to my [tool]", or hands over a docs URL for any external service. Always prefers remote/hosted servers first, falls back to npx, and only suggests Docker as a last resort.
---

# MCP Setup

Use this when the founder wants Claude to talk to an external tool (Notion, Gmail, Google Drive, Stripe, Linear, DataForSEO, etc.) and the tool isn't already wired.

The founder is not technical. Explain everything in plain language, one step at a time. The point is to get the connection working without scaring them.

## When To Use

Trigger:

- "Connect Claude to Notion / Gmail / Drive / [any tool]."
- "Add an MCP for X."
- "How do I wire up [tool]?"
- "Install this MCP."
- "Hook Claude up to [tool]."
- The founder pastes a docs URL or MCP server URL and asks how to use it.
- The founder describes a job that needs an external tool Claude isn't connected to yet.

Do not trigger:

- The tool is already wired and the founder is just using it. Run the tool, not this skill.
- The founder is asking what an MCP is conceptually. Explain plainly and offer to install one when they're ready.
- A Red action is needed (deleting connections, exposing secrets in chat). Stop and ask.

## Canonical Inputs

- The tool name (e.g. Notion, Gmail, Stripe).
- The setup guide URL when the founder has one — otherwise find the official docs first.
- `.env` for storing tokens (never read or print values, only the variable name).
- `.claude/rules/security.md` — never paste secrets into chat or `.mcp.json`.
- `.claude/rules/external-tools.md` — CLI > MCP > API > web hierarchy.

## Workflow

### 1. Read the setup guide

If the founder gave a docs URL, fetch it and understand what's needed before explaining anything. If they didn't, find the official docs for the tool yourself (search "tool-name MCP server official"). Don't guess the install pattern — read it.

### 2. Figure out what's needed

- Does the tool require an API token? (Most do — explain it as "a password that lets Claude reach the tool remotely.")
- Is there anything to install locally first (rare for hosted MCPs)?
- Are there permission scopes to choose (e.g. read-only vs. write)?

### 3. Pick the install method (priority order)

Use the first one available — don't jump to Docker just because the docs mention it.

1. **Remote / hosted MCP** (BEST): runs on the provider's servers. URL pattern like `https://mcp.toolname.com`. Easiest path — only needs an API token.
2. **npx-based MCP** (GOOD): runs locally via Node.js (the founder already has Node from Claude Code install). Commands look like `npx @company/mcp-server`.
3. **Docker-based MCP** (LAST RESORT): requires Docker Desktop. Warn the founder explicitly: "This MCP requires Docker — that's extra software you'd need to install. Are you okay with that, or should we look for an alternative?" If they don't want Docker, look for a different MCP for the same tool or skip it for now.

### 4. Check who made it

- **Official** (made by the tool's company): proceed.
- **Third-party**: warn the founder. "This MCP wasn't made by [tool] directly — it was created by [publisher]. Before we continue, do you trust them? MCPs can access your data, so reputation matters." Wait for confirmation before proceeding.

### 5. Walk the founder through the token (when needed)

- Tell them exactly where to go ("Go to notion.so, click Settings → Integrations").
- Describe what they'll see on each screen.
- Tell them what to click and what to copy.
- Ask them to paste it here when they have it.
- The moment they paste it: stop. Tell them you'll save it to `.env` — never paste it into the chat or `.mcp.json`.

### 6. Wire it up via `claude mcp add`

Use the CLI command, not direct `.mcp.json` editing — it's more reliable and avoids the known JSON-edit bug.

**For npx-based MCPs with env vars:**

```
claude mcp add <name> npx <package-name> -e KEY1=value1 -e KEY2=value2
```

Example:

```
claude mcp add notion npx @notionhq/notion-mcp-server -e NOTION_API_KEY=xxx
```

**For remote / HTTP MCPs:**

```
claude mcp add --transport http <name> <url>
```

With auth header:

```
claude mcp add --transport http <name> <url> --header "Authorization: Bearer xxx"
```

Store the actual token in `.env` and reference it from the command rather than typing it inline when possible. If the token must be in the `claude mcp add` command, that's OK — Claude Code stores it in its own config (not `.mcp.json`), and `.env` discipline still applies for anything else that reads the value.

### 7. Restart Claude Code

Tell the founder: "Quit Claude Code and reopen it. The new MCP will show up after restart."

### 8. Test it

Make one simple request that proves the MCP works ("read my latest Notion page", "show my last 3 emails"). Show the founder the result. Confirm the round trip succeeded.

### 9. Note the connection

When the MCP is live, add a one-line entry to `00-brain/integrations/<tool>.md` (create the file if it doesn't exist) noting:

- Tool name and what it's for.
- Install method used (remote / npx / docker).
- Env var names (never values).
- Date wired.
- Owner (the founder unless told otherwise).

This lets future sessions know the tool is live without re-checking `.mcp.json`.

## Communication Style

- Use "you" and "your." Talk to the founder, not at them.
- Use real terminology but define it: "An API token is basically a password that lets Claude reach the tool remotely without you signing in every time."
- One step at a time. Don't dump three things at once.
- If something goes wrong, name what happened in plain terms and what to try next.
- Never echo a token, API key, or secret back to chat. Never paste one into `.mcp.json` or any committed file.

## Outputs

When done, confirm the install with a tight summary:

```
✅ Done! Claude can now talk to <tool>.

Here's what Claude can do now:
- [2-3 plain-language capabilities]

Try asking: "<one concrete example>"
```

## Housekeeping

- Log the install to `00-brain/audit/workos-audit.jsonl` via `.claude/scripts/audit-log.sh` (Yellow, reason: "wired MCP for <tool>", reversal: "claude mcp remove <name> + delete .env entry").
- If a token had to be regenerated, note that in the audit entry without including the value.
- If the founder wired a third-party MCP after a trust warning, log that explicitly so future audits can re-check.

## Audit

Log to `00-brain/audit/workos-audit.jsonl`:

```json
{"timestamp":"<ISO-8601>","skill":"mcp-setup","action":"wired-mcp","tool":"<tool-name>","method":"remote|npx|docker","publisher":"official|third-party","reversal":"claude mcp remove <name>"}
```

Redact secrets and tokens — only names, methods, and publishers go in the log.

## Verification

- `claude mcp list` shows the new server.
- A simple test request returns real data from the tool.
- `.env` contains the token (never the chat, never `.mcp.json`).
- `00-brain/integrations/<tool>.md` exists with the wiring note.
- Audit entry written.

## Failure Modes

- **No official MCP exists:** Search for a reputable third-party, warn the founder about trust, or recommend a different path (CLI, API skill, or web scraping with `cf-scraper`).
- **Docker-only and founder doesn't want Docker:** Look for an alternative MCP, or document the tool as "deferred" in `00-brain/integrations/<tool>.md` until a hosted option appears.
- **Restart doesn't help:** Check that the env vars actually got read (`claude mcp list` will show the server but a failed test means env or auth). Re-walk the token step.
- **Third-party MCP behaves unexpectedly:** Disable it (`claude mcp remove <name>`) and ask before re-enabling.

## Do Not

- Paste tokens, API keys, or `.env` contents into chat.
- Edit `.mcp.json` directly when `claude mcp add` will work.
- Install Docker without explicit founder approval.
- Install a third-party MCP without flagging the publisher first.
- Skip the restart step — most "it's not working" reports come from forgetting to restart.
