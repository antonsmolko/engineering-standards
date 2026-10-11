import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import semver from "semver";

const entries = [
  ["packages/core", "standards-core"],
  ["packages/domains/frontend", "standards-frontend"],
  ["packages/technologies/typescript", "standards-typescript"],
  ["packages/technologies/svelte", "standards-svelte"],
  ["packages/stacks/frontend/svelte-spa", "standards-svelte-spa"],
  ["packages/tooling/eslint-config", "eslint-config"],
  ["packages/tooling/prettier-config", "prettier-config"],
  ["packages/tooling/standards-cli", "standards-cli"],
];

const json = async (path) => {
  return JSON.parse(await readFile(resolve(path), "utf8"));
};

const require = createRequire(resolve("package.json"));

test("executable workspaces declare the verified Node support boundary", async () => {
  for (const path of [
    "package.json",
    "packages/tooling/standards-cli/package.json",
  ]) {
    const pkg = await json(path);

    assert.ok(semver.satisfies("22.13.0", pkg.engines?.node ?? ""));
    assert.ok(semver.satisfies("24.14.0", pkg.engines?.node ?? ""));
    assert.ok(!semver.satisfies("22.12.0", pkg.engines?.node ?? ""));
    assert.ok(!semver.satisfies("23.0.0", pkg.engines?.node ?? ""));
  }
});

test("private root declares all independently versioned workspaces", async () => {
  const root = await json("package.json");

  assert.equal(root.private, true);
  assert.equal(root.version, undefined);
  assert.deepEqual(
    root.workspaces,
    entries.map(([path]) => {
      return path;
    }),
  );
});

for (const [path, name] of entries) {
  test(`${name} is independently publishable without lifecycle mutations`, async () => {
    const pkg = await json(`${path}/package.json`);

    assert.equal(pkg.name, `@antonsmolko/${name}`);
    assert.equal(pkg.version, "0.1.0");
    assert.equal(pkg.license, "MIT");
    assert.equal(pkg.publishConfig.access, "public");
    assert.ok(Array.isArray(pkg.files) && pkg.files.length > 0);
    assert.ok(
      !(
        pkg.scripts &&
        ["preinstall", "install", "postinstall"].some((key) => {
          return key in pkg.scripts;
        })
      ),
    );

    for (const document of ["README.md", "LICENSE", "CHANGELOG.md"]) {
      assert.ok((await readFile(`${path}/${document}`, "utf8")).trim());
    }

    if (name.startsWith("standards-") && name !== "standards-cli") {
      assert.deepEqual(pkg.dependencies ?? {}, {});
      assert.deepEqual(pkg.peerDependencies ?? {}, {});
      const metadata = JSON.parse(
        await readFile(require.resolve(`${pkg.name}/package.json`), "utf8"),
      );
      const manifest = JSON.parse(
        await readFile(require.resolve(`${pkg.name}/manifest.json`), "utf8"),
      );

      assert.equal(metadata.name, manifest.package.name);
      assert.equal(metadata.version, manifest.package.version);
    }
  });
}
