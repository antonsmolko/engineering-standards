import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const repository = resolve(import.meta.dirname, "../..");
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const save = (path, data) => writeFile(path, JSON.stringify(data, null, 2));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "engist-pack-root-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(join(repository, "package.json"), join(root, "package.json"));
  await cp(join(repository, "packages"), join(root, "packages"), { recursive: true });
  await mkdir(join(root, "tmp"));
  return root;
}

function run(root, env = {}) {
  return spawnSync(process.execPath, [join(repository, "scripts/pack-check.js")], {
    cwd: root, encoding: "utf8", timeout: 120000,
    env: { ...process.env, TMPDIR: join(root, "tmp"), ...env },
  });
}

async function clean(root) {
  assert.ok(!(await readdir(join(root, "tmp"))).some((path) => path.startsWith("engist-pack-check-")), "Pack/consumer temporary output was not cleaned.");
  assert.ok(!(await readdir(root)).some((path) => path.endsWith(".tgz")));
}

test("pack check inspects exactly eight artifacts and verifies their installed consumer without source changes", async (t) => {
  const root = await fixture(t);
  const paths = (await readJson(join(root, "package.json"))).workspaces;
  const before = await Promise.all(paths.map((path) => readFile(join(root, path, "package.json"), "utf8")));
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /8 workspace artifacts.*offline consumer/i);
  const after = await Promise.all(paths.map((path) => readFile(join(root, path, "package.json"), "utf8")));
  assert.deepEqual(after, before);
  await clean(root);
});

for (const [label, mutate, message] of [
  ["leaked fixture", async (root) => {
    await mkdir(join(root, "packages/core/docs/fixtures"), { recursive: true });
    await writeFile(join(root, "packages/core/docs/fixtures/private.json"), "{}");
  }, /forbidden.*fixtures/i],
  ["missing declared export", async (root) => {
    const path = join(root, "packages/core/package.json");
    const pkg = await readJson(path);
    pkg.exports["./missing.json"] = "./schemas/missing.json";
    await save(path, pkg);
  }, /missing.*export/i],
  ["broken installed catalog", async (root) => {
    await rm(join(root, "packages/core/architecture/public-contract.md"));
  }, /public-contract|document/i],
  ["packing failure", async (root) => {
    await rm(join(root, "packages/tooling/standards-cli/package.json"));
  }, /ENOENT|cannot read|pack/i],
]) {
  test(`pack check rejects ${label} and cleans temporary artifacts`, async (t) => {
    const root = await fixture(t);
    await mutate(root);
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, message);
    await clean(root);
  });
}

test("pack check fails on an empty offline cache without registry fallback and cleans up", async (t) => {
  const root = await fixture(t);
  const cache = join(root, "empty-cache");
  const result = run(root, { npm_config_cache: cache, npm_config_registry: "http://127.0.0.1:1" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /offline consumer cache is incomplete/i);
  assert.doesNotMatch(result.stderr, /ECONNREFUSED/);
  await clean(root);
});

for (const stage of ["typecheck", "metadata", "tests"]) {
  test(`npm pack:check stops before packing when ${stage} fails`, async (t) => {
    const root = await fixture(t);
    await cp(join(repository, "package-lock.json"), join(root, "package-lock.json"));
    await cp(join(repository, "scripts"), join(root, "scripts"), { recursive: true });
    await symlink(join(repository, "node_modules"), join(root, "node_modules"), "dir");
    const pkg = await readJson(join(root, "package.json"));
    pkg.scripts.typecheck = stage === "typecheck" ? 'node -e "process.exit(7)"' : 'node -e "process.exit(0)"';
    pkg.scripts.test = stage === "tests" ? 'node -e "process.exit(8)"' : 'node -e "process.exit(0)"';
    // An actual marker command replaces only the stage which must never be reached.
    pkg.scripts["pack:check"] = pkg.scripts["pack:check"]?.replace("node scripts/pack-check.js", 'node -e "require(\'fs\').writeFileSync(\'pack-reached\', \'yes\')"');
    await save(join(root, "package.json"), pkg);
    if (stage === "metadata") {
      const lock = await readJson(join(root, "package-lock.json"));
      delete lock.packages["packages/tooling/standards-cli"];
      await save(join(root, "package-lock.json"), lock);
    }
    const result = spawnSync("npm", ["run", "pack:check"], { cwd: root, encoding: "utf8", timeout: 30000 });
    assert.notEqual(result.status, 0);
    assert.doesNotMatch(result.stderr, /Missing script/);
    await assert.rejects(readFile(join(root, "pack-reached")), { code: "ENOENT" });
    await clean(root);
  });
}
