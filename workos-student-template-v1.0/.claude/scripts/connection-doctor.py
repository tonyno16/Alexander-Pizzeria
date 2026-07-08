#!/usr/bin/env python3
"""Detect broken external-tool connections (CLIs declared in .env / MCPs in .mcp.json).

Fires from the Stop / StopFailure hook. Cheap, read-only. If anything looks
broken, writes a one-line hint to .claude/.connection-status that the next
SessionStart compact-continuity hook surfaces to Claude.

Does NOT edit .env, .mcp.json, or any secrets. Does NOT make network calls.
The goal is to flag obvious config breakage, not to repair it.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import sys
import time
from pathlib import Path

ROOT = Path(os.environ.get("CLAUDE_PROJECT_DIR", Path.cwd()))
STATUS_FILE = ROOT / ".claude" / ".connection-status"
ENV_FILE = ROOT / ".env"
MCP_FILE = ROOT / ".mcp.json"

ENV_VAR_RE = re.compile(r"\$\{([A-Z0-9_]+)\}")


def load_env_keys() -> set[str]:
    """Return the set of env vars defined in .env (presence, not value)."""
    if not ENV_FILE.exists():
        return set()
    keys = set()
    for line in ENV_FILE.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" in line:
            key = line.split("=", 1)[0].strip()
            if key:
                keys.add(key)
    return keys


def scan_mcp() -> list[dict]:
    """Return a list of {server, issue, hint} for MCP servers with obvious config gaps."""
    if not MCP_FILE.exists():
        return []
    try:
        data = json.loads(MCP_FILE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError) as err:
        return [
            {
                "server": str(MCP_FILE.name),
                "issue": "unparseable",
                "hint": f"`.mcp.json` failed to parse: {err}",
            }
        ]
    servers = data.get("mcpServers") or data.get("servers") or {}
    if not isinstance(servers, dict):
        return []
    env_keys = load_env_keys()
    findings: list[dict] = []
    for name, cfg in servers.items():
        if not isinstance(cfg, dict):
            continue
        # Check command-style servers
        command = cfg.get("command")
        if command and isinstance(command, str):
            bin_name = command.split()[0]
            if not shutil.which(bin_name):
                findings.append(
                    {
                        "server": name,
                        "issue": "missing-binary",
                        "hint": f"MCP `{name}` calls `{bin_name}` which isn't on PATH. Install it or update `.mcp.json`.",
                    }
                )
        # Check env var placeholders
        env_section = cfg.get("env") or {}
        text_blob = json.dumps(cfg)
        referenced = set(ENV_VAR_RE.findall(text_blob))
        for declared in env_section:
            referenced.add(declared)
        missing = sorted(v for v in referenced if v not in env_keys)
        if missing:
            findings.append(
                {
                    "server": name,
                    "issue": "missing-env-vars",
                    "hint": f"MCP `{name}` references env vars not in .env: {', '.join(missing)}. Add them or remove the reference.",
                }
            )
    return findings


def write_status(findings: list[dict]) -> None:
    STATUS_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not findings:
        # Clear stale status so a fixed config stops nagging next session.
        if STATUS_FILE.exists():
            STATUS_FILE.unlink()
        return
    payload = {
        "checked_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "findings": findings,
    }
    STATUS_FILE.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    # Cheap: skip if no MCP file and no .env (nothing to check).
    if not MCP_FILE.exists() and not ENV_FILE.exists():
        return 0
    findings = scan_mcp()
    write_status(findings)
    return 0


if __name__ == "__main__":
    sys.exit(main())
