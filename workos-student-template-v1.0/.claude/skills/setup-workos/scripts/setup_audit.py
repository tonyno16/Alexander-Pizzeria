#!/usr/bin/env python3
"""Run the setup-workos mechanical audit helper."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[4]
HELPER = ROOT / ".claude" / "scripts" / "workos-skill-tools.py"

raise SystemExit(subprocess.call([sys.executable, str(HELPER), "setup-audit"], cwd=ROOT))
