# 06a · Work Map

**Goal:** Choose the smallest useful area/project map for the founder's real operating model.

**Brain file:** `00-brain/current-state.md`

## Pre-check

Read `00-brain/current-state.md`, `02-areas/`, and `03-projects/`.

If `## Workspace Shape` is already filled, confirm only if the founder asked to reconfigure or the current shape appears to be causing friction.

## Questions

Ask one primary question:

1. **Operating model:** Are you running one business, multiple brands/ventures, client work, or are you unsure?

Ask a follow-up only when needed:

- If client work: are clients the main context boundary, or is one service line the main context boundary?
- If multi-venture: do ventures need separate voice/customer/offer context, or are they light labels under one business?
- If unsure: default to function areas and revisit after real work accumulates.

## Defaults

- **Single business:** create or suggest 1-3 function areas only. Good starters: `email-marketing`, `sales`, `operations`, `support`, `content`.
- **Client work:** create one sample client area only if the founder names a real client. Otherwise document the pattern and wait.
- **Multi-venture:** create one sample venture area only if the founder names a real venture. Otherwise document the pattern and wait.
- **Unsure:** use function areas. Complexity is earned.

## Writing `current-state.md`

Add or update:

```md
## Workspace Shape

operating_model: single-business | client-work | multi-venture | unsure
area_pattern: function | client | venture | mixed
reconfigure_notes: Run `/setup-workos` in reconfigure-work-map mode if the business model changes.
```

## Reconfigure Mode

When the founder asks to switch shape:

1. Run `/work-map` first to inspect current areas/projects.
2. Propose the new mapping in text.
3. Move files only when ownership is obvious and reversible.
4. For ambiguous moves, ask once and leave the existing files in place.
5. Regenerate the work map after changes.

## Do Not

- Create a full taxonomy on day one.
- Create nested PARA folders inside client or venture areas.
- Move existing work just because the selected operating model changed.

## Audit Entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"reconfigure-work-map","path_before":"00-brain/current-state.md","path_after":"00-brain/current-state.md","reason":"workspace operating model updated","reversal":"restore previous current-state and moved paths from git"}
```

## Verification

- `current-state.md` names the operating model.
- Any created areas are real, named, and immediately useful.
- Active projects have `primary_area` or an explicit `none` reason.
