#!/usr/bin/env python3
"""Build the generated WorkOS workspace map."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path.cwd()
HELPER = ROOT / ".claude" / "scripts" / "workos-skill-tools.py"

raise SystemExit(subprocess.call([sys.executable, str(HELPER), "work-map", *sys.argv[1:]], cwd=ROOT))
