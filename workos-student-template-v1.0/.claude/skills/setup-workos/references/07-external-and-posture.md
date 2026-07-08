# 07 · External Systems & Claude Posture

**Goal:** Tell Claude (a) where the team's shared truth lives (Notion, Drive, Slack, CRM), and (b) what Claude can do automatically vs. what needs the founder's nod.

**Brain files:** Update `00-brain/_overview.md` (canonical links) and `00-brain/founder-profile.md` (autonomy stance). May also touch `00-brain/integrations/README.md` if it exists.

## Pre-check

Read both files. If mining populated external links (Notion DB URLs, Drive folder URLs), confirm rather than re-ask.

## Questions — External systems (only for empty fields)

Ask 2–3 at a time:

1. **Notion.** Do you use it? If yes, what's the workspace URL? Key databases (Tasks, Projects, Areas, Customers)?
2. **Google Drive.** Folder URL where shared docs live?
3. **Slack.** Team workspace? Channel where Claude-relevant work happens?
4. **CRM / support / billing tools.** Names + roles in the business.
5. **GitHub.** Org URL if code-adjacent work matters.
6. **Anything else** that's a source of truth for the team (linear, asana, helpscout, intercom).

## Writing external links

Add a `## Canonical External Links` section to `00-brain/_overview.md`:

```md
## Canonical External Links

- Notion workspace: <URL>
- Notion Tasks database: <URL>
- Drive shared folder: <URL>
- Slack workspace: <URL>
- ...
```

If a more detailed integration doc exists at `00-brain/integrations/<tool>.md`, link to it from the canonical line.

## Questions — Claude posture (only for empty fields)

These shape every future autonomy decision. Ask carefully.

1. **Reversible local work.** Should Claude edit local files (drafts, notes, brain) without asking? (Default: yes — these are Green.)
2. **Local destructive actions.** Should Claude delete files / archive folders / run `rm -rf` without asking? (Default: no — these are Red.)
3. **External writes.** Notion, Drive, GitHub, Slack — ask first every time, or take obvious low-risk writes? (Default: ask first.)
4. **Money / publishing / sending.** (Default: always ask — never autonomous.)
5. **Strategic decisions.** (Default: always ask — never autonomous.)
6. **What you always want flagged.** ("Tell me when X" — concrete triggers Claude must surface.)

## Writing autonomy stance

Update `00-brain/founder-profile.md` § Autonomy Stance with concrete Green/Yellow/Red examples:

```md
## Autonomy Stance

**Green (do, log, move on):**
- Edit local drafts, brain files, area/project overviews
- Move misfiled files to canonical homes
- Run scripts that don't touch external systems

**Yellow (do, summarize at end of turn):**
- Update existing skills/rules from a clear repeated pattern
- Archive stale lab apps
- Add new audit log entries

**Red (always ask):**
- External writes (Notion, Drive, Slack, GitHub)
- Deleting or force-archiving anything
- Money / publishing / customer-facing sends
- Strategic decisions when multiple valid paths exist
- Editing security rules or secrets
```

## Integration note

Some tools need MCP servers to actually be usable (Notion via `notion-cli`/MCP, Drive via google-drive MCP, etc.). Don't try to wire them in this section — that's for a dedicated integration session once a workflow needs it. Just capture *what exists*; wiring comes later.

## Audit entries

```json
{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"capture-externals","path_before":"00-brain/_overview.md","path_after":"00-brain/_overview.md","reason":"canonical external links recorded","reversal":"git revert <file>"}

{"timestamp":"<ISO>","class":"yellow","actor":"setup-workos","action":"set-autonomy","path_before":"00-brain/founder-profile.md","path_after":"00-brain/founder-profile.md","reason":"Green/Yellow/Red stance recorded","reversal":"git revert <file>"}
```

## Verification

- `00-brain/_overview.md` lists every external system the founder named, with a working URL.
- `00-brain/founder-profile.md` § Autonomy Stance has concrete Green/Yellow/Red examples (not vague language).
- No MCP server was silently installed — wiring is deferred.
