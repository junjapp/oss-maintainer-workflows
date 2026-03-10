# oss-maintainer-workflows

A reusable workflow kit for open-source maintainers.

## What this repository is for

This repository gives OSS maintainers a small, reusable starting point for day-to-day repository operations:

- issue intake and triage
- pull request review expectations
- release checks
- contributor-facing documentation
- repository ownership and governance basics

It is intentionally not an app starter. It is a repository operations starter.

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
  - `README.zh-CN.md`
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - `CHANGELOG.md`
- repository workflow assets:
  - `.github/ISSUE_TEMPLATE/*.yml`
  - `.github/pull_request_template.md`
  - `.github/CODEOWNERS`
  - `.github/workflows/*.yml`
- public docs:
  - `docs/project-roadmap.md`
  - `docs/release-playbook.md`
  - `docs/maintenance-cadence.md`
- example starter:
  - `examples/basic-template/README.md`

## Quick start

1. Copy this repository into a public project or mark it as a GitHub template repository.
2. Update `README.md`, `README.zh-CN.md`, and `CODEOWNERS` with your project details.
3. Review the public docs and adapt them to your repository.
4. Run the repository checks:

```bash
npm test
npm run validate:repo
```

## Common adjustments

- replace the generic project description with the actual repository purpose
- review the issue templates and remove anything your repository will not maintain
- confirm `CODEOWNERS`, `SECURITY.md`, and release notes reflect real maintainers
- keep the roadmap short and aligned with the work you will actually ship
- remove example content that does not match your repository scope

## What a repository should gain from this kit

- a clear intake and review routine
- a repeatable release checklist
- contributor-facing docs that stay close to actual repository behavior
- lightweight governance files that make maintenance easier to hand over

## Next step

Adapt the templates to a real repository, then keep the docs, issue flow, and release process aligned as the project evolves.
