import Ajv from 'ajv';
import semver from 'semver';
import schema from '@antonsmolko/standards-core/schemas/manifest.json' with { type: 'json' };
import { fail } from '../diagnostic.js';

const check = new Ajv({ allErrors: true }).compile(schema);

export const validateManifest = (value) => {
  if (!check(value)) {
    fail('MANIFEST_SCHEMA', 'Invalid manifest structure; review the manifest schema.');
  }

  if (!semver.valid(value.package.version) || value.requires.some((dependency) => {
    return !semver.validRange(dependency.range);
  })) {
    fail('MANIFEST_VERSION', 'Use semver package versions and dependency ranges.');
  }

  const ids = new Set();

  for (const item of [...value.requirements, ...value.profiles, ...value.modules, ...value.implementations]) {
    if (ids.has(item.id)) {
      fail('DUPLICATE_ID', 'Manifest identifiers must be unique.');
    }

    ids.add(item.id);
  }

  return value;
};
