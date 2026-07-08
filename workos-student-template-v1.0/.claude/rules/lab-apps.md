---
paths:
  - "90-lab/**"
  - "02-areas/**/apps/**"
  - "03-projects/**/apps/**"
---

# Lab Apps Rule

Lab and app folders are for local dashboards, prototypes, scrapers, automations, and small tools.

## Behavior

- Start new local tools in `90-lab/<app-slug>/` unless they are already clearly owned by an active project.
- Every lab app or promoted app needs `_overview.md` with purpose, owner, status, stack, data sources, secrets/env requirements, run commands, verification, and promotion/archive criteria.
- Keep secrets in `.env` or an external secret manager. Commit `.env.example` only with placeholders.
- Use `data/`, `scripts/`, `src/`, `assets/`, and `exports/` only when the app needs them.
- Verify apps with the strongest practical check available: test, lint, local run, screenshot, sample output, or smoke command.
- Promote durable apps out of `90-lab/` when they have a clear owner, repeated use, and a real business function.

## Promotion Destinations

Start all local tools in `90-lab/<app-slug>/`. Promote durable tools to:

- `02-areas/<area>/apps/<app-slug>/`
- `03-projects/<project>/apps/<app-slug>/`

Promotion is Yellow: do it when obvious, log it, and summarize it.

Durable means the tool has been used more than once, has a clear owner, has a business function, and would be confusing to leave in the lab.

## Ask Before

- Deploying, publishing, pushing, spending money, uploading private files, or writing to external systems.
- Changing production credentials or editing `.env`.
- Moving an app when ownership is strategically ambiguous.

## Do Not

- Leave useful durable tools in `90-lab/` forever.
- Commit secrets, local caches, dependency folders, generated databases, or bulky exports.
- Promote a prototype just because it exists once.
- Bury app run instructions in chat.

## Verification

- `_overview.md` tells a new thread how to run and verify the app.
- `.gitignore` protects local secrets and build artifacts.
- Promotion/archive criteria are explicit.
