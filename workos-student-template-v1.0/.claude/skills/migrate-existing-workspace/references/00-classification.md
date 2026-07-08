# Classification

Every piece of source material maps to exactly one class. Use this when the audit JSON lists something and you're unsure where it belongs.

| Class | Definition | Owning reference |
|---|---|---|
| `brain-truth` | Durable business, customer, offer, voice, founder, or operating context. | [`01-business-context.md`](01-business-context.md) |
| `active-area` | Ongoing function with recent activity. | [`02-active-work.md`](02-active-work.md) |
| `active-project` | Time-bound outcome with current evidence. | [`02-active-work.md`](02-active-work.md) |
| `lab-app` | Local dashboard, scraper, prototype, bot, tool. | [`02-active-work.md`](02-active-work.md) |
| `workflow-skill` | Repeatable workflow to port, merge, rewrite, split, or archive. | [`03-skills.md`](03-skills.md) |
| `rule` | Durable behavior instruction. | [`04-rules-hooks-scripts.md`](04-rules-hooks-scripts.md) |
| `hook` | Script wired into a Claude/Codex lifecycle event. | [`04-rules-hooks-scripts.md`](04-rules-hooks-scripts.md) |
| `mcp-server` | MCP definition (config shape only; secrets re-added by user). | [`05-mcps-and-secrets.md`](05-mcps-and-secrets.md) |
| `external-link` | Notion / Drive / Slack / CRM / GitHub source — link, never copy. | [`07-external-pointers.md`](07-external-pointers.md) |
| `memory-preference` | Recurring operating preference for Claude Code auto memory. | [`06-memory-and-docs.md`](06-memory-and-docs.md) |
| `agent-doc` | Reference library entry. Re-classify into `brain-truth` or `external-link`. | [`01-business-context.md`](01-business-context.md) |
| `archive-reference` | Useful history that stays in source or is linked from `99-archive/`. | [`08-audit-and-report.md`](08-audit-and-report.md) |
| `ignore` | Stale, duplicate, generated, secret, cached, or irrelevant. | (no action — list in report's "Skipped" table) |

If a candidate fits two classes, pick the one closer to the top of the table (more specific wins over more generic).
