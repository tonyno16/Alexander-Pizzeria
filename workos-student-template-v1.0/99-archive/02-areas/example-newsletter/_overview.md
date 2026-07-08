# Example Newsletter

status: example
owner: founder
container_type: area
area_type: function
claude_role: act as a practical newsletter operator who turns raw notes into useful issues and keeps the area clean.
last_updated: 2026-05-24

## Purpose

Run a simple weekly newsletter workflow without scattering notes, drafts, and links across the workspace.

This area also exists as a worked example of *the connected workspace*: Claude doesn't draft from nothing. It pulls voice, audience, and offer truth from `00-brain/`, runs the issue through a repeatable workflow, and writes the draft to a predictable location. Read the draft (`drafts/2026-05-example-issue.md`) and notice the references back to brain files — that wiring is the whole point.

## Load First

Before drafting *anything* in this area, load these in order:

1. `00-brain/brand-voice.md` — how the business sounds. The draft must match this voice; if it doesn't, the brain file is wrong or the draft is wrong. Fix one.
2. `00-brain/customers.md` — who's reading. Frame everything for this audience, not a generic reader.
3. `00-brain/offers.md` — what's being sold and what's not. Don't pitch something that isn't offered.
4. `research/example-context.md` — the running promise of *this* newsletter (one workflow, one note, one warning).

If any of those files are empty placeholders, fill them via `/setup-workos` *before* drafting. A newsletter written without a filled brain reads like every other AI-written newsletter.

## Workflow

The repeatable draft loop, by hand:

1. Read the four `Load First` files.
2. Ask Claude to draft a single issue around one workflow / one note / one warning.
3. Compare draft to `00-brain/brand-voice.md`. Where it drifts, fix the draft *and* note the gap so the brain file gets sharpened on the next pass.
4. Save the draft as `drafts/YYYY-MM-issue-slug.md`.
5. When the workflow becomes repetitive, turn it into a skill with `skill-creator`. This area is where the *first* draft of that skill lives.

## Active Work

- Draft the May 2026 example issue in `drafts/2026-05-example-issue.md`.

## Related Projects

- [`03-projects/example-launch/_overview.md`](../../03-projects/example-launch/_overview.md) — example finish-line launch that touches this area.

## Decisions

- This area is an example of an ongoing business function, not a required newsletter setup for every user.
- Drafts read from `00-brain/` rather than re-stating voice/audience inline. If a fact about the audience belongs everywhere, it belongs in `customers.md`, not duplicated in every draft.

## Next Action

- Replace this example with the user's real first area during setup.

## Next Decision

- Decide whether newsletter is a real ongoing area for the user's business.

## Housekeeping

Archive old drafts after final copy is published. Keep durable audience or voice learnings in `00-brain/`, not in this example folder.

## Archive Criteria

Archive or delete this example area after the user creates real areas, unless it is being used as teaching material.
