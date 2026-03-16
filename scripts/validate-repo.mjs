import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

export const requiredPaths = [
  "package-lock.json",
  "README.md",
  "LICENSE",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CHANGELOG.md",
  ".github/CODEOWNERS",
  ".github/release.yml",
  ".github/pull_request_template.md",
  ".github/ISSUE_TEMPLATE/bug-report.yml",
  ".github/ISSUE_TEMPLATE/docs-request.yml",
  ".github/ISSUE_TEMPLATE/workflow-improvement.yml",
  ".github/workflows/validate.yml",
  ".github/workflows/release-check.yml",
  "docs/maintenance-cadence.md",
  "docs/project-roadmap.md",
  "docs/release-playbook.md",
  "examples/basic-template/README.md"
];

export async function collectMissingPaths(rootDirectory) {
  const missing = [];

  for (const relativePath of requiredPaths) {
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
