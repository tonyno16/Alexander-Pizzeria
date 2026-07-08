#!/usr/bin/env python3
"""Mechanical helpers for WorkOS foundation skills.

These helpers produce plans, checks, and safe scaffolds. Claude still owns
judgment, Green/Yellow/Red classification, and final reporting.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import subprocess
import sys
from pathlib import Path


ROOT = Path.cwd()
TOP_LEVEL = {"00-brain", "01-inbox", "02-areas", "03-projects", "90-lab", "99-archive"}
OVERVIEW_MARKERS = [
    "status:",
    "owner:",
    "claude_role:",
    "last_updated:",
    "## Purpose",
    "## Load First",
    "## Housekeeping",
]
SECRET_NAMES = {".env", ".mcp.json", "settings.local.json", "config.toml"}
SECRET_SUFFIXES = {".pem", ".key", ".p12", ".pfx"}
IGNORE_DIRS = {".git", "node_modules", ".venv", "__pycache__", ".next", "dist", "build"}


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or "untitled"


def read_text(path: Path, limit: int = 12000) -> str:
    try:
        return path.read_text(encoding="utf-8")[:limit]
    except (UnicodeDecodeError, OSError):
        return ""


def parse_overview(path: Path) -> dict:
    """Parse WorkOS overview metadata without requiring a YAML dependency."""
    text = read_text(path, 40000)
    meta: dict[str, object] = {}
    if text.startswith("---"):
        end = text.find("\n---", 3)
        block = text[3:end].strip().splitlines() if end != -1 else []
    else:
        block = [line for line in text.splitlines()[:30] if re.match(r"^[A-Za-z_][A-Za-z0-9_-]*:\s*", line)]

    current_key = ""
    for raw in block:
        line = raw.rstrip()
        if not line.strip():
            continue
        if line.startswith("  - ") and current_key:
            meta.setdefault(current_key, [])
            if isinstance(meta[current_key], list):
                meta[current_key].append(line[4:].strip().strip('"'))
            continue
        match = re.match(r"^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$", line)
        if not match:
            continue
        key, value = match.group(1), match.group(2).strip()
        current_key = key
        if value == "[]":
            meta[key] = []
        elif value:
            meta[key] = value.strip('"')
        else:
            meta[key] = []

    title_match = re.search(r"^#\s+(.+)$", text, flags=re.MULTILINE)
    return {
        "path": rel(path),
        "title": title_match.group(1).strip() if title_match else path.parent.name,
        "meta": meta,
    }


def area_overview_link(area_slug: str) -> str:
    slug = slugify(area_slug)
    if not slug or slug == "tbd":
        return "none"
    return f"02-areas/{slug}/_overview.md"


def write_json(payload: dict) -> None:
    print(json.dumps(payload, indent=2, sort_keys=True))


def run_doctor() -> dict:
    doctor = ROOT / ".claude" / "scripts" / "workos-doctor.py"
    if not doctor.exists():
        return {"available": False, "errors": ["workos-doctor.py missing"], "warnings": []}
    result = subprocess.run(
        [sys.executable, str(doctor), "--json"],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    try:
        payload = json.loads(result.stdout or "{}")
    except json.JSONDecodeError:
        return {"available": True, "errors": ["workos-doctor.py returned invalid JSON"], "warnings": []}
    findings = payload.get("findings", [])
    return {
        "available": True,
        "returncode": result.returncode,
        "errors": [f for f in findings if f.get("severity") == "error"],
        "warnings": [f for f in findings if f.get("severity") == "warning"],
    }


def overview_health(path: Path) -> dict:
    if not path.exists():
        return {"exists": False, "missing": OVERVIEW_MARKERS}
    text = read_text(path)
    return {"exists": True, "missing": [marker for marker in OVERVIEW_MARKERS if marker not in text]}


def list_containers(base: str) -> list[dict]:
    root = ROOT / base
    if not root.exists():
        return []
    rows = []
    for child in sorted(p for p in root.iterdir() if p.is_dir() and not p.name.startswith(".")):
        rows.append({"slug": child.name, "path": rel(child), "overview": overview_health(child / "_overview.md")})
    return rows


def duplicate_candidates(slug: str, base: str) -> list[dict]:
    tokens = {part for part in slug.split("-") if len(part) > 2}
    matches = []
    for row in list_containers(base):
        other = row["slug"]
        other_tokens = set(other.split("-"))
        score = len(tokens & other_tokens)
        if slug == other or score:
            matches.append({"slug": other, "path": row["path"], "token_overlap": score})
    return sorted(matches, key=lambda item: (-item["token_overlap"], item["slug"]))


def area_template(name: str, owner: str = "TBD", area_type: str = "function") -> str:
    today = dt.date.today().isoformat()
    title = name.strip().title()
    area_type = area_type if area_type in {"function", "client", "venture"} else "function"
    return f"""---
status: active
owner: {owner}
container_type: area
area_type: {area_type}
claude_role: Operate this area proactively, keep context current, and ask only for Red decisions.
last_updated: {today}
---

# {title}

## Purpose

TBD.

## Scope

Owns:

- TBD.

Does not own:

- TBD.

## Load First

- Canonical brain links:
- External source-of-truth links:
- Related projects:
- Related apps:

## Operating Context

TBD.

## Active Work

- TBD.

## Related Projects

