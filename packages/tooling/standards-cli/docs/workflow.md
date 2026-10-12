# Planned Engist workflow

Status: design contract. Engist is the agreed product and command name. Commands
and tooling configs are not implemented and packages have not been published.
Repository/npm identities still use engineering-standards/standards-cli; renaming
and name availability checks are separate work. The names-only project schema
is implemented, but discovery, setup and generation are not.

## Purpose

Engist connects versioned standards to a consuming project. It does not build
application features or verify all application code. A developer or agent reads
the generated instructions while implementing a feature; linters, type checks,
tests and review assess the implementation. Product fields, API endpoints and
permissions remain in the product specification. Specifications explain rules;
independent ESLint/Prettier configuration packages implement the automatically
enforceable part; the CLI helps connect them. Not every requirement is a lint rule.
Init configures the connection, sync generates instructions, and check verifies
that connection and document. Application checks remain ordinary project scripts.

## Selection and versions

Declare published standards as direct dependencies/devDependencies with exact
versions and commit the lockfile. Init may install explicitly confirmed packages
through the project's selected supported package manager. Sync/check never install,
download or update dependencies, or rewrite package.json/lockfile.

The project selects package names and profiles in engist.json:

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

Tooling configurations are separate dependencies, not specification catalogs in
the packages array above. Local tool configs select their public exports. Setup
does not add undeclared tooling fields to the existing project schema.

Versions are not repeated here. Before generating anything, discovery must
verify that each chosen package is directly declared and installed with the
declared exact version, and that its package metadata matches its manifest.
Missing declarations/installations or stale installed versions stop the command
with an instruction to repair dependencies using the package manager.

## Initial configuration: init

Run in the consuming project's root, not the standards repository:

```bash
engist init
```

1. Before prompts or network access, check for engist.json. If it exists, exit
   successfully without changes when valid: `Engist is already initialized. Run engist sync
to synchronize.` Invalid JSON is never overwritten. Its init exit status remains
an open contract for Task 7: the review proposes refusal before writes, prompts
or network instead of the earlier successful no-op; owner approval is pending.
Use check to diagnose
   it. Unsafe paths, symlinks and IO errors are errors, not evidence of absence.
2. Detect domain, technologies, stack and package manager from project metadata;
   ask the user to confirm or change suggestions. Ambiguous metadata requires a
   choice, not silent inference.
3. Select available profiles, compatible module specifications and optional
   ESLint/Prettier configurations. Do not offer unpublished future modules as
   available; a selected module adds requirements, not implementation.
4. Show the setup plan: selection, exact dependency versions, proposed files and
   scripts, package.json/lockfile changes. Preserve compatible dependencies;
   conflicts require an explicit decision, never a silent upgrade. Resolve any
   required published version metadata before writes, not a floating install.
5. Confirm creation of engist.json and separately choose installation or
   configuration only. Cancellation before the approved write phase changes
   nothing. Installation may contact a registry and modify dependency files.
6. For selected tooling, after installation/validation create absent small local
   configs importing package exports and offer lint, format:check and code:fix
   scripts. Existing configs, alternative config formats and script names are
   preserved; provide manual integration instructions, not automatic merging.
   Init never formats or autofixes application source.
7. After successful setup, offer to invoke normal sync for document generation.
   Without that confirmation, init performs setup only.

New selection/config files use safe root-relative paths and exclusive creation;
recheck the selection before commit so a file created during the wizard is not
overwritten. Approved dependency-file updates are performed by the package
manager; adding missing scripts preserves existing package.json fields and
refuses concurrent changes. These updates are not exclusive file creation.
Once writes/installation begin, no all-or-nothing transaction is promised.

### Setup scenarios

- Existing project: confirm detected stack, select standards/tools, inspect the
  plan, optionally install and invoke sync.
- New/empty project: choose technologies manually. Do not scaffold the application
  or install its framework. Without package.json, save selection only and defer
  installation/tool connection until the project exists.
- Configuration only: create engist.json, show exact installation and manual
  tool-connection instructions. Do not leave active tool imports/scripts referring
  to dependencies that have not been installed and validated.
- Repeated init with valid configuration: return the already-initialized message
  before prompts/network. Invalid configuration follows the pending contract above.
- Failed installation: return a nonzero status and accurately report completed
  steps, without sensitive raw output. Preserve the approved selection and actual
  dependency-file changes; do not claim successful generation or blindly roll back
  user files. Recover via the package manager/manual tool connection, then sync.
  Repeated init is not a recovery path.
- Agent/script: explicit noninteractive choices; missing required choices fail
  without prompts, writes or network. Installation needs separate opt-in;
  accepting defaults must not authorize it. Exact flags remain implementation work.

### ESLint/Prettier ownership

Rules live in independently versioned configuration packages, not copied rule
lists generated by Engist. Local configs import selected profiles and may add
project-specific ignores and explicit overrides. Prettier owns formatting; lint
settings must not contradict it. Enabled normative checks map to accepted IDs;
tooling-only checks have their own documented rationale.

Init only creates explicitly confirmed absent connection files/scripts. Afterwards
these are project-owned, not managed generated instructions. Sync never rewrites
them. Updates use explicit dependency changes, migration guidance, normal tool
runs and review. Existing configurations receive manual integration guidance.

## Generate or update: sync

After explicitly updating dependencies with the package manager, or changing
selected profiles/modules/exceptions, run:

```bash
engist sync --dry-run --diff
```

Sync reads engist.json and selected locally installed packages. It creates the
document and managed record when both are absent; init need not have created the
selection. An existing document without a record is not adopted. Partial/malformed
state, missing previously managed output and manual edits cause conflict/drift,
not silent recreation or overwrite. An unchanged project produces no changes.

The tracked docs/engineering-standards.md contains full applicable accepted
requirements, IDs, source versions, generator version and exceptions. Proposed
and deprecated rules are not active obligations. This is a standards snapshot,
not a product feature specification. Commit the document and managed record;
instructions remain readable without dependencies, but commands require them.
Add links manually to declared AGENTS.md/CLAUDE.md entrypoints; sync does not
rewrite their arbitrary contents.

Dry-run performs the same validation and conflict checks but writes nothing:
no generated files, managed records, staging files, backups or dependency files.
The optional --diff flag is allowed only with sync --dry-run, including first
generation shown as a new-file patch. It emits a unified
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
engist sync
git diff
```

The tracked generated-file changes can then be reviewed using the IDE's normal
Git comparison and committed in an explicit standards-update PR. Sync never
installs dependencies, accesses a registry, modifies package.json/lockfile or
rewrites project-owned tool configs.

## Read-only verification: check

```bash
engist check
```

Check verifies the selected graph, compatibility, exceptions, entrypoint links
and generated-file freshness without writing or network access. It compares exact recorded source
versions and the generator version as well as selection/content hashes. Updating
a dependency without changing the names-only selection still makes old output
stale; an unchanged selection hash is not sufficient evidence of freshness.

Check can run in CI after dependency installation. It does not execute ESLint or
Prettier, interpret arbitrary executable tool configs, prove local overrides
preserve every rule, or replace lint/format/type/behavioral checks and review.
No CLI run is required before each application feature.
