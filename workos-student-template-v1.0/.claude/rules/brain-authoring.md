---
paths:
  - "00-brain/**"
---

# Brain Authoring

JIT discipline for editing canonical business truth.

Canonical principles live in [`00-brain/workos-principles.md`](../../00-brain/workos-principles.md) — atomic truth, file-placement, archive policy. Context loading order: [context-routing.md](context-routing.md).

## Search Before Write

Before adding or editing brain content, search first:

1. Check [`canonical-concepts.md`](../../00-brain/canonical-concepts.md) — if the concept is registered, link to its home, do not restate.
2. Grep the rest of `00-brain/`:

```bash
rg -l "<fact-keyword>" 00-brain/
rg "<key-phrase>" 00-brain/
```

If the fact already lives somewhere, **link to its canonical home** from any other file that needs it. Do not restate.

## Workflow

1. Identify which canonical file owns the concept (business identity, customers, offers, voice, glossary, current-state, integrations).
2. Search the rest of `00-brain/` to confirm the fact doesn't already exist somewhere else.
3. If a different file already has it: update there and link from this file instead.
4. If new: add to the appropriate canonical file under a clear heading (the heading anchor becomes the link target).
5. Bump `last_updated:` to today's date.
6. Log audit entry on substantive create/update.

## Proposing New Files

The brain is not a closed set. When durable business knowledge surfaces in conversation and no existing brain file claims it:

1. Search `00-brain/` and [`canonical-concepts.md`](../../00-brain/canonical-concepts.md) to confirm the knowledge truly has no home.
2. Propose the new file to the user: name, one-line scope, and what it would contain. Do not create without approval.
3. On approval: create the file with a clear H1 and `last_updated`, register it in [`canonical-concepts.md`](../../00-brain/canonical-concepts.md), log an audit entry.

This is **Red** — initiative comes from the model, decision comes from the user. The bar: knowledge that will matter across multiple future sessions and doesn't fit an existing brain file's scope.

## Do Not

- Restate the atomic-truth principle inline. Link to [`workos-principles.md`](../../00-brain/workos-principles.md) instead.
- Duplicate facts across multiple files.
- Paste raw transcripts, exports, or unprocessed inputs — those go to `01-inbox/`.
- Bleed `business-profile.md`-style content into `customers.md` (or vice versa). Respect file scope.
- Recreate legacy PARA folders (`01-projects/`, `03-resources/`, etc.) — `workos-doctor.py` forbids them.
- Paste secrets, customer PII, or private credentials.
- Mark a guess as fact. If uncertain, note `(needs confirmation)` inline.
- Put glossary terms anywhere except `glossary.md` — link from other files.

## Verification

- `rg "<fact>" 00-brain/` shows the fact in exactly one file.
- Glossary terms link to `glossary.md`.
- `last_updated:` bumped to today's date.
- Audit entry written.
- `python3 .claude/scripts/workos-doctor.py --json` shows no new brain duplicate warnings.
