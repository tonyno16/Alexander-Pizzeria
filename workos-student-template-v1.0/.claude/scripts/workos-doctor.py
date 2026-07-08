#!/usr/bin/env python3
"""Read-only health scanner for Claude WorkOS workspaces."""

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
REQUIRED_TOP = ["00-brain", "01-inbox", "02-areas", "03-projects", "90-lab", "99-archive"]
FORBIDDEN_TOP = ["01-projects", "03-resources", "04-membership-items", "05-context"]
OVERVIEW_REQUIRED = [
    "status:",
    "owner:",
    "claude_role:",
    "last_updated:",
    "## Purpose",
    "## Load First",
    "## Housekeeping",
    "## Archive Criteria",
]
STALE_DAYS = 14

# Global rules load on every turn. Progressive disclosure: keep them as routers
# (posture + triggers + pointers), push detail into path-scoped rules, brain files,
# or skills. Soft warning above this threshold — load-bearing exceptions allowed
# but must be justified, not accepted by default. See rule-authoring.md.
GLOBAL_RULE_SOFT_MAX_LINES = 60


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def add(findings: list[dict], severity: str, check: str, path: Path | str, message: str) -> None:
    findings.append({"severity": severity, "check": check, "path": str(path), "message": message})


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return ""


def parse_overview_meta(path: Path) -> dict[str, object]:
    """Parse the small metadata subset used in WorkOS overviews."""
    text = read_text(path)
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
    return meta


def parse_date(value: str) -> dt.date | None:
    try:
        return dt.date.fromisoformat(value.strip())
    except ValueError:
        return None


def slugify_heading(heading: str) -> str:
    """GitHub-style heading slug: lowercase, strip punctuation (keep word chars,
    spaces, hyphens), spaces -> hyphens. Used to validate `#anchor` links."""
    text = heading.strip().lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    return text.strip("-")


def heading_slugs(text: str) -> set[str]:
    slugs: set[str] = set()
    for level, heading in re.findall(r"^(#{1,6})\s+(.+?)\s*#*$", text, flags=re.MULTILINE):
        slugs.add(slugify_heading(heading))
    return slugs


