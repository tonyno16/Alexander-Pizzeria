#!/usr/bin/env python3
"""PreToolUse hook: warn (don't block) when a token-shaped secret appears in tool inputs.

Goal: keep secret values out of the assistant's prose response. Tools still run normally —
the user may legitimately need to write or pass a real token. We just emit a systemMessage
so the model sees a clear reminder not to repeat the value in its chat reply.

Never echoes the matched value anywhere — message describes the *kind* of token only.
"""

from __future__ import annotations

import json
import re
import sys


# Prefixed-only patterns. False-positive resistance > recall — we accept missing the rare
# unprefixed secret to avoid noise on git SHAs, hashes, base64 image data, etc.
SECRET_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("OpenAI/Anthropic key", re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b")),
    ("Notion integration token", re.compile(r"\bntn_[A-Za-z0-9]{40,}\b")),
    ("GitHub token", re.compile(r"\bgh[poscru]_[A-Za-z0-9]{36,}\b")),
    ("AWS access key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("Google API key", re.compile(r"\bAIza[0-9A-Za-z_-]{35}\b")),
    ("Slack token", re.compile(r"\bxox[abprs]-[A-Za-z0-9-]{10,}\b")),
    ("JWT", re.compile(r"\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b")),
]

# Files where placeholder-style secret prefixes are expected and benign.
EXEMPT_PATH_SUFFIXES = (
    ".env.example",
    ".env.sample",
)
EXEMPT_PATH_FRAGMENTS = (
    "00-brain/audit/",
    "/audit/",
)


def is_exempt_path(path: str | None) -> bool:
    if not path:
        return False
    normalized = path.replace("\\", "/")
    if any(normalized.endswith(suffix) for suffix in EXEMPT_PATH_SUFFIXES):
        return True
    if any(fragment in normalized for fragment in EXEMPT_PATH_FRAGMENTS):
        return True
    return False


def scan(text: str) -> str | None:
    """Return the label of the first matching pattern, or None."""
    if not text:
        return None
    for label, pattern in SECRET_PATTERNS:
        if pattern.search(text):
            return label
    return None


# Dangerous Bash commands that pipe a secret's *value* into output, where the literal
# isn't in the tool input (so SECRET_PATTERNS can't see it). These are the exact vectors
# security.md § "Never Print Secrets" names: `cat .env`, `echo $TOKEN`. Warn-only.
# Deliberately excludes the endorsed presence-checks: `grep -c '^TOKEN=' .env`,
# `env | grep -c '^TOKEN='` (grep/env are not matched here).
_SECRET_VAR = r"[A-Za-z_]*(?:TOKEN|SECRET|PASSWORD|PASSWD|API[_-]?KEY|APIKEY|CREDENTIAL|ACCESS[_-]?KEY)[A-Za-z_]*"
DANGEROUS_COMMAND_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    (
        ".env contents dumped to output",
        re.compile(r"\b(?:cat|bat|tac|less|more|head|tail|xxd|od|strings|nl)\b[^|&;\n]*\.env\b(?!\.example|\.sample|\.template)"),
    ),
    (
        "secret-named variable echoed",
        re.compile(rf"\b(?:echo|printf)\b[^|&;\n]*\$\{{?{_SECRET_VAR}\}}?", re.IGNORECASE),
    ),
    (
        "secret-named variable printed via printenv",
        re.compile(rf"\bprintenv\b\s+\$?\{{?{_SECRET_VAR}", re.IGNORECASE),
    ),
]


def scan_command(command: str) -> str | None:
    """Return the label of the first dangerous command pattern, or None."""
    if not command:
        return None
    for label, pattern in DANGEROUS_COMMAND_PATTERNS:
        if pattern.search(command):
            return label
    return None


def extract_targets(tool_name: str, tool_input: dict) -> list[tuple[str, str | None, str]]:
    """Return (text-to-scan, file-path-if-any, source-label) tuples."""
    targets: list[tuple[str, str | None, str]] = []
    if tool_name == "Write":
        targets.append((tool_input.get("content") or "", tool_input.get("file_path"), "Write.content"))
    elif tool_name == "Edit":
        targets.append((tool_input.get("new_string") or "", tool_input.get("file_path"), "Edit.new_string"))
    elif tool_name == "MultiEdit":
        path = tool_input.get("file_path")
        for i, edit in enumerate(tool_input.get("edits") or []):
            targets.append((edit.get("new_string") or "", path, f"MultiEdit.edits[{i}].new_string"))
    elif tool_name == "NotebookEdit":
        targets.append((tool_input.get("new_source") or "", tool_input.get("notebook_path"), "NotebookEdit.new_source"))
    elif tool_name == "Bash":
        targets.append((tool_input.get("command") or "", None, "Bash.command"))
    return targets


def warn(message: str) -> None:
    """Emit a non-blocking systemMessage. Tool still runs."""
    print(json.dumps({"systemMessage": message}))


def allow() -> None:
    print("{}")


def main() -> int:
    try:
        payload = json.loads(sys.stdin.read() or "{}")
    except json.JSONDecodeError:
        allow()
        return 0

    tool_name = payload.get("tool_name") or ""
    tool_input = payload.get("tool_input") or {}

    for text, path, source in extract_targets(tool_name, tool_input):
        if is_exempt_path(path):
            continue
        label = scan(text)
        if label:
            path_note = f" in `{path}`" if path else ""
            warn(
                f"[secret-guard] Token-shaped value detected ({label}){path_note} via {source}. "
                "Tool will run. Do NOT repeat this value in your prose response — "
                "reference it as $VAR or describe it without quoting the literal."
            )
            return 0

    # Bash command patterns that would print a secret's value (the literal isn't in the
    # input, so the scan above can't catch them). Warn-only — the command still runs.
    if tool_name == "Bash":
        cmd_label = scan_command(tool_input.get("command") or "")
        if cmd_label:
            warn(
                f"[secret-guard] Command may print a secret to output ({cmd_label}). "
                "Per security.md § Never Print Secrets: don't reveal the value. To confirm presence "
                "without exposing it, use `grep -c '^NAME=' .env` or `env | grep -c '^NAME='`, and "
                "reference secrets by $VAR name, never by value."
            )
            return 0

    allow()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
