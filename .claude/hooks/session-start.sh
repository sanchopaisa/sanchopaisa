#!/bin/bash
# Installs the Python dependencies for the book-to-skill skill.
# Runs only in Claude Code cloud sessions; safe to run more than once.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

SKILL_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}/.claude/skills/book-to-skill"
if [ ! -d "$SKILL_DIR" ]; then
  exit 0
fi

# Skip the install when the package is already present.
if ! command -v book-to-skill >/dev/null 2>&1; then
  pip install -q --root-user-action=ignore -e "$SKILL_DIR[html,epub,pdf,docx,rtf]"
fi