Generated by `/work-map` when needed. Do not hand-maintain after every turn.

## Decisions

- TBD.

## Housekeeping

- Archive when:
- Review cadence:
- Common misfiles:

## Notes

Use this section sparingly. Promote durable facts to `00-brain/` or a canonical external doc.
"""


def project_template(name: str, primary_area: str = "", owner: str = "TBD", related_areas: list[str] | None = None) -> str:
    today = dt.date.today().isoformat()
    title = name.strip().title()
    primary = area_overview_link(primary_area) if primary_area else "none"
    related = related_areas or []
    related_lines = "\n".join(f"  - {area_overview_link(area)}" for area in related if area)
    related_block = "\n" + related_lines if related_lines else " []"
    return f"""---
status: active
owner: {owner}
container_type: project
primary_area: {primary}
related_areas:{related_block}
claude_role: Drive this project toward the outcome, keep the handoff current, and ask only for Red decisions.
last_updated: {today}
---

# {title}

## Purpose

TBD.

## Success Criteria

- TBD.

## Load First

- Canonical brain links:
- Primary area: {primary}
- Related areas:
- External source-of-truth links:
- Relevant files:

## Current Plan

- TBD.

## Decisions

- TBD.

## Risks And Constraints

- TBD.

## Artifacts

- Drafts:
- Research:
- Assets:
- Apps:
- Final:

## Handoff

TBD.

## Archive Criteria

Archive when:

