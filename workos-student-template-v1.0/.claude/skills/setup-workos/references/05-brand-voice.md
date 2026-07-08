# 05 · Brand Voice

**Goal:** Fill `00-brain/brand-voice.md` so Claude writes copy, emails, posts, and replies that sound like the business — not like a generic AI assistant.

**Brain file:** `00-brain/brand-voice.md`

## Pre-check

Read the file. If mining pulled in a voice rule (e.g. "no corporate filler", "no emojis", "swear when it lands"), confirm:

> "Brain says your voice is: <extracted summary>. Anything to add, change, or remove?"

## Questions (only for empty fields)

Ask 2–3 at a time. Concrete examples beat abstract adjectives.

1. **Three things your voice *is*.** ("Direct, contrarian, specific.")
2. **Three things your voice *is not*.** ("Hype, hedging, corporate.")
3. **An example of copy that sounds like you.** (Paste a tweet, email subject, headline — or point at where Claude can find one.)
4. **An example of copy that does *not* sound like you.** (Counter-example, what to avoid.)
5. **Rules for specific surfaces.** (Email opens, X/Twitter hooks, sales copy, support replies — any surface where voice matters.)
6. **Banned words / phrases.** ("Never say 'unlock', 'leverage', 'synergy', 'I hope this helps'.")

## Writing the brain file

Required sections:

- `## Voice Is` — bullet list of positive traits with one-line definitions.
- `## Voice Is Not` — bullet list of anti-patterns to avoid.
- `## Examples — Like Us` — 2–3 short quoted examples (real tweets, emails, headlines).
- `## Examples — Not Us` — 2–3 short counter-examples.
- `## Surface Rules` — surface-specific rules (one block per surface where the rules differ).
- `## Banned Phrases` — explicit list.

Update `last_updated`.

## Voice calibration loop

After writing the brain file, offer a quick calibration:

> "Want to test it? Give me a 1–2 sentence task — write a hook, draft a subject line — and I'll try the voice. You correct me, I update the brain."

If the founder accepts, run one calibration round, fold the correction into the brand-voice file, and confirm before marking the task complete.

## Memory

If the founder gives a sharp voice rule mid-conversation ("never use the word 'simply'"), save it to auto memory too — it's a recurring preference that will apply across all skills.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"fill-brain","path_before":"00-brain/brand-voice.md","path_after":"00-brain/brand-voice.md","reason":"voice captured + calibrated","reversal":"git revert <file>"}
```

## Verification

- `brand-voice.md` includes real examples, not just abstract adjectives.
- Surface rules exist for at least one surface where voice changes (e.g. email vs. social).
- Banned phrases list is non-empty if the founder named any.
- `last_updated` is today.
