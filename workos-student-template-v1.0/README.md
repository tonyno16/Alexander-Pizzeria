# Claude WorkOS v0.1

A Claude Code workspace for running a business with durable context, modular skills, automatic housekeeping, and single-source-of-truth knowledge.

This template teaches an operating philosophy:

- Folders route context.
- The brain stores canonical business truth.
- Skills turn recurring work into reusable components.
- Skill systems chain components into business outcomes.
- Memory stores recurring preferences and lessons.
- Housekeeping happens automatically when reversible.
- The founder only gets interrupted for real decisions.

## What This Is Not

- Not a tidy folder template.
- Not a prompt pack.
- Not a generic Claude setup.
- Not a local duplicate of Notion or Google Docs.
- Not a magic wrapper with hidden assumptions.

## Operating Loop

1. Load identity and current state.
2. Route the task to the right folder and skill.
3. Execute the smallest reversible useful step.
4. Verify the result.
5. Housekeep files, links, and canonical facts.
6. Log meaningful Green/Yellow actions.
7. Improve a rule or skill when a pattern repeats.
8. Ask only for Red decisions.

## Work Map

The workspace stays flat on purpose. Areas own ongoing context; projects own
finish-line work; labs hold experiments. `setup-workos` chooses the smallest
useful starting map for the business: function areas for most single-business
users, client areas for broad agency/client work, and venture areas for
multi-brand operators.

Projects link back to their owning area with `primary_area` frontmatter.
Generated work-map views show everything active without forcing Claude to
hand-update backlink tables after every turn.

## First Run

1. Open this folder in Claude Code.
2. Read `GETTING-STARTED.md`.
3. Run `/setup-workos`.
4. Fill the business brain in `00-brain/`.
5. Drop unsorted files into `01-inbox/`.
6. Use `/new-area`, `/new-project`, and `/cleanup-workos` as the business grows.

## The Rule

Claude should act automatically when work is reversible, logged, and in service of the business. Claude asks before secrets, deletion, external writes, publishing, payments, deployment, or irreversible choices.

## Key Files

- `CLAUDE.md`: workspace constitution and root operating posture.
- `GETTING-STARTED.md`: first 15 minutes and a tiny worked example.
- `.claude/rules/`: global behavior.
- `.claude/skills/`: reusable workflows.
- `.claude/skills/skill-creator/`: official Anthropic skill for creating, updating, and evaluating skills.
- `.claude/scripts/prompt-repeatability-nudge.py`: UserPromptSubmit hook that nudges skill updates for repeatable work.
- `.claude/scripts/compact-continuity.py`: SessionStart compact hook that restores WorkOS continuity after compaction.
- `.claude/scripts/workos-skill-tools.py`: mechanical helper CLI used by foundation skills for setup, creation, inbox, cleanup, and migration plans.
- `.claude/scripts/workos-doctor.py`: read-only workspace health scanner.
- `.claude/skills/work-map/`: generated overview of active areas, projects, and lab work.
- `00-brain/workos-principles.md`: the philosophy behind the system.
- `00-brain/audit/README.md`: local audit log contract.
- `01-inbox/`: temporary drop zone.
- `90-lab/`: experiments and local dashboards.

## Secret Management

- Put real secrets in `.env`.
- Keep placeholders in `.env.example`.
- `.env` is ignored by git.
- Never paste secrets into rules, skills, brain files, or audit logs.

## Troubleshooting

- Generic outputs usually mean `00-brain/` is too thin.
- Conflicting answers usually mean duplicate truth exists.
- Messy folders usually mean `01-inbox/` or `90-lab/` has not been processed.
- Run `python3 .claude/scripts/workos-doctor.py` when the workspace feels messy or before a cleanup pass.
- Too many questions usually mean Red/Yellow/Green needs sharpening.
- Skill sprawl usually means a workflow should be an orchestrator plus smaller components.
