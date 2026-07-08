#!/usr/bin/env python3
"""Create a mechanical WorkOS cleanup plan."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path.cwd()
HELPER = ROOT / ".claude" / "scripts" / "workos-skill-tools.py"

raise SystemExit(subprocess.call([sys.executable, str(HELPER), "cleanup-plan"], cwd=ROOT))
