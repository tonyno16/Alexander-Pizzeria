# 02 · Business Identity

**Goal:** Fill `00-brain/business-profile.md` with the canonical answer to *what is this business and who is it for*.

**Brain file:** `00-brain/business-profile.md`

## Pre-check

Read `00-brain/business-profile.md` first. If mining already populated it, **confirm** with the founder rather than re-asking:

> "Brain says the business is **<extracted name>**, an <extracted positioning>. Still accurate? Anything to add or correct?"

If it's filled and the founder confirms → mark task complete and move on.

## Questions (only if empty or stale)

Ask **2–3 focused questions**, not the whole list at once. Pick the ones that will most change how Claude operates.

Core (always ask if empty):

1. **What does the business do?** One sentence. ("Authority Hacker runs an invite-only AI accelerator for established business owners.")
2. **Who is it for?** ("Founders running $1M+ online businesses who want to use AI without becoming hype-bro consultants.")
3. **What's the positioning vs. competitors?** ("No-hype AI — practical workflows that actually save time, not theatre.")

Optional (only if relevant):

- Business model (membership, services, product, ads, mix).
- Scale (rough revenue band, team size).
- Founding context (when started, why).
- Key products / services.

## Writing the brain file

Replace placeholders in `00-brain/business-profile.md`. Required sections:

- `## Identity` — one paragraph: what we do, for whom, what's different.
- `## Audience` — who we serve (one line per segment).
- `## Business Model` — how revenue happens (membership, services, etc).
- `## Products` — short list of canonical offers (full detail goes in `00-brain/offers.md`).
- `## Positioning` — what we stand for, what we reject.

Voice: terse, no corporate filler. The brain file should sound like the founder, not a press release.

Update `last_updated:` to today's date.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"fill-brain","path_before":"00-brain/business-profile.md","path_after":"00-brain/business-profile.md","reason":"populated from interview / confirmed from mining","reversal":"git revert <file>"}
```

## Verification

- `00-brain/business-profile.md` answers: what, for whom, why us.
- The file would NOT describe a generic business — it's specific to this founder's business.
- No conflict with existing target brain fields (if conflict found, escalated to founder).
- `last_updated` is today's date.
