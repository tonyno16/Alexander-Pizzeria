#!/usr/bin/env python3
"""Output a Haiku subagent dispatch plan for the cleanup-workos atomicity audit."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path.cwd()
HELPER = ROOT / ".claude" / "scripts" / "workos-skill-tools.py"

raise SystemExit(subprocess.call([sys.executable, str(HELPER), "atomicity-plan", *sys.argv[1:]], cwd=ROOT))
