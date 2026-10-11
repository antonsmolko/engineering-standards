import Ajv from "ajv";
import semver from "semver";
import schema from "../schemas/manifest.schema.json" with { type: "json" };
import { fail } from "../diagnostic.js";
import { parseRequirementId } from "./requirement-id.js";

const check = new Ajv({ allErrors: true }).compile(schema);

export const validateManifest = (value) => {
  if (
    value &&
    typeof value === "object" &&
    "schemaVersion" in value &&
    value.schemaVersion !== 1
  ) {
    fail(
      "UNSUPPORTED_SCHEMA",
      "Unsupported manifest schema version; use a compatible CLI.",
    );
  }

  if (!check(value)) {
    fail(
      "MANIFEST_SCHEMA",
      "Invalid manifest structure; review the manifest schema.",
    );
  }

  if (
    !semver.valid(value.package.version) ||
    value.requires.some((dependency) => {
      return !semver.validRange(dependency.range);
    })
  ) {
    fail(
      "MANIFEST_VERSION",
      "Use semver package versions and dependency ranges.",
    );
  }

  const ids = new Set();

  for (const requirement of value.requirements) {
    if (
      parseRequirementId(requirement.id).namespace !== value.package.namespace
    ) {
      fail(
        "REQUIREMENT_NAMESPACE",
        "Requirement IDs must belong to the declaring package namespace.",
      );
    }

    if (
      ["requires", "refines", "replaces", "conflicts"].some((relation) => {
        return requirement[relation].includes(requirement.id);
      })
    ) {
      fail("MANIFEST_REFERENCE", "Requirements must not reference themselves.");
    }
  }

  for (const item of [
    ...value.requirements,
    ...value.profiles,
    ...value.modules,
    ...value.implementations,
  ]) {
    if (ids.has(item.id)) {
      fail("DUPLICATE_ID", "Manifest identifiers must be unique.");
    }

    ids.add(item.id);
  }

  const requirementIds = new Set(
    value.requirements.map((item) => {
      return item.id;
    }),
  );
  const prefixes = {
    core: "core",
    domain: "domains/",
    technology: "technologies/",
    stack: "stacks/",
  };

  for (const profile of value.profiles) {
    if (
      profile.kind === "core"
        ? profile.id !== "core"
        : !profile.id.startsWith(prefixes[profile.kind])
    ) {
      fail(
        "MANIFEST_SCHEMA",
        "Profile kind must match its canonical identifier.",
      );
    }
  }

  for (const owner of value.profiles) {
    if (
      owner.requirements.some((id) => {
        return !requirementIds.has(id);
      })
    ) {
      fail(
        "MANIFEST_REFERENCE",
        "Selected requirements must be declared in this package.",
      );
    }
  }

  return value;
};
