# Vendored: skill-creator

This skill is **vendored from Anthropic** — do not edit it in place. When refreshing, re-vendor from upstream so the WorkOS template stays current with Anthropic's official skill-authoring workflow.

## Source

- **Publisher:** Anthropic, PBC
- **License:** Apache 2.0 (see `LICENSE.txt`)
- **Upstream:** Distributed with Claude Code / Claude.ai. The public `anthropics/skills` repository does not currently carry `skill-creator` — it ships through the Claude Code distribution channel.
- **Last pulled into this template:** 2026-05-25

## Why it's here

The Claude WorkOS template treats Anthropic's `skill-creator` as the authoring tool for new and existing skills. The WorkOS rule [`skill-authoring.md`](../../rules/skill-authoring.md) extends this skill with workspace-specific discipline (search-before-write, audit logging, IWOHA section convention) without overriding the core workflow.

## How to refresh

1. Re-export the current Anthropic skill-creator skill from Claude Code (or wherever it ships).
2. Replace the contents of this directory **except** `VENDORED.md`.
3. Update the "Last pulled" date above.
4. Verify nothing in `.claude/rules/skill-authoring.md` references behavior that no longer exists upstream.

## Do not

- Edit `SKILL.md`, scripts, agents, or references in place.
- Add WorkOS-specific behavior here. Put workspace overlays in [`.claude/rules/skill-authoring.md`](../../rules/skill-authoring.md) instead.
- Remove `LICENSE.txt`.
