# Getting Started

This workspace turns Claude Code into a small business operating system. It gives Claude a brain, a filing system, repeatable skills, and rules for when to act automatically versus when to ask.

Start small. Do not try to fill every folder on day one.

## First 15 Minutes

1. Open this folder in Claude Code desktop.
2. Ask Claude: `Run setup-workos for my business.`
3. Answer the core questions:
   - What does the business sell?
   - Who is the customer?
   - Are you operating one business, multiple brands/ventures, client work, or are you unsure?
   - What are the active priorities this week?
   - What external systems are canonical?
   - What should Claude ask before doing?
4. Open `00-brain/` and check that the answers landed in the right canonical files.
5. Ask Claude to summarize what it can now do automatically and what still needs your approval.

## Your First Area

An area is an ongoing business function: email, sales, support, content, operations, product, finance, community.

Ask Claude:

```text
Create a new area for email marketing. Use new-area. Keep it simple.
```

Claude should create:

```text
02-areas/email-marketing/_overview.md
```

That overview is the entrypoint for future email work. It should include purpose, owner, status, `claude_role`, canonical links, active work, and housekeeping notes.

If you run client work or multiple ventures, setup may suggest a client or
venture area instead:

```text
Create an area for ACME as a client account. Use new-area.
```

That still lives under `02-areas/`. Do not create a separate nested workspace
unless there is a real security, repo, or tooling boundary.

## Your First Project

A project has a finish line: launch a campaign, rebuild onboarding, migrate a tool, publish a course, build a dashboard.

Ask Claude:

```text
Create a project for launching our June newsletter sponsorship offer. Use new-project.
```

Claude should create:

```text
03-projects/2026-06-newsletter-sponsorship/_overview.md
```

The project overview should tell a future Claude thread what to load first, what success means, and when to archive the project.

Every active project should link to the area accountable for it. Claude will
usually infer that from the prompt. If several areas could own it, Claude should
ask once rather than create a floating project.

## Your Work Map

Ask Claude:

```text
Show me my work map.
```

The `work-map` skill generates the current view from area, project, and lab
overviews. It is a view, not another place to maintain truth by hand.

## Where Things Go

- Raw input: `01-inbox/`
- Ongoing function: `02-areas/`
- Time-bound outcome: `03-projects/`
- Prototype dashboard or app: `90-lab/`
- Old or processed work: `99-archive/`
- Durable business truth: `00-brain/`

When unsure, put the file in `01-inbox/` and ask Claude to run `process-inbox`.

## What Success Looks Like On Day 7

- `00-brain/current-state.md` says what matters this week.
- You have 2-5 real areas.
- You have 1-3 active projects.
- `01-inbox/` is mostly empty.
- Claude knows where to file work without asking every time.
- Claude archives stale scratch instead of leaving clutter behind.
- Your best repeated workflow is becoming a skill.

## Use The Example

See `02-areas/example-newsletter/` for a tiny worked example. Copy the pattern, then delete the example when your own areas make sense.

## If Stuck

Ask Claude:

```text
Run cleanup-workos and tell me the next three fixes that would make this workspace easier to use.
```

If Claude asks too many questions, tell it:

```text
Make the reversible decisions yourself, log them, and only ask me about Red actions.
```
