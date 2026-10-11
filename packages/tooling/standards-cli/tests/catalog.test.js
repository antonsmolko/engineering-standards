import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, symlink, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { loadCatalog } from "../lib/catalog/load.js";
import { validateManifest } from "../lib/catalog/validate.js";

const manifest = () => {
  return {
    schemaVersion: 1,
    package: { name: "@fixture/core", version: "0.1.0", namespace: "CORE" },
    requires: [],
    profiles: [
      {
        id: "core",
        kind: "core",
        requires: [],
        requirements: ["CORE-ARCH-001"],
      },
    ],
    modules: [],
    implementations: [],
    requirements: [
      {
        id: "CORE-ARCH-001",
        title: "A public contract",
        level: "required",
        status: "accepted",
        document: "rule.md",
        verification: "manual",
        requires: [],
        refines: [],
        replaces: [],
        conflicts: [],
      },
    ],
  };
};

const fixture = async (t, change = () => {}) => {
  const root = await mkdtemp(join(tmpdir(), "standards-catalog-"));

  t.after(async () => {
    await rm(root, { recursive: true, force: true });
  });

  const value = manifest();

  change(value);
  await writeFile(join(root, "manifest.json"), JSON.stringify(value));
  await writeFile(
    join(root, "package.json"),
    JSON.stringify({ name: "@fixture/core", version: "0.1.0" }),
  );
  await writeFile(
    join(root, "rule.md"),
    "# Rule\n\n## Requirement\nKeep a public contract.\n\n## Rationale\nPrevent coupling.\n\n## Applicability\nAll modules.\n\n## Verification\nReview imports.\n",
  );

  return root;
};

for (const id of [
  "Weird Profile",
  "frontend",
  "domains/Frontend",
  "core/extra",
  "domains/frontend\n",
]) {
  test(`rejects noncanonical profile ID ${JSON.stringify(id)}`, () => {
    const value = manifest();
    value.profiles[0].id = id;
    assert.throws(
      () => {
        validateManifest(value);
      },
      { code: "MANIFEST_SCHEMA" },
    );
  });
}

test("rejects a profile kind that disagrees with its canonical ID", () => {
  const value = manifest();
  value.profiles[0].kind = "stack";
  assert.throws(
    () => {
      validateManifest(value);
    },
    { code: "MANIFEST_SCHEMA" },
  );
});

test("rejects a malformed required profile identifier before graph resolution", () => {
  const value = manifest();
  value.profiles[0].requires = ["does/not-exist"];
  assert.throws(
    () => {
      validateManifest(value);
    },
    { code: "MANIFEST_SCHEMA" },
  );
});

test("rejects a profile referencing an undeclared local requirement", () => {
  const value = manifest();
  value.profiles[0].requirements.push("CORE-NOPE-999");
  assert.throws(
    () => {
      validateManifest(value);
    },
    { code: "MANIFEST_REFERENCE" },
  );
});

for (const relation of ["requires", "refines", "replaces", "conflicts"]) {
  test(`rejects a requirement referencing itself through ${relation}`, () => {
    const value = manifest();
    value.requirements[0][relation] = [value.requirements[0].id];
    assert.throws(
      () => {
        validateManifest(value);
      },
      { code: "MANIFEST_REFERENCE" },
    );
  });
}

test("leaves cross-package graph resolution to the resolver", () => {
  const value = manifest();
  value.profiles[0].requires = ["technologies/typescript"];
  value.requirements[0].refines = ["TS-TYPES-001"];
  assert.equal(validateManifest(value), value);
});

test("allows a declared requirement that no profile selects", () => {
  const value = manifest();
  value.profiles[0].requirements = [];
  assert.equal(validateManifest(value), value);
});

test("loads a valid manifest and its normative document", async (t) => {
  const root = await fixture(t);
  const catalog = await loadCatalog(root);

  assert.equal(catalog.manifest.package.version, "0.1.0");
  assert.match(catalog.documents.get("rule.md"), /Prevent coupling/);
});

for (const [name, change] of [
  [
    "duplicate ID",
    (value) => {
      value.requirements.push(value.requirements[0]);
    },
  ],
  [
    "invalid lifecycle",
    (value) => {
      value.requirements[0].status = "mandatory";
    },
  ],
  [
    "unrecognized field",
    (value) => {
      value.secret = "private-marker";
    },
  ],
  [
    "invalid package version",
    (value) => {
      value.package.version = "latest";
    },
  ],
]) {
  test(`rejects ${name} with safe diagnostics`, () => {
    const value = manifest();

    change(value);
    assert.throws(
      () => {
        validateManifest(value);
      },
      (error) => {
        assert.ok(!error.message.includes("private-marker"));

        return Boolean(error.code);
      },
    );
  });
}

test("rejects package metadata mismatch", async (t) => {
  const root = await fixture(t, (value) => {
    value.package.version = "0.2.0";
  });

  await assert.rejects(loadCatalog(root), { code: "PACKAGE_METADATA" });
});

test("rejects null package metadata with a stable diagnostic", async (t) => {
  const root = await fixture(t);

  await writeFile(join(root, "package.json"), "null");
  await assert.rejects(loadCatalog(root), { code: "PACKAGE_METADATA" });
});

