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

  assert.match(readme, /Minimal rollout path/);
  assert.match(readme, /Repository boundary/);
  assert.doesNotMatch(readme, /README\.zh-CN\.md/);
  assert.match(releasePlaybook, /Versioning notes/);
  assert.match(releasePlaybook, /Release note/);
  assert.match(releasePlaybook, /Pre-tag command sequence/);
  assert.match(releasePlaybook, /When to ship a v0\.1\.x release/);
  assert.match(cadence, /Weekly outputs/);
  assert.match(cadence, /First follow-up issue/);
  assert.match(exampleReadme, /Before you copy this scaffold/);
  assert.match(exampleReadme, /After the first release/);
  assert.match(exampleReadme, /First follow-up issue/);
  assert.match(roadmap, /How to use this roadmap/);
});
