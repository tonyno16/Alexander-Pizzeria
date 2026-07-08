---
status: example
owner: founder
container_type: lab
claude_role: act as the operator of a tiny weekly metrics dashboard — read inputs, refresh the markdown table, and flag anomalies. Do not invent metrics that aren't in the inputs.
last_updated: 2026-05-25
---

# Example Weekly Pulse

## Purpose

A toy "weekly pulse" dashboard that demonstrates what `90-lab/` is for: a small, throwaway tool that lives in the workspace, gets refreshed by Claude, and may or may not become real.

This is an example. Replace it with your own lab experiment, or archive it.

## Load First

- `pulse.md` — the dashboard itself (this folder).
- `inputs/example-week.md` — sample input data.
- `00-brain/current-state.md` — only when the lab tool needs to know what's active this week.

## Active Work

- Refresh `pulse.md` weekly from whatever inputs you choose to track. The example below uses fake data.
- If this tool proves useful for more than one week, promote it: move it under `02-areas/<area>/apps/` or `03-projects/<project>/apps/`.

## Decisions

- Lab tools are not durable infrastructure. They earn their place by being used. If `pulse.md` hasn't been touched in 30 days, archive it.

## Next Action

- Decide whether weekly metrics are something you actually want Claude to track. If yes, replace `inputs/example-week.md` with a real source. If no, archive this folder.

## Next Decision

- Promote this to an area (ongoing function), promote to a project (time-bound goal), or archive.

## Housekeeping

- Do not let `90-lab/` accumulate stale experiments. The lab is a workshop, not a museum.
- Lab tools that become durable graduate out of `90-lab/`. The promotion criteria: used more than once, has a clear owner, has a business function.

## Archive Criteria

Archive to `99-archive/90-lab/example-weekly-pulse/` when:

- The student decides metrics aren't worth tracking, OR
- This tool has been replaced by a real (non-example) lab app, OR
- 30 days pass with no edits.