- TBD.
"""


def setup_audit(_: argparse.Namespace) -> None:
    gitignore = read_text(ROOT / ".gitignore")
    required_gitignore = [".env", ".env.*", "!.env.example", "secrets/", "*.pem", "*.key"]
    brain_files = sorted((ROOT / "00-brain").glob("*.md")) if (ROOT / "00-brain").exists() else []
    placeholder_re = re.compile(r"\b(TBD|TODO|fill this|placeholder)\b", re.IGNORECASE)
    payload = {
        "top_level": {name: (ROOT / name).is_dir() for name in sorted(TOP_LEVEL)},
        "gitignore": {
            "exists": (ROOT / ".gitignore").exists(),
            "missing_patterns": [pattern for pattern in required_gitignore if pattern not in gitignore],
        },
        "env": {
            "env_example_exists": (ROOT / ".env.example").exists(),
            "env_exists": (ROOT / ".env").exists(),
            "env_ignored_check": "verify with git check-ignore .env before reporting safe",
        },
        "brain": [
            {
                "path": rel(path),
                "placeholder_count": len(placeholder_re.findall(read_text(path))),
                "heading_count": len(re.findall(r"^##\s+", read_text(path), flags=re.MULTILINE)),
            }
            for path in brain_files
        ],
        "doctor": run_doctor(),
        "next_actions": [
            "Fill high-placeholder brain files from approved context.",
            "Create .env from .env.example only with placeholder comments unless the founder approves editing secrets.",
            "Run workos-doctor again after setup fixes.",
        ],
    }
    write_json(payload)


def new_area(args: argparse.Namespace) -> None:
    slug = slugify(args.name)
    target = ROOT / "02-areas" / slug
    area_type = args.type if args.type in {"function", "client", "venture"} else "function"
    payload = {
        "kind": "area",
        "name": args.name,
        "area_type": area_type,
        "slug": slug,
        "target": rel(target),
        "overview": rel(target / "_overview.md"),
        "exists": target.exists(),
        "duplicates": duplicate_candidates(slug, "02-areas"),
        "related_projects": duplicate_candidates(slug, "03-projects"),
        "template": area_template(args.name, args.owner, area_type),
        "red_flags": [],
    }
    if args.write and not target.exists():
        target.mkdir(parents=True, exist_ok=True)
        (target / "_overview.md").write_text(payload["template"], encoding="utf-8")
        payload["written"] = True
    elif args.write:
        payload["written"] = False
        payload["red_flags"].append("target already exists; review before modifying")
    write_json(payload)


def new_project(args: argparse.Namespace) -> None:
    raw_slug = slugify(args.name)
    if args.month:
        slug = f"{args.month}-{raw_slug}"
    elif re.match(r"^\d{4}-\d{2}-", raw_slug):
        slug = raw_slug
    else:
        slug = f"{dt.date.today().strftime('%Y-%m')}-{raw_slug}"
    target = ROOT / "03-projects" / slug
    primary_area = args.area or ""
    related_areas = args.related_area or []
    payload = {
        "kind": "project",
        "name": args.name,
        "slug": slug,
        "target": rel(target),
        "overview": rel(target / "_overview.md"),
        "exists": target.exists(),
        "duplicates": duplicate_candidates(slug, "03-projects"),
        "primary_area": area_overview_link(primary_area) if primary_area else "none",
        "related_area_candidates": duplicate_candidates(slugify(primary_area), "02-areas") if primary_area else [],
        "related_areas": [area_overview_link(area) for area in related_areas],
        "template": project_template(args.name, primary_area, args.owner, related_areas),
        "red_flags": [],
    }
    if not primary_area:
        payload["red_flags"].append("primary_area is none; add a reason in the overview if this remains active")
    if args.write and not target.exists():
        target.mkdir(parents=True, exist_ok=True)
        (target / "_overview.md").write_text(payload["template"], encoding="utf-8")
        payload["written"] = True
    elif args.write:
        payload["written"] = False
        payload["red_flags"].append("target already exists; review before modifying")
    write_json(payload)


def _overview_rows(base: str) -> list[dict]:
    root = ROOT / base
    rows = []
    if not root.exists():
        return rows
    for child in sorted(p for p in root.iterdir() if p.is_dir() and not p.name.startswith(".")):
        overview = child / "_overview.md"
        if not overview.exists():
            continue
        parsed = parse_overview(overview)
        meta = parsed["meta"]
        related = meta.get("related_areas", [])
        rows.append({
            "slug": child.name,
            "title": parsed["title"],
            "path": rel(overview),
            "status": str(meta.get("status", "")),
            "container_type": str(meta.get("container_type", "")),
            "area_type": str(meta.get("area_type", "")),
            "primary_area": str(meta.get("primary_area", "")),
            "related_areas": related if isinstance(related, list) else [],
        })
    return rows


def build_work_map_payload() -> dict:
    areas = _overview_rows("02-areas")
    projects = _overview_rows("03-projects")
    lab = _overview_rows("90-lab")
    area_paths = {row["path"] for row in areas}
    warnings = []

    for project in projects:
        if project["status"] == "archived":
            continue
        primary = project.get("primary_area", "")
        if not primary:
            warnings.append({"path": project["path"], "issue": "active project missing primary_area"})
        elif primary != "none" and primary not in area_paths:
            warnings.append({"path": project["path"], "issue": f"primary_area target not found: {primary}"})

    for area in areas:
        area_dir = ROOT / "02-areas" / area["slug"]
        for nested in ["projects", "03-projects", "01-projects"]:
            if (area_dir / nested).exists():
                warnings.append({"path": rel(area_dir / nested), "issue": "nested project folder inside area"})

    return {
        "generated_at": dt.datetime.now().isoformat(timespec="seconds"),
        "areas": areas,
        "projects": projects,
        "lab": lab,
        "warnings": warnings,
    }


def _markdown_table(headers: list[str], rows: list[list[str]]) -> str:
    lines = ["| " + " | ".join(headers) + " |", "| " + " | ".join("---" for _ in headers) + " |"]
    lines.extend("| " + " | ".join(str(cell) for cell in row) + " |" for row in rows)
    return "\n".join(lines)


def render_work_map(payload: dict) -> str:
    area_rows = [[a["title"], a["status"], a.get("area_type") or "-", a["path"]] for a in payload["areas"]]
    project_rows = [[p["title"], p["status"], p.get("primary_area") or "-", p["path"]] for p in payload["projects"]]
    lab_rows = [[l["title"], l["status"], l["path"]] for l in payload["lab"]]
    warning_rows = [[w["path"], w["issue"]] for w in payload["warnings"]]
    return "\n\n".join([
        "# Workspace Index",
        f"last_updated: {dt.date.today().isoformat()}",
        f"generated_at: {payload['generated_at']}",
        "> Generated from `_overview.md` frontmatter. Do not edit by hand. Canonical truth stays in each overview.",
        "See [`work-map`](../.claude/skills/work-map/SKILL.md), [`primary area`](glossary.md#primary-area), and [`related areas`](glossary.md#related-areas).",
        "## Areas",
        _markdown_table(["Name", "Status", "Type", "Overview"], area_rows) if area_rows else "_No areas found._",
        "## Projects",
        _markdown_table(["Name", "Status", "Primary Area", "Overview"], project_rows) if project_rows else "_No projects found._",
        "## Lab",
        _markdown_table(["Name", "Status", "Overview"], lab_rows) if lab_rows else "_No lab items found._",
        "## Warnings",
        _markdown_table(["Path", "Issue"], warning_rows) if warning_rows else "_No relationship warnings._",
        "",
    ])


def work_map(args: argparse.Namespace) -> None:
    payload = build_work_map_payload()
    markdown = render_work_map(payload)
    if args.write:
        target = ROOT / "00-brain" / "workspace-index.md"
        target.write_text(markdown, encoding="utf-8")
        payload["written"] = rel(target)
    if args.markdown:
        print(markdown)
    else:
        write_json(payload)


def sensitivity(path: Path) -> list[str]:
    flags = []
    lower = path.name.lower()
    if lower in SECRET_NAMES or any(lower.endswith(suffix) for suffix in SECRET_SUFFIXES):
        flags.append("secret-like filename")
    text = read_text(path, 3000)
    if re.search(r"(api[_-]?key|secret|token|password|private key)", text, re.IGNORECASE):
        flags.append("secret-like content")
    if re.search(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", text, re.IGNORECASE):
        flags.append("email addresses")
    return flags


def classify_inbox_file(path: Path) -> dict:
    ext = path.suffix.lower()
    name = path.name.lower()
    flags = sensitivity(path)
    if flags:
        destination = "Red: leave in inbox until reviewed"
    elif ext in {".csv", ".json", ".xlsx"}:
        destination = "owning area/project data/"
    elif ext in {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".fig"}:
        destination = "owning area/project assets/"
    elif ext in {".py", ".js", ".ts", ".tsx", ".sh"}:
        destination = "90-lab/<tool>/ or owning scripts/"
    elif any(word in name for word in ["transcript", "research", "notes"]):
        destination = "owning project research/ or 00-brain if durable truth"
    elif ext in {".md", ".txt", ".docx", ".pdf"}:
        destination = "classify by content: brain, area, project, or external link"
    else:
        destination = "manual classification"
    return {
        "path": rel(path),
        "extension": ext or "(none)",
        "size_bytes": path.stat().st_size if path.exists() else None,
        "sensitivity": flags,
        "suggested_destination": destination,
    }


def inbox_plan(_: argparse.Namespace) -> None:
    inbox = ROOT / "01-inbox"
    files = []
    if inbox.exists():
        for path in sorted(p for p in inbox.rglob("*") if p.is_file()):
            files.append(classify_inbox_file(path))
    write_json(
        {
            "inbox": rel(inbox),
            "file_count": len(files),
            "files": files,
            "next_actions": [
                "Read only enough content to confirm each suggested destination.",
                "Move obvious Green files; leave Red or ambiguous files in inbox with the decision needed.",
                "Archive processed scratch under 99-archive/01-inbox/ with original paths preserved.",
            ],
        }
    )


def cleanup_plan(_: argparse.Namespace) -> None:
    root_items = [
        rel(path)
        for path in sorted(ROOT.iterdir())
        if path.name not in TOP_LEVEL
        and path.name
        not in {".claude", ".codex", ".git", ".gitignore", ".env", ".env.example", ".envrc", ".mcp.json", ".mcp.json.example", "AGENTS.md", "CLAUDE.md", "README.md", "GETTING-STARTED.md"}
    ]
    empty_dirs = []
    for base in ["01-inbox", "02-areas", "03-projects", "90-lab"]:
        root = ROOT / base
        if not root.exists():
            continue
        for path in sorted(p for p in root.rglob("*") if p.is_dir()):
            if any(part in IGNORE_DIRS for part in path.parts):
                continue
            try:
                if not any(path.iterdir()):
                    empty_dirs.append(rel(path))
            except OSError:
                pass
    payload = {
        "doctor": run_doctor(),
        "root_clutter_candidates": root_items,
        "containers": {
            "areas": list_containers("02-areas"),
            "projects": list_containers("03-projects"),
            "lab": list_containers("90-lab"),
        },
        "empty_dirs": empty_dirs[:100],
        "next_actions": [
            "Fix doctor errors first.",
            "Process inbox with inbox-plan.",
            "Add missing _overview.md files when obvious.",
            "Archive stale scratch only when reversible.",
            "Search skills/rules for overlap before creating new system pieces.",
        ],
    }
    write_json(payload)


def _recent_activity(folder: Path, days: int = 30) -> bool:
    cutoff = dt.datetime.now().timestamp() - days * 86400
    try:
        for path in folder.rglob("*"):
            if any(part in IGNORE_DIRS for part in path.parts):
                continue
            if path.is_file() and path.stat().st_mtime >= cutoff:
                return True
    except OSError:
        return False
    return False


def _mcp_server_names(mcp_path: Path) -> list[str]:
    """Extract server names from .mcp.json without exposing secret values."""
    try:
        data = json.loads(mcp_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return []
    servers = data.get("mcpServers") or data.get("servers") or {}
    if isinstance(servers, dict):
        return sorted(servers.keys())
    return []


def _env_template_keys(env_example: Path) -> list[str]:
    """Extract key names from .env.example. Never reads .env itself."""
    if env_example.name != ".env.example":
        return []
    keys = []
    try:
        for line in env_example.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                keys.append(line.split("=", 1)[0].strip())
    except OSError:
        pass
    return keys


def _auto_memory_path(source: Path) -> str:
    """Derive Claude Code auto-memory location for a workspace path.

    Claude Code slugifies the absolute path by replacing every non-alphanumeric
    character with `-`. For example: `/Users/gael/Code/prompting lab` →
    `-Users-gael-Code-prompting-lab`.
    """
    home = Path.home()
    slug = re.sub(r"[^A-Za-z0-9]+", "-", str(source)).strip("-")
    slug = "-" + slug
    return str(home / ".claude-gael" / "projects" / slug / "memory")


# Source containers whose immediate children are individual units of work.
# Enumerating these is what turns the audit into a complete worklist: a big
# workspace has dozens of these folders, and each one must get its own
# migrate/link/archive/ignore decision instead of being surveyed in bulk.
WORK_CONTAINERS = {
    "01-projects": "project",
    "03-projects": "project",
    "02-areas": "area",
    "90-lab": "lab",
    "apps": "lab",
    "04-membership-items": "membership",
}


def _folder_stats(folder: Path) -> tuple[int, int, float]:
    """Return (file_count, subdir_count, latest_mtime) ignoring IGNORE_DIRS."""
    file_count = 0
    subdir_count = 0
    latest = 0.0
    try:
        for path in folder.rglob("*"):
            if any(part in IGNORE_DIRS for part in path.parts):
                continue
            if path.is_file():
                file_count += 1
                try:
                    latest = max(latest, path.stat().st_mtime)
                except OSError:
                    pass
            elif path.is_dir():
                subdir_count += 1
    except OSError:
        pass
    return file_count, subdir_count, latest


def _work_items(source: Path) -> list[dict]:
    """Enumerate every individual area/project/lab/membership folder in the
    source. Top-level PARA containers only tell you a category exists; this
    tells you exactly which folders must each receive a decision, so a large
    workspace cannot be quietly under-migrated by surveying it in bulk."""
    items = []
    now = dt.datetime.now().timestamp()
    for container, kind in WORK_CONTAINERS.items():
        base = source / container
        if not base.exists() or not base.is_dir():
            continue
        for child in sorted(base.iterdir()):
            if not child.is_dir() or child.name in IGNORE_DIRS or child.name.startswith("."):
                continue
            file_count, subdir_count, latest = _folder_stats(child)
            has_overview = any(
                (child / n).exists() for n in ("_overview.md", "status.md", "README.md")
            )
            age_days = int((now - latest) / 86400) if latest else None
            items.append({
                "path": str(child.relative_to(source)),
                "kind": kind,
                "file_count": file_count,
                "subdir_count": subdir_count,
                "has_overview": has_overview,
                "recent_activity_30d": bool(latest and (now - latest) <= 30 * 86400),
                "recent_activity_90d": bool(latest and (now - latest) <= 90 * 86400),
                "days_since_modified": age_days,
            })
    return items


def migration_audit(args: argparse.Namespace) -> None:
    source = Path(args.source).expanduser().resolve()
    if not source.exists() or not source.is_dir():
        write_json({"source": str(source), "error": "source directory does not exist"})
        return

    top = []
    for child in sorted(source.iterdir()):
        if child.name in IGNORE_DIRS:
            continue
        top.append({"name": child.name, "type": "dir" if child.is_dir() else "file"})

    instruction_files = [
        str((source / name).relative_to(source))
        for name in ["CLAUDE.md", "AGENTS.md", "GEMINI.md", "README.md"]
        if (source / name).exists()
    ]

    # Skills under .claude/skills and .agents/skills
    skill_files = []
    for base in [source / ".claude" / "skills", source / ".agents" / "skills"]:
        if base.exists():
            skill_files.extend(str(p.relative_to(source)) for p in sorted(base.glob("*/SKILL.md")))

    # Rules under .claude/rules and .agents/rules
    rule_files = []
    for base in [source / ".claude" / "rules", source / ".agents" / "rules"]:
        if base.exists():
            rule_files.extend(str(p.relative_to(source)) for p in sorted(base.glob("*.md")))

    # Hooks under .claude/hooks, .codex/hooks, and hook scripts under .claude/scripts
    hook_files = []
    for base in [source / ".claude" / "hooks", source / ".codex" / "hooks", source / ".agents" / "hooks"]:
        if base.exists():
            hook_files.extend(str(p.relative_to(source)) for p in sorted(base.glob("*")) if p.is_file())

    # Scripts
    script_files = []
    for base in [source / ".claude" / "scripts", source / ".codex" / "scripts"]:
        if base.exists():
            script_files.extend(str(p.relative_to(source)) for p in sorted(base.glob("*")) if p.is_file())

    # Commands
    command_files = []
    for base in [source / ".claude" / "commands", source / ".agents" / "commands"]:
        if base.exists():
            command_files.extend(str(p.relative_to(source)) for p in sorted(base.glob("*")) if p.is_file())

    # MCP server names only (never values)
    mcp_servers = []
    for mcp_name in [".mcp.json"]:
        mcp_path = source / mcp_name
        if mcp_path.exists():
            mcp_servers.extend(_mcp_server_names(mcp_path))

    # .env.example template keys only
    env_template_keys = _env_template_keys(source / ".env.example")

    # Knowledge / durable-context directories
    knowledge_dirs = []
    for name in [".basic-memory", "brain", "context", "knowledge", "agent-docs", "03-resources", "05-context"]:
        path = source / name
        if path.exists() and path.is_dir():
            knowledge_dirs.append({
                "path": str(path.relative_to(source)),
                "recent_activity_30d": _recent_activity(path, 30),
            })

    # Legacy PARA-style folders
    para_dirs = []
    for name in [
        "01-inbox", "01-projects", "02-areas", "03-resources",
        "04-membership-items", "05-context", "90-lab", "99-archive", "outputs",
    ]:
        path = source / name
        if path.exists() and path.is_dir():
            para_dirs.append({
                "path": str(path.relative_to(source)),
                "recent_activity_30d": _recent_activity(path, 30),
                "recent_activity_90d": _recent_activity(path, 90),
            })

    # Individual work folders — the complete worklist for active-work migration.
    work_items = _work_items(source)

    # Notion mirror files (a strong signal of "don't copy as truth")
    notion_mirror_files = sorted(
        str(p.relative_to(source))
        for p in source.rglob("_notion.md")
        if not any(part in IGNORE_DIRS for part in p.parts)
    )[:200]

    # Auto-memory path (derived; does not require the folder to exist)
    auto_memory_path = _auto_memory_path(source)
    auto_memory_exists = Path(auto_memory_path).exists()

    # Red flags — secret-bearing files. Never read their contents.
    red_flags = []
    for pattern in [".env", "*.pem", "*.key", "*.p12", "*.pfx", "settings.local.json"]:
        red_flags.extend(str(p.relative_to(source)) for p in source.glob(pattern))
    # .mcp.json is sensitive (may contain inline secrets) but its server names are extracted above
    if (source / ".mcp.json").exists():
        red_flags.append(".mcp.json")

    categories_detected = {
        "business_context": bool(instruction_files) or bool(knowledge_dirs),
        "active_work": any(d.get("recent_activity_30d") for d in para_dirs),
        "skills": bool(skill_files),
        "rules": bool(rule_files),
        "hooks": bool(hook_files),
        "scripts": bool(script_files),
        "commands": bool(command_files),
        "mcp_servers": bool(mcp_servers),
        "env_template": bool(env_template_keys),
        "auto_memory": auto_memory_exists,
        "notion_mirror": bool(notion_mirror_files),
        "para_layout": bool(para_dirs),
        "secrets_present": bool(red_flags),
    }

    payload = {
        "source": str(source),
        "instruction_files": instruction_files,
        "top_level": top,
        "skill_files": skill_files,
        "rule_files": rule_files,
        "hook_files": hook_files,
        "script_files": script_files,
        "command_files": command_files,
        "mcp_servers": mcp_servers,
        "env_template_keys": env_template_keys,
        "knowledge_dirs": knowledge_dirs,
        "para_dirs": para_dirs,
        "work_items": work_items,
        "work_item_count": len(work_items),
        "notion_mirror_files": notion_mirror_files,
        "auto_memory_path": auto_memory_path,
        "auto_memory_exists": auto_memory_exists,
        "red_flags": red_flags,
        "categories_detected": categories_detected,
        "classification_hints": {
            "brain_truth": "instruction files, knowledge_dirs entries, customer/offer/voice docs",
            "active_area": "para_dirs with recent_activity_30d=true under 02-areas",
            "active_project": "para_dirs with recent_activity_30d=true under 01-projects or 03-projects",
            "lab_app": "local app/dashboard/prototype folders (often under 02-areas/<x>/apps or /apps)",
            "workflow_skill": "skill_files — apply the porting matrix in SKILL.md",
            "rule": "rule_files — merge into target .claude/rules/ instead of porting parallel",
            "hook": "hook_files — port only after rewriting source-specific paths",
            "mcp_server": "mcp_servers — port config shape into target .mcp.json, secrets re-added by user",
            "memory_preference": "auto_memory_path contents — extract durable preferences only",
            "external_link": "notion_mirror_files, Drive/Slack/CRM references — link, never copy",
            "ignore": "caches, generated outputs, dependency folders, stale drafts, secret files",
        },
        "next_actions": [
            "Do not mutate the source workspace.",
            "Do not read, copy, or echo red_flags. Treat .env / *.pem / *.key / settings.local.json as opaque.",
            "Use mcp_servers and env_template_keys to plan target .mcp.json and .env.example updates without touching source secrets.",
            "Treat notion_mirror_files as link-only candidates; never copy them as local truth.",
            "Use recent_activity_30d / 90d flags to decide active vs zombie work; ask before migrating anything stale.",
            "work_items is the complete active-work worklist: every entry must get exactly one decision. For 6+ items, run migration-dispatch to fan the deep read across subagents instead of reading folders one-by-one in the main thread.",
            "Use this audit to decide what to inspect deeply; do not copy wholesale.",
        ],
    }
    write_json(payload)


MIGRATION_DISPATCH_PROMPT = """You are scrubbing a batch of folders from a SOURCE workspace being migrated into Claude WorkOS. The source is READ-ONLY — never edit, move, rename, or create files inside it.

