---
project: Example Launch — Free Lead Magnet
status: example
owner: founder
container_type: project
primary_area: 02-areas/example-newsletter/_overview.md
related_areas:
  - 02-areas/example-newsletter/_overview.md
claude_role: act as the operator for a time-bound launch project. Pull voice/audience from `00-brain/`, draft pages and emails to `drafts/`, track decisions and risks in this file, and stop at any Red action (publishing, sending, ad spend) for approval. Do not treat this example as live work — it exists as a teaching template.
last_updated: 2026-05-25
---

# Example Launch — Free Lead Magnet

> **This is an example project.** Do not treat it as real work. It exists so a student can see what a properly scoped project folder looks like before creating one of their own. Replace or archive once the student has a real project running.

## Purpose

Ship a free lead magnet (PDF guide, mini-course, template — pick one) to grow the email list, in 14 calendar days. The lead magnet itself is the example; what matters is the *shape* of a project that lives here: clear outcome, deadline, success criteria, decisions, artifacts, archive criteria.

## Outcome (Definition of Done)

A free resource published behind an email opt-in, with:

- Landing page live and capturing emails.
- Confirmation email + 3-email welcome sequence drafted, reviewed, and scheduled.
- One announcement going out to the existing list.
- 100 opt-ins or 14 days, whichever comes first.

## Success Criteria

- 100+ new opt-ins in 14 days, **or** clear evidence (CTR, conversion rate) that the funnel itself works and only the traffic source needs fixing.
- Welcome sequence open rate above 40% on email 1.
- No customer complaints about the form, the file, or the emails.

## Load First

Before doing any work in this project, read:

1. `00-brain/customers.md` — who this lead magnet is for. If it's not crystal clear, the magnet won't convert.
2. `00-brain/brand-voice.md` — how every word should sound.
3. `00-brain/offers.md` — what we ultimately sell, so the lead magnet leads somewhere honest.
4. `00-brain/current-state.md` — is this project still the priority?

## Active Decisions

- **Format of the magnet:** PDF guide, mini-course, or template? Decide before drafting anything.
- **Landing-page platform:** existing site, ConvertKit/Bento landing, or one-off page? Affects how Claude can help with the wiring.
- **Send-from address and reply handling:** who owns inbox replies during the 14 days?

## Risks / Gotchas

- Lead magnets attract subscribers who never buy. Decide what counts as a *good* opt-in before measuring success.
- Welcome sequence emails are customer-facing — every send is a Red action. Stage drafts in `drafts/`, never send from this project autonomously.
- Don't ship the magnet without proofreading. Claude can draft; a human verifies before publish.

## Artifacts

Created in this project (use these as subfolders when files start to exist):

- `drafts/` — landing page copy, emails, the magnet itself.
- `assets/` — images, graphics, the final PDF.
- `research/` — competitor magnets, audience evidence, format references.
- `final/` — the shipped versions for archive.

## Related Area

When this project ships, the welcome sequence becomes ongoing — promote that piece into `02-areas/email/` (or whatever the student names the email area).

## Next Action

Pick the magnet format (single decision, ~30 min).

## Next Decision

Magnet format + landing-page platform. Both block drafting.

## Housekeeping

- All durable voice / customer / offer learnings get promoted to `00-brain/`, not stored here.
- Drafts that get superseded move to `99-archive/` or get deleted from `drafts/` after the final ships.
- Status updates and team-visible decisions live in whatever PM tool the team uses (Notion, Linear, etc.) — not in this file.

## Archive Criteria

Move to `99-archive/03-projects/example-launch/` when any of these is true:

- The launch shipped (success or failure) and final assets are in `final/`.
- The student decided not to do this launch (write a one-line reason here first).
- The student replaced this example with a real project — archive immediately.

## Note for Claude

If asked to "do work on this project," confirm with the founder that this is intended as a real launch (not just inspecting the example). If unclear, *ask*. Don't draft real customer-facing copy against an example project unless explicitly told it's now real.
