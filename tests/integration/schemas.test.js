import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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
