#!/usr/bin/env python3
"""Audit a source workspace before migration."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path.cwd()
HELPER = ROOT / ".claude" / "scripts" / "workos-skill-tools.py"

raise SystemExit(subprocess.call([sys.executable, str(HELPER), "migration-audit", *sys.argv[1:]], cwd=ROOT))
