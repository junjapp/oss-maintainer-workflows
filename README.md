# oss-maintainer-workflows

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/junjapp/oss-maintainer-workflows)](https://github.com/junjapp/oss-maintainer-workflows/releases)
[![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](.nvmrc)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Reusable maintainer operations kit for small public OSS repositories.

Every small OSS project ends up rebuilding the same intake, review, and release routine from scratch. This kit gives you a tested starting point so you can spend time on the code instead of the process.

---

## Table of Contents

- [What this repository is for](#what-this-repository-is-for)
- [What this repository is not trying to do](#what-this-repository-is-not-trying-to-do)
- [Why this layer matters](#why-this-layer-matters)
- [Highlights](#highlights)
- [Who should use it](#who-should-use-it)
- [Who should not use it](#who-should-not-use-it)
- [Included capabilities](#included-capabilities)
- [Quick start](#quick-start)
- [Replace before reuse](#replace-before-reuse)
- [Validation baseline](#validation-baseline)
- [Minimal rollout path](#minimal-rollout-path)
- [Smallest believable copy path](#smallest-believable-copy-path)
- [What tends to belong here](#what-tends-to-belong-here)
- [Common adjustments](#common-adjustments)
- [What a repository should gain from this kit](#what-a-repository-should-gain-from-this-kit)
- [Using this kit?](#using-this-kit)

---

## Highlights

🎯 **Issue intake ready** — six typed issue templates including open questions and reuse reports

📋 **Review & release discipline** — PR template, release playbook, and pre-tag checks built in

📄 **Contributor docs included** — CODE_OF_CONDUCT.md, CONTRIBUTING.md, SUPPORT.md, SECURITY.md

🔧 **Validation built in** — `npm test` and `npm run validate:repo` keep the scaffold honest

📦 **Copy-friendly** — two adoption examples with ready-to-trim path configs

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

Small OSS projects often rebuild the same public maintenance basics from scratch:

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
  - `SUPPORT.md`
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
  - `examples/minimal-copy/README.md`

## Quick start

1. Copy this repository into a public project or mark it as a GitHub template repository.
2. If you only need the smallest believable copy path, start with `examples/minimal-copy/README.md` before you keep the full validation and release layer.
3. If you are not sure which issue path or copy path fits yet, read `SUPPORT.md` first.
4. Replace maintainer-specific defaults in `README.md`, `CODEOWNERS`, and `SECURITY.md` before the first public release.
5. Review the public docs and remove anything your repository will not actively maintain.
6. Run the repository checks:

```bash
npm test
npm run validate:repo
```

## Replace before reuse

- replace maintainer identity and contact details in `README.md`, `CODEOWNERS`, and `SECURITY.md`
- trim issue templates, release guidance, and roadmap notes that your repository will not keep
- remove example wording as soon as your repository has its own maintainer routine

This repository keeps active maintainer values for its own public operation. Repositories that copy this kit should replace those values immediately instead of treating them as defaults.

If you want to see what that first downstream pass can look like, start with `examples/basic-template/README.md`.
If you want to see the smallest believable downstream pass without the full validation layer, start with `examples/minimal-copy/README.md`.
If a repository cannot cleanly sort incoming reports on day one, keep a neutral open-question issue path instead of forcing every report into a bug, docs, or workflow bucket too early.

## Validation baseline

- `npm test` and `npm run validate:repo` describe the public baseline of this repository.
- Repositories that copy this kit can trim, replace, or re-scope those checks once the scaffold is copied.
- If your repository keeps a different docs layout or workflow set, update the validation script or provide a local `maintainer-workflows.paths.json` override instead of forcing your repository back into this exact shape.
- If you do not want to keep the validation layer at all, the lighter path is documented in `examples/minimal-copy/README.md`.
- If you do keep the validation layer, copy one of the example `maintainer-workflows.paths.json` files first and trim from there instead of guessing the minimum set from scratch.

## Minimal rollout path

1. Start by keeping only the issue templates and docs your repository will actually use.
2. Replace every maintainer-specific default with a real name, team, ownership rule, or security contact for your repository.
3. Treat the first release as a structure check, not as a feature milestone.
4. Confirm that `README.md`, `CODEOWNERS`, and `SECURITY.md` no longer read like copied example content.
5. Only add more automation after the basic intake, review, and release routine stays stable for a few weeks.

## Smallest believable copy path

If you do not want the full scaffold, start with the narrowest public slice that still tells contributors how the repository is run:

- keep `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `.github/pull_request_template.md`
- keep only the one or two issue templates you will actually answer in public
- either keep `scripts/validate-repo.mjs` with a trimmed `maintainer-workflows.paths.json`, or remove the validation layer entirely until your repository has a stable docs layout

A realistic first pass is often: one issue template, one pull request template, three core docs, and no extra roadmap or release files until the repository has shipped at least one real maintenance cycle.

If you do keep the validation script, make the required path list match the smaller surface instead of pretending you still maintain the full baseline from this repository. For example:

```json
{
  "requiredPaths": [
    "README.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    ".github/pull_request_template.md",
    ".github/ISSUE_TEMPLATE/bug-report.yml"
  ]
}
```

That keeps the public checks truthful while still giving the repository a minimal maintainer contract.

The example directories include ready-to-copy `maintainer-workflows.paths.json` files so the first trim does not have to start from a blank file.

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
- small maintainable releases that stay easy to explain
- contributor-facing docs that stay close to actual repository behavior
- lightweight governance files that make maintenance easier to hand over

## Using this kit?

If you try this in a real repository, open a reuse report and say what you kept, cut, or rewrote on the first pass. That kind of feedback is more useful here than a generic +1 because it shows where the kit is helping and where it still feels too specific.

If you are not sure which public path fits your question or report, start with `SUPPORT.md`.

## Next step

Adapt the templates to a real repository, then keep the docs, issue flow, and release process aligned as the project evolves.
