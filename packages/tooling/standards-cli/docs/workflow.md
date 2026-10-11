# Planned CLI workflow

Status: design contract. The commands below are not implemented and packages
have not been published. The names-only project schema is implemented, but it
does not resolve packages, check their installation or generate instructions.

## Purpose

The CLI connects versioned standards to a consuming project. It does not build
application features or verify all application code. A developer or agent reads
the generated instructions while implementing a feature; linters, type checks,
tests and review assess the implementation. Product fields, API endpoints and
permissions remain in the product specification.

## Selection and versions

Install the CLI and chosen specification packages through the project's package
manager. Declare published standards as direct dependencies/devDependencies
with exact versions, and commit the lockfile. CLI commands never install,
download or update dependencies, and never rewrite package.json or the lockfile.

The project selects package names and profiles in engineering-standards.json:

```json
{
  "schemaVersion": 1,
  "packages": ["@antonsmolko/standards-core"],
  "profiles": ["core"],
  "modules": [],
  "exceptions": [],
  "entrypoints": ["AGENTS.md", "CLAUDE.md"]
}
```

Versions are not repeated here. Before generating anything, discovery must
verify that each chosen package is directly declared and installed with the
declared exact version, and that its package metadata matches its manifest.
Missing declarations/installations or stale installed versions stop the command
with an instruction to repair dependencies using the package manager.

## First connection: init

Run in the consuming project's root, not the standards repository:

```bash
engineering-standards init
```

Init reads the existing selection and creates docs/engineering-standards.md
and a managed-file record. The document contains the complete applicable
accepted requirements, stable IDs, exact source package versions, generator
version and explicit exceptions. Proposed/deprecated rules are not active
obligations. The document is a local snapshot of engineering standards, not a
product feature specification.

Commit these generated files. They can be read before installing dependencies.
Add the proposed link manually to AGENTS.md/CLAUDE.md; init does not rewrite
their contents. A missing selection produces guidance without writing it.
Existing files are not overwritten or silently adopted. Repeated init reports
that the project is already connected and directs the user to sync.

## Later updates: sync

After explicitly updating dependencies with the package manager, or changing
selected profiles/modules/exceptions, run:

```bash
engineering-standards sync --dry-run --diff
```

Sync rebuilds instructions from the selected locally installed packages. It
requires a previous managed-file record; otherwise it directs the user to init
without adopting an existing document. Manual edits cause a conflict, not an
overwrite. An unchanged project produces no content changes.

Dry-run performs the same validation and conflict checks but writes nothing:
no generated files, managed records, staging files, backups or dependency files.
The optional --diff flag is allowed only with sync --dry-run. It emits a unified
patch to stdout after successful preflight; summaries and diagnostics go to
stderr. No changes mean an empty patch. Conflicts do not print manually edited
file contents.

Illustrative patch excerpt after an explicit dependency update:

```diff
--- docs/engineering-standards.md
+++ docs/engineering-standards.md
@@ -4,1 +4,1 @@
-Source: @antonsmolko/standards-core@0.1.0
+Source: @antonsmolko/standards-core@0.1.1
```

In an IDE this preview appears in its terminal, not the Git changes panel. No
native IDE comparison window is promised. To write the reviewed result, run:

```bash
engineering-standards sync
git diff
```

The tracked generated-file changes can then be reviewed using the IDE's normal
Git comparison and committed in an explicit standards-update PR.

## Read-only verification: check

```bash
engineering-standards check
```

Check verifies the selected graph, compatibility, exceptions, entrypoint links
and generated-file freshness without writing. It compares exact recorded source
versions and the generator version as well as selection/content hashes. Updating
a dependency without changing the names-only selection still makes old output
stale; an unchanged selection hash is not sufficient evidence of freshness.

Check can run in CI after dependency installation. It does not replace ESLint,
TypeScript, behavioral tests or architecture review, and does not require running
the CLI before each application feature.
