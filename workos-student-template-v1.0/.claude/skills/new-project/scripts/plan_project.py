#!/usr/bin/env python3
"""Plan or scaffold a WorkOS project."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path.cwd()
HELPER = ROOT / ".claude" / "scripts" / "workos-skill-tools.py"

raise SystemExit(subprocess.call([sys.executable, str(HELPER), "new-project", *sys.argv[1:]], cwd=ROOT))
