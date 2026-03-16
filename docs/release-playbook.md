# Release playbook

## `v0.1.0`

The first public release should optimize for stability, clarity, and maintainability rather than breadth.

## Versioning notes

- `v0.1.0`: the first public cut, focused on a complete and consistent scaffold
- `v0.1.x`: documentation, template, and workflow refinements that keep the repository boundary stable
- `v0.2.0`: broader public additions after the scaffold has already been maintained in real use

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
- If the change belongs only to one consuming repository, leave it out of this template and keep it project-specific.

## Pre-release checklist

1. Run `npm test`
2. Run `npm run validate:repo`
3. Review `CHANGELOG.md`
4. Confirm the README, issue templates, and PR template still match the repository
5. Confirm `CODEOWNERS` and `SECURITY.md` do not contain placeholder content

## Post-release follow-up

1. Create the GitHub release entry
2. Open a follow-up issue for `v0.1.x` documentation, template, or workflow adjustments
3. Land follow-up changes in small batches instead of overloading the first release
4. Before the next release, compare the release notes against the README, templates, and workflows
