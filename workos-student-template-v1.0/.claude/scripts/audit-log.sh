#!/usr/bin/env bash
set -euo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
log="$root/00-brain/audit/workos-audit.jsonl"
mkdir -p "$(dirname "$log")"

input="$(cat || true)"

HOOK_INPUT="$input" python3 - "$log" "$@" <<'PY'
import argparse
import datetime as dt
import json
import os
import sys

parser = argparse.ArgumentParser()
parser.add_argument("event", nargs="?", default="stop")
parser.add_argument("--class", dest="klass", default=None)
parser.add_argument("--actor", default=None)
parser.add_argument("--action", default=None)
parser.add_argument("--reason", default=None)
parser.add_argument("--reversal", default=None)
parser.add_argument("--source", default=None)
parser.add_argument("--path", action="append", default=[])
args = parser.parse_args(sys.argv[2:])

log_path = sys.argv[1]

try:
    hook_input = json.loads(os.environ.get("HOOK_INPUT", "{}") or "{}")
except json.JSONDecodeError:
    hook_input = {}

klass = args.klass or ("Red" if args.event == "failure" else "Green")
actor = args.actor or "claude-code"
action = args.action or f"session-{args.event}"
reason = args.reason or "Claude Code hook recorded session completion or failure."
reversal = args.reversal or "Local audit entry only; remove this line if needed."
source = args.source or "hook"

entry = {
    "timestamp": dt.datetime.now(dt.UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
    "class": klass,
    "actor": actor,
    "action": action,
    "paths": args.path,
    "reason": reason,
    "reversal": reversal,
    "source": source,
    "session_id": hook_input.get("session_id"),
    "cwd": hook_input.get("cwd"),
    "permission_mode": hook_input.get("permission_mode"),
}

with open(log_path, "a", encoding="utf-8") as f:
    f.write(json.dumps(entry, separators=(",", ":")) + "\n")
PY

line_count="$(wc -l < "$log" | tr -d ' ')"
if [ "${line_count:-0}" -gt 1000 ]; then
  tmp="${log}.tmp"
  tail -n 1000 "$log" > "$tmp"
  mv "$tmp" "$log"
fi

printf '{}\n'
