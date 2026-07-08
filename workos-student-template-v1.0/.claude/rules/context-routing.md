# Context Routing

Load context just in time. Do not stuff every file into the context window. The system works because [folders route context](../../00-brain/workos-principles.md#2-folders-route-context).

## Startup Context

- Start with `CLAUDE.md`.
- Read `00-brain/_overview.md` when work touches strategy, customers, offers, voice, planning, or business identity.
- Load `00-brain/current-state.md` and the most recently modified relevant area/project notes before older brain files.
- Read `00-brain/workos-principles.md` before changing system behavior.
- Read the relevant area, project, or lab `_overview.md` before touching files inside it.
- Use auto memory for recurring preferences and corrections.

## Source Priority

1. The user's current instruction.
2. `security.md` for Red actions and secrets.
3. The canonical file for the fact or decision.
4. Relevant `_overview.md`.
5. Relevant skill instructions.
6. Auto memory.
7. External linked docs when the local pointer says they are canonical.

## Context Loading Map

- **Strategy/positioning/customer/copy/offer:** `00-brain/business-profile.md`, `customers.md`, `offers.md`, `brand-voice.md`.
- **New ongoing function:** `/new-area`. New time-bound outcome: `/new-project`. Unsorted material: `/process-inbox`.
- **Area/project map:** `/work-map` when the user asks what is active, what owns what, or how areas/projects relate.
- **Project work:** load the project `_overview.md`, then its `primary_area` overview when one exists. Load [related areas](../../00-brain/glossary.md#related-areas) only when the task touches them.
- **Area work:** load the area `_overview.md`; use `/work-map` for linked projects only when cross-work visibility matters.
- **Local app:** start in `90-lab/`; [lab-apps.md](lab-apps.md) auto-loads.
- **Repeated workflow:** improve an existing skill or create a small one. See [skill-authoring.md](skill-authoring.md).
- **Rule/skill/structure change:** [rule-management.md](rule-management.md) plus the relevant per-edit authoring rule.
- **External system:** `00-brain/integrations/README.md` first, then the relevant plugin/CLI/skill.
- **Red actions:** [security.md](security.md).
- **Specialist work:** use `.claude/agents/` when one fits; otherwise dispatch a subagent only for isolated work that keeps main context lean.

## Memory Model

Canonical: [`workos-principles.md § Store, Inject, Recall`](../../00-brain/workos-principles.md#4-store-inject-recall).

- **Store:** durable business facts → `00-brain/`; recurring preferences → auto memory; raw inputs → `01-inbox/` or owning project. Writing to memory follows [memory-authoring.md](memory-authoring.md) (search before write, declarative not imperative, one fact per file).
- **Inject:** smallest useful snapshot — `_overview.md` plus canonical links over bulk loading.
- **Recall:** check loaded context + auto memory first, then canonical files, then external sources.
- **Capture & garden:** proactive capture routes through [workos-reflect](../skills/workos-reflect/SKILL.md); periodic cleanup (merge duplicates, retire stale, rebuild index) is [consolidate-memory](../skills/consolidate-memory/SKILL.md), auto-nudged by the Stop hook when the index passes 180 lines.

## Stale Context

- Treat relative dates ("today", "last week") as stale unless the file has a current `last_updated`.
- Staleness thresholds: [`canonical-concepts.md § Thresholds`](../../00-brain/canonical-concepts.md#thresholds-shared-numeric-values).
- Verify linked external docs before making a high-impact decision.
- For web sources, weigh credibility before relying on a claim — publisher, recency, bias, corroboration. Flag single-source or low-credibility claims as provisional.
