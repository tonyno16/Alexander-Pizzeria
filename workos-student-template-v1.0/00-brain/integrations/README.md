# Integrations

This folder maps the external systems this WorkOS talks to. One file per integration. Each file says *what* the system is, *when* to use it, and *how* it's wired (CLI, MCP, API).

This folder is a placeholder. Every entry below is an example; nothing is wired yet.

> **For Claude:** the files in this folder are **placeholders** until the founder confirms a real integration. Do not treat any entry as canonical truth. Do not assume a CLI is installed or an MCP is reachable just because it's listed here. When a real integration is connected, **replace** the placeholder file with real details (auth method, env vars, common commands, owner, gotchas). When asked which integrations exist, check `.mcp.json`, `.env`, and the project's installed CLIs — not just this folder.

## Likely integrations to wire (none active yet)

These are the systems most knowledge-worker businesses end up connecting in the first weeks. Wire them when you actually need them — not before.

| File                     | What it is                            | When to wire it                                     | Likely tier |
|--------------------------|---------------------------------------|-----------------------------------------------------|-------------|
| `knowledge-tool.md`      | Your team's truth source (docs/wiki)  | When more than one document lives outside this repo | MCP or CLI  |
| `email.md`               | Outbound email sender                 | When Claude needs to draft and queue real emails    | MCP or API  |
| `calendar.md`            | Scheduling and availability lookups   | When Claude books, blocks, or reads time            | MCP         |
| `analytics.md`           | Web/product analytics source          | When Claude reports on real metrics, not vibes      | API or MCP  |
| `payments.md`            | Billing / revenue data                | When Claude reports on revenue or refunds           | API         |

## Adding an integration

1. Decide which tier (`CLI > MCP > API > web` — see `.claude/rules/external-tools.md`).
2. Wire credentials in `.env` (never in this file, never in chat).
3. If MCP: edit `.mcp.json` (Claude can do this for you).
4. Replace the placeholder file in this folder with real info: auth method, env var names (not values), one or two common commands, gotchas, owner.
5. Note the wiring date in the file so a future Claude knows when it was set up.

## Do not

- Paste secrets into any file in this folder.
- Treat a placeholder file as proof a tool is connected.
- Add an "integration" file for a tool no one is using yet — the folder is a map of *active* connections, not a wishlist.

## Related

- `.claude/rules/external-tools.md` — tool hierarchy and connection behavior.
- `.claude/rules/security.md` — secrets and third-party MCPs.
- `.env.example` — placeholder env vars.
- `.mcp.json` — live MCP wiring (does not exist by default; created when the first MCP is added).
