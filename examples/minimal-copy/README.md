# Minimal copy path example

This directory shows the smallest believable downstream pass when a public OSS repository wants the maintainer-facing layer, but does not want to keep the full validation and release surface from this source repository.

The example repository here is fictional: `tiny-status-page`, a small public utility maintained by one person. They wanted public issue intake, a pull request baseline, and visible ownership files, but they did not want package metadata, release automation, or a fixed validation layer yet.

## What they kept

- one issue template plus the pull request template
- `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and `CODEOWNERS`
- only the governance and contributor-facing files they were ready to maintain in public

## What they skipped on purpose

- `package.json` and `package-lock.json`
- the release workflow and release playbook
- the validation script and any required path baseline tied to this source repository
- roadmap or cadence docs they were not going to update yet

## What they changed before the first public push

- rewrote the README so it described `tiny-status-page` instead of this kit
- replaced the copied owner and security contact details
- trimmed the issue chooser to the one request path they would actually answer

## What the first public version looked like

Their first public version was intentionally small:

- a short project README with real ownership details
- one working issue path
- a pull request template
- public governance files that named the actual maintainer

That was enough to stop the repository reading like copied scaffold text without the full validation layer.

## Why this example exists

Not every repository should start with the full source-repository baseline. This example is here to show the smaller path: keep the maintainer-facing pieces you will actually use, rename the parts that belong to your repository, and leave the rest out until the project genuinely needs them.
