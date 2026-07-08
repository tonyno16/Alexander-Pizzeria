# 01 · Business Context Migration

**Goal:** Populate `00-brain/` from durable business context in the source workspace, without overwriting or duplicating target truth. Aim for **breadth** — the default stub files are a starting set, not a ceiling. A real business has more durable context than 7 files hold; propose and stand up new canonical homes (under the founder's migration approval) wherever the source warrants it.

**Audit signals:** `instruction_files`, `knowledge_dirs`, source root docs.

## Source patterns to look for

- `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, top-level `README.md`.
- `.basic-memory/` subfolders (company, marketing, people, ai-accelerator, research, workflows).
- `brain/`, `context/`, `knowledge/` top-level dirs.
- `agent-docs/`, `03-resources/agent-docs/`, `05-context/` libraries.
- Per-area `_overview.md` files that describe identity, offer, or audience.

## Mapping to canonical brain files

| Source pattern | Target canonical file |
|---|---|
| Company identity, positioning, principles, decision logs | `00-brain/business-profile.md` |
| Founder identity, working style, preferences, autonomy stance | `00-brain/founder-profile.md` |
| Brand voice, tone, style, copy rules | `00-brain/brand-voice.md` |
| Customer segments, ICP, pains, objections, research | `00-brain/customers.md` |
| Products, pricing, promises, proof, offers | `00-brain/offers.md` |
| Glossary, terminology, naming conventions | `00-brain/glossary.md` |
| Operating context, current focus, active priorities | `00-brain/current-state.md` |
| Shared definitions used across docs | `00-brain/canonical-concepts.md` |
| A durable topic with no home in the defaults | **new** `00-brain/<topic>.md` (see below) |

## Don't stop at the default files — expand the brain

The brain is not a closed set. The canonical rule for adding files is [`brain-authoring.md` § Proposing New Files](../../../rules/brain-authoring.md#proposing-new-files) — follow it here, don't re-derive it. The seven stubs cover the universals, but a real business carries durable context that fits none of them, and a migration is exactly when that context gets silently lost. So actively hunt for topics that deserve their own canonical home rather than cramming them into a stub or dropping them. Common examples:

- A distinct **product or program** beyond the flagship offer → `00-brain/<product>.md`.
- A **methodology or framework** the business teaches or runs by → `00-brain/<method>.md`.
- **Channel playbooks** (SEO, podcast, paid, email engine) with durable rules, not just current tasks → `00-brain/<channel>-playbook.md`.
- **Team / roles / collaborators** and who owns what → `00-brain/team.md`.
- **Competitor / market intelligence** that's a standing reference → `00-brain/market.md` or `00-brain/competitors.md`.
- **Partnerships, networks, or affiliates** → `00-brain/<topic>.md`.

**Posture (per the canonical rule): a new brain file is Red — propose, don't silently create.** In a migration that's cheap to honor: **list every proposed new brain file in the migration plan/report and create them under the founder's single migration approval** — the same batch confirmation that covers new areas/projects. Don't create them silently, and don't skip them either; surface them so the founder signs off on the expanded brain in one pass.

Guardrails so breadth doesn't become bloat:

1. **Search first** (atomic truth — one canonical home per fact; registry in `00-brain/canonical-concepts.md`). If a default file already owns the topic, extend it — don't fork.
2. **Substance threshold.** A new file needs a real body of durable truth (claims that will still be true next quarter), not a thin stub or a single fact. One fact belongs in an existing file or memory.
3. **Register it.** Add new canonical concepts to `00-brain/canonical-concepts.md` and surface the file from `00-brain/_overview.md` / `current-state.md`, exactly as [`brain-authoring.md`](../../../rules/brain-authoring.md) requires.
4. **Claims, not documents.** Same rule as the defaults — restate durable truth in WorkOS voice; never copy a source doc wholesale.

Bias toward *proposing* the file when you're weighing it: a missing canonical home is how durable context silently gets lost in a migration. Aim to leave the brain proportional to what the source actually contains, not capped at the seven stubs.

### Required: the brain-expansion scan (don't leave it to vibes)

This step is non-optional, because "look for topics" gets skipped under load — it must produce a concrete artifact. Before completing this task, write a **brain-expansion scan** into the report's *Migrated To Brain* section:

1. List every durable topic found in the source (knowledge dirs, `agent-docs/`, per-area overviews, instruction files) that the 7 default files don't fully cover.
2. For each, record exactly one decision: **new `00-brain/<topic>.md`** or **fold into `<existing file>`** — with a one-line why.
3. Default a topic with its own substantial body to a **new file**; fold only single stray facts.

If the scan genuinely finds nothing beyond the defaults, **state that explicitly** in the report ("brain-expansion scan: no topics beyond the defaults"). An empty result must be a written conclusion, never a silent skip — that distinction is what makes expansion fire consistently instead of by coincidence.

## Procedure

1. Search the target file before writing. If a topic already has content, do **not** overwrite.
2. For each source candidate, read just the relevant section (do not bulk-read whole files).
3. Restate the durable claim in WorkOS voice (terse, no-BS, no corporate filler).
4. Append (don't replace) when refreshing. Use a `> Updated 2026-MM-DD from <source>` blockquote so provenance is visible.
5. If source and target conflict (different price, different segment, different voice rule), do **not** silently pick a side. Flag the conflict in the migration report and ask the founder.
6. Agent-doc files are mixed. Split each one: durable identity claim → extract to brain; human-facing reference → link only (handled in [`07-external-pointers.md`](07-external-pointers.md)); stale → ignore.
7. Never copy a source brain file wholesale into `00-brain/`. The brain holds claims, not source documents.

## Conflict resolution (Red — ask first)

If a source fact contradicts a current brain fact, surface both with timestamps and ask which is current. Default if no answer: keep target as canonical, store source claim in the migration report's "Red Decisions Pending Founder" section.

## Audit entries

For every brain field touched, append to `00-brain/audit/workos-audit.jsonl`:

```json
{"timestamp":"<ISO>","class":"yellow","actor":"migrate-existing-workspace","action":"extract-brain","path_before":"<source rel path>","path_after":"00-brain/<file>.md","reason":"<short>","reversal":"git revert / restore prior version"}
```

## Verification

- Every target brain file modified has a fresh `last_updated`.
- No target field was overwritten without founder approval.
- Conflicts are listed in the report, not silently resolved.
- No source file was copied wholesale.
- Durable source topics with no home in the default stubs were **proposed in the report and created under founder approval** as their own `00-brain/<topic>.md` (registered + linked) — not crammed into a stub, silently created, or dropped. The brain reflects the real breadth of the source, not just the seven defaults.