SOURCE WORKSPACE ROOT: {source}

YOUR BATCH — read each folder deeply. Open its `_overview.md` / `README.md` / `status.md` and a representative sample of the real content; do not classify from the folder name alone:
{folder_block}

For EACH folder, return a decision. Be thorough and conservative: every folder in your batch MUST get exactly one class, and when torn between active and archive, prefer archive-reference with low confidence rather than dropping it.

Fields per folder:
1. `class`: active-area | active-project | lab-app | external-link | archive-reference | ignore
   - active-area: ongoing function with genuine current relevance.
   - active-project: finish-line work still in flight.
   - lab-app: dashboard / tool / prototype / app.
   - external-link: a Notion/Drive/Slack/CRM mirror (e.g. contains `_notion.md`) — link, never copy.
   - archive-reference: real past work with no current activity — leave in source, link only.
   - ignore: caches, generated output, dependency folders, empty/stale scratch, duplicates.
2. `target_path`: WorkOS destination (`02-areas/<slug>/`, `03-projects/<slug>/`, `90-lab/<slug>/`), or null for external-link / archive-reference / ignore.
3. `carry_context`: the minimal canonical context the new `_overview.md` needs to run (active drafts, current decisions, live research). DESCRIBE it — do not paste raw file dumps, logs, or transcripts.
4. `provenance`: the source path to link back to for history.
5. `evidence`: 1-2 concrete lines (recency, overview present, what you read).
6. `confidence`: high | medium | low.

