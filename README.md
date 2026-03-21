# oss-maintainer-workflows

Reusable maintainer operations kit for small public OSS repositories.

## What this repository is for

This repository gives OSS maintainers a small, reusable starting point for day-to-day repository operations:

- issue intake and triage
- pull request review expectations
- release checks
- contributor-facing documentation
- repository ownership and governance basics

It is intentionally not an app starter. It is a repository operations starter.

## What this repository is not trying to do

- It is not a universal community playbook for every OSS project shape.
- It is not a replacement for project-specific product docs or contributor onboarding.
- It is not the right fit if your repository only needs one or two local templates and nothing else.

If your project only needs a lighter setup, copy the smallest useful pieces instead of keeping the whole scaffold.

## Why this layer matters

Small OSS projects often rebuild the same maintainer-facing surface from scratch:

- how issues get triaged
- what a pull request should include
- how releases are checked before tagging
- where ownership and security contacts live in public

This repository exists to keep that layer reusable, inspectable, and easy to adapt without turning it into a larger framework.

## Who should use it

- solo maintainers who need a clear public maintenance structure
- small OSS teams that want lightweight review and release discipline
- public repositories that need reusable templates instead of bespoke internal tooling

## Who should not use it

- private or closed-source repositories
- teams looking for an app boilerplate
- projects that do not want public maintainer workflows or contributor guidance

## Included capabilities

- root documentation:
  - `README.md`
  - `CODE_OF_CONDUCT.md`
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - `CHANGELOG.md`
- repository workflow assets:
  - `.github/ISSUE_TEMPLATE/*.yml`
  - `.github/ISSUE_TEMPLATE/config.yml`
  - `.github/pull_request_template.md`
  - `.github/CODEOWNERS`
  - `.github/workflows/*.yml`
- public docs:
  - `docs/project-roadmap.md`
  - `docs/release-playbook.md`
  - `docs/maintenance-cadence.md`
- example adoption pass:
  - `examples/basic-template/README.md`

## Quick start

1. Copy this repository into a public project or mark it as a GitHub template repository.
2. Replace maintainer-specific defaults in `README.md`, `CODEOWNERS`, and `SECURITY.md` before the first public release.
3. Review the public docs and remove anything your repository will not actively maintain.
4. Run the repository checks:

```bash
npm test
npm run validate:repo
```

## Replace before reuse

- replace maintainer identity and contact details in `README.md`, `CODEOWNERS`, and `SECURITY.md`
- trim issue templates, release guidance, and roadmap notes that your repository will not keep
- remove example wording as soon as your repository has its own maintainer routine

This repository keeps active maintainer values for its own public operation. Downstream repositories should replace those values immediately instead of treating them as scaffold defaults.

If you want to see what that first downstream pass can look like, start with `examples/basic-template/README.md`.

## Validation baseline

- `npm test` and `npm run validate:repo` describe the public baseline of this source repository.
- Downstream repositories can trim, replace, or re-scope those checks once the scaffold is copied.
- If your repository keeps a different docs layout or workflow set, update the validation script or provide a local `maintainer-workflows.paths.json` override instead of forcing your repository back into this exact shape.

## Minimal rollout path

1. Start by keeping only the issue templates and docs your repository will actually use.
2. Replace every maintainer-specific default with a real name, team, ownership rule, or security contact for your repository.
3. Treat the first release as a structure check, not as a feature milestone.
4. Confirm that `README.md`, `CODEOWNERS`, and `SECURITY.md` no longer read like copied example content.
5. Only add more automation after the basic intake, review, and release routine stays stable for a few weeks.

## What tends to belong here

- Keep the files that help another maintainer run intake, review, release, and ownership work in public.
- Leave out product scaffolding, internal dashboards, or a pile of generic automation that is hard to explain.
- If a file takes a long setup story before another maintainer can place it, it probably belongs somewhere else.

## Common adjustments

- replace the generic project description with the actual repository purpose
- keep only the governance files your repository is willing to maintain in public
- review the issue templates and remove anything your repository will not maintain
- confirm `README.md`, `CODEOWNERS`, `SECURITY.md`, and release notes reflect real maintainers
- align package metadata, changelog sections, and release checks before the next release
- keep the roadmap short and aligned with the work you will actually ship
- remove example content that does not match your repository scope

## What a repository should gain from this kit

- a clear intake and review routine
- a repeatable release checklist
- contributor-facing docs that stay close to actual repository behavior
- lightweight governance files that make maintenance easier to hand over

## Next step

Adapt the templates to a real repository, then keep the docs, issue flow, and release process aligned as the project evolves.
