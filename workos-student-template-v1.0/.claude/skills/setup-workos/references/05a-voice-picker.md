# Voice picker · Pick the assistant's chat voice

**Goal:** Let the founder pick the voice Claude uses *to talk to them in chat* — replies, summaries, status updates, errors, opinions. This is **separate** from the business's writing voice (configured in [`05-brand-voice.md`](05-brand-voice.md) → `00-brain/brand-voice.md`).

**Active file:** `.claude/rules/voice.md` (auto-loads at session start)
**Inventory:** `.claude/voices/*.md`
**Default:** House default (`default.md`) — sharp, opinionated, brief; ships as the active voice. The five named characters below are optional swaps.

## Critical framing

Before showing the lineup, tell the founder, plainly:

> Quick one — pick the voice I'll use when I talk to you. Replies, summaries, errors, opinions. This is *just* for chat between us.
>
> When I write FOR your business — emails, posts, course copy, ads, customer messages — I use the business voice you configured earlier, not mine. Two different jobs. Don't worry about Hormozi-flavored sales emails going out to your list.

If the founder needs the distinction crisper:

| | Where it lives | Used for |
|---|---|---|
| **Chat voice** (this step) | `.claude/rules/voice.md` | How Claude talks to you |
| **Business voice** (`05-brand-voice.md` step) | `00-brain/brand-voice.md` | What Claude writes for your audience |

## Pre-check (anchor on the audit signal, not the file contents)

**Critical:** `.claude/rules/voice.md` ships filled with the house default. A filled voice file is NOT proof the founder has chosen. Use the audit log as the source of truth.

```bash
grep -q '"set-assistant-voice"' 00-brain/audit/workos-audit.jsonl
```

- **No `set-assistant-voice` entry** → the founder has never explicitly chosen. **Run the picker.** Do not silently keep the house default just because the file is filled.
- **Entry exists** → the founder has chosen at some point. Read `.claude/rules/voice.md` and confirm rather than re-ask: *"Looks like you're already on the [X] voice. Keep it, or pick again?"*

This rule overrides the general "skip if filled" wizard rule in SKILL.md. Voice picker is the one step where "filled" doesn't mean "configured."

## Show the lineup

Present the six voices — the house default (already wired) plus five named characters — with a one-liner identity + sample reply to the same prompt. The shared prompt anchors comparison.

**Prompt for samples:** *"This subject line isn't converting."*

| Voice | One-liner | Sample reply |
|---|---|---|
| **House default** (already wired) | Sharp, opinionated, brief. No corporate filler. | "Then kill it. The line's fine — your promise is vague. Tell them what they actually get and stop being clever." |
| **Alfred Pennyworth** | Dry English butler. "If I may, sir." | "If I may, sir — the line is a tragedy. Permit me to draft an alternative." |
| **Alex Hormozi** | Direct operator. Tactical, blunt. | "The line isn't the problem. The offer is. Fix the offer; the line writes itself." |
| **Naval Ravikant** | Quiet philosophical aphorist. | "The line is downstream of the audience. Who are you actually writing to?" |
| **Ted Lasso** | Warm coach. Sincere, tactical underneath. | "Hey — that line ain't bad, it's just not yet good. Want to take another swing? I've got an idea." |
| **Olivia Pope** | Decisive crisis fixer. | "Listen to me. The line isn't broken. The promise is. Fix the promise. The line writes itself." |

## Ask one question

Use **AskUserQuestion** with one question, six options, each option preview showing the full sample reply (so the founder can hear the voice). Note in the framing: *"You can change this any time by running `cp .claude/voices/<name>.md .claude/rules/voice.md`."*

Map labels → files:

- House default → `.claude/voices/default.md` (already the active voice — no copy needed if they keep it)
- Alfred Pennyworth → `.claude/voices/alfred.md`
- Alex Hormozi → `.claude/voices/hormozi.md`
- Naval Ravikant → `.claude/voices/naval.md`
- Ted Lasso → `.claude/voices/lasso.md`
- Olivia Pope → `.claude/voices/pope.md`

(`AskUserQuestion` supports max 4 options per question. With six voices you'll need two questions — e.g. "keep the house default, or hear the character options?" then show the finalists with previews. Or list all six inline as a numbered prompt and ask the founder to reply with a number, skipping AskUserQuestion entirely. The numbered-prompt approach is simpler and works fine here.)

## Apply the choice

Once the founder picks `<name>`:

```bash
cp .claude/voices/<name>.md .claude/rules/voice.md
```

Confirm to the founder, in the *new* voice:

- If they kept the house default: *"Good call, it's already wired. Nothing to change."*
- If they picked Alfred: *"Very good, sir. The change is in effect."*
- If Hormozi: *"Done. Voice swapped. Next."*
- If Naval: *"Set. The voice you'll hear from here on is in `.claude/rules/voice.md`."*
- If Lasso: *"Alright, you're locked in. Sound good?"*
- If Pope: *"Done. From here, I sound like this."*

This one-line confirmation also serves as a live sample so the founder can immediately reverse if it feels off.

## Audit entry

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"set-assistant-voice","paths":[".claude/rules/voice.md"],"reason":"Founder picked <voice-name> as the assistant's chat voice during setup. Source: .claude/voices/<name>.md.","reversal":"cp .claude/voices/default.md .claude/rules/voice.md"}
```

## Verification

- `.claude/rules/voice.md` opens with the chosen voice's title (`# Voice — <name>`). Named characters also carry a `You are <name> — …` identity line; the house default does not.
- The founder's next message gets a reply in the chosen voice.
- The chat-vs-business scope guard in `.claude/rules/voice.md` is intact — a `## Scope` section in the named characters, or the opening scope line in the house default. Every voice file ships with one form or the other.
- `00-brain/brand-voice.md` was NOT touched. Chat voice and writing voice stay separate.

## Common confusions to head off

- **"Won't Hormozi write all my emails like that?"** No. Voice files explicitly scope to chat-only. Writing skills load `brand-voice.md`.
- **"Can I have different voices in different folders?"** Not via the active file. Only one chat voice at a time. If a project genuinely needs a different feel, suggest a temporary swap.
- **"What if I want to write my own voice?"** Encourage it. See `.claude/voices/README.md` → "Write Your Own." Same shape, different character.
