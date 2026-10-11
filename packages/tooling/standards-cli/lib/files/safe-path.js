import { lstat, realpath } from 'node:fs/promises';
import { isAbsolute, resolve, relative, sep } from 'node:path';
import { fail } from '../diagnostic.js';

export const safePath = async (root, path, { allowMissing = false } = {}) => {
  if (typeof path !== 'string' || !path || isAbsolute(path) || path.includes('\\') || path.includes('\0') || path.split('/').some((part) => {
    return part === '..' || part === '.' || part === '';
  })) {
    fail('UNSAFE_PATH', 'Use a relative path contained in the project.');
  }

  const base = await realpath(root);
  const parts = path.split('/');
  let cursor = base;

  for (const part of parts) {
    cursor = resolve(cursor, part);

    try {
      if ((await lstat(cursor)).isSymbolicLink()) {
        fail('UNSAFE_PATH', 'Symbolic links are not allowed in managed paths.');
      }

      const actual = await realpath(cursor);
      const rel = relative(base, actual);

      if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
        fail('UNSAFE_PATH', 'Path must remain inside the project.');
      }
    } catch (error) {
      if (!(allowMissing && error.code === 'ENOENT')) {
        throw error;
      }
    }
  }

  return cursor;
};