for (const linked of [false, true]) {
  test(`sanitizes a ${linked ? "dangling-linked" : "missing"} package root`, async (t) => {
    const root = await fixture(t);
    const missing = join(root, "private-marker-missing");
    const candidate = linked ? join(root, "private-marker-linked") : missing;

    if (linked) {
      await symlink(missing, candidate);
    }

    await assert.rejects(loadCatalog(candidate), (error) => {
      assert.equal(error.code, "CATALOG_READ");
      assert.ok(!error.message.includes("private-marker"));
      assert.ok(!error.message.includes(root));

      return true;
    });
  });
}

test("rejects a missing normative document", async (t) => {
  const root = await fixture(t, (value) => {
    value.requirements[0].document = "missing.md";
  });

  await assert.rejects(loadCatalog(root), { code: "DOCUMENT_READ" });
});

test("rejects an empty rationale", async (t) => {
  const root = await fixture(t);
  const content = await readFile(join(root, "rule.md"), "utf8");

  await writeFile(
    join(root, "rule.md"),
    content.replace("Prevent coupling.", ""),
  );
  await assert.rejects(loadCatalog(root), { code: "DOCUMENT_STRUCTURE" });
});

test("rejects parent traversal before reading external data", async (t) => {
  const root = await fixture(t, (value) => {
    value.requirements[0].document = "../private-marker.md";
  });

  await assert.rejects(loadCatalog(root), (error) => {
    assert.ok(!error.message.includes("private-marker"));

    return error.code === "UNSAFE_PATH";
  });
});

test("rejects an external document symlink", async (t) => {
  const root = await fixture(t, (value) => {
    value.requirements[0].document = "linked.md";
  });
  const outside = await fixture(t);

  await symlink(join(outside, "rule.md"), join(root, "linked.md"));
  await assert.rejects(loadCatalog(root), { code: "UNSAFE_PATH" });
});

test("all five shipped profile catalogs resolve their documents", async () => {
  for (const path of [
    "packages/core",
    "packages/domains/frontend",
    "packages/technologies/typescript",
    "packages/technologies/svelte",
    "packages/stacks/frontend/svelte-spa",
  ]) {
    const catalog = await loadCatalog(path);

    assert.equal(catalog.manifest.profiles.length, 1);
    assert.ok(catalog.documents.size > 0);
    assert.ok(
      catalog.manifest.requirements.every((item) => {
        return item.status === "proposed";
      }),
    );
  }
});

test("rejects an unsupported schema version before shape validation", () => {
  assert.throws(
    () => {
      validateManifest({ schemaVersion: 2, secret: "private-marker" });
    },
    (error) => {
      assert.equal(error.code, "UNSUPPORTED_SCHEMA");
      assert.ok(!error.message.includes("private-marker"));

      return true;
    },
  );
});

for (const [namespace, id] of [
  ["CORE", "CORE-ARCH-001"],
  ["FRONTEND", "FRONTEND-ARCH-001"],
  ["TS", "TS-TYPES-001"],
  ["SVELTE", "SVELTE-STATE-001"],
  ["SVELTE-SPA", "SVELTE-SPA-ARCH-001"],
]) {
  test(`accepts the registered owner of ${id}`, () => {
    const value = manifest();

    value.package.namespace = namespace;
    value.requirements[0].id = id;
    value.profiles[0].requirements = [id];
    assert.equal(validateManifest(value), value);
  });
}

for (const id of [
  "core-ARCH-001",
  "CORE_ARCH_001",
  "CORE-ARCH-01",
  "CORE-ARCH-0001",
  "CORE--ARCH-001",
  "CORE-001",
  "CORE-ARCH-001-",
  "CORE-ARCH-001\n",
]) {
  test(`rejects malformed requirement ID ${JSON.stringify(id)}`, () => {
    const value = manifest();

    value.requirements[0].id = id;
    assert.throws(
      () => {
        validateManifest(value);
      },
      { code: "MANIFEST_SCHEMA" },
    );
  });
}

test("a hyphenated namespace never belongs to its shorter prefix", () => {
  const value = manifest();

  value.package.namespace = "SVELTE";
  value.requirements[0].id = "SVELTE-SPA-ARCH-001";
  assert.throws(
    () => {
      validateManifest(value);
    },
    { code: "REQUIREMENT_NAMESPACE" },
  );
});

test("parses the full namespace from the right and preserves leading zeros", async () => {
  const { parseRequirementId } =
    await import("../lib/catalog/requirement-id.js");

  assert.deepEqual(parseRequirementId("SVELTE-STATE-001"), {
    namespace: "SVELTE",
    category: "STATE",
    number: "001",
  });
  assert.deepEqual(parseRequirementId("SVELTE-SPA-ARCH-001"), {
    namespace: "SVELTE-SPA",
    category: "ARCH",
    number: "001",
  });

  for (const id of ["CORE-001", "CORE-ARCH-001\n", null, 42]) {
    assert.throws(
      () => {
        parseRequirementId(id);
      },
      { code: "MANIFEST_SCHEMA" },
    );
  }
});

test("loads a linked package root but still rejects internal document escape", async (t) => {
  const root = await fixture(t);
  const consumer = await fixture(t);
  const linked = join(consumer, "linked-package");

  await symlink(root, linked);
  assert.equal((await loadCatalog(linked)).manifest.package.namespace, "CORE");
  await rm(join(root, "rule.md"));
  await symlink(join(consumer, "rule.md"), join(root, "rule.md"));
  await assert.rejects(loadCatalog(linked), { code: "UNSAFE_PATH" });
});
