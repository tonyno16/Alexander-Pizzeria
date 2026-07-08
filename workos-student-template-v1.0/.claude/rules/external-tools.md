# External Tools Rule

Claude reaches outside the workspace through CLIs, MCPs, APIs, and the web. Pick the right tool for the job and fail loudly when a connection breaks.

This rule is about *which* external tool to use and *how* to behave when one is unavailable. For secrets, credentials, and Red actions, see [security.md](security.md) — don't restate it here.

## Tool Hierarchy

Prefer the most boring, deterministic layer that works for the task:

1. **CLI** (`gh`, `notion-cli`, `aws`, `gcloud`, official command-line tools). Deterministic, scriptable, version-pinned. First choice when one exists.
2. **MCP** (Model Context Protocol servers). Typed and ergonomic, but more brittle than a mature CLI. Use when no good CLI exists for the task.
3. **API** (raw HTTPS / SDK). Use when the operation isn't covered by a CLI or MCP, or when the CLI/MCP wraps the API less cleanly than calling directly.
4. **Web** (browser, scraping, manual fetch). Last resort. Brittle, often blocked, hardest to verify.

When two tiers exist for the same operation, prefer the higher tier (lower number) unless the lower tier is faster, safer, or already configured.

## Behavior

- Before reaching for a new external tool, check whether a CLI / MCP / SDK is already installed and authenticated in this workspace.
- Verify the tool's output with a follow-up read when the action was non-trivial: `gh pr view` after `gh pr create`, a read-back after any external write, etc.
- Treat external write operations as Red by default. Follow `security.md` Red actions before sending, publishing, or spending.
- When a tool call fails, capture the error verbatim before retrying. Don't paper over rate limits, auth errors, or schema mismatches with a generic retry.
- When the user asks for a result that requires an external tool not yet wired, ask whether to wire it before guessing or scraping. Wiring is Yellow when the tool is well-known; installing an unknown third-party MCP is Red per `security.md`.

## When A Connection Fails

If a CLI or MCP call fails because the service is unreachable, the token is missing, or the auth expired:

1. Show the user the literal error.
2. Identify which env var, config file, or command is broken (e.g. "the MCP server can't be reached" vs "the relevant API token is missing from `.env`").
3. Offer to walk the user through fixing it — but don't edit `.env`, install new MCPs, or rotate credentials without explicit approval.
4. The Stop hook surfaces any broken connections detected during the turn so the next session can pick them up. If you notice a broken connection mid-turn, name it in your summary; don't silently fall back to a worse tier.

Do not chain retries past two attempts. Do not switch tiers (CLI → web scrape) silently. Do not paste tokens into chat output.

## Discovery

When the user names a tool you haven't seen wired:

- Check `.mcp.json`, `.env`, project package configs, and the operator's installed CLIs.
- If it isn't wired, say so. Ask whether to wire it (and which tier).
- Don't fabricate tool capabilities you can't verify.

## Verification

- The error from a failed tool call is visible to the user, not hidden.
- After an external write, a follow-up read confirms the change.
- Broken connections detected during the turn surface in the Stop hook output or the final summary.
- No paste of secrets into chat or summaries (`security.md`).

## Related Rules

- [security.md](security.md) — secrets, third-party MCPs, Red actions.
- [context-routing.md](context-routing.md) — which canonical doc lists the active integrations for this workspace.
