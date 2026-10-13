import assert from "node:assert/strict";
import { readFile, realpath } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

// Verify installed tarballs, rather than resolving workspace links.
export async function verifyConsumer(consumer, packages) {
  const require = createRequire(join(consumer, "package.json"));
  const cli = packages.find((pkg) => pkg.name === "@antonsmolko/standards-cli");
  const loadCatalog = cli ? (await import(pathToFileURL(join(consumer, "node_modules", cli.name, "lib/catalog/load.js")).href)).loadCatalog : null;
  for (const pkg of packages) {
    const installedRoot = join(consumer, "node_modules", pkg.name);
    const metadata = JSON.parse(await readFile(join(installedRoot, "package.json"), "utf8"));
    assert.equal(metadata.name, pkg.name, "Installed package name differs from packed workspace.");
    assert.equal(metadata.version, pkg.version, "Installed package version differs from packed workspace.");
    for (const subpath of Object.keys(pkg.exports ?? {})) {
      const specifier = subpath === "." ? pkg.name : `${pkg.name}/${subpath.slice(2)}`;
      const exported = require.resolve(specifier);
      assert.ok((await realpath(exported)).startsWith(`${await realpath(installedRoot)}/`), `${specifier}: export resolves outside installed package.`);
      await import(pathToFileURL(exported).href, exported.endsWith(".json") ? { with: { type: "json" } } : undefined);
    }
    if (pkg.exports?.["./manifest.json"]) {
      assert.ok(loadCatalog, "Catalog verification requires the packed CLI loader.");
      const catalog = await loadCatalog(dirname(require.resolve(`${pkg.name}/manifest.json`)));
      assert.equal(catalog.manifest.package.name, pkg.name);
      assert.equal(catalog.manifest.package.version, pkg.version);
      assert.ok(catalog.documents.size > 0, `${pkg.name}: empty packed catalog.`);
    }
  }
}
