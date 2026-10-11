import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile, realpath } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { installOffline } from "../helpers/install-offline.js";

const packages = [
  ["packages/core", "standards-core", "CORE", "core"],
  [
    "packages/domains/frontend",
    "standards-frontend",
    "FRONTEND",
    "domains/frontend",
  ],
  [
    "packages/technologies/typescript",
    "standards-typescript",
    "TS",
    "technologies/typescript",
  ],
  [
    "packages/technologies/svelte",
    "standards-svelte",
    "SVELTE",
    "technologies/svelte",
  ],
  [
    "packages/stacks/frontend/svelte-spa",
    "standards-svelte-spa",
    "SVELTE-SPA",
    "stacks/frontend/svelte-spa",
  ],
];

test("packed catalogs export consumer metadata and CLI loads them without workspace links", async (t) => {
  const consumer = await realpath(
    await mkdtemp(join(tmpdir(), "standards-artifacts-")),
  );

  t.after(async () => {
    await rm(consumer, { recursive: true, force: true });
  });

  await writeFile(
    join(consumer, "package.json"),
    JSON.stringify({ private: true, type: "module" }),
  );
  const tarballs = [];

  for (const path of [
    ...packages.map(([path]) => {
      return path;
    }),
    "packages/tooling/standards-cli",
  ]) {
    const packed = JSON.parse(
      execFileSync(
        "npm",
        [
          "pack",
          resolve(path),
          "--json",
          "--ignore-scripts",
          "--pack-destination",
          consumer,
        ],
        { encoding: "utf8", timeout: 30000 },
      ),
    );

    assert.equal(packed.length, 1);
    assert.ok(
      packed[0].files.some((file) => {
        return file.path === "LICENSE";
      }),
    );
    assert.ok(
      !packed[0].files.some((file) => {
        return file.path.startsWith("tests/");
      }),
    );
    tarballs.push(join(consumer, packed[0].filename));
  }

  // npm ci prepares the cache explicitly; this install must not fetch from the registry.
  installOffline(consumer, tarballs);
  const require = createRequire(join(consumer, "package.json"));
  const cliRoot = join(consumer, "node_modules/@antonsmolko/standards-cli");
  const { loadCatalog } = await import(
    pathToFileURL(join(cliRoot, "lib/catalog/load.js")).href
  );

  const Ajv = require("ajv");
  const selection = {
    schemaVersion: 1,
    packages: ["@antonsmolko/standards-core"],
    profiles: ["core"],
    modules: [],
    exceptions: [],
    entrypoints: ["AGENTS.md"],
  };

  for (const path of [
    require.resolve("@antonsmolko/standards-core/schemas/project.json"),
    join(cliRoot, "lib/schemas/project.schema.json"),
  ]) {
    const validate = new Ajv().compile(
      JSON.parse(await readFile(path, "utf8")),
    );

    assert.equal(validate(selection), true);
    assert.equal(
      validate({
        ...selection,
        packages: [{ name: "@antonsmolko/standards-core", version: "0.1.0" }],
      }),
      false,
    );
  }

  for (const [, name, namespace, profile] of packages) {
    const metadataPath = require.resolve(`@antonsmolko/${name}/package.json`);
    const manifestPath = require.resolve(`@antonsmolko/${name}/manifest.json`);
    const expectedRoot = join(consumer, "node_modules/@antonsmolko", name);

    assert.equal(await realpath(dirname(metadataPath)), expectedRoot);
    assert.equal(dirname(manifestPath), dirname(metadataPath));
    const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
    const catalog = await loadCatalog(dirname(manifestPath));

    assert.equal(metadata.version, "0.1.0");
    assert.equal(catalog.manifest.package.namespace, namespace);
    assert.equal(catalog.manifest.profiles[0].id, profile);
    assert.ok(catalog.documents.size > 0);
  }

  // Prove schema validation still works when no core profile is installed.
  await rm(join(consumer, "node_modules/@antonsmolko/standards-core"), {
    recursive: true,
  });
  const child = execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
    import { loadCatalog } from ${JSON.stringify(pathToFileURL(join(cliRoot, "lib/catalog/load.js")).href)};
    const catalog = await loadCatalog(${JSON.stringify(join(consumer, "node_modules/@antonsmolko/standards-typescript"))});
    console.log(catalog.manifest.package.namespace);
  `,
    ],
    { cwd: consumer, encoding: "utf8", timeout: 30000 },
  );

  assert.equal(child.trim(), "TS");
});
