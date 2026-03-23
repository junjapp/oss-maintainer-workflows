import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const publicFiles = [
  "README.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "SUPPORT.md",
  "docs/maintenance-cadence.md",
  "docs/project-roadmap.md",
  "docs/release-playbook.md",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/workflows/validate.yml",
  ".github/workflows/release-check.yml",
  ".github/release.yml",
];

test("public repository surface keeps the expected public docs set", async () => {
  const repoRoot = path.resolve(process.cwd());

  for (const relativePath of publicFiles) {
    await fs.access(path.join(repoRoot, relativePath));
  }
});

test("tracked repository does not include local-only automation directories", async () => {
  const repoRoot = path.resolve(process.cwd());
  await assert.rejects(fs.access(path.join(repoRoot, "scripts", "ops")));
  await assert.rejects(fs.access(path.join(repoRoot, "scripts", "gh")));
});

test("package.json exposes only public repository commands", async () => {
  const repoRoot = path.resolve(process.cwd());
  const packageJson = JSON.parse(
    await fs.readFile(path.join(repoRoot, "package.json"), "utf8"),
  );

  assert.deepEqual(packageJson.scripts, {
    test: "node --test",
    "validate:repo": "node scripts/validate-repo.mjs",
  });
});

test("tracked tests stay focused on the public scaffold", async () => {
  const repoRoot = path.resolve(process.cwd());
  const testFiles = (await fs.readdir(path.join(repoRoot, "tests")))
    .filter((item) => item !== ".DS_Store")
    .sort();

  assert.deepEqual(testFiles, [
    "public-surface.test.mjs",
    "validate-repo.test.mjs",
  ]);
});

