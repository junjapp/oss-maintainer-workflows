import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const publicFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "docs/maintenance-cadence.md",
  "docs/project-roadmap.md",
  "docs/release-playbook.md",
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

  assert.match(readme, /Minimal rollout path/);
  assert.match(readme, /Replace before reuse/);
  assert.match(readme, /Validation baseline/);
  assert.match(readme, /Repository boundary/);
  assert.doesNotMatch(readme, /README\.zh-CN\.md/);
  assert.match(readme, /README\.md`?, `?CODEOWNERS`?, and `?SECURITY\.md/);
  assert.match(readme, /This repository keeps active maintainer values for its own public operation/);
  assert.match(readme, /maintainer-workflows\.paths\.json/);
  assert.match(codeowners, /Replace this entry before reusing the scaffold/);
  assert.match(codeowners, /This repository keeps an active owner entry because it is the live source repository/);
  assert.match(security, /Replace the contact path before you reuse this scaffold/);
  assert.match(security, /contact the active maintainer directly for this repository/);
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
  assert.match(exampleReadme, /Before you copy this scaffold/);
  assert.match(exampleReadme, /After the first release/);
  assert.match(exampleReadme, /First adoption example/);
  assert.match(exampleReadme, /First follow-up issue/);
  assert.match(exampleReadme, /Replace first/);
  assert.match(exampleReadme, /README\.md`?, `?CODEOWNERS`?, and `?SECURITY\.md/);
  assert.match(exampleReadme, /adaptation example first/);
  assert.match(roadmap, /How to use this roadmap/);
  assert.match(roadmap, /copy and cleanup cycle/);
  assert.equal(packageJson.version, "0.1.4");
});
