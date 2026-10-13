import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const repository = resolve(import.meta.dirname, "../..");
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const save = (path, data) => writeFile(path, JSON.stringify(data, null, 2));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "engist-metadata-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const file of ["package.json", "package-lock.json"]) {
    await cp(join(repository, file), join(root, file));
  }
  const metadata = await readJson(join(root, "package.json"));
  for (const workspace of metadata.workspaces) {
    await mkdir(join(root, workspace), { recursive: true });
    await cp(join(repository, workspace, "package.json"), join(root, workspace, "package.json"));
    if (!workspace.startsWith("packages/tooling/")) {
      await cp(join(repository, workspace, "manifest.json"), join(root, workspace, "manifest.json"));
    }
  }
  return root;
}

const run = (root) => spawnSync(process.execPath, [join(repository, "scripts/check-workspaces.js")], {
  cwd: root, encoding: "utf8", timeout: 30000,
});

async function snapshot(root) {
  const { workspaces } = await readJson(join(root, "package.json"));
  const paths = ["package.json", "package-lock.json", ...workspaces.flatMap((workspace) => [
    `${workspace}/package.json`, ...(!workspace.startsWith("packages/tooling/") ? [`${workspace}/manifest.json`] : []),
  ])];
  return Promise.all(paths.map(async (path) => [path, await readFile(join(root, path), "utf8").catch((error) => error.code)]));
}

test("workspace check accepts all eight matching lock entries and absent tooling manifests without writes", async (t) => {
  const root = await fixture(t);
  const before = await snapshot(root);
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  assert.deepEqual(await snapshot(root), before);
});

for (const workspace of ["packages/core", "packages/tooling/eslint-config", "packages/tooling/prettier-config", "packages/tooling/standards-cli"]) {
  for (const missing of [false, true]) {
    test(`workspace check rejects ${missing ? "missing" : "stale"} ${workspace} lock metadata without writes`, async (t) => {
      const root = await fixture(t);
      const lock = await readJson(join(root, "package-lock.json"));
      if (missing) delete lock.packages[workspace];
      else lock.packages[workspace].version = "0.0.9";
      await save(join(root, "package-lock.json"), lock);
      const before = await snapshot(root);
      const result = run(root);
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /lock.*(missing|version)/i);
      assert.ok(result.stderr.includes(workspace));
      assert.deepEqual(await snapshot(root), before);
    });
  }
}

for (const [label, path, change, diagnostic] of [
  ["manifest name drift", "packages/core/manifest.json", (value) => { value.package.name = "@antonsmolko/other"; }, /manifest.*name/i],
  ["manifest version drift", "packages/core/manifest.json", (value) => { value.package.version = "0.0.9"; }, /manifest.*version/i],
  ["invalid workspace version", "packages/core/package.json", (value) => { value.version = "garbage"; }, /invalid.*version/i],
  ["invalid semantic range", "packages/technologies/typescript/manifest.json", (value) => { value.requires[0].range = "garbage"; }, /invalid.*range/i],
  ["incompatible local range", "packages/technologies/typescript/manifest.json", (value) => { value.requires[0].range = "^0.2.0"; }, /incompatible.*standards-core/i],
  ["invalid requires shape", "packages/core/manifest.json", (value) => { value.requires = null; }, /requires/i],
]) {
  test(`workspace check rejects ${label} without writes`, async (t) => {
    const root = await fixture(t);
    const metadata = await readJson(join(root, path));
    change(metadata);
    await save(join(root, path), metadata);
    const before = await snapshot(root);
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, diagnostic);
    assert.deepEqual(await snapshot(root), before);
  });
}

for (const path of ["package.json", "package-lock.json", "packages/core/package.json", "packages/core/manifest.json"]) {
  for (const mode of ["missing", "malformed", "unreadable"]) {
    test(`workspace check diagnoses ${mode} ${path} without writes`, async (t) => {
      const root = await fixture(t);
      const target = join(root, path);
      await rm(target);
      if (mode === "malformed") await writeFile(target, "{broken");
      if (mode === "unreadable") await mkdir(target);
      const result = run(root);
      assert.notEqual(result.status, 0);
      assert.ok(result.stderr.includes(path));
      assert.match(result.stderr, /cannot read|invalid JSON/i);
      if (mode === "malformed") assert.equal(await readFile(target, "utf8"), "{broken");
    });
  }
}

test("external semantic requires do not demand registry access", async (t) => {
  const root = await fixture(t);
  const path = join(root, "packages/core/manifest.json");
  const metadata = await readJson(path);
  metadata.requires.push({ name: "@external/standard", range: "^1.0.0" });
  await save(path, metadata);
  assert.equal(run(root).status, 0);
});

for (const stage of ["typecheck", "metadata"]) {
  test(`npm check stops before tests when ${stage} fails`, async (t) => {
    const root = await fixture(t);
    const metadata = await readJson(join(root, "package.json"));
    const actual = await readJson(join(repository, "package.json"));
    metadata.scripts = {
      ...actual.scripts,
      typecheck: stage === "typecheck" ? 'node -e "process.exit(7)"' : 'node -e "process.exit(0)"',
      test: 'node -e "require(\'fs\').writeFileSync(\'tests-reached\', \'yes\')"',
    };
    // Use the real repository script in a controlled root; no production test seam.
    await mkdir(join(root, "scripts"));
    await cp(join(repository, "scripts/check-workspaces.js"), join(root, "scripts/check-workspaces.js"));
    await symlink(join(repository, "node_modules"), join(root, "node_modules"), "dir");
    await save(join(root, "package.json"), metadata);
    if (stage === "metadata") {
      const lock = await readJson(join(root, "package-lock.json"));
      delete lock.packages["packages/tooling/standards-cli"];
      await save(join(root, "package-lock.json"), lock);
    }
    const result = spawnSync("npm", ["run", "check"], { cwd: root, encoding: "utf8", timeout: 30000 });
    assert.notEqual(result.status, 0);
    assert.doesNotMatch(result.stderr, /Missing script/);
    await assert.rejects(readFile(join(root, "tests-reached")), { code: "ENOENT" });
    if (stage === "metadata") assert.match(result.stderr, /lock.*missing/i);
  });
}
