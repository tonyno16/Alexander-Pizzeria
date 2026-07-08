---
paths:
  - ".claude/skills/**"
---

# Skill Authoring

JIT discipline for working inside `.claude/skills/`. Decision tree and policy: [rule-management.md](rule-management.md).

## Search Before Write

Before creating or editing a skill, search first:

1. Check [`00-brain/canonical-concepts.md`](../../00-brain/canonical-concepts.md) for the workflow concept. If registered, **link** to the canonical home rather than re-encoding.
2. Grep existing skills:

```bash
rg -l "<workflow-keyword>" .claude/skills/
rg "name:" .claude/skills/*/SKILL.md
```

If an existing skill owns ≥50% of the workflow, **edit it** instead of creating a sibling. Only create new when no current skill has clear ownership. Skill sprawl is workspace debt.

## Workflow

1. Decide whether the behavior is a skill, rule, brain update, or project note. See the Rule Decision Tree in [rule-authoring.md](rule-authoring.md#rule-decision-tree).
2. Search existing skills with `rg`. Mandatory.
3. Prefer updating, splitting, or adding a reference to an existing skill over creating a new one.
4. Create new only when no existing skill has a clear ownership claim.
5. Use [`.claude/skills/skill-creator/SKILL.md`](../skills/skill-creator/SKILL.md) as the authoring and evaluation guide.
6. Keep `SKILL.md` lean. Put schemas, deep tool docs, worked examples in `references/`.
7. Description must trigger on real prompts (what the founder would actually say), not on the literal word "skill".
8. Substantial skills include: Canonical Inputs, Workflow, Outputs, Verification, Housekeeping, and Red-gate sections.
9. Add scripts only when repeatability, fragility, or deterministic behavior justifies them.
10. Verify with `git diff`, file reads, and a realistic test prompt. For major changes, use a `skill-creator` eval pass.
11. Log audit entry to `00-brain/audit/workos-audit.jsonl`.
12. Summarize what future behavior changed and why.

## Autonomous Default

- Local, reversible, non-security improvement based on explicit feedback or obvious repeated workflow → do automatically.
- Customer-facing promises, publishing/sending/deployment, security posture, money, external writes, or strategic positioning → ask first.
- Plausible-but-unproven pattern → note in the relevant `_overview.md` or improvement inventory; do not create a premature skill.
- Founder says "next time" / "from now on" / "always" / "again" or critiques a skill output → treat as sufficient evidence to update unless Red.

## Versioned Forks

Do not encode a model version, image backend, or distribution state in a skill's name (e.g. `-v2`, `-gpt`, `-fast`, `-student`). A skill is one workflow; a model or backend change is a variation of it, not a new skill.

- Model/backend variation → a `version:` frontmatter bump, or a parameter the workflow branches on.
- When a fork genuinely supersedes its sibling, archive the old one to `99-archive/` rather than leaving both live to mis-trigger against each other.
- If two skills share ≥50% of their workflow and differ only by model/backend, they are one skill with a parameter — consolidate per Search Before Write.

Sibling forks multiply the skill count and the mis-trigger surface every model release. One workflow, one skill.

## Do Not

- Create a sibling skill when an existing one owns the workflow.
- Copy business context into the skill — link to `00-brain/` instead.
- Embed real secrets, customer data, or private credentials.
- Make the description vague.
- Build a mega-skill that spans many concerns. Split into orchestrator + components.

## Verification

- `rg "^name:" .claude/skills/*/SKILL.md` confirms unique name.
- `git diff` shows only intended changes.
- Description re-evaluated for triggering accuracy if changed.
- Audit entry written.
