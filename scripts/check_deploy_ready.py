#!/usr/bin/env python3
"""Validate that the portfolio hub can be published as a static site."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"

REQUIRED_FILES = [
    ROOT / "index.html",
    ROOT / "styles.css",
    ROOT / ".nojekyll",
    ROOT / "DEPLOYMENT.md",
    ROOT / "assets/docs/tobi_oniyide_master_resume.pdf",
    ROOT / "assets/images/business_operations_dashboard.png",
    ROOT / "assets/images/business_operations_kpi.png",
    ROOT / "assets/images/business_os_mvp.svg",
    ROOT / "assets/images/crm_dashboard.png",
]

BLOCKED_PATTERNS = [
    "../career_system",
    "../portfolio",
    "../business_os_mvp",
    "../TOBI_OS",
    "file://",
]

LOCAL_HREF_RE = re.compile(r'(?:href|src)="([^"#][^"]*)"')


def main() -> int:
    errors: list[str] = []

    for path in REQUIRED_FILES:
        if not path.exists():
            errors.append(f"Missing required file: {path.relative_to(ROOT)}")

    if INDEX.exists():
        html = INDEX.read_text(encoding="utf-8")
        for pattern in BLOCKED_PATTERNS:
            if pattern in html:
                errors.append(f"Blocked local workspace link found in index.html: {pattern}")

        for value in LOCAL_HREF_RE.findall(html):
            if value.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:")):
                continue
            local_path = ROOT / value
            if not local_path.exists():
                errors.append(f"Broken local asset reference in index.html: {value}")

    if errors:
        print("Portfolio hub deployment check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Portfolio hub deployment check passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