def git_ignored(path: str) -> bool:
    try:
        result = subprocess.run(
            ["git", "check-ignore", "-q", path],
            cwd=ROOT,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
        return result.returncode == 0
    except FileNotFoundError:
        return False


def iter_work_containers() -> list[Path]:
    containers: list[Path] = []
    for base_name in ["02-areas", "03-projects", "90-lab"]:
        base = ROOT / base_name
        if not base.exists():
            continue
        for child in sorted(p for p in base.iterdir() if p.is_dir() and not p.name.startswith(".")):
            containers.append(child)
            apps = child / "apps"
            if apps.exists():
                containers.extend(sorted(p for p in apps.iterdir() if p.is_dir()))
    return containers


def check_top_level(findings: list[dict]) -> None:
    for name in REQUIRED_TOP:
        if not (ROOT / name).is_dir():
            add(findings, "error", "top-level", name, "Required WorkOS folder is missing.")
    for name in FORBIDDEN_TOP:
        if (ROOT / name).exists():
            add(findings, "warning", "top-level", name, "Old PARA-style folder exists in this WorkOS.")
    allowed = set(REQUIRED_TOP) | {".claude", ".codex", ".git", "README.md", "GETTING-STARTED.md", "CLAUDE.md", "AGENTS.md", ".gitignore", ".env", ".env.example", ".envrc", ".mcp.json"}
    for item in sorted(ROOT.iterdir()):
        if item.name.startswith(".") and item.name not in {".claude", ".codex", ".git", ".gitignore", ".env", ".env.example", ".envrc", ".mcp.json"}:
            continue
        if item.name not in allowed:
            add(findings, "warning", "root-clutter", rel(item), "Unexpected root item. Confirm it belongs here.")


def check_overviews(findings: list[dict]) -> None:
    today = dt.datetime.now().date()
    for container in iter_work_containers():
        overview = container / "_overview.md"
        if not overview.exists():
            add(findings, "error", "overview", rel(container), "Work container is missing _overview.md.")
            continue
        text = read_text(overview)
        for marker in OVERVIEW_REQUIRED:
            if marker not in text:
                add(findings, "warning", "overview", rel(overview), f"Missing overview field/section: {marker}")
        match = re.search(r"^last_updated:\s*(.+)$", text, flags=re.MULTILINE)
        if match:
            parsed = parse_date(match.group(1))
            if parsed is None:
                add(findings, "warning", "stale", rel(overview), "last_updated is not an ISO date.")
            elif (today - parsed).days > STALE_DAYS:
                add(findings, "warning", "stale", rel(overview), f"last_updated is older than {STALE_DAYS} days.")


def check_work_map_relationships(findings: list[dict]) -> None:
    areas_root = ROOT / "02-areas"
    projects_root = ROOT / "03-projects"
    if not areas_root.exists() or not projects_root.exists():
        return

    area_paths = set()
    for area in sorted(p for p in areas_root.iterdir() if p.is_dir() and not p.name.startswith(".")):
        overview = area / "_overview.md"
        if overview.exists():
            area_paths.add(rel(overview))
        for nested in ["projects", "03-projects", "01-projects"]:
            if (area / nested).exists():
                add(findings, "warning", "work-map", rel(area / nested), "Nested project folder inside an area. Prefer root 03-projects/ with primary_area metadata.")

    for project in sorted(p for p in projects_root.iterdir() if p.is_dir() and not p.name.startswith(".")):
        overview = project / "_overview.md"
        if not overview.exists():
            continue
        meta = parse_overview_meta(overview)
        if str(meta.get("status", "")).lower() == "archived":
            continue
        primary = str(meta.get("primary_area", ""))
        if not primary:
            add(findings, "warning", "work-map", rel(overview), "Active project is missing primary_area metadata.")
        elif primary != "none" and primary not in area_paths:
            add(findings, "warning", "work-map", rel(overview), f"primary_area target not found: {primary}")

    index = ROOT / "00-brain" / "workspace-index.md"
    if index.exists():
        text = read_text(index)
        if "Generated from `_overview.md` frontmatter" not in text:
            add(findings, "warning", "work-map", rel(index), "Workspace index exists but is missing the generated-file notice.")
        latest_overview_mtime = 0.0
        for base in [areas_root, projects_root, ROOT / "90-lab"]:
            if not base.exists():
                continue
            for overview in base.glob("*/_overview.md"):
                latest_overview_mtime = max(latest_overview_mtime, overview.stat().st_mtime)
        if latest_overview_mtime > index.stat().st_mtime:
            add(findings, "warning", "work-map", rel(index), "Generated workspace index is older than one or more overviews. Regenerate with /work-map when you need a current view.")


def check_current_state(findings: list[dict]) -> None:
    """current-state.md drives session planning. Stale = sessions plan against old priorities."""
    today = dt.datetime.now().date()
    current_state = ROOT / "00-brain" / "current-state.md"
    if not current_state.exists():
        add(findings, "warning", "stale", "00-brain/current-state.md", "Missing — sessions have no current priorities anchor.")
        return
    text = read_text(current_state)
    match = re.search(r"^last_updated:\s*(.+)$", text, flags=re.MULTILINE)
    if not match:
        add(findings, "warning", "stale", "00-brain/current-state.md", "Missing last_updated field.")
        return
    parsed = parse_date(match.group(1))
    if parsed is None:
        add(findings, "warning", "stale", "00-brain/current-state.md", "last_updated is not an ISO date.")
        return
    age = (today - parsed).days
    if age > 30:
        add(findings, "error", "stale", "00-brain/current-state.md", f"last_updated is {age} days old. Refresh before planning.")
    elif age > STALE_DAYS:
        add(findings, "warning", "stale", "00-brain/current-state.md", f"last_updated is {age} days old.")


def check_brain_metadata(findings: list[dict]) -> None:
    """Top-level brain files should carry a `last_updated:` line so a session can see
    recency at a glance. Presence only — durable identity files (business-profile,
    workos-principles) are stable by design, so age is NOT warned here. Freshness is
    enforced only on current-state.md (see check_current_state)."""
    brain = ROOT / "00-brain"
    if not brain.exists():
        return
    for md in sorted(brain.glob("*.md")):
        if md.name == "README.md":
            continue
        text = read_text(md)
        if not text:
            continue
        if not re.search(r"^last_updated:\s*(.+)$", text, flags=re.MULTILINE):
            add(findings, "warning", "brain", rel(md), "Missing last_updated field — add one so recency is visible.")


def check_links(findings: list[dict]) -> None:
    link_re = re.compile(r"\[[^\]]+\]\((?!https?://|mailto:)([^)#]+)(#[^)]+)?\)")
    # Skip scrape/input folders: relative links in unprocessed markdown often point to
    # upstream-repo paths, not workspace docs, and would flood findings with false positives.
    # 99-archive is a frozen rollback buffer — its links point at since-moved paths by design.
    skip_dirs = {".git", "node_modules", "raw", "data", "research", "99-archive"}
    heading_cache: dict[Path, set[str]] = {}
    for md in sorted(ROOT.rglob("*.md")):
        if any(part in skip_dirs or part.endswith("-backup") for part in md.parts):
            continue
        text = read_text(md)
        # Strip fenced blocks and inline code spans so link-shaped examples inside code
        # (e.g. `[memory-authoring.md](memory-authoring.md)` in a doc) don't register as
        # broken links. Anchor validation below still reads the real target file.
        scan = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
        scan = re.sub(r"`[^`]*`", "", scan)
        for target, anchor in link_re.findall(scan):
            cleaned = target.replace("%20", " ")
            # Strip a trailing :line (and optional :col) suffix used as a line anchor (file.md:65).
            cleaned = re.sub(r":\d+(?::\d+)?$", "", cleaned)
            path = Path(cleaned)
            if path.is_absolute():
                resolved = path if path.exists() else None
            else:
                candidate = md.parent / path
                if candidate.exists():
                    resolved = candidate
                elif (ROOT / path).exists():
                    resolved = ROOT / path
                else:
                    resolved = None
            if resolved is None:
                add(findings, "warning", "link", rel(md), f"Possible broken local link: {target}")
                continue
            # Anchor validation: if the link targets a heading in a workspace .md file,
            # confirm the heading exists. Stale anchors (renamed headings) are otherwise
            # invisible — the most common atomic-truth link rot.
            if anchor and resolved.is_file() and resolved.suffix == ".md":
                slug = anchor[1:]  # drop leading '#'
                if resolved not in heading_cache:
                    heading_cache[resolved] = heading_slugs(read_text(resolved))
                if slug and slug not in heading_cache[resolved]:
                    add(findings, "warning", "anchor", rel(md), f"Link anchor not found in target: {target}{anchor}")


def check_rules(findings: list[dict]) -> None:
    rules_dir = ROOT / ".claude" / "rules"
    if not rules_dir.exists():
        add(findings, "error", "rules", ".claude/rules", "Rules directory is missing.")
        return
    for name in ["work-containers.md", "lab-apps.md", "rule-management.md", "security.md"]:
        if not (rules_dir / name).exists():
            add(findings, "warning", "rules", f".claude/rules/{name}", "Expected rule file is missing.")
    for rule in sorted(rules_dir.rglob("*.md")):
        text = read_text(rule)
        has_paths_frontmatter = False
        if text.startswith("---"):
            end = text.find("\n---", 3)
            if end == -1 or "paths:" not in text[:end]:
                add(findings, "warning", "rules", rel(rule), "Frontmatter exists but no paths: key was found.")
            else:
                has_paths_frontmatter = True
        if not has_paths_frontmatter:
            lines = text.count("\n") + 1
            if lines > GLOBAL_RULE_SOFT_MAX_LINES:
                add(
                    findings,
                    "warning",
                    "global-rule-density",
                    rel(rule),
                    f"Global rule is {lines} lines (>{GLOBAL_RULE_SOFT_MAX_LINES}). First decide whether it should be global at all — if the behavior only applies inside specific folders/skills, add `paths` frontmatter and the 60-line target stops applying. Otherwise apply progressive disclosure: push detail into a path-scoped rule, brain file, or skill. See rule-authoring.md § Slim Global Rules.",
                )


def check_audit(findings: list[dict]) -> None:
    log = ROOT / "00-brain" / "audit" / "workos-audit.jsonl"
    if log.exists():
        required = {"timestamp", "class", "actor", "action", "reason", "reversal"}
        for i, line in enumerate(log.read_text(encoding="utf-8").splitlines(), start=1):
            if not line.strip():
                continue
            try:
                entry = json.loads(line)
            except json.JSONDecodeError:
                add(findings, "warning", "audit", rel(log), f"Line {i} is not valid JSON.")
                continue
            missing = sorted(required - set(entry))
            if missing:
                add(findings, "warning", "audit", rel(log), f"Line {i} missing keys: {', '.join(missing)}")


def check_brain_duplicates(findings: list[dict]) -> None:
    brain = ROOT / "00-brain"
    if not brain.exists():
        return
    ignored = {
        "legacy source links",
        "source links",
        "migration notes",
        "notes",
        "verification",
        "quality gate",
        "do not",
        "failure modes",
    }
    seen: dict[str, list[str]] = {}
    for md in sorted(brain.glob("*.md")):
        text = read_text(md)
        for heading in re.findall(r"^##\s+(.+)$", text, flags=re.MULTILINE):
            key = heading.strip().lower()
            if key in ignored:
                continue
            seen.setdefault(key, []).append(rel(md))
    for heading, paths in seen.items():
        if len(paths) > 2:
            add(findings, "warning", "brain", "00-brain", f"Common heading appears in many brain files: {heading} ({', '.join(paths)})")


def check_secrets(findings: list[dict]) -> None:
    if (ROOT / ".env").exists() and not git_ignored(".env"):
        add(findings, "error", "secrets", ".env", ".env exists but is not git-ignored.")
    if not (ROOT / ".env.example").exists():
        add(findings, "warning", "secrets", ".env.example", "Missing .env.example.")


def check_symlinks(findings: list[dict]) -> None:
    for path in sorted((ROOT / ".claude").rglob("*")) if (ROOT / ".claude").exists() else []:
        if path.is_symlink() and not path.exists():
            add(findings, "warning", "symlink", rel(path), "Symlink target is missing.")


CANONICAL_CONCEPTS_PATH = "00-brain/canonical-concepts.md"
RESTATEMENT_SCAN_GLOBS = (".claude/rules/*.md", "00-brain/*.md", "CLAUDE.md")


def parse_canonical_concepts() -> list[dict]:
    """Parse the canonical concept index into (name, canonical_file) tuples.

    Matches table rows of the form: `| <concept name> | [...](canonical_path...) |`
    """
    index = ROOT / CANONICAL_CONCEPTS_PATH
    if not index.exists():
        return []
    text = read_text(index)
    row_re = re.compile(r"^\|\s*([^|]+?)\s*\|\s*\[[^\]]+\]\(([^)#]+?)(?:#[^)]+)?\)")
    rows: list[dict] = []
    for line in text.splitlines():
        match = row_re.match(line)
        if not match:
            continue
        name = match.group(1).strip()
        canonical = match.group(2).strip()
        if name.lower() in {"concept", "current value"} or set(name) <= {"-", " ", ":"}:
            continue
        normalized = re.sub(r"\s*\([^)]*\)\s*$", "", name).strip()
        rows.append({"name": normalized, "canonical": canonical, "raw": name})
    return rows


def check_canonical_restatement(findings: list[dict]) -> None:
    """For each registered concept, flag files that mention the concept name
    without containing a markdown link to the canonical home.
    """
    concepts = parse_canonical_concepts()
    if not concepts:
        return
    targets: list[Path] = []
    for pattern in RESTATEMENT_SCAN_GLOBS:
        targets.extend(sorted(ROOT.glob(pattern)))
    for md in targets:
        rel_path = rel(md)
        if rel_path == CANONICAL_CONCEPTS_PATH:
            continue
        text = read_text(md)
        if not text:
            continue
        for concept in concepts:
            name = concept["name"]
            canonical = concept["canonical"]
            try:
                if md.resolve() == (ROOT / CANONICAL_CONCEPTS_PATH).parent.joinpath(canonical).resolve():
                    continue
            except OSError:
                pass
            normalized_canonical = canonical.lstrip("./").lstrip("../").lstrip("/")
            if normalized_canonical in rel_path:
                continue
            pattern = re.compile(rf"\b{re.escape(name)}\b", re.IGNORECASE)
            if not pattern.search(text):
                continue
            canonical_basename = canonical.split("/")[-1].split("#")[0]
            link_re = re.compile(rf"\[[^\]]+\]\([^)]*{re.escape(canonical_basename)}[^)]*\)")
            if link_re.search(text):
                continue
            add(
                findings,
                "warning",
                "restatement",
                rel_path,
                f"Mentions canonical concept '{name}' without linking to its home (`{canonical}`).",
            )


def render_markdown(findings: list[dict]) -> str:
    errors = [f for f in findings if f["severity"] == "error"]
    warnings = [f for f in findings if f["severity"] == "warning"]
    lines = ["# WorkOS Doctor", "", f"- Errors: {len(errors)}", f"- Warnings: {len(warnings)}"]
    if not findings:
        lines.append("- Status: clean")
        return "\n".join(lines)
    lines.extend(["", "| Severity | Check | Path | Message |", "|---|---|---|---|"])
    for f in findings:
        lines.append(f"| {f['severity']} | {f['check']} | `{f['path']}` | {f['message']} |")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true", help="Emit JSON instead of Markdown.")
    args = parser.parse_args()

    findings: list[dict] = []
    check_top_level(findings)
    check_overviews(findings)
    check_work_map_relationships(findings)
    check_current_state(findings)
    check_brain_metadata(findings)
    check_links(findings)
    check_rules(findings)
    check_audit(findings)
    check_brain_duplicates(findings)
    check_secrets(findings)
    check_symlinks(findings)
    check_canonical_restatement(findings)

    if args.json:
        print(json.dumps({"findings": findings}, indent=2))
    else:
        print(render_markdown(findings))

    if any(f["severity"] == "error" for f in findings):
        return 2
    if findings:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
