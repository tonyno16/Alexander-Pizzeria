# WorkOS Improvement Inventory

last_updated: 2026-05-25

This file tracks the sections that must remain deep enough to carry the philosophy of the workspace.

## Audit Sections

1. `CLAUDE.md`
   - Must act as the workspace constitution.
   - Must stay short but opinionated.
   - Must point to rules and brain files.
   - Must encode [Alfred posture](../.claude/rules/core.md#alfred-posture), [atomic truth](workos-principles.md#3-atomic-truth), and housekeeping.

2. Rules
   - `core.md`: autonomy, work loop, output standard, human-in-loop.
   - `context-routing.md`: just-in-time loading, store/inject/recall, canonical [source priority](../.claude/rules/context-routing.md#source-priority).
   - `file-placement.md`: six-folder routing, area vs project, lab promotion, archive.
   - `rule-management.md`: skill systems, self-improvement, atomic rule updates.
   - `security.md`: secrets, external systems, Red actions, git safety.

3. Skills
   - Each skill needs trigger, canonical inputs, workflow, outputs, housekeeping, audit behavior, and Red gates.
   - Skills should operationalize the philosophy, not merely list steps.

4. Brain
   - Canonical business truth belongs here.
   - Templates should ask for enough context to produce better-than-generic outputs.
   - `current-state.md` must be refreshed when priorities shift.

5. Audit Log
   - Every meaningful Green/Yellow housekeeping action should be logged.
   - Red actions should be noted when blocked or awaiting approval.

6. Student Safety
   - Autonomy should be useful but reversible.
   - Secrets stay out of git and out of generated text.

7. Simon/Hermes Principles
   - Identity layer.
   - Modular skill systems.
   - Store/inject/recall.
   - Right context at the right time.
   - Avoid self-validation and silent overwrites.
   - Human review for meaningful external outcomes.

## Current Audit Result

Initial scaffold was structurally correct but too shallow. Rules and skills needed deeper workflows, audit behavior, context-loading logic, and explicit Simon/Hermes principles.

## Audit Checklist

| Section | Current Evidence | Missing Depth | Next Fix |
|---|---|---|---|
| `CLAUDE.md` | Acts as constitution and points to rules and brain | Must stay lean while preserving philosophy | Check after each rule/skill change |
| Rules | Five rule files exist | Must stay concrete, not slogans | Audit Green/Yellow/Red examples and context maps |
| Skills | Five foundation skills exist | Must include inputs, workflow, outputs, handoffs, checkpoints, audit, quality gates | Review each skill after real use |
| Brain | Canonical files exist | Must contain real business-specific facts and examples | Fill during `/setup-workos` |
| Audit | JSONL file and README exist | Must record reversibility, not performative bureaucracy | Check after every cleanup/system change |
| Security | `.env`, `.gitignore`, security rule exist | Must catch prompt injection, third-party packages, uploads, git risks | Review before external integrations |