Echo each `source_path` EXACTLY as written in the batch list above (relative to the source root). Do not absolutize, rename, or reformat it — the migration's coverage check matches on this exact string, and an altered path reads as a dropped folder.

Output JSON only, no prose:
[
  {{"source_path": "...", "class": "...", "target_path": "... or null", "carry_context": "...", "provenance": "...", "evidence": "...", "confidence": "..."}}
]
"""


def migration_dispatch(args: argparse.Namespace) -> None:
    """Batch the enumerated work_items into per-subagent assignments so the deep,
    folder-by-folder read can fan out in parallel instead of exhausting the main
    thread's context on a large workspace. Mirrors the atomicity-plan pattern."""
    source = Path(args.source).expanduser().resolve()
    if not source.exists() or not source.is_dir():
        write_json({"source": str(source), "error": "source directory does not exist"})
        return
    batch_size = max(1, int(getattr(args, "batch_size", 6) or 6))
    items = _work_items(source)
    batches = [items[i:i + batch_size] for i in range(0, len(items), batch_size)]
    dispatch = []
    for idx, batch in enumerate(batches):
        folder_block = "\n".join(
            f"- {it['path']} (kind={it['kind']}, files={it['file_count']}, "
            f"has_overview={it['has_overview']}, active_30d={it['recent_activity_30d']}, "
            f"active_90d={it['recent_activity_90d']})"
            for it in batch
        )
        dispatch.append({
            "batch": idx + 1,
            "folder_count": len(batch),
            "source_paths": [it["path"] for it in batch],
            "prompt": MIGRATION_DISPATCH_PROMPT.format(source=str(source), folder_block=folder_block),
        })
    payload = {
        "source": str(source),
        "work_item_count": len(items),
        "batch_size": batch_size,
        "batch_count": len(dispatch),
        "model": "sonnet",
        "subagent_type": "research-reviewer",
        "dispatch": dispatch,
        "next_actions": [
            "If work_item_count is 0, the source has no PARA work folders — skip dispatch and inspect top_level manually.",
            "Fan out one Agent call per batch in a single message (parallel). Pass subagent_type=research-reviewer and model=sonnet.",
            "Each subagent reads its folders READ-ONLY and returns one JSON decision per folder.",
            "Aggregate every decision into the coverage ledger: each work item appears exactly once with one class. Counts must reconcile (decisions == work_item_count). Normalize source_path (strip the source-root prefix) before matching — subagents may echo absolute paths, which would otherwise read as dropped folders.",
            "Then apply references/02-active-work.md: scaffold active items with a single bulk-create confirmation, link external mirrors, archive-reference zombies. Nothing is silently dropped.",
        ],
    }
    write_json(payload)


