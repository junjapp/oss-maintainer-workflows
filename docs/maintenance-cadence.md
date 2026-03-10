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

## Release rhythm

- Treat small, well-documented releases as the default.
- Update `CHANGELOG.md` before tagging.
- Make sure the README, issue templates, and release notes describe the same workflow.

## Monthly cleanup

- Review the roadmap and drop anything that no longer fits the repository direction.
- Revisit CODEOWNERS, SECURITY guidance, and templates for drift.
- Refresh the example directory if the main workflow changed.

## Anti-patterns

- batching many unrelated workflow changes into one release
- leaving documentation behind when process changes
- adding automation that maintainers cannot easily inspect
