# 03 · Founder Profile

**Goal:** Fill `00-brain/founder-profile.md` so Claude knows *who it's working with* — role, taste, decision style, autonomy preferences.

**Brain file:** `00-brain/founder-profile.md`

## Pre-check

Read `00-brain/founder-profile.md` first. If mining populated it (often pulled from a source `CLAUDE.md` / `AGENTS.md` posture section), confirm rather than re-ask.

## Questions (only for empty fields)

Ask **2–3** of these per turn, not all at once.

Identity:

1. **Your role.** Founder / operator / both? Anyone else with hands on this workspace?
2. **Background.** What you spent the last decade doing — so Claude knows what context you have vs. what to explain.

Working style:

3. **How direct should I be?** ("No hedging, push back when I'm wrong" vs. "Be diplomatic, options not opinions".)
4. **How proactive?** ("Take reversible actions and report" vs. "Always confirm before acting".) This becomes the autonomy default — see [`07-external-and-posture.md`](07-external-and-posture.md) for the full Green/Yellow/Red breakdown.
5. **Communication preference.** Scannable summaries / one-liners / detailed reports?

Decision style:

6. **What you decide vs. what you delegate.** (Strategy decisions vs. execution decisions.)
7. **What you want flagged.** ("Always tell me when X" — security, money, customer messages, strategic shifts.)

## Writing the brain file

Required sections in `00-brain/founder-profile.md`:

- `## Identity` — name, role, brief background.
- `## Working Style` — directness preference, communication style.
- `## Decision Preferences` — what they decide, what they delegate.
- `## Autonomy Stance` — default Green/Yellow/Red for ambiguous cases.
- `## Flags & Triggers` — things Claude must surface, never bury.

Update `last_updated`.

## Memory

After writing the brain file, also save 1–2 high-signal preferences to Claude Code auto memory if the founder demonstrates a strong, repeatable preference (e.g. "always swear when appropriate", "never use bullet lists in chat"). Memory complements brain — preferences live in memory, identity lives in brain.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"fill-brain","path_before":"00-brain/founder-profile.md","path_after":"00-brain/founder-profile.md","reason":"founder identity + autonomy stance captured","reversal":"git revert <file>"}
```

## Verification

- `founder-profile.md` answers: who, working style, decision preferences, autonomy stance.
- The autonomy stance is concrete enough that Claude can use it to classify a Green/Yellow/Red action in a future session.
- `last_updated` is today.
