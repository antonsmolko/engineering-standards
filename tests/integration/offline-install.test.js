import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

test("empty npm cache gives actionable offline preparation guidance", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "standards-offline-"));
  t.after(async () => {
    await rm(root, { recursive: true, force: true });
  });
  await writeFile(
    join(root, "package.json"),
    JSON.stringify({ private: true }),
  );
  const { installOffline } = await import("../helpers/install-offline.ts");
  assert.throws(
    () => {
      installOffline(root, ["typescript@5.9.3"], {
        cache: join(root, "empty-cache"),
      });
    },
    (error) => {
      assert.equal(error.code, "OFFLINE_CACHE_MISSING");
      assert.match(error.message, /npm ci --ignore-scripts/);
      assert.ok(!error.message.includes(root));
      return true;
    },
  );
});
