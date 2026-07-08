#!/usr/bin/env python3
"""PreToolUse hook: nudge (don't block) when a NEW file lands outside the WorkOS PARA structure.

Catches the failure where a deliverable gets dumped to the repo root, above the repo, or
into another path instead of an area/project. Fires only on Write creating a *new* file —
overwrites of existing files already had their placement decided, so they stay silent.

Three-bucket pattern (see hook-design.md): this is a NUDGE. Cross-repo work is legitimately
ambiguous (e.g. the separate student-template repo), so we surface the choice, never block it.
"""

from __future__ import annotations

import json
import os
import sys

# Top-level folders that are valid homes for created files.
ALLOWED_DIRS = {
    "00-brain",
    "01-inbox",
    "02-areas",
    "03-projects",
    "90-lab",
    "99-archive",
    ".claude",
    ".codex",
    ".agents",
    ".git",
}

# Files allowed to live directly at the workspace root.
ALLOWED_ROOT_FILES = {
    "CLAUDE.md",
    "AGENTS.md",
    "GEMINI.md",
    "README.md",
    ".gitignore",
    ".mcp.json",
    ".env",
    ".env.example",
}


def nudge(message: str) -> None:
    print(json.dumps({"systemMessage": message}))


def allow() -> None:
    print("{}")


def resolve(path: str, project_dir: str) -> str:
    if not os.path.isabs(path):
        path = os.path.join(project_dir, path)
    return os.path.normpath(path)


def main() -> int:
    try:
        payload = json.loads(sys.stdin.read() or "{}")
    except json.JSONDecodeError:
        allow()
        return 0

    if (payload.get("tool_name") or "") != "Write":
        allow()
        return 0

    path = (payload.get("tool_input") or {}).get("file_path") or ""
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR") or ""
    if not path or not project_dir:
        allow()
        return 0

    abs_path = resolve(path, project_dir)
    project_dir = os.path.normpath(project_dir)

    # Only care about NEW files. Overwriting an existing file already made its placement choice.
    if os.path.exists(abs_path):
        allow()
        return 0

    # Inside the workspace?
    inside = abs_path == project_dir or abs_path.startswith(project_dir + os.sep)

    if not inside:
        nudge(
            f"[placement-guard] New file `{path}` is being written OUTSIDE this WorkOS "
            f"(`{project_dir}`). New work belongs in `02-areas/` or `03-projects/`. "
            "If this is intentional cross-repo work, proceed — otherwise place it in the "
            "right area/project, or offer to spin up a project for it."
        )
        return 0

    rel = os.path.relpath(abs_path, project_dir)
    top = rel.split(os.sep)[0]

    if top in ALLOWED_DIRS:
        allow()
        return 0

    # Loose file at the workspace root.
    if os.sep not in rel:
        if rel in ALLOWED_ROOT_FILES or rel.startswith("."):
            allow()
            return 0
        nudge(
            f"[placement-guard] New file `{rel}` would sit loose at the workspace root. "
            "Only `_overview.md`-anchored PARA folders hold work. Move it into the owning "
            "`02-areas/<area>/` or `03-projects/<project>/`, or offer to create a project."
        )
        return 0

    # New top-level folder that isn't a PARA/tooling dir.
    nudge(
        f"[placement-guard] New file `{rel}` is under a non-PARA top-level folder `{top}/`. "
        "Created work routes through `00-brain/ 01-inbox/ 02-areas/ 03-projects/ 90-lab/`. "
        "Confirm this location is intentional, or place it in the right container."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
