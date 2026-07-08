# Rule Management

The system should learn from work without becoming a pile of duplicate skills and contradictory instructions. Update the smallest canonical piece that will improve future runs.

This file is a global router: it covers WHEN to update the system. Step-by-step authoring workflows live in the per-edit rules below.

## When To Update

Update knowledge, rules, or skills when:

- The founder repeats the same correction.
- A workflow repeats three times.
- The founder says a task will recur, should happen "next time", "from now on", or "always".
- The founder gives feedback on a skill output that would improve future runs.
- A file-placement mistake recurs.
- A rule is too vague to produce consistent behavior.
- A piece of knowledge has become canonical.
- A skill is doing too much and should be split.
- Multiple skills copy context that should live in `00-brain/`.
- A lab workflow has become durable enough to become an area/project app.

## How To Update

- Preserve [atomic truth](../../00-brain/workos-principles.md#3-atomic-truth): one canonical home per fact. Registry: [`canonical-concepts.md`](../../00-brain/canonical-concepts.md).
- Prefer updating an existing rule or skill over creating a new one.
- Link to canonical context instead of copying it.
- Record meaningful updates in `00-brain/audit/workos-audit.jsonl`.
- Summarize Yellow changes at the end of the turn.

## Per-Edit Authoring Rules

| Editing | Loads | Covers |
|---|---|---|
| `.claude/rules/**`, `CLAUDE.md` | [rule-authoring.md](rule-authoring.md) | Decision tree, quality gate, slim-global-rules principle, constitution maintenance |
| `.claude/skills/**` | [skill-authoring.md](skill-authoring.md) | Skill creation/update workflow, required shape, composition |
| `00-brain/**` | [brain-authoring.md](brain-authoring.md) | Canonical truth editing |
| `.claude/scripts/**`, `.claude/settings.json` | [hook-design.md](hook-design.md) | Hook three-bucket pattern |
| Claude auto-memory (via `workos-reflect` / `consolidate-memory`) | [memory-authoring.md](memory-authoring.md) | What to write to memory, atomicity, dedup, declarative-not-imperative |

Each authoring rule starts with **search-before-write** — search canonical sources for the concept; edit the existing home if found, only create new when no current home claims the concept.

## Self-Improvement Guardrails

- **Green:** fix descriptions, broken links, obvious stale references, repeated wording drift.
- **Yellow:** improve an existing skill or non-security rule when the repeated pattern is clear; create a small skill when an explicit recurring workflow has no current owner.
- **Red:** ask before changing `security.md`, deleting anything, publishing, or introducing external dependencies.
- Major rule/skill rewrites require before/after summary, audit entry, and verification.

## Retiring System Pieces

Archive obsolete rules, skills, and docs to `99-archive/` with the original path preserved. Do not delete.
