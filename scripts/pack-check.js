import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, matchesGlob } from "node:path";
import { installOffline } from "../tests/helpers/install-offline.ts";
import { verifyConsumer } from "./verify-consumer.js";

export async function packWorkspaces(root) {
  const temporary = await mkdtemp(join(tmpdir(), "engist-pack-check-"));
  try {
    const metadata = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
    const packages = [];
    const tarballs = [];
    for (const workspace of metadata.workspaces) {
      const pkg = JSON.parse(await readFile(join(root, workspace, "package.json"), "utf8"));
      if (pkg.private) throw new Error(`${workspace}: private package cannot be packed by pack:check.`);
      if (!Array.isArray(pkg.files)) throw new Error(`${workspace}: missing package files allowlist.`);
      const packed = JSON.parse(execFileSync("npm", ["pack", join(root, workspace), "--json", "--ignore-scripts", "--pack-destination", temporary], {
        cwd: root, encoding: "utf8", timeout: 30000, stdio: "pipe",
      }));
      if (packed.length !== 1 || packed[0].name !== pkg.name || packed[0].version !== pkg.version) {
        throw new Error(`${workspace}: packed package identity differs from workspace.`);
      }
      const inventory = new Set(packed[0].files.map((file) => file.path));
      for (const path of inventory) {
        if (path.split("/").some((part) => ["tests", "fixtures", "docs-review", ".git", ".idea", ".superpowers", ".worktrees", "node_modules"].includes(part))) {
          throw new Error(`${pkg.name}: forbidden packed path ${path}.`);
        }
        const automatic = /^(package\.json|readme(?:\..*)?|licen[cs]e(?:\..*)?)$/i.test(path);
        if (!automatic && !pkg.files.some((allowed) => path === allowed || path.startsWith(`${allowed}/`) || matchesGlob(path, allowed))) {
          throw new Error(`${pkg.name}: packed path outside files allowlist: ${path}.`);
        }
      }
      for (const required of ["package.json", "README.md", "LICENSE"]) {
        if (!inventory.has(required)) throw new Error(`${pkg.name}: missing packed ${required}.`);
      }
      for (const [subpath, target] of Object.entries(pkg.exports ?? {})) {
        // The current packages have explicit, unconditional file exports.
        if (typeof target !== "string" || !target.startsWith("./") || !inventory.has(target.slice(2))) {
          throw new Error(`${pkg.name}: missing or unsupported declared export ${subpath}.`);
        }
      }
      packages.push(pkg);
      tarballs.push(join(temporary, packed[0].filename));
    }
    await writeFile(join(temporary, "package.json"), JSON.stringify({ private: true, type: "module" }));
    installOffline(temporary, tarballs);
    await verifyConsumer(temporary, packages);
    console.log(`Verified ${packages.length} workspace artifacts and offline consumer.`);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (import.meta.main) {
  try {
    await packWorkspaces(process.cwd());
  } catch (error) {
    console.error(`Pack verification failed: ${error.message}`);
    process.exitCode = 1;
  }
}
