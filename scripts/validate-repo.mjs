import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

export const requiredPaths = [
  "package-lock.json",
  "README.md",
  "LICENSE",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "SUPPORT.md",
  "SECURITY.md",
  "CHANGELOG.md",
  ".github/CODEOWNERS",
  ".github/release.yml",
  ".github/pull_request_template.md",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/bug-report.yml",
  ".github/ISSUE_TEMPLATE/docs-request.yml",
  ".github/ISSUE_TEMPLATE/maintenance-review.yml",
  ".github/ISSUE_TEMPLATE/open-question.yml",
  ".github/ISSUE_TEMPLATE/reuse-report.yml",
  ".github/ISSUE_TEMPLATE/workflow-improvement.yml",
  ".github/workflows/validate.yml",
  ".github/workflows/release-check.yml",
  "docs/maintenance-cadence.md",
  "docs/project-roadmap.md",
  "docs/release-playbook.md",
  "examples/basic-template/README.md",
  "examples/basic-template/maintainer-workflows.paths.json",
  "examples/minimal-copy/README.md",
  "examples/minimal-copy/maintainer-workflows.paths.json"
];

async function loadRequiredPathsOverride(rootDirectory) {
  const overridePath = path.join(rootDirectory, "maintainer-workflows.paths.json");

  try {
    const raw = await fs.readFile(overridePath, "utf8");
    const parsed = JSON.parse(raw);

    if (
      Array.isArray(parsed.requiredPaths) &&
      parsed.requiredPaths.every((item) => typeof item === "string")
    ) {
      return parsed.requiredPaths;
    }
  } catch {
    return null;
  }

  return null;
}

export async function collectMissingPaths(rootDirectory) {
  const overriddenPaths = await loadRequiredPathsOverride(rootDirectory);
  const activePaths = overriddenPaths ?? requiredPaths;
  const missing = [];

  for (const relativePath of activePaths) {
    const absolutePath = path.join(rootDirectory, relativePath);

    try {
      await fs.access(absolutePath);
    } catch {
      missing.push(relativePath);
    }
  }

  return missing;
}

async function main() {
  const scriptDirectory = path.dirname(url.fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(scriptDirectory, "..");
  const missing = await collectMissingPaths(repoRoot);

  if (missing.length > 0) {
    console.error("Repository scaffold is incomplete.");
    for (const relativePath of missing) {
      console.error(`- ${relativePath}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Repository scaffold looks complete.");
}

const entryFile = process.argv[1]
  ? path.resolve(process.argv[1])
  : null;
const currentFile = url.fileURLToPath(import.meta.url);

if (entryFile === currentFile) {
  await main();
}
