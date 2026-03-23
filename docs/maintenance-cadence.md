# Maintenance Cadence

## Goal

Keep repository operations predictable, lightweight, and easy to maintain over time.

## Documentation hygiene

1. Update the README when the repository scope changes.
2. Keep issue templates and release notes aligned with actual maintainer behavior.
3. Remove stale examples or outdated guidance before adding new surface area.
4. Prefer one small, understandable process change at a time.

## Weekly routine

1. Review new issues and label or close anything that is obviously out of scope.
2. Check whether open pull requests still match the documented workflow.
3. Update contributor-facing docs when templates or repository behavior change.
4. Close or split oversized tasks so the backlog stays understandable.

## Weekly outputs

- a small issue list that still matches the real backlog
- docs and templates that still describe the current workflow
- at most one or two follow-up tasks large enough for the next release
- one maintenance review issue if the public surface drifted after a release or cleanup pass

## First follow-up issue

- open one small follow-up issue after copying the scaffold
- use that issue to remove copied text that does not fit the real repository
- keep the first follow-up issue limited to docs, templates, or release notes

## Release rhythm

- Treat small, well-documented releases as the default.
- Update `CHANGELOG.md` before tagging.
- Make sure the README, issue templates, and release notes describe the same workflow.

## Post-release follow-up

- Re-read the public release notes one day later and check whether they still match the visible repository state.
- If feedback points to copied defaults or unclear ownership wording, treat that as a small maintainer-facing follow-up rather than a large rewrite.
- Keep the next adjustment narrow enough that it can be explained in one short issue comment and one short release note.
- If the public surface needs a dedicated drift pass, open a maintenance review issue instead of burying the checklist in a private note.

## Monthly cleanup

- Review the roadmap and drop anything that no longer fits the repository direction.
- Revisit CODEOWNERS, SECURITY guidance, and templates for drift.
- Refresh the example directory if the main workflow changed.

## Anti-patterns

- batching many unrelated workflow changes into one release
- leaving documentation behind when process changes
- adding automation that maintainers cannot easily inspect