def _workspace_signals(path: Path) -> dict:
    """Return signals indicating `path` is a Claude-flavored workspace.

    No file content is read; we only stat directory entries. Safe to run over
    sibling dirs without leaking anything from inside them.
    """
    if not path.is_dir():
        return {}
    signals = {}
    strong = [".claude/skills", ".claude/rules", ".basic-memory"]
    medium = ["CLAUDE.md", "AGENTS.md", "GEMINI.md", ".agents", ".codex", ".cursor",
              "01-projects", "02-areas", "03-projects", "03-resources",
              "04-membership-items", "00-brain", "01-inbox", "90-lab"]
    weak = [".claude", ".mcp.json", ".env.example"]
    matched_strong = [s for s in strong if (path / s).exists()]
    matched_medium = [s for s in medium if (path / s).exists()]
    matched_weak = [s for s in weak if (path / s).exists()]
    score = 3 * len(matched_strong) + 2 * len(matched_medium) + len(matched_weak)
    if score == 0:
        return {}
    signals["strong"] = matched_strong
    signals["medium"] = matched_medium
    signals["weak"] = matched_weak
    signals["score"] = score
    return signals


def discover_workspaces(_: argparse.Namespace) -> None:
    """Scan likely locations for existing Claude/Codex/Cursor workspaces."""
    home = Path.home()
    candidate_roots = [
        ROOT.parent,
        home / "Code",
        home / "code",
        home / "Projects",
        home / "projects",
        home / "Workspaces",
        home / "workspaces",
        home / "Documents",
        home / "dev",
        home / "src",
    ]
    seen = set()
    candidates = []
    for root in candidate_roots:
        if not root.exists() or not root.is_dir():
            continue
        try:
            children = sorted(root.iterdir())
        except PermissionError:
            continue
        for child in children:
            if child == ROOT or child.name.startswith("."):
                continue
            if child in seen:
                continue
            seen.add(child)
            signals = _workspace_signals(child)
            if not signals:
                continue
            candidates.append({
                "path": str(child),
                "name": child.name,
                "score": signals["score"],
                "strong_signals": signals["strong"],
                "medium_signals": signals["medium"],
                "weak_signals": signals["weak"],
            })
    candidates.sort(key=lambda c: c["score"], reverse=True)
    payload = {
        "scanned_roots": [str(r) for r in candidate_roots if r.exists()],
        "this_workspace": str(ROOT),
        "candidates": candidates[:25],
        "next_actions": [
            "Show high-score candidates to the founder; ask which (if any) to mine.",
            "For an approved candidate, hand off to the migrate-existing-workspace skill with that path.",
            "Do not read inside candidate workspaces from this script — only structural signals were collected.",
        ],
    }
    write_json(payload)


