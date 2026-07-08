---
paths:
  - ".claude/rules/**"
  - "CLAUDE.md"
  - "AGENTS.md"
---

# Rule Authoring

JIT discipline for working inside `.claude/rules/` and on the constitution (`CLAUDE.md`, and `AGENTS.md` if a compatibility pointer exists). When-to-update triggers and per-edit routing live in [rule-management.md](rule-management.md).

## Slim Global Rules

**First decide whether the rule should be global at all.** If the behavior only applies inside specific folders, skills, or file types, the rule belongs in `.claude/rules/` with `paths` frontmatter — not global. Path-scoped rules load only when matching files are touched and have no line-count target. See [path-specific-rules.md](path-specific-rules.md). The 60-line target below only applies once you've confirmed the rule is genuinely global.

Global rules load on every turn. They are routers, not encyclopedias.

The pattern: **posture + decision triggers + pointer to canonical detail.** The detail lives in the closest home:

- **Path-scoped rules** that load only when relevant files are touched (e.g., `third-party-installs.md` for dependency files, `lab-apps.md` for `90-lab/`).
- **Per-edit authoring rules** for content only relevant at edit time (this file, `skill-authoring.md`, `brain-authoring.md`, `hook-design.md`).
- **Brain files** when the detail is durable business truth (`00-brain/workos-principles.md`, `00-brain/audit/README.md`).
- **Skills** when the detail is a step-by-step procedure.

Promote a rule to global only when:

- The behavior applies to most tasks across the workspace.
- Skipping it on any turn would risk a meaningful mistake.

**Target: every global rule under 60 lines.** When a global rule approaches or passes 60, audit it:

- Move enumerations and decision trees that only matter at edit time into the relevant per-edit authoring rule.
- Move write/maintenance details into a path-scoped rule that loads in the folders where those writes happen.
- Move install-time or boundary discipline into a path-scoped rule that loads on dependency files.
- Move durable business truth into the canonical brain file and link to it.
- Compress prose. Bullets, not paragraphs. One line per rule when possible.

`workos-doctor.py` flags global rules over 60 lines as a soft warning — load-bearing exceptions are allowed but must be justified, not accepted by default.

## Search Before Write

Before creating or editing a rule, search first:

1. Check [`00-brain/canonical-concepts.md`](../../00-brain/canonical-concepts.md) for the concept. If registered, **link** to its canonical home instead of restating.
2. Grep existing rules for behavioral overlap:

```bash
rg -l "<behavior-keyword>" .claude/rules/
rg "<key-phrase>" .claude/rules/ CLAUDE.md
```

If an existing rule covers ≥70% of the behavior, **edit it** instead of creating a new file. Rule sprawl creates contradictions and search overhead.

## Rule Decision Tree

Before creating or editing any rule, decide what kind of instruction it is:

- **Global behavior:** applies across most tasks → update or create a global rule in `.claude/rules/` without `paths` frontmatter.
- **Path-specific behavior:** applies only to certain files/folders → update or create a path-specific rule with `paths` frontmatter.
- **Repeatable workflow:** has steps, inputs, outputs, verification → create or update a skill, not a rule.
- **Business fact or decision:** describes the company, customer, offer, strategy, voice, area, or project → update `00-brain/` or the relevant `_overview.md`, not a rule.
- **External/team SOP:** meant for humans outside this local workspace → store it in the connected external system and link locally.
- **Hard enforcement:** must happen regardless of model behavior → use settings, permissions, hooks, tests, scripts, or CI. Rules are guidance, not enforcement.

When unsure, choose the narrowest durable home. A rule that starts narrow can be promoted later; a bloated global rule pollutes every session.

## WorkOS Scenario Defaults

