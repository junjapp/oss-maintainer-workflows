import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import url from "node:url";

import { collectMissingPaths, requiredPaths } from "../scripts/validate-repo.mjs";

test("collectMissingPaths reports the scaffold items that are absent", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "maintainer-kit-missing-"));

  await fs.mkdir(path.join(tempRoot, ".github", "workflows"), { recursive: true });
  await fs.writeFile(path.join(tempRoot, "README.md"), "# Example\n");

  const missing = await collectMissingPaths(tempRoot);

  assert.ok(missing.includes(".github/workflows/validate.yml"));
  assert.ok(!missing.includes("README.md"));
});

test("collectMissingPaths passes when every required path exists", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "maintainer-kit-complete-"));

  await Promise.all(
    requiredPaths.map(async (relativePath) => {
      const absolutePath = path.join(tempRoot, relativePath);
      await fs.mkdir(path.dirname(absolutePath), { recursive: true });
      await fs.writeFile(absolutePath, "ok\n");
    }),
  );

  const missing = await collectMissingPaths(tempRoot);

  assert.deepEqual(missing, []);
});

test("repository root includes the full maintainer scaffold", async () => {
  const repoRoot = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "..",
  );

  const missing = await collectMissingPaths(repoRoot);

  assert.deepEqual(missing, []);
});

test("requiredPaths includes the lockfile needed by npm ci", () => {
  assert.ok(requiredPaths.includes("package-lock.json"));
});

test("requiredPaths reflect the renamed public docs layout", () => {
  const docsPaths = requiredPaths.filter((item) => item.startsWith("docs/")).sort();

  assert.deepEqual(docsPaths, [
    "docs/maintenance-cadence.md",
    "docs/project-roadmap.md",
    "docs/release-playbook.md",
  ]);
});

test("requiredPaths stay limited to the public scaffold", () => {
  assert.ok(!requiredPaths.some((item) => item.startsWith(".private/")));

  const workflowPaths = requiredPaths
    .filter((item) => item.startsWith(".github/workflows/"))
    .sort();

  assert.deepEqual(workflowPaths, [
    ".github/workflows/release-check.yml",
    ".github/workflows/validate.yml",
  ]);
});

test("requiredPaths include release metadata used by GitHub releases", () => {
  assert.ok(requiredPaths.includes(".github/release.yml"));
});
