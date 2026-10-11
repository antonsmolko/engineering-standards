import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import Ajv from "ajv";

const project = () => {
  return {
    schemaVersion: 1,
    packages: ["@antonsmolko/standards-core"],
    profiles: ["core"],
    modules: [],
    exceptions: [],
    entrypoints: ["AGENTS.md"],
  };
};

for (const path of [
  "packages/core/schemas/project.schema.json",
  "packages/tooling/standards-cli/lib/schemas/project.schema.json",
]) {
  test(`${path} accepts package selection without duplicated versions`, async () => {
    const schema = JSON.parse(await readFile(path, "utf8"));
    const validate = new Ajv().compile(schema);

    assert.equal(validate(project()), true);
  });

  for (const [name, packages] of [
    [
      "version-bearing legacy entries",
      [{ name: "@antonsmolko/standards-core", version: "0.1.0" }],
    ],
    [
      "duplicate package names",
      ["@antonsmolko/standards-core", "@antonsmolko/standards-core"],
    ],
    ["empty package names", [""]],
    ["non-string package names", [42]],
  ]) {
    test(`${path} rejects ${name}`, async () => {
      const schema = JSON.parse(await readFile(path, "utf8"));
      const validate = new Ajv().compile(schema);

      assert.equal(validate({ ...project(), packages }), false);
    });
  }
}

for (const name of ["manifest", "project"]) {
  test(`the bundled ${name} schema matches the canonical core schema`, async () => {
    const canonical = JSON.parse(
      await readFile(`packages/core/schemas/${name}.schema.json`, "utf8"),
    );
    const bundled = JSON.parse(
      await readFile(
        `packages/tooling/standards-cli/lib/schemas/${name}.schema.json`,
        "utf8",
      ),
    );

    assert.deepEqual(bundled, canonical);
  });
}

test("CLI installation does not select a specification profile transitively", async () => {
  const pkg = JSON.parse(
    await readFile("packages/tooling/standards-cli/package.json", "utf8"),
  );

  assert.equal(pkg.dependencies["@antonsmolko/standards-core"], undefined);
});
