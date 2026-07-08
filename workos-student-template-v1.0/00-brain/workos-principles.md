# WorkOS Principles

last_updated: 2026-05-24

This file is the canonical philosophy for the workspace. Rules and skills should point here instead of restating these principles.

## 1. Identity Layer First

Claude needs to know the business, the founder, the customer, the offer, the voice, and the current priorities before it can produce non-generic work.

Canonical identity files:

- `business-profile.md`
- `brand-voice.md`
- `customers.md`
- `offers.md`
- `current-state.md`

## 2. Folders Route Context

The folder structure tells Claude what context to load. Areas, projects, lab apps, and archive items should each have an `_overview.md` so Claude can orient quickly without reading everything.

## 3. Atomic Truth

Every fact has one canonical home. Other files link to it. When duplication appears, consolidate it into the canonical source and replace duplicates with pointers.

## 4. Store, Inject, Recall

Memory has three jobs:

- Store: save durable facts, preferences, and decisions in the right place.
- Inject: load only the context needed for the current task.
- Recall: find older decisions by checking loaded context first, then canonical files, then broader search.

Do not solve memory by dumping more text into every session.

## 5. Skills Are Components

A skill should do a reusable job. A skill system chains multiple components into a business outcome. Avoid both extremes: isolated one-off skills that require manual glue, and giant skills that hide all logic in one file.

## 5b. Skills Are Refined Through Use, Not File Edits

A skill is a living contract, not a frozen file. The founder refines a skill by running it, noticing what's off, and telling Claude in plain English what to change. Claude edits SKILL.md, reads the change back, and the next run is sharper. The founder rarely opens the file directly.

This is the operating loop:

1. Run the skill on real work.
2. Spot something off — wrong tone, missed step, edge case.
3. Tell Claude in plain English: "the LinkedIn version got too formal," "the skill missed the customer-quote section."
4. Claude updates SKILL.md and shows you the diff.
5. Re-run. Better.

A skill that never gets refined after creation is either trivial or stale. Plan for refinement from the moment a skill is born.

## 6. Human In The Loop Where It Counts

Claude should do the heavy lifting, but humans approve customer-facing, external, paid, strategic, or irreversible outcomes.

## 7. Housekeeping Is Part Of The Work

Every task should leave the workspace cleaner. Misfiled files, stale scratch, duplicate truth, broken links, and repeated workflow friction are not separate chores. They are part of the operating loop.

## 8. Build What You Understand

Do not blindly inherit assumptions from off-the-shelf systems. Keep rules, skills, memory, and folder structure readable so the founder can inspect and change the system.

## 9. Desktop And Multi-Threading Change The Workflow

Claude Code's desktop UI and sidebar make it natural to run multiple threads against the same business OS. The workspace should support that by keeping context explicit in files, not trapped in one chat.

## 10. Archive Is A Rollback Buffer

Archive rather than delete. Preserve original paths where possible. The archive exists so autonomy can be useful without becoming dangerous.

## 11. Self-Improvement Needs External Review

The system may improve skills and rules, but broad behavior changes need evidence. Use diffs, audit logs, validation checks, and human review for taste, strategy, or customer-facing quality.

Do not let the model silently rewrite a skill and grade itself as correct.

## 12. Generic Templates Must Become Business-Specific Fast

The starter files are scaffolding. A useful WorkOS quickly becomes specific: real voice examples, real customer language, real offer constraints, real proof, real active projects, and real operating preferences.

Principles should be tested against behavior, not vibes. If Claude still produces generic work, the brain, rules, or skills are not specific enough.

## 13. Complexity Is Earned

Start with the smallest useful [work map](../.claude/skills/work-map/SKILL.md). Most single-business users need a few
function areas and linked projects. Client or venture areas are useful only when
real work needs that context boundary. Reconfigure the map when the business
changes; do not pre-build taxonomy for imaginary scale.
