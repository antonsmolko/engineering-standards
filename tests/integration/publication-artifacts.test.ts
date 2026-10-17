import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFile, mkdir, mkdtemp, readFile, readdir, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import test from "node:test";
import { checkAcceptedHeaders } from "../helpers/check-accepted-headers.ts";
import { checkDocuments } from "../helpers/check-documents.ts";
import { installOffline } from "../helpers/install-offline.ts";

const repository = process.cwd();
const json = async (path: string) => JSON.parse(await readFile(path, "utf8"));

test("Changesets packs the five synthetic workspaces into verified installable release artifacts", async (t) => {
  const metadata = await json(join(repository, "package.json"));
  const sourceFiles = ["package.json", "package-lock.json", ".changeset/config.json"];
  for (const path of metadata.workspaces as string[]) {
    const files = await readdir(join(repository, path), { recursive: true, withFileTypes: true });
    sourceFiles.push(...files.filter((entry) => entry.isFile()).map((entry) => join(entry.parentPath, entry.name)));
  }
  const before = await Promise.all(sourceFiles.map((file) => readFile(file)));
  const temporary = await realpath(await mkdtemp(join(tmpdir(), "standards-publication-")));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const project = join(temporary, "project");
  const packed = join(temporary, "packed");
  const consumer = join(temporary, "consumer");
  await mkdir(join(project, ".changeset"), { recursive: true });
  await copyFile(join(repository, ".changeset/config.json"), join(project, ".changeset/config.json"));
  await writeFile(join(project, "package.json"), JSON.stringify({ name: "publication-fixture", private: true, workspaces: metadata.workspaces, scripts: { changeset: metadata.scripts.changeset } }));
  const packages: { name: string; version: string }[] = [];
  for (const [index, path] of (metadata.workspaces as string[]).entries()) {
    const source = await json(join(repository, path, "package.json"));
    const root = join(project, path);
    await mkdir(join(root, "standards"), { recursive: true });
    await writeFile(join(root, "package.json"), JSON.stringify({ ...source, files: ["README.md", "LICENSE", "CHANGELOG.md", "standards"] }));
    await writeFile(join(root, "README.md"), "# Synthetic package\n\n[Requirement](standards/requirement.md)\n");
    await copyFile(join(repository, "LICENSE"), join(root, "LICENSE"));
    await writeFile(join(root, "CHANGELOG.md"), "# Synthetic changes\n\n## 0.0.0\n\nTest only.\n");
    await writeFile(join(root, "standards/requirement.md"), `# Synthetic requirement\n\nID: SYNTHETIC-${index + 1}.\n\nStatus: accepted. Level: required.\n\n## Requirement\n\nTest-only content; no real owner decision.\n`);
    packages.push({ name: source.name, version: source.version });
  }
  // Supported upstream input fixture, not a registry availability or approval record.
  const planPath = join(temporary, "fixture-plan.json");
  await writeFile(planPath, JSON.stringify({ version: 1, plan: [packages.map((pkg) => ({ kind: "publish", ...pkg, access: "public", tag: "latest" }))] }));
  const env = { ...process.env, PATH: `${join(repository, "node_modules/.bin")}${delimiter}${process.env.PATH}`, npm_config_ignore_scripts: "true" };
  execFileSync("npm", ["install", "--package-lock-only", "--ignore-scripts", "--offline", "--no-audit", "--no-fund"], { cwd: project, env, encoding: "utf8", timeout: 30000, stdio: "pipe" });
  execFileSync("npm", ["run", "changeset", "--", "pack", "--from-publish-plan", planPath, "--out-dir", packed], { cwd: project, env, encoding: "utf8", timeout: 30000, stdio: "pipe" });
  const plan = await json(join(packed, "publish-plan.json"));
  const releases = plan.plan.flat() as { name: string; version: string; kind: string; tarball: { path: string; integrity: string } }[];
  assert.deepEqual(releases.map(({ name, version }) => ({ name, version })).sort((a, b) => a.name.localeCompare(b.name)), [...packages].sort((a, b) => a.name.localeCompare(b.name)));
  const tarballs: string[] = [];
  for (const release of releases) {
    assert.equal(release.kind, "publish");
    const tarball = join(packed, release.tarball.path);
    const bytes = await readFile(tarball);
    assert.equal(release.tarball.integrity, `sha256-${createHash("sha256").update(bytes).digest("base64")}`);
    const integrity = `sha512-${createHash("sha512").update(bytes).digest("base64")}`;
    t.diagnostic(`${release.name}@${release.version} ${integrity}`);
    tarballs.push(tarball);
  }
  await mkdir(consumer);
  await writeFile(join(consumer, "package.json"), JSON.stringify({ private: true }));
  installOffline(consumer, tarballs);
  const roots: string[] = [];
  for (const pkg of packages) {
    const root = join(consumer, "node_modules", pkg.name);
    assert.equal(await realpath(root), root, "Consumer must use actual tarballs, not workspace links.");
    const installed = await json(join(root, "package.json"));
    assert.equal(installed.name, pkg.name);
    assert.equal(installed.version, pkg.version);
    assert.deepEqual(await checkDocuments(root, pkg.name), []);
    roots.push(root);
  }
  assert.deepEqual(await checkAcceptedHeaders(roots), { ready: true, diagnostics: [] });
  assert.deepEqual(await Promise.all(sourceFiles.map((file) => readFile(file))), before, "Packing synthetic fixtures must preserve real packages and metadata.");
  t.diagnostic(`Synthetic artifacts/consumer: ${temporary}`);
});
