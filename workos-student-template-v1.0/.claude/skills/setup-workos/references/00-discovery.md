# 00 · Discovery & Mining Handoff

**Goal:** Before asking a single interview question, detect whether the founder has an existing workspace worth mining. If yes, hand off to `migrate-existing-workspace` and let the founder operate on filled-in fields instead of blank ones.

**Why this comes first:** Re-asking what the founder already wrote elsewhere is the #1 reason setup wizards feel like surveys. Mining first turns the interview into "confirm + fill gaps" instead of "tell me everything from scratch".

## Procedure

### 1. Run discovery

```bash
python3 .claude/scripts/workos-skill-tools.py discover-workspaces
```

This returns a sorted list of candidate workspaces from common code roots (`..`, `~/Code/`, `~/Projects/`, `~/Documents/`, etc.). Each candidate has a `score`, `strong_signals` (e.g. `.claude/skills`, `.claude/rules`, `.basic-memory`), `medium_signals` (e.g. `CLAUDE.md`, PARA folders), and `weak_signals` (e.g. `.claude/`, `.mcp.json`).

### 2. Show the founder what was found

Format the top candidates (score ≥ 5) like this:

```
Looking around for existing workspaces I could mine, I found:

1. /Users/gael/Code/prompting lab   (score 25 — has .claude/skills, .basic-memory, CLAUDE.md, AGENTS.md, PARA folders)
2. /Users/gael/Code/other-project   (score 8 — has CLAUDE.md, .claude/)

If any of these is your previous workspace, I can mine it now so you don't have to re-tell me the basics — company, customers, offers, voice. I'll only ask you for what's missing afterward.

Mine one of these? (number / paste a different path / no, fresh start)
```

If no candidates score ≥ 5, say so directly: "No existing workspaces found nearby. We'll fill the brain from scratch in the interview."

### 3. Hand off (if founder picks one)

If the founder approves mining a candidate:

1. **Do not run the mining steps yourself in this skill.** Hand off explicitly:
   > "Handing off to `migrate-existing-workspace` to mine that workspace. When it's done, we'll come back here and only ask you for the gaps."
2. Invoke `migrate-existing-workspace` with the chosen path as the source.
3. After migration completes (a migration report exists at `00-brain/audit/migration-<YYYY-MM-DD>.md`), resume the setup wizard at the next section.

### 4. After mining (or after skipping mining)

Re-read every file in `00-brain/`. Note which fields are now filled (by mining) and which are still empty (TBD, placeholder). The interview sections that follow only ask about empty or stale fields.

Tell the founder:
> "Mining done. Brain is now filled for: business identity, customers, offers, voice. Still empty: current state, external systems, Claude posture. The next sections of setup will focus on those."

If mining was skipped, say:
> "Skipping mining. We'll fill the brain from scratch — expect about 8 short sections, 2–3 questions each."

## Custom paths

If the founder pastes a path that wasn't in the discovery results (e.g. an external drive, a subfolder, a path the script didn't scan), validate it exists and is a directory, then hand it off the same way.

## Multiple candidates

If the founder wants to mine more than one workspace, run them in sequence (each migration appends to the brain). Never mine in parallel — the second mining must see the first's results to avoid duplicate writes.

## Audit entries

```json
{"timestamp":"<ISO>","class":"green","actor":"setup-workos","action":"discovery-scan","path_before":null,"path_after":null,"reason":"<N candidates detected>","reversal":"n/a"}

{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"handoff-to-migrate","path_before":"<chosen source path>","path_after":null,"reason":"founder approved mining","reversal":"n/a"}
```

## Verification

- Discovery ran before any interview question.
- The founder saw the candidate list and explicitly chose to mine or skip.
- If mining was chosen, the migrate skill ran to completion before continuing.
- Subsequent wizard sections only ask about brain fields that mining didn't fill.
