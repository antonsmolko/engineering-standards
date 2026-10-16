import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, join, resolve } from "node:path";
import test from "node:test";
import type { TestContext } from "node:test";
import { checkWorkspaces } from "../../scripts/check-workspaces.ts";

const repository = process.cwd();
const env = { ...process.env, PATH: `${join(repository, "node_modules/.bin")}${delimiter}${process.env.PATH}` };
function run(root: string, command: string, args: string[]): string {
  return execFileSync(command, args, { cwd: root, env, encoding: "utf8", timeout: 30000, stdio: ["ignore", "pipe", "pipe"] });
}
const json = async (path: string) => JSON.parse(await readFile(path, "utf8"));

async function fixture(t: TestContext) {
  const metadata = await json(join(repository, "package.json"));
  assert.ok(metadata.scripts.changeset, "Root must expose the standard Changesets command.");
  const temporary = await mkdtemp(join(tmpdir(), "standards-changesets-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const root = join(temporary, "project");
  await mkdir(join(root, ".changeset"), { recursive: true });
  await copyFile(join(repository, ".changeset/config.json"), join(root, ".changeset/config.json"));
  await writeFile(join(root, "package.json"), JSON.stringify({ name: "versioning-fixture", private: true, workspaces: metadata.workspaces, scripts: { changeset: metadata.scripts.changeset } }));
  const packages: { path: string; name: string; version: string; changelog: string; summary?: string; bump?: string; next: string }[] = [];
  for (const path of metadata.workspaces as string[]) {
    const source = await json(join(repository, path, "package.json"));
    const version = source.name === "@antonsmolko/standards-svelte" ? "1.2.3" : source.version;
    const change = source.name === "@antonsmolko/standards-core" ? { bump: "patch", next: "0.1.1", summary: "Clarify synthetic wording without changing meaning." }
      : source.name === "@antonsmolko/standards-typescript" ? { bump: "minor", next: "0.2.0", summary: "Migration: replace the previous synthetic TypeScript convention." }
        : source.name === "@antonsmolko/standards-svelte" ? { bump: "major", next: "2.0.0", summary: "Migration: replace the previous synthetic Svelte convention." }
          : { next: version };
    await mkdir(join(root, path), { recursive: true });
    await writeFile(join(root, path, "package.json"), JSON.stringify({ ...source, version }));
    const changelog = await readFile(join(repository, path, "CHANGELOG.md"), "utf8");
    await writeFile(join(root, path, "CHANGELOG.md"), changelog);
    packages.push({ path, name: source.name, version, changelog, ...change });
  }
  run(root, "npm", ["install", "--package-lock-only", "--ignore-scripts", "--offline", "--no-audit", "--no-fund"]);
  run(root, "git", ["init", "-b", "main"]);
  run(root, "git", ["add", "."]);
  run(root, "git", ["-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "-c", "commit.gpgsign=false", "commit", "-m", "Initial fixture"]);
  const baseline = await snapshot(root);
  const head = run(root, "git", ["rev-parse", "HEAD"]);
  for (const pkg of packages.filter((pkg) => pkg.bump)) {
    run(root, "npm", ["run", "changeset", "--", "add", `--${pkg.bump}`, pkg.name, "--message", pkg.summary!]);
  }
  return { root, temporary, packages, baseline, head };
}

async function snapshot(root: string) {
  const files = (await readdir(root, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile() && !entry.parentPath.slice(root.length).split(/[\\/]/).includes(".git"))
    .map((entry) => join(entry.parentPath, entry.name)).sort();
  return Object.fromEntries(await Promise.all(files.map(async (file) => [file.slice(root.length + 1), await readFile(file, "utf8")])));
}

test("Changesets versions only selected packages and npm synchronizes their lockfile", async (t) => {
  const { root, temporary, packages, baseline, head } = await fixture(t);
  const planFile = join(temporary, "plan.json");
  run(root, "npm", ["run", "changeset", "--", "status", "--output", planFile]);
  const plan = await json(planFile);
  assert.deepEqual(plan.releases.map((release: { name: string; newVersion: string }) => [release.name, release.newVersion]).sort(),
    packages.filter((pkg) => pkg.bump).map((pkg) => [pkg.name, pkg.next]).sort());
  run(root, "npm", ["run", "changeset", "--", "version"]);
  for (const pkg of packages) {
    assert.equal((await json(join(root, pkg.path, "package.json"))).version, pkg.next);
    const changelog = await readFile(join(root, pkg.path, "CHANGELOG.md"), "utf8");
    if (pkg.bump) {
      assert.ok(changelog.includes(pkg.next));
      assert.ok(changelog.includes(pkg.summary!));
      assert.ok(changelog.includes(pkg.changelog.slice(pkg.changelog.indexOf("## "))), "Retain the existing unreleased changelog entry.");
    } else {
      assert.equal(await readFile(join(root, pkg.path, "package.json"), "utf8"), baseline[`${pkg.path}/package.json`]);
      assert.equal(changelog, pkg.changelog);
    }
  }
  assert.equal(await readFile(join(root, "package.json"), "utf8"), baseline["package.json"]);
  assert.equal(run(root, "git", ["rev-parse", "HEAD"]), head);
  assert.equal(run(root, "git", ["tag", "--list"]), "");
  assert.deepEqual((await readdir(join(root, ".changeset"))).filter((file) => file.endsWith(".md")), []);
  run(root, "npm", ["install", "--package-lock-only", "--ignore-scripts", "--offline", "--no-audit", "--no-fund"]);
  assert.deepEqual(await checkWorkspaces(root), []);
  const lock = await json(join(root, "package-lock.json"));
  for (const pkg of packages) assert.equal(lock.packages[pkg.path].version, pkg.next);
  assert.equal(lock.packages[""].version, undefined);
});

test("Changesets status reads a valid plan without changing project files", async (t) => {
  const { root } = await fixture(t);
  const before = await snapshot(root);
  const output = run(root, "npm", ["run", "changeset", "--", "status"]);
  for (const name of ["core", "typescript", "svelte"]) assert.ok(output.includes(`@antonsmolko/standards-${name}`));
  assert.deepEqual(await snapshot(root), before);
});
