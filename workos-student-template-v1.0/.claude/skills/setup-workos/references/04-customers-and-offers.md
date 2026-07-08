# 04 · Customers & Offers

**Goal:** Fill `00-brain/customers.md` and `00-brain/offers.md` so Claude can write copy, plan content, qualify leads, and brief workflows without re-asking who we serve and what we sell.

**Brain files:** `00-brain/customers.md`, `00-brain/offers.md`

## Pre-check

Read both files. If mining populated them (this is common — customer research and product info often live in old workspaces), confirm with a summary:

> "Brain says you serve: <segment list>. Selling: <offer list>. Still current? Anything missing?"

## Questions — Customers (only for empty fields)

Ask 2–3 at a time:

1. **Primary segment.** Who's the #1 customer type? ("$1M+ online business founders" — be specific.)
2. **Secondary segments.** Anyone else who matters? (One line each.)
3. **What they want.** The transformation they're paying for, not the feature list.
4. **What they fear.** Why they hesitate to buy.
5. **What they tried before.** Failed approaches that frame how you position.
6. **What they read / watch / follow.** Where you find them.

## Writing `customers.md`

Required sections:

- `## Primary Segment` — one paragraph describing the #1 ICP.
- `## Secondary Segments` — one paragraph or bullet list per additional segment.
- `## Wants` — what they're paying for, in their language.
- `## Fears & Objections` — why they hesitate.
- `## Where They Are` — communities, content, platforms.

Update `last_updated`.

## Questions — Offers (only for empty fields)

Ask 2–3 at a time:

1. **Active offers.** What's for sale right now? (List + one-line each.)
2. **Price.** Each offer's price (or pricing band if it varies).
3. **Promise.** What outcome you guarantee or strongly imply.
4. **Proof.** What you point at when someone asks "does this work?" (case studies, testimonials, results).
5. **Delivery model.** Cohort / membership / async course / 1:1 / done-with-you.
6. **Constraints.** Capacity limits, refund policy, who you turn away.

## Writing `offers.md`

Required sections:

- `## Active Offers` — one block per offer: name, price, promise, delivery, who it's for.
- `## Proof` — links or short summaries of social proof per offer.
- `## Constraints` — capacity, refund, qualification rules.
- `## Retired / Future Offers` — short list with notes (optional).

Update `last_updated`.

## Cross-link with `business-profile.md`

`business-profile.md` Products section should list offer names and link to `offers.md` — not duplicate the price/promise/proof. One canonical home.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"fill-brain","path_before":"00-brain/customers.md","path_after":"00-brain/customers.md","reason":"populated from interview","reversal":"git revert <file>"}

{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"fill-brain","path_before":"00-brain/offers.md","path_after":"00-brain/offers.md","reason":"populated from interview","reversal":"git revert <file>"}
```

## Verification

- `customers.md` describes specific segments — would not match a generic business.
- `offers.md` lists current prices, promises, delivery.
- `business-profile.md` links to `offers.md` instead of duplicating offer details.
- `last_updated` is today on both files.
