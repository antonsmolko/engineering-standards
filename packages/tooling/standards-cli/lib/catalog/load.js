import { readFile, realpath } from 'node:fs/promises';
import { safePath } from '../files/safe-path.js';
import { fail } from '../diagnostic.js';
import { validateManifest } from './validate.js';

const readJson = async (root, name) => {
  try {
    return JSON.parse(await readFile(await safePath(root, name), 'utf8'));
  } catch (error) {
    if (error.code === 'UNSAFE_PATH') {
      throw error;
    }

    fail('CATALOG_READ', 'Cannot read package metadata; reinstall the selected package.');
  }
};

export const loadCatalog = async (packageRoot) => {
  const root = await realpath(packageRoot);
  const manifest = validateManifest(await readJson(root, 'manifest.json'));
  const metadata = await readJson(root, 'package.json');

  if (metadata.name !== manifest.package.name || metadata.version !== manifest.package.version) {
    fail('PACKAGE_METADATA', 'Manifest must match its package name and version.');
  }

  const documents = new Map();

  for (const item of [...manifest.requirements, ...manifest.modules, ...manifest.implementations]) {
    let content;

    try {
      content = await readFile(await safePath(root, item.document), 'utf8');
    } catch (error) {
      if (error.code === 'UNSAFE_PATH') {
        throw error;
      }

      fail('DOCUMENT_READ', 'A referenced document cannot be read; repair the package.');
    }

    const headings = manifest.requirements.includes(item) ? ['Requirement', 'Rationale', 'Applicability', 'Verification'] : ['Purpose', 'Contract', 'Acceptance'];

    for (const heading of headings) {
      const section = content.match(new RegExp(`^## ${heading}\\s*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, 'm'));

      if (!section || !section[1].trim()) {
        fail('DOCUMENT_STRUCTURE', 'Normative documents need nonempty required sections.');
      }
    }

    if (item.status === 'deprecated' && !/^## Migration\s*\n\S/m.test(content)) {
      fail('DOCUMENT_STRUCTURE', 'Deprecated requirements need migration guidance.');
    }

    documents.set(item.document, content);
  }

  return { manifest, documents };
};
