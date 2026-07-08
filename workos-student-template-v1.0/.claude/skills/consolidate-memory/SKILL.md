---
name: consolidate-memory
description: "Reflective gardening pass over Claude auto-memory — merge duplicates, retire stale/contradicted entries, fix dates, rebuild the index. Use when the user says 'consolidate memory', 'clean up memory', 'garden the memory', 'tidy memory'; or when the end-of-turn hook flags that the MEMORY.md index has passed 180 lines and needs pruning before the 200-line load cap hides entries."
---

# Memory Consolidation

A reflective pass over what you've learned about this user and their work. Goal: a future session orients fast — who they work with, what they're focused on, how they like things done — without re-asking. This is the gardener; lightweight per-turn capture is [workos-reflect](../workos-reflect/SKILL.md), not this.

Your system prompt's auto-memory section defines the directory, file format, and memory types. Follow it. Writing discipline: [`.claude/rules/memory-authoring.md`](../../rules/memory-authoring.md).

## Why this runs

Claude Code only loads the first ~200 lines / 25KB of `MEMORY.md` each session. Past that, old entries silently stop loading — present on disk, never injected. So the job is not just tidiness; it keeps the live set inside the loaded window. The Stop hook nudges this skill once the index passes 180 lines.

## Phase 1 — Take stock

- List the memory directory and read the index (`MEMORY.md`).
- Skim each topic file. Note which overlap, which look stale, which are thin.
- Note each file's **modification time** — the harness writes no date field, so mtime is the "last confirmed" signal.

## Phase 2 — Consolidate (autonomous)

- **Separate durable from dated.** Preferences, working style, key relationships, recurring workflows are durable — keep and sharpen. Specific projects, deadlines, one-off tasks are dated — if the date passed or the work is done, retire the file or fold the lasting takeaway ("user prefers X format for launch docs") into a durable one.
- **Merge overlaps.** If two files describe the same person, project, or preference, combine into one and keep the richer file's path.
- **Resolve contradictions — newer wins.** When two entries conflict, or a recently-added memory contradicts an older one, the newer is canonical: update or **delete** the wrong one. A memory that is wrong gets deleted, not archived.
- **Fix time references.** Convert "next week", "this quarter", "by Friday" to absolute dates so they stay readable later.
- **Drop what's easy to re-find.** If a memory just restates something pullable from the user's calendar, docs, or connected tools on demand, cut it. Keep what's hard to re-derive: stated preferences, the context behind a decision, who to go to for what.

## Phase 3 — Uncertain items → ask (capped)

Some entries you cannot confidently judge — typically ones **older than ~6 months by mtime** that are neither clearly durable nor clearly dead. Do not guess and do not silently delete them.

- Collect them into a short list. **Cap at 5.** If more than 5 qualify, take the 5 oldest and note the remainder in `00-brain/workos-improvement-inventory.md` for a later pass.
- For each, prepare a one-line "still relevant?" question (keep / delete).
- **Surfacing the question depends on where you're running:**
  - **Main thread:** ask the user directly via AskUserQuestion (one click per item: Keep / Delete), then apply.
  - **Subagent** (AskUserQuestion is unavailable off the main thread): do NOT ask. Return the capped list as your result so the main thread can ask and apply. Finish the autonomous Phase 2 work regardless.

## Phase 4 — Tidy the index

Update `MEMORY.md` so it stays under 200 lines and ~25KB. One line per entry, under ~150 chars: a markdown link `[Title]` to the topic file, followed by ` — one-line hook`.

- Remove pointers to retired memories.
- Shorten any line carrying detail that belongs in the topic file.
- Add anything newly important.

## Output

Finish with a short summary: files touched, merged, retired (deleted), and any uncertain items awaiting a Keep/Delete decision.
