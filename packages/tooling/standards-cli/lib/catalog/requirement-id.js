import { fail } from "../diagnostic.js";

const pattern = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-[A-Z0-9]+-[0-9]{3}$/;

export const parseRequirementId = (id) => {
  if (typeof id !== "string" || id.trim() !== id || !pattern.test(id)) {
    fail(
      "MANIFEST_SCHEMA",
      "Use requirement IDs in NAMESPACE-CATEGORY-NNN format.",
    );
  }

  const parts = id.split("-");
  const number = parts.pop();
  const category = parts.pop();

  return { namespace: parts.join("-"), category, number };
};