CANONICAL_CONCEPTS_PATH = "00-brain/canonical-concepts.md"
ATOMICITY_SCOPES = [
    {
        "name": "rules-and-constitution",
        "globs": [".claude/rules/*.md", "AGENTS.md", "CLAUDE.md"],
    },
    {
        "name": "brain",
        "globs": ["00-brain/*.md", "00-brain/integrations/*.md"],
    },
]
ATOMICITY_PROMPT_TEMPLATE = """You are auditing one WorkOS sub-folder for paraphrased restatements of canonical concepts.

SCOPE: {scope_name}

CANONICAL CONCEPT REGISTRY (read this first — it lists every canonical concept and its home):
00-brain/canonical-concepts.md

TARGET FILES (only files modified within the last {window_days} days):
{target_files}

Steps:
1. Read `00-brain/canonical-concepts.md`. For each registered concept, note its name and canonical home (file + heading).
2. Read each target file above.
3. For each target file, find passages that restate one of the registered canonical concepts' behavior in different words but do NOT contain a markdown link to that concept's canonical home (look for `[...](<canonical-basename>)` anywhere in the same section).

Output JSON only, no prose:
[
  {{
    "target_file": "path/from/repo-root.md",
    "section_heading": "## ...",
    "restated_text": "exact quote, <=200 chars",
    "canonical_concept": "name from the registry",
    "canonical_home": "path#anchor from the registry",
    "suggested_fix": "replace with link to canonical home, or trim to file-specific bits"
  }}
]

Rules:
- Return [] if nothing found. Be conservative; false positives waste reviewer time.
- Do NOT flag passages already linking to the canonical home.
- Do NOT flag file-specific additions (specializations the canonical doesn't cover).
- Do NOT flag bare concept mentions ("voice", "Notion") -- only behavioral restatements ("ask before X", "use Y when Z").
- Do NOT flag the canonical home itself if it appears in the target list.
- Skip files where you don't see any restatement candidates -- omit them from output.
"""


