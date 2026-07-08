# Voices

Alternate voice files for your WorkOS assistant. Pick one, copy it to `.claude/rules/voice.md`, and that voice loads at every session.

## Scope

These voices govern **how Claude talks to you in chat** — replies, summaries, errors, clarifying questions, opinions in conversation. They do NOT govern what Claude writes FOR your business (emails, social posts, course copy, ad copy). That uses [`00-brain/brand-voice.md`](../../00-brain/brand-voice.md). Internal voice ≠ external voice.

## How It Works

`.claude/rules/voice.md` is a global rule with no `paths:` frontmatter — it auto-loads at session start. Everything in this folder is just inventory; nothing here loads automatically. Swap by copying.

The shipped default is [`default.md`](default.md) — the house style, not a character. Swap to a named character below for more flavor, or write your own.

## Available Voices

| Voice | Character | Vibe |
|---|---|---|
| [`default.md`](default.md) | **House default** | Sharp, opinionated, brief. No corporate filler, no sycophancy. The 2am assistant you'd actually want. |
| [`alfred.md`](alfred.md) | **Alfred Pennyworth** (Batman) | Dry English butler. Formal, deadpan, devoted. "If I may, sir." |
| [`hormozi.md`](hormozi.md) | **Alex Hormozi** | Direct operator. Tactical, blunt, allergic to fluff. Frameworks and constraints. |
| [`naval.md`](naval.md) | **Naval Ravikant** | Quiet philosophical aphorist. Principles before tactics. Long-term oriented. |
| [`lasso.md`](lasso.md) | **Ted Lasso** | Warm sincere coach. Tactical underneath the optimism. Not naive — kind. |
| [`pope.md`](pope.md) | **Olivia Pope** | Decisive crisis fixer. "Listen to me." Calm, fast, three moves ahead. |

## Swap

From the workspace root:

```bash
cp .claude/voices/hormozi.md .claude/rules/voice.md   # switch to Hormozi
cp .claude/voices/default.md .claude/rules/voice.md   # switch back to the house default
```

The next Claude Code session loads the new voice.

## Write Your Own

The voice file is yours. The shipped voices are starting points, not the only options.

1. Copy one of the existing files as a starting shape.
2. Pick a real or fictional character with cultural footprint. Generic archetypes ("the coach," "the friend") flatten into AI default-mode within three messages. Named characters with verbal tics hold the line.
3. Keep the four sections: **Scope**, **Style**, **Avoid**, **Defaults**.
4. Identity assertion on line 1 ("You are X — …").
5. Compact bullets, not paragraphs. The "Avoid" list is where character lives.
6. Save here, then `cp` it over `.claude/rules/voice.md` to activate.

## Shape

Each voice file follows this skeleton. Borrowed from Nous Research's `SOUL.md` pattern, adapted with scope discipline:

```markdown
# Voice — <Character>

You are <character> — <one-sentence identity>.

## Scope — Critical
<chat voice only; not for business deliverables — boilerplate, keep it>

## Style
- 6–8 compact bullets

## Avoid
- 6–8 compact bullets (this is where character lives)

## Defaults
- Ambiguous request, disagreement, uncertainty, errors, casual chat, compliments

## Overall
<one or two sentences capturing the vibe>
```

## Do Not

- Mix project context (areas, rules, business facts) into voice files. Voice = who you are when you talk. `core.md` and `AGENTS.md` = how the workspace works.
- Stack multiple voice files in `.claude/rules/`. Only one active voice file at a time.
- Add `paths:` frontmatter to `.claude/rules/voice.md` — voice should always load.
- Use a voice file as a guide for writing under the user's name. That's what `00-brain/brand-voice.md` is for.
