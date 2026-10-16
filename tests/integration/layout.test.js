import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const entries = [
  ["packages/core", "standards-core"],
  ["packages/domains/frontend", "standards-frontend"],
  ["packages/technologies/typescript", "standards-typescript"],
  ["packages/technologies/svelte", "standards-svelte"],
  ["packages/stacks/frontend/svelte-spa", "standards-svelte-spa"],
];
const json = async (path) => JSON.parse(await readFile(path, "utf8"));

test("private root distributes exactly five independently versioned document packages", async () => {
  const root = await json("package.json");
  assert.equal(root.private, true);
  assert.equal(root.version, undefined);
  assert.deepEqual(root.workspaces, entries.map(([path]) => path));
  assert.equal(root.engines.node, "^26.0.0");
});

for (const [path, name] of entries) {
  test(`${name} distributes documents without executable or catalog interfaces`, async () => {
    const pkg = await json(`${path}/package.json`);
    assert.equal(pkg.name, `@antonsmolko/${name}`);
    assert.equal(pkg.version, "0.1.0");
    assert.equal(pkg.license, "MIT");
    assert.equal(pkg.publishConfig.access, "public");
    assert.deepEqual(pkg.dependencies ?? {}, {});
    assert.deepEqual(pkg.peerDependencies ?? {}, {});
    assert.equal(pkg.bin, undefined);
    assert.equal(pkg.scripts, undefined);
    assert.deepEqual(pkg.exports, { "./package.json": "./package.json" });
    for (const document of ["README.md", "LICENSE", "CHANGELOG.md"]) {
      assert.ok((await readFile(`${path}/${document}`, "utf8")).trim());
    }
  });
}