def atomicity_plan(args: argparse.Namespace) -> None:
    """Output a dispatch plan for Haiku subagents to scan WorkOS sub-folders for
    paraphrased restatements of canonical concepts. One subagent per scope
    (rules+constitution, brain). Only files modified within --window-days are
    included to bound cost.
    """
    window_days = max(1, int(getattr(args, "window_days", 7) or 7))
    cutoff = dt.datetime.now().timestamp() - window_days * 86400

    def recent_files(globs: list[str]) -> list[str]:
        out: set[str] = set()
        for pattern in globs:
            for path in ROOT.glob(pattern):
                if not path.is_file():
                    continue
                try:
                    if path.stat().st_mtime >= cutoff:
                        out.add(rel(path))
                except OSError:
                    continue
        return sorted(out)

    # Always include canonical-concepts.md in every subagent's reading even if
    # not recently modified — it's the registry they need to look up.
    dispatch = []
    for scope in ATOMICITY_SCOPES:
        targets = [t for t in recent_files(scope["globs"]) if t != CANONICAL_CONCEPTS_PATH]
        if not targets:
            continue
        dispatch.append({
            "scope": scope["name"],
            "window_days": window_days,
            "target_files": targets,
            "prompt": ATOMICITY_PROMPT_TEMPLATE.format(
                scope_name=scope["name"],
                window_days=window_days,
                target_files="\n".join(f"- {t}" for t in targets),
            ),
        })

    payload = {
        "window_days": window_days,
        "scope_count": len(dispatch),
        "total_target_files": sum(len(d["target_files"]) for d in dispatch),
        "model": "haiku",
        "subagent_type": "research-reviewer",
        "dispatch": dispatch,
        "next_actions": [
            "If dispatch is empty, no files changed in the window -- report and exit.",
            "Otherwise fan out one Agent call per scope in a single message (parallel).",
            "Pass `model: haiku` and `subagent_type: research-reviewer` on each.",
            "Aggregate JSON findings; propose link-conversion edits as Green/Yellow.",
        ],
    }
    write_json(payload)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("setup-audit")
    p.set_defaults(func=setup_audit)

    p = sub.add_parser("discover-workspaces")
    p.set_defaults(func=discover_workspaces)

    p = sub.add_parser("new-area")
    p.add_argument("name")
    p.add_argument("--owner", default="TBD")
    p.add_argument("--type", default="function", choices=["function", "client", "venture"], help="Area type.")
    p.add_argument("--write", action="store_true")
    p.set_defaults(func=new_area)

    p = sub.add_parser("new-project")
    p.add_argument("name")
    p.add_argument("--area", default="")
    p.add_argument("--related-area", action="append", default=[])
    p.add_argument("--owner", default="TBD")
    p.add_argument("--month", default="", help="YYYY-MM prefix. Defaults to current month.")
    p.add_argument("--write", action="store_true")
    p.set_defaults(func=new_project)

    p = sub.add_parser("work-map")
    p.add_argument("--json", action="store_true", help="Print JSON output. This is the default.")
    p.add_argument("--write", action="store_true", help="Write generated markdown to 00-brain/workspace-index.md.")
    p.add_argument("--markdown", action="store_true", help="Print markdown instead of JSON.")
    p.set_defaults(func=work_map)

    p = sub.add_parser("inbox-plan")
    p.set_defaults(func=inbox_plan)

    p = sub.add_parser("cleanup-plan")
    p.set_defaults(func=cleanup_plan)

    p = sub.add_parser("atomicity-plan")
    p.add_argument("--window-days", type=int, default=7, help="Only include files modified within the last N days (default 7).")
    p.set_defaults(func=atomicity_plan)

    p = sub.add_parser("migration-audit")
    p.add_argument("source")
    p.set_defaults(func=migration_audit)

    p = sub.add_parser("migration-dispatch")
    p.add_argument("source")
    p.add_argument("--batch-size", type=int, default=6, help="Work folders per subagent batch (default 6).")
    p.set_defaults(func=migration_dispatch)

    args = parser.parse_args()
    args.func(args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
