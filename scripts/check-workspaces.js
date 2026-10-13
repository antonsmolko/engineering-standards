import { readFile } from "node:fs/promises";
import { join } from "node:path";
import semver from "semver";

// This is a local consistency check, not a release/content approval.
export async function checkWorkspaces(root) {
  const diagnostics = [];
  async function json(path) {
    let text;
    try {
      text = await readFile(join(root, path), "utf8");
    } catch (error) {
      diagnostics.push(`${path}: cannot read required JSON (${error.code}).`);
      return null;
    }
    try {
      const value = JSON.parse(text);
      if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
      return value;
    } catch {
      diagnostics.push(`${path}: invalid JSON object.`);
      return null;
    }
  }
  const metadata = await json("package.json");
  const lock = await json("package-lock.json");
  if (!metadata || !lock) return diagnostics;
  if (!Array.isArray(metadata.workspaces) || metadata.workspaces.length === 0 ||
      metadata.workspaces.some((path) => typeof path !== "string" || !path.startsWith("packages/") || path.split("/").some((part) => !part || part === ".." || part === "." || /[*?\\]/.test(part))) ||
      new Set(metadata.workspaces).size !== metadata.workspaces.length) {
    diagnostics.push("package.json: invalid explicit workspace paths.");
    return diagnostics;
  }
  if (!lock.packages || typeof lock.packages !== "object" || Array.isArray(lock.packages)) {
    diagnostics.push("package-lock.json: missing workspace lock entries.");
    return diagnostics;
  }
  const packages = new Map();
  const manifests = [];
  for (const path of metadata.workspaces) {
    const pkg = await json(`${path}/package.json`);
    if (!pkg) continue;
    if (typeof pkg.name !== "string" || !pkg.name.trim() || packages.has(pkg.name)) {
      diagnostics.push(`${path}/package.json: invalid or duplicate package name.`);
    } else packages.set(pkg.name, pkg);
    if (typeof pkg.version !== "string" || !semver.valid(pkg.version)) {
      diagnostics.push(`${path}/package.json: invalid version.`);
    }
    const entry = lock.packages[path];
    if (!entry || typeof entry !== "object") diagnostics.push(`${path}: workspace lock entry missing.`);
    else if (entry.version !== pkg.version) diagnostics.push(`${path}: workspace lock version differs from package.json.`);
    // Only specification packages export a manifest; tooling may reserve a future file in files[].
    if (pkg.exports?.["./manifest.json"] !== undefined) {
      const manifest = await json(`${path}/manifest.json`);
      if (!manifest) continue;
      if (manifest.package?.name !== pkg.name) diagnostics.push(`${path}: manifest package name differs from package.json.`);
      if (manifest.package?.version !== pkg.version) diagnostics.push(`${path}: manifest package version differs from package.json.`);
      manifests.push([path, manifest]);
    }
  }
  for (const [path, manifest] of manifests) {
    if (!Array.isArray(manifest.requires)) {
      diagnostics.push(`${path}: invalid manifest requires array.`);
      continue;
    }
    for (const requirement of manifest.requires) {
      if (!requirement || typeof requirement.name !== "string" || !requirement.name.trim() ||
          typeof requirement.range !== "string" || !requirement.range.trim() || !semver.validRange(requirement.range)) {
        diagnostics.push(`${path}: invalid manifest requires name or range.`);
        continue;
      }
      const local = packages.get(requirement.name);
      if (local && semver.valid(local.version) && !semver.satisfies(local.version, requirement.range)) {
        diagnostics.push(`${path}: incompatible local requires ${requirement.name}@${local.version} with ${requirement.range}.`);
      }
    }
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
