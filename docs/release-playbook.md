# Release playbook

## First public release

The first public release should optimize for stability, clarity, and maintainability rather than breadth.

## Versioning notes

- `v0.1.0`: the first public cut, focused on a complete and consistent scaffold
- `v0.1.x`: documentation, template, and workflow refinements that keep the scaffold focused and consistent
- `v0.2.0`: broader public additions after the scaffold has already been maintained in real use
- If package metadata is present, keep the package version aligned with the latest released repository state.
- If the repository uses a custom release cadence, update the checks instead of leaving a stale fixed version heading in place.

## Default cadence

- Treat a small related maintenance pass as enough for a release.
- Do not batch unrelated fixes just to make a version look larger.
- If a docs, template, or workflow change would be visible to another maintainer today, it is usually enough for the next small `v0.1.x` cut.

## Release note structure

- `Highlights`: the maintainer-facing changes worth noticing first
- `Documentation`: updates to the README, contributor docs, examples, or templates
- `Workflow`: validation, release, or governance changes
- `Follow-up`: the items intentionally deferred to the next small release

## Pre-tag command sequence

```bash
npm test
npm run validate:repo
git status --short
```

Only tag a release after tests pass, the scaffold check passes, and the working tree is in the expected state.

## When to ship a v0.1.x release

- Ship a small `v0.1.x` release when docs, templates, or release checks have changed in a way another maintainer would notice.
- Keep the scope narrow enough that the release note can be read in under a minute.
- A few related maintainer-facing changes are enough; do not wait for a larger bundle if the release already tells a clear story.
- If the change belongs only to one consuming repository, leave it out of this template and keep it project-specific.

## Pre-release checklist

1. Run `npm test`
2. Run `npm run validate:repo`
3. Review `CHANGELOG.md`
4. Confirm the README, issue templates, and PR template still match the repository
5. Confirm `CODEOWNERS` and `SECURITY.md` do not contain placeholder content

## Replace-first review

- Before a small `v0.1.x` release, re-check `README.md`, `CODEOWNERS`, and `SECURITY.md` together.
- If an outside maintainer could still confuse active repository values with copied scaffold text, tighten the wording before tagging.
- If the change was triggered by public feedback, keep the follow-up in the same issue thread or release note follow-up instead of scattering it across new public threads.

## Post-release follow-up

1. Create the GitHub release entry
2. Open a follow-up issue for `v0.1.x` documentation, template, or workflow adjustments
3. Land follow-up changes in small batches instead of overloading the first release
4. Before the next release, compare the release notes against the README, templates, and workflows
5. If the drift spans more than one public surface, use the maintenance review issue path so the cleanup stays visible and scoped