- **Workspace-wide operating behavior:** global rule. Examples: security, file placement, context routing, rule management, voice.
- **Brain behavior:** path rule for `00-brain/**` only when brain needs editing discipline beyond [atomic truth](../../00-brain/workos-principles.md#3-atomic-truth).
- **Inbox behavior:** usually handled by `process-inbox` skill and `file-placement.md`.
- **Area behavior:** path rule when one ongoing function has durable conventions (e.g., `02-areas/email/**`).
- **Project behavior:** prefer the project `_overview.md`. Path rule only when constraints span many files.
- **Lab/app behavior:** path rule when a class of local apps needs consistent build/security/promotion behavior.
- **External system behavior:** global integration routing in rules; tool procedures in skills; team-visible SOPs in the connected external system.

Autonomous default:

- Green/Yellow non-security rule: create or update the narrowest useful version automatically, log it, summarize.
- Affecting `security.md`, secrets, publishing, sending, deployment, money, customer data, legal/compliance, or a strategic promise: ask first.
- Repeated corrections in one project/area → promote into a path-specific rule.
- Same path-specific rule helping multiple areas → generalize the `paths` patterns, do not duplicate.
- Path-specific rule useful to most future work → promote to global and remove the narrower duplicate.

Concrete examples:

- Repeated email-campaign approval mistakes → path rule with `paths: ["02-areas/email/**", "03-projects/*/email/**"]`.
- One course project has scripting constraints → first update `03-projects/<course>/_overview.md`; path rule only if it affects many files.
- All local dashboards need `.env` handling → path rule for `90-lab/**` and `**/apps/**`.
- Every project needs `_overview.md` handoff discipline → global rule or `new-project` skill, not one rule per project.
- A single customer research doc has caveats → put caveats in the doc or owning project overview.

## Creation Workflow

1. State the behavior in one sentence: "Claude should..."
2. Search existing rules and skills with `rg`. Mandatory.
3. If an existing rule covers ≥70% of the behavior, update that rule.
4. Decide scope with the Rule Decision Tree above.
5. Decide global vs path-specific. If global, apply the Slim Global Rules pattern: keep the file a router.
6. Choose a boring filename: `.claude/rules/<topic>.md`.
7. Write only durable behavior, not background essays.
8. Link canonical context instead of copying facts.
9. Add verification when Claude can check compliance.
10. Check for contradictions against `CLAUDE.md`, other rules, relevant skills, and `_overview.md` files.
11. Run `git diff --check`.
12. Log audit entry.
13. Summarize at the end of the turn — scope and reversal.

## Update Workflow

1. Identify the trigger: repeated correction, vague behavior, contradiction, stale instruction, new CC behavior, changed workspace structure.
2. Open the current rule and related rules/skills.
3. Decide whether the update belongs here, in a narrower path rule, a skill, or a brain/overview file.
4. Make the smallest edit that changes future behavior.
5. Remove or rewrite contradictory wording; don't just append an exception.
6. Keep global rules short. If one grows past its purpose, split path-specific behavior into a `paths` rule or procedural behavior into a skill.
7. Verify with `rg` that no duplicate or conflicting instruction exists elsewhere.
8. Run `git diff --check`.
9. Log audit entry.
10. Summarize — what changed, why, which files, Green/Yellow/Red.

## Required Shape

```md
# <Rule Name>

One short sentence explaining what this rule controls.

## Behavior
- ...

## When To Use
- ...

## Do Not
- ...

## Verification
- ...
```

## Quality Gate

A good rule is behavioral, durable, scoped (global or explicit `paths`), atomic (no duplicated business truth), non-procedural (procedures are skills), verifiable, and non-contradictory against `CLAUDE.md`, other rules, skills, or security guidance.

Bad rule smell:

- Starts with "sometimes."
- Copies a whole SOP.
- Exists because of one annoying moment.
- Contains project status or customer facts.
- Says "be thoughtful" without concrete behavior.
- Adds another exception instead of resolving the actual conflict.

## Split Before Extending

A rule file should encode one behavioral domain. Split when:

- A second behavioral domain starts forming (e.g. security + integrations behavior crammed into one file).
- The file accumulates multiple decision trees that fire on different triggers.
- Line count exceeds **200** OR the file passes **12 `##` sections** — tie-breaker signals.

Extract the secondary domain into a sibling rule (global or path-scoped). Cross-link, don't duplicate. `workos-doctor.py` warns when these thresholds trip.

## Constitution Maintenance

`CLAUDE.md` is the workspace constitution. It governs how the model thinks and operates at the highest level; it does not contain the modular rules themselves.

- Do not create or maintain an `AGENTS.md` twin by default. If another agent runtime requires `AGENTS.md`, create only a tiny compatibility pointer to `CLAUDE.md`.
- The constitution may contain: workspace identity, default operating posture, decision boundaries for asking vs acting, high-level context loading order, tool reflexes, output style, personality pointer, links to canonical rules/skills/brain/integrations.
- The constitution must not contain: detailed file-placement policy, security procedures, rule creation/retirement procedures, multi-step workflows, business facts, project state, or external/team SOPs. Each has a canonical home.

When maintaining the constitution:

- Update `CLAUDE.md` only when the high-level operating contract changes.
- If a requested edit is really a rule, skill, brain fact, project decision, or external SOP, update that canonical home instead.
- If a global rule and the constitution overlap, keep the principle in the constitution and move the actionable behavior into the rule.
- If a compatibility `AGENTS.md` starts duplicating `CLAUDE.md`, reduce it back to a pointer or archive it.

## Do Not

- Duplicate `CLAUDE.md`. The constitution stays high-level.
- Add another exception instead of resolving a contradiction.
- Embed business facts (those belong in `00-brain/` or `_overview.md`).
- Embed strategic decisions (those belong in the owning `_overview.md`).
- Write "sometimes", "be thoughtful", or "consider X" without concrete behavior.

## Verification

- `rg <key-phrase> .claude/rules/` confirms no contradiction.
- For new or restructured global rules: line count under 60, posture-only.
- `git diff --check` passes.
- Audit entry written.
- The rule resolves an actual repeated-correction pattern, not a one-off annoyance.
