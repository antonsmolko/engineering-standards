import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { marked } from "marked";
import { checkDocuments } from "../helpers/check-documents.ts";
import { installOffline } from "../helpers/install-offline.ts";

const workspaces = ["packages/core", "packages/domains/frontend", "packages/technologies/typescript", "packages/technologies/svelte", "packages/stacks/frontend/svelte-spa"];

test("five installed document artifacts and a chosen subset work without CLI or workspace links", async (t) => {
  const temporary = await realpath(await mkdtemp(join(tmpdir(), "standards-documents-")));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const packages = [];
  for (const path of workspaces) {
    const pkg = JSON.parse(await readFile(join(path, "package.json"), "utf8"));
    const [artifact] = JSON.parse(execFileSync("npm", ["pack", resolve(path), "--json", "--ignore-scripts", "--pack-destination", temporary], { encoding: "utf8", timeout: 30000 }));
    packages.push({ ...pkg, tarball: join(temporary, artifact.filename) });
  }
  const guide = await readFile("docs/usage.md", "utf8").catch(() => "");
  const instructions = marked.lexer(guide).find((token) => token.type === "code" && token.lang === "markdown")?.text;
  assert.ok(instructions, "Adoption guide must provide a copyable AGENTS.md example.");
  for (const [label, selection] of [["all", packages], ["subset", [packages[0], packages[2]]]]) {
    const consumer = join(temporary, label);
    await mkdir(consumer);
    await writeFile(join(consumer, "package.json"), JSON.stringify({ private: true }));
    const preserved = { "AGENTS.md": `Consumer-owned instructions\n\n${instructions}\n`, "eslint.config.js": "export default [];\n", ".prettierrc.json": "{}\n" };
    for (const [path, content] of Object.entries(preserved)) await writeFile(join(consumer, path), content);
    installOffline(consumer, selection.map((pkg) => pkg.tarball));
    for (const pkg of selection) {
      const installed = join(consumer, "node_modules", pkg.name);
      assert.equal(await realpath(installed), installed, "Consumer must use installed tarballs.");
      const metadata = JSON.parse(await readFile(join(installed, "package.json"), "utf8"));
      assert.equal(metadata.name, pkg.name);
      assert.equal(metadata.version, pkg.version);
      assert.deepEqual(await checkDocuments(installed, pkg.name), []);
    }
    const references = [];
    marked.walkTokens(marked.lexer(instructions), (token) => {
      if (token.type === "link") references.push(token.href);
    });
    assert.equal(references.length, 2, "Example selects the core/TypeScript pair.");
    for (const href of references) assert.ok((await readFile(resolve(consumer, href), "utf8")).trim());
    assert.deepEqual((await readdir(join(consumer, "node_modules/@antonsmolko"))).sort(), selection.map((pkg) => pkg.name.split("/")[1]).sort());
    for (const [path, content] of Object.entries(preserved)) assert.equal(await readFile(join(consumer, path), "utf8"), content);
    assert.equal((await readdir(consumer)).includes("engist.json"), false);
  }
});

test("synthetic documents diagnose broken links and forbidden files with package/path", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "standards-links-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, "docs"));
  await writeFile(join(root, "README.md"), "# Synthetic test package\n\n[Guide][guide]\n\n[guide]: docs/guide.md#heading\n\n`[example](missing.md)`\n");
  await writeFile(join(root, "docs/guide.md"), "# Heading\n\n[Remote](https://example.invalid)\n");
  await writeFile(join(root, "LICENSE"), "MIT\n");
  await writeFile(join(root, "CHANGELOG.md"), "# Test changes\n");
  assert.deepEqual(await checkDocuments(root, "@test/documents"), []);
  await rm(join(root, "docs/guide.md"));
  assert.ok((await checkDocuments(root, "@test/documents")).some((line) => line.includes("@test/documents") && line.includes("docs/guide.md")));
  await mkdir(join(root, "docs-review"));
  await writeFile(join(root, "docs-review/private.md"), "Test-only forbidden path\n");
  assert.ok((await checkDocuments(root, "@test/documents")).some((line) => line.includes("@test/documents") && line.includes("docs-review/private.md") && line.includes("forbidden")));
});
