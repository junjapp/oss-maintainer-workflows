# Basic template adoption example

This directory shows one realistic first pass after a public repository copies this kit.

The example repository here is fictional: `docs-ops-handbook`, a small OSS handbook project maintained by two people. They wanted public issue intake, a lightweight release routine, and clear ownership files without pulling in a larger starter.

## What they kept

- the issue intake template and pull request template
- the release check workflow and the public validation baseline
- `CONTRIBUTING.md`, `SECURITY.md`, and the roadmap docs

## What they changed before the first release

- rewrote `README.md` so it described the handbook project instead of this repository
- replaced the copied maintainer handles and security contact in `CODEOWNERS` and `SECURITY.md`
- removed any template text that sounded like source-repository copy instead of project-specific guidance

## What they cut

- any issue template they did not plan to answer in public
- roadmap notes that only made sense for the source repository
- the validation script until their docs layout stopped moving every week
- extra example wording once the repo had one concrete adoption pass of its own

For their first month, they kept the public maintainer surface small on purpose:

- `README.md`, `CONTRIBUTING.md`, `SECURITY.md`
- one issue template for real intake
- the pull request template

They did not keep the full validation baseline yet. Once the handbook repository had a stable docs layout, they either could restore `scripts/validate-repo.mjs` or add a trimmed `maintainer-workflows.paths.json` that only checked the files they were actually maintaining.

This example includes a small `maintainer-workflows.paths.json` so that trim starts from a believable first pass instead of a blank override file.

## What the first release looked like

Their `v0.1.0` was not a feature release. It was the point where the repository stopped reading like a copied scaffold and started reading like `docs-ops-handbook`:

- the README named the actual project and linked to its own maintainer routine
- the governance files named real owners
- the release checks still ran, but the repo-specific docs layout had already been trimmed to match how that team worked

## Why this example exists

The goal is simple: show a small, believable adoption pass. Keep the pieces that help you run the repository, rename the parts that belong to your team, and cut anything you are not going to maintain.

If your repository still needs a checklist, use the one in your own follow-up issue. This example is here to show what “copied and adapted” should look like in public.
