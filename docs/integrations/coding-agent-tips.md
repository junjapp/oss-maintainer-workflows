# Coding agent tips for maintainer workflows

If your day-to-day workflow includes a coding agent (GitHub Copilot, Cursor, or similar), here are a few tips to make it work well with repositories built on this kit.

## Issue triage assistance

Point your coding agent at the issue templates in `.github/ISSUE_TEMPLATE/` and the routing guidance in `SUPPORT.md`. Most agents can suggest an initial classification — bug, docs gap, workflow improvement, or open question — by comparing the incoming report against the template descriptions.

This does not replace maintainer judgment, but it saves time on first-pass sorting when multiple issues arrive at once.

## Pre-release doc consistency check

Before tagging a release, ask your coding agent to compare `README.md`, `CHANGELOG.md`, the issue templates, and `docs/release-playbook.md` for wording drift. Common catches:

- a section title changed in README but the corresponding issue template still references the old name
- a new capability added in a recent release but not yet reflected in the Highlights or Included capabilities list
- CODEOWNERS or SECURITY.md still containing placeholder text after a scaffold copy

## Helping agents understand repository context

If your repository has a file like `AGENTS.md` or a similar agent instruction file at the root, coding agents can read it to understand:

- what the repository is for and what it is not
- which files are generated versus hand-maintained
- which validation commands to run before proposing changes

This kit does not ship an `AGENTS.md` by default, but if you add one, keep it short and factual — a few lines about scope, structure, and validation is usually enough.

## What to watch out for

- Do not let a coding agent auto-merge pull requests without human review — maintainer judgment is still the final gate.
- Treat agent-generated suggestions as drafts, not decisions. The maintainer decides what ships.
- If an agent suggests removing validation checks to make tests pass, that is usually a sign the change needs a closer look, not less validation.
