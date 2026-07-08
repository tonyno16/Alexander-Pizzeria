# Canonical Concepts

last_updated: 2026-06-27

The flat index of named concepts, principles, thresholds, and shared definitions used across this WorkOS — and the **one canonical home** for each. When you encounter any of these concepts in a rule, skill, brain file, or doc, **link to the canonical home** instead of restating.

Use this file as the first stop before writing or editing anything that touches a shared concept. Search it (`rg <concept-name> 00-brain/canonical-concepts.md`) before adding content.

When you discover a concept that's used in multiple places but isn't registered here, **register it** — pick the canonical home, link the others.

## Principles

| Concept | Canonical home |
|---|---|
| Atomic truth | [`workos-principles.md` § Atomic Truth](workos-principles.md#3-atomic-truth) |
| Identity layer first | [`workos-principles.md` § Identity Layer First](workos-principles.md#1-identity-layer-first) |
| Folders route context | [`workos-principles.md` § Folders Route Context](workos-principles.md#2-folders-route-context) |
| Store / Inject / Recall (memory model) | [`workos-principles.md` § Store, Inject, Recall](workos-principles.md#4-store-inject-recall) |
| Memory authoring (write discipline) | [`.claude/rules/memory-authoring.md`](../.claude/rules/memory-authoring.md) |
| Memory consolidation (gardening) | [`.claude/skills/consolidate-memory/SKILL.md`](../.claude/skills/consolidate-memory/SKILL.md) |
| Skills are components | [`workos-principles.md` § Skills Are Components](workos-principles.md#5-skills-are-components) |
| Archive is a rollback buffer | [`workos-principles.md` § Archive Is A Rollback Buffer](workos-principles.md#10-archive-is-a-rollback-buffer) |
| Generic template must become business-specific fast | [`workos-principles.md` § Generic Templates Must Become Business-Specific Fast](workos-principles.md#12-generic-templates-must-become-business-specific-fast) |
| Alfred posture (operating mode) | [`.claude/rules/core.md` § Alfred Posture](../.claude/rules/core.md#alfred-posture) |
| Assistant chat voice | [`.claude/rules/voice.md`](../.claude/rules/voice.md) — auto-loads; alternates in [`.claude/voices/`](../.claude/voices/). Distinct from business writing voice ([`brand-voice.md`](brand-voice.md)). |
| Inbox flat-drop principle | [`.claude/rules/file-placement.md` § Inbox](../.claude/rules/file-placement.md#inbox) |
| Source priority (context loading order) | [`.claude/rules/context-routing.md` § Source Priority](../.claude/rules/context-routing.md#source-priority) |

## Classifications

| Concept | Canonical home |
|---|---|
| Green / Yellow / Red action classification | [`.claude/rules/core.md` § Reversibility Classes](../.claude/rules/core.md#reversibility-classes) |
| Red actions list | [`.claude/rules/security.md` § Red Actions](../.claude/rules/security.md#red-actions) |
| Rule Decision Tree (rule vs skill vs brain vs SOP) | [`.claude/rules/rule-authoring.md` § Rule Decision Tree](../.claude/rules/rule-authoring.md#rule-decision-tree) |
| Three-bucket hook output pattern (block / nudge / silent) | [`.claude/rules/hook-design.md` § Three-bucket output pattern](../.claude/rules/hook-design.md#three-bucket-output-pattern) |

## Workflows

| Concept | Canonical home |
|---|---|
| Skill creation/update workflow | [`.claude/rules/skill-authoring.md` § Workflow](../.claude/rules/skill-authoring.md#workflow) |
| Rule creation workflow | [`.claude/rules/rule-authoring.md` § Creation Workflow](../.claude/rules/rule-authoring.md#creation-workflow) |
| Rule update workflow | [`.claude/rules/rule-authoring.md` § Update Workflow](../.claude/rules/rule-authoring.md#update-workflow) |
| Brain editing workflow | [`.claude/rules/brain-authoring.md` § Workflow](../.claude/rules/brain-authoring.md#workflow) |
| Proposing new brain files (brain is extensible) | [`.claude/rules/brain-authoring.md` § Proposing New Files](../.claude/rules/brain-authoring.md#proposing-new-files) |
| Search-before-write discipline | [`.claude/rules/skill-authoring.md` § Search Before Write](../.claude/rules/skill-authoring.md#search-before-write) (mirrored in each authoring rule) |

## Shapes

| Concept | Canonical home |
|---|---|
| Required rule shape | [`.claude/rules/rule-authoring.md` § Required Shape](../.claude/rules/rule-authoring.md#required-shape) |
| `_overview.md` required fields | [`.claude/rules/file-placement.md` § Overview Files](../.claude/rules/file-placement.md#overview-files) (checked at warning level by [`workos-doctor.py`](../.claude/scripts/workos-doctor.py) `OVERVIEW_REQUIRED`; a *missing* `_overview.md` blocks, a malformed one warns) |
| Audit log entry shape | [`00-brain/audit/README.md`](audit/README.md) |
| WorkOS top-level folder list | [`.claude/rules/file-placement.md` § Top-Level Folders](../.claude/rules/file-placement.md#top-level-folders) |
| Work map | [`.claude/skills/work-map/SKILL.md`](../.claude/skills/work-map/SKILL.md) |
| Area type | [`glossary.md` § Function Area](glossary.md#function-area), [`glossary.md` § Client Area](glossary.md#client-area), [`glossary.md` § Venture Area](glossary.md#venture-area) |
| Primary area | [`glossary.md` § Primary Area](glossary.md#primary-area) |
| Related areas | [`glossary.md` § Related Areas](glossary.md#related-areas) |

## Thresholds (shared numeric values)

| Concept | Canonical home | Current value |
|---|---|---|
| Skill ownership threshold (when to update existing vs create new) | [`.claude/rules/skill-authoring.md` § Search Before Write](../.claude/rules/skill-authoring.md#search-before-write) | ≥50% |
| Rule ownership threshold | [`.claude/rules/rule-authoring.md` § Search Before Write](../.claude/rules/rule-authoring.md#search-before-write) | ≥70% |
| `_overview.md` staleness (block, edited overview) | [`.claude/scripts/end-of-turn-maintenance.py` `OVERVIEW_STALE_DAYS`](../.claude/scripts/end-of-turn-maintenance.py) | 3 days |
| `_overview.md` staleness (doctor warn) | [`.claude/scripts/workos-doctor.py` `STALE_DAYS`](../.claude/scripts/workos-doctor.py) | 14 days |
| Brain file `last_updated` (presence; freshness only enforced on current-state.md) | [`.claude/scripts/workos-doctor.py` `check_brain_metadata`](../.claude/scripts/workos-doctor.py) | required |
| `current-state.md` staleness (error) | [`.claude/scripts/workos-doctor.py` `check_current_state`](../.claude/scripts/workos-doctor.py) | 30 days |

## Business facts (Alexander)

| Concept | Canonical home |
|---|---|
| Identità e posizionamento gruppo | [`business-profile.md`](business-profile.md) |
| Dossier operativo per sede (4 locali) | [`locations.md`](locations.md) |
| Prodotti, menu, prezzi, birre | [`offers.md`](offers.md) |
| Segmenti e linguaggio clienti | [`customers.md`](customers.md) |
| Voce esterna e regole terminologia | [`brand-voice.md`](brand-voice.md) |
| Termini Alexander (Stile Alexander, AIC, ecc.) | [`glossary.md`](glossary.md) |
| Comunicazione interna team (Slack: workspace, canali, flusso) | [`integrations/slack.md`](integrations/slack.md) |

## How to add a concept

1. Pick the canonical home (one file, one heading).
2. Make sure that file has a clear heading for the concept (the slugified heading becomes the anchor URL).
3. Add a row to the appropriate table above.
4. Update other files that touch the concept to link to the canonical home instead of restating.

When the value of a threshold changes: update the canonical home, update the "Current value" column above, and run the doctor — it cross-checks restatements.
