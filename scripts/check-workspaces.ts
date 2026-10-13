import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { satisfies } from "semver";

type WorkspacePackage = {
  name: string;
  version: string;
  exports?: Record<string, string>;
};
type Manifest = { requires: { name: string; range: string }[] };

// Repository metadata is maintainer-controlled; the existing suite validates schemas/identity.
async function readJson<T>(root: string, path: string): Promise<T> {
  try {
    return JSON.parse(await readFile(join(root, path), "utf8")) as T;
  } catch (error) {
    throw new Error(`${path}: ${(error as Error).message}`);
  }
}

export async function checkWorkspaces(root: string): Promise<string[]> {
  const diagnostics: string[] = [];
  try {
    const { workspaces } = await readJson<{ workspaces: string[] }>(root, "package.json");
    const lock = await readJson<{ packages: Record<string, { version?: string } | undefined> }>(root, "package-lock.json");
    const packages = new Map<string, WorkspacePackage>();
    const manifests: { path: string; manifest: Manifest }[] = [];
    for (const path of workspaces) {
      const pkg = await readJson<WorkspacePackage>(root, `${path}/package.json`);
      packages.set(pkg.name, pkg);
      const entry = lock.packages[path];
      if (!entry) diagnostics.push(`${path}: workspace lock entry missing.`);
      else if (entry.version !== pkg.version) diagnostics.push(`${path}: workspace lock version differs from package.json.`);
      // Tooling reserves future files; only current manifest exports require a manifest.
      if (pkg.exports?.["./manifest.json"]) {
        manifests.push({ path, manifest: await readJson<Manifest>(root, `${path}/manifest.json`) });
      }
    }
    for (const { path, manifest } of manifests) {
      for (const { name, range } of manifest.requires) {
        const local = packages.get(name);
        if (local && !satisfies(local.version, range)) {
          diagnostics.push(`${path}: incompatible local requires ${name}@${local.version} with ${range}.`);
        }
      }
    }
  } catch (error) {
    diagnostics.push(`Workspace check failed: ${(error as Error).message}`);
  }
  return diagnostics;
}

if (import.meta.main) {
  const diagnostics = await checkWorkspaces(process.cwd());
  if (diagnostics.length) {
    console.error(diagnostics.join("\n"));
    process.exitCode = 1;
  }
}
