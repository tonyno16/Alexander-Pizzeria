---
paths:
  - ".mcp.json"
  - ".claude/plugins/**"
  - ".claude/skills/**"
  - "package.json"
  - "requirements.txt"
  - "pyproject.toml"
  - "Gemfile"
  - "go.mod"
  - "Cargo.toml"
---

# Third-Party Installs

JIT discipline when adding remote code, MCPs, plugins, packages, or skills to the workspace. High-level posture lives in [security.md](security.md).

## Behavior

- Inspect source, permissions, network behavior, and secret handling before installing.
- Never run unreviewed installer scripts from the web against the workspace.
- Fetch and read first; execute only after approval if it changes system behavior.
- Treat anything that can access the network, the filesystem outside its install path, environment variables, or `.env` as broad-permission code.

## Reversibility

- **Yellow:** installing local-only, inspected helpers that are reversible (e.g., a vetted single-file skill copied locally, a pinned package that does not run install scripts).
- **Red:** installing remote code, MCPs, plugins, packages with broad permissions, anything with postinstall scripts, anything that can access secrets, or anything that opens network access. Ask before doing it.

## Skill Imports

- A skill written here is not "third-party". A skill imported from elsewhere is.
- For imported skills: read the SKILL.md, scripts, and references end to end before adding.
- Reject skills that hard-code paths outside the workspace, request secrets in chat, or run install scripts.

## MCP Servers

- `.mcp.json` adds external network reach. Every entry is Red until inspected.
- Verify the server's documented permissions, scopes, and data flow before approving.
- Prefer official servers over community ones; if community, read the source.

## Verification

- Source inspected end to end before install.
- Permissions, network behavior, and secret access understood.
- For packages: lockfile updated, no postinstall surprises.
- Audit entry logged with the install reason and reversal step.