test("git tracked files exclude local-only materials", () => {
  const repoRoot = path.resolve(process.cwd());
  const tracked = spawnSync("git", ["ls-files"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  assert.equal(tracked.status, 0);

  const trackedFiles = tracked.stdout
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  assert.ok(trackedFiles.includes("README.md"));
  assert.ok(!trackedFiles.some((item) => item.endsWith(".DS_Store")));
  assert.ok(!trackedFiles.includes("AGENTS.md"));
  assert.ok(!trackedFiles.some((item) => item.startsWith(".private/")));
  assert.ok(!trackedFiles.some((item) => item.startsWith(".agents/")));
});

test("public docs describe a concrete adoption and release path", async () => {
  const repoRoot = path.resolve(process.cwd());
  const readme = await fs.readFile(path.join(repoRoot, "README.md"), "utf8");
  const codeowners = await fs.readFile(
    path.join(repoRoot, ".github", "CODEOWNERS"),
    "utf8",
  );
  const security = await fs.readFile(
    path.join(repoRoot, "SECURITY.md"),
    "utf8",
  );
  const releasePlaybook = await fs.readFile(
    path.join(repoRoot, "docs", "release-playbook.md"),
    "utf8",
  );
  const exampleReadme = await fs.readFile(
    path.join(repoRoot, "examples", "basic-template", "README.md"),
    "utf8",
  );
  const minimalCopyReadme = await fs.readFile(
    path.join(repoRoot, "examples", "minimal-copy", "README.md"),
    "utf8",
  );
  const roadmap = await fs.readFile(
    path.join(repoRoot, "docs", "project-roadmap.md"),
    "utf8",
  );
  const cadence = await fs.readFile(
    path.join(repoRoot, "docs", "maintenance-cadence.md"),
    "utf8",
  );
  const packageJson = JSON.parse(
    await fs.readFile(path.join(repoRoot, "package.json"), "utf8"),
  );
  const codeOfConduct = await fs.readFile(
    path.join(repoRoot, "CODE_OF_CONDUCT.md"),
    "utf8",
  );
  const issueTemplateConfig = await fs.readFile(
    path.join(repoRoot, ".github", "ISSUE_TEMPLATE", "config.yml"),
    "utf8",
  );
  const support = await fs.readFile(
    path.join(repoRoot, "SUPPORT.md"),
    "utf8",
  );
  const bugTemplate = await fs.readFile(
    path.join(repoRoot, ".github", "ISSUE_TEMPLATE", "bug-report.yml"),
    "utf8",
  );
  const docsTemplate = await fs.readFile(
    path.join(repoRoot, ".github", "ISSUE_TEMPLATE", "docs-request.yml"),
    "utf8",
  );
  const workflowTemplate = await fs.readFile(
    path.join(repoRoot, ".github", "ISSUE_TEMPLATE", "workflow-improvement.yml"),
    "utf8",
  );
  const openQuestionTemplate = await fs.readFile(
    path.join(repoRoot, ".github", "ISSUE_TEMPLATE", "open-question.yml"),
    "utf8",
  );
  const maintenanceReviewTemplate = await fs.readFile(
    path.join(repoRoot, ".github", "ISSUE_TEMPLATE", "maintenance-review.yml"),
    "utf8",
  );
  const reuseReportTemplate = await fs.readFile(
    path.join(repoRoot, ".github", "ISSUE_TEMPLATE", "reuse-report.yml"),
    "utf8",
  );
  const basicPathsOverride = JSON.parse(
    await fs.readFile(
      path.join(repoRoot, "examples", "basic-template", "maintainer-workflows.paths.json"),
      "utf8",
    ),
  );
  const minimalPathsOverride = JSON.parse(
    await fs.readFile(
      path.join(repoRoot, "examples", "minimal-copy", "maintainer-workflows.paths.json"),
      "utf8",
    ),
  );

  assert.match(readme, /Minimal rollout path/);
  assert.match(readme, /Replace before reuse/);
  assert.match(readme, /Validation baseline/);
  assert.match(readme, /What tends to belong here/);
  assert.match(readme, /What this repository is not trying to do/);
  assert.match(readme, /If your project only needs a lighter setup/);
  assert.doesNotMatch(readme, /README\.zh-CN\.md/);
  assert.match(readme, /README\.md`?, `?CODEOWNERS`?, and `?SECURITY\.md/);
  assert.match(readme, /This repository keeps active maintainer values for its own public operation/);
  assert.match(readme, /maintainer-workflows\.paths\.json/);
  assert.match(readme, /first downstream pass can look like/);
  assert.match(readme, /smallest believable downstream pass/);
  assert.match(readme, /neutral open-question issue path/);
  assert.match(readme, /If you try this in a real repository, open a reuse report/);
  assert.match(readme, /CODE_OF_CONDUCT\.md/);
  assert.match(readme, /SUPPORT\.md/);
  assert.match(readme, /\.github\/ISSUE_TEMPLATE\/config\.yml/);
  assert.match(codeowners, /Replace this entry before reusing the scaffold/);
  assert.match(codeowners, /This repository keeps an active owner entry because it is the live source repository/);
  assert.match(security, /Replace the contact path before you reuse this scaffold/);
  assert.match(security, /contact the active maintainer directly for this repository/);
  assert.match(codeOfConduct, /Contributor Covenant/);
  assert.match(codeOfConduct, /public, respectful, and workable/);
  assert.match(support, /Use this page if you are not sure where a question or report belongs yet/);
  assert.match(support, /reuse report/);
  assert.match(support, /open question/);
  assert.match(support, /SECURITY\.md/);
  assert.match(issueTemplateConfig, /blank_issues_enabled: false/);
  assert.match(issueTemplateConfig, /SUPPORT\.md/);
  assert.match(issueTemplateConfig, /open question/i);
  assert.match(issueTemplateConfig, /open-question\.yml/);
  assert.match(issueTemplateConfig, /reuse-report\.yml/);
  assert.match(issueTemplateConfig, /contact_links:/);
  assert.doesNotMatch(bugTemplate, /title:/);
  assert.doesNotMatch(docsTemplate, /title:/);
  assert.doesNotMatch(workflowTemplate, /title:/);
  assert.match(openQuestionTemplate, /name: Open question/);
  assert.match(maintenanceReviewTemplate, /name: Maintenance review/);
  assert.match(maintenanceReviewTemplate, /public maintainer surface for drift/);
  assert.match(openQuestionTemplate, /labels:\s*\n\s*- triage/);
  assert.match(openQuestionTemplate, /rough report is fine/);
  assert.match(reuseReportTemplate, /name: Reuse report/);
  assert.match(reuseReportTemplate, /real repository/);
  assert.match(reuseReportTemplate, /kept, removed, or rewrote|keep, cut, or change/);
  assert.match(releasePlaybook, /Versioning notes/);
  assert.match(releasePlaybook, /Release note/);
  assert.match(releasePlaybook, /Pre-tag command sequence/);
  assert.match(releasePlaybook, /When to ship a v0\.1\.x release/);
  assert.match(releasePlaybook, /Replace-first review/);
  assert.match(releasePlaybook, /same issue thread or release note follow-up/);
  assert.match(releasePlaybook, /package version aligned with the latest released repository state/);
  assert.match(cadence, /Weekly outputs/);
  assert.match(cadence, /First follow-up issue/);
  assert.match(cadence, /Post-release follow-up/);
  assert.match(exampleReadme, /Basic template adoption example/);
  assert.match(exampleReadme, /fictional: `docs-ops-handbook`/);
  assert.match(exampleReadme, /What they changed before the first release/);
  assert.match(exampleReadme, /What the first release looked like/);
  assert.match(exampleReadme, /Why this example exists/);
  assert.match(exampleReadme, /README\.md/);
  assert.match(exampleReadme, /CODEOWNERS`? and `?SECURITY\.md/);
  assert.match(exampleReadme, /copied and adapted/);
  assert.match(exampleReadme, /maintainer-workflows\.paths\.json/);
  assert.match(minimalCopyReadme, /Minimal copy path example/);
  assert.match(minimalCopyReadme, /tiny-status-page/);
  assert.match(minimalCopyReadme, /What they kept/);
  assert.match(minimalCopyReadme, /What they skipped on purpose/);
  assert.match(minimalCopyReadme, /without the full validation layer/);
  assert.match(minimalCopyReadme, /maintainer-workflows\.paths\.json/);
  assert.deepEqual(basicPathsOverride.requiredPaths, [
    "README.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    ".github/pull_request_template.md",
    ".github/ISSUE_TEMPLATE/bug-report.yml",
  ]);
  assert.deepEqual(minimalPathsOverride.requiredPaths, [
    "README.md",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md",
    ".github/pull_request_template.md",
    ".github/ISSUE_TEMPLATE/open-question.yml",
  ]);
  assert.match(roadmap, /How to use this roadmap/);
  assert.match(roadmap, /copy and cleanup cycle/);
  assert.match(roadmap, /real downstream first pass/);
  assert.equal(packageJson.version, "0.1.6");
  assert.equal(
    packageJson.description,
    "Reusable maintainer operations kit for small public OSS repositories.",
  );
});
