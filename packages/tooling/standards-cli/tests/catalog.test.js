import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { loadCatalog } from '../lib/catalog/load.js';
import { validateManifest } from '../lib/catalog/validate.js';

const manifest = () => {
  return { schemaVersion: 1, package: { name: '@fixture/core', version: '0.1.0' }, requires: [], profiles: [{ id: 'core', kind: 'core', requires: [], requirements: ['CORE-1'] }], modules: [], implementations: [], requirements: [{ id: 'CORE-1', title: 'A public contract', level: 'required', status: 'accepted', document: 'rule.md', verification: 'manual', requires: [], refines: [], replaces: [], conflicts: [] }] };
};

const fixture = async (t, change = () => {}) => {
  const root = await mkdtemp(join(tmpdir(), 'standards-catalog-'));

  t.after(async () => {
    await rm(root, { recursive: true, force: true });
  });

  const value = manifest();

  change(value);
  await writeFile(join(root, 'manifest.json'), JSON.stringify(value));
  await writeFile(join(root, 'package.json'), JSON.stringify({ name: '@fixture/core', version: '0.1.0' }));
  await writeFile(join(root, 'rule.md'), '# Rule\n\n## Requirement\nKeep a public contract.\n\n## Rationale\nPrevent coupling.\n\n## Applicability\nAll modules.\n\n## Verification\nReview imports.\n');

  return root;
};

test('loads a valid manifest and its normative document', async (t) => {
  const root = await fixture(t);
  const catalog = await loadCatalog(root);

  assert.equal(catalog.manifest.package.version, '0.1.0');
  assert.match(catalog.documents.get('rule.md'), /Prevent coupling/);
});

for (const [name, change] of [
  ['duplicate ID', (value) => { value.requirements.push(value.requirements[0]); }],
  ['invalid lifecycle', (value) => { value.requirements[0].status = 'mandatory'; }],
  ['unrecognized field', (value) => { value.secret = 'private-marker'; }],
  ['invalid package version', (value) => { value.package.version = 'latest'; }],
]) {
  test(`rejects ${name} with safe diagnostics`, () => {
    const value = manifest();

    change(value);
    assert.throws(() => { validateManifest(value); }, (error) => {
      assert.ok(!error.message.includes('private-marker'));

      return Boolean(error.code);
    });
  });
}

test('rejects package metadata mismatch', async (t) => {
  const root = await fixture(t, (value) => { value.package.version = '0.2.0'; });

  await assert.rejects(loadCatalog(root), { code: 'PACKAGE_METADATA' });
});

test('rejects a missing normative document', async (t) => {
  const root = await fixture(t, (value) => { value.requirements[0].document = 'missing.md'; });

  await assert.rejects(loadCatalog(root), { code: 'DOCUMENT_READ' });
});

test('rejects an empty rationale', async (t) => {
  const root = await fixture(t);
  const content = await readFile(join(root, 'rule.md'), 'utf8');

  await writeFile(join(root, 'rule.md'), content.replace('Prevent coupling.', ''));
  await assert.rejects(loadCatalog(root), { code: 'DOCUMENT_STRUCTURE' });
});

test('rejects parent traversal before reading external data', async (t) => {
  const root = await fixture(t, (value) => { value.requirements[0].document = '../private-marker.md'; });

  await assert.rejects(loadCatalog(root), (error) => {
    assert.ok(!error.message.includes('private-marker'));

    return error.code === 'UNSAFE_PATH';
  });
});

test('rejects an external document symlink', async (t) => {
  const root = await fixture(t, (value) => { value.requirements[0].document = 'linked.md'; });
  const outside = await fixture(t);

  await symlink(join(outside, 'rule.md'), join(root, 'linked.md'));
  await assert.rejects(loadCatalog(root), { code: 'UNSAFE_PATH' });
});

test('all five shipped profile catalogs resolve their documents', async () => {
  for (const path of ['packages/core', 'packages/domains/frontend', 'packages/technologies/typescript', 'packages/technologies/svelte', 'packages/stacks/frontend/svelte-spa']) {
    const catalog = await loadCatalog(path);

    assert.equal(catalog.manifest.profiles.length, 1);
    assert.ok(catalog.documents.size > 0);
    assert.ok(catalog.manifest.requirements.every((item) => {
      return item.status === 'proposed';
    }));
  }
});
