# Workspace checks implementation plan — issue #9, first delivery

> **For agentic workers:** Use `superpowers:executing-plans` after owner review.

**Status:** Tooling design, this first-delivery plan and native execution approved by the owner in chat on 2026-10-13 ("давай делать"). Implementation verified on both supported Node versions; whole-branch review and PR creation pending.

**Goal:** Provide `npm run check` and `npm run pack:check` for the existing eight workspaces.

**Architecture:** Use npm scripts for sequencing, `npm pack` for packaging and the existing node:test/external-consumer fixtures for verification. Add only project-specific metadata, workspace-lock and local `manifest.requires` checks; npm retains ownership of dependency installation.

**Tech stack:** Node ^26.0.0, npm, node:test and the existing semver dependency.

**Spec:** [Tooling design](../specs/2026-10-11-engist-monorepo-tooling-design.md), [general plan](2026-10-11-engineering-standards-independent-packages.md), [issue #9](https://github.com/antonsmolko/engineering-standards/issues/9).

## Delivery scope

This is the first implementation PR in #9. Its outcome is a repeatable local check-and-pack workflow. A second PR implements the existing Changesets/versioning criteria; this first PR uses `Refs #9` and does not close the issue. CI remains #18.

The owner requested the next task after merging PR #27. This proposal applies the small-PR approach to #9; owner review of the corrected tooling design and this plan is required before runtime work. Proposed execution: native implementation in this session, followed by one independent review.

Upstream baseline: [npm run](https://docs.npmjs.com/cli/v11/commands/npm-run/) and [npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack/). Maintained upstream example: npm/cli [smoke-test scripts](https://github.com/npm/cli/blob/latest/smoke-tests/package.json) and [pack JSON smoke test](https://github.com/npm/cli/blob/latest/smoke-tests/test/pack-json-output.js). Reuse npm script sequencing and parsing actual pack JSON; retain this repository's node:test runner. The project-specific gap is that npm does not validate `manifest.package` or semantic `manifest.requires`, nor the exact versions of all eight workspace lock entries.

## Constraints and review focus

- Preserve all eight versions at 0.1.0 and actual catalogs at nine proposed/zero accepted. Do not change dependencies, normative text, public exports or approval gates.
- Check all workspace lock entries, including the three tooling packages without specification manifests; do not require nonexistent manifests, config exports or CLI bin.
- Missing or stale workspace lock metadata, manifest name/version drift and incompatible local semantic ranges must fail without rewriting source files.
- Typecheck, metadata or test failure must stop subsequent workflow stages; the explicit pack stage starts only after check succeeds. Existing tests that themselves pack artifacts remain in the full suite.
- Packed artifacts exclude private root, tests/fixtures and workspace data; existing declared metadata exports and catalog loading work in the offline external consumer.
- Temporary pack output is cleaned after success/failure; cache preparation is explicit, cache miss fails, and tests never publish.

## Task 1: Read-only workspace check

**Files:** create `scripts/check-workspaces.js` and `tests/integration/workspace-checks.test.js`; modify root `package.json`.

**Interfaces:** `checkWorkspaces(root: string): Promise<string[]>` returns English diagnostics for root workspaces, their package metadata, lock entries and specification manifest compatibility. Success returns `[]` and exits 0. Missing/unreadable/malformed required JSON and invalid versions/ranges return English diagnostics; the command-line wrapper writes diagnostics to stderr and exits nonzero without writes. Specification manifests are required only in the five existing specification workspaces; absent tooling manifests are valid. `npm run check` runs typecheck, this check and the complete existing test suite once, stopping on failure.

- [x] Write failing behavior tests using temporary workspace copies: all eight matching lock entries pass; missing/stale tooling lock entry fails even when specification metadata agree; manifest name/version drift and an incompatible local `requires` range fail. Cover missing/unreadable/malformed required metadata and invalid versions/ranges; assert empty diagnostics/exit 0 on success and nonzero/English diagnostics on failure. Compare source snapshots before/after.
- [x] Run `node --test tests/integration/workspace-checks.test.js`; require failure for the missing intended behavior before implementation.
- [x] Implement the metadata checks with JSON reads and existing semver; compose root `check` with npm scripts. External semantic requirements are not claimed verified by this local check.
- [x] Verify the targeted tests pass. In a temporary root, inject a failing typecheck/metadata stage and assert later test stages are not invoked; do not add public bypass or dependency-injection options.
- [x] Commit with `[engineering-standards-9]: Add read-only workspace checks`.

## Task 2: Verify all eight packed artifacts

**Files:** create `scripts/pack-check.js`, shared `scripts/verify-consumer.js` and `tests/integration/pack-check.test.js`; modify root `package.json` and `README.md`. Reuse `tests/integration/catalog-artifacts.test.js` and `tests/helpers/install-offline.ts`.

**Interfaces:** `packWorkspaces(root: string): Promise<void>` throws on verification/packing failure and uses the root workspace list and `npm pack --json --ignore-scripts` with a temporary destination; checks actual package identity, packed file inventory and declared exports against existing package allowlists. Current exports are explicit unconditional file targets; missing or unsupported targets fail. Inputs are maintainer-controlled repository metadata; npm owns pack selection and offline install, with no workspace fallback in consumer verification. Root `pack:check` runs `check`, then this pack verification and an offline external consumer of the newly packed artifacts, with no recursive scripts or second full-suite run.

- [x] Write failing integration tests: the pack stage is not reached when check fails; success produces and inspects exactly eight artifacts without the private root; a leaked test fixture or missing declared export fails. Verify that the post-pack offline consumer imports existing exports and loads catalogs, and that a cache miss fails without network fallback. Verify cleanup on success and packing/consumer failure.
- [x] Run `node --test tests/integration/pack-check.test.js`; require failure for the missing intended behavior before implementation.
- [x] Implement the thin npm packaging wrapper. Reuse the existing offline-install helper and consumer assertions for specification metadata and CLI catalog loading, applying them to the newly packed artifacts after successful check. Extract shared consumer verification from the existing test where needed; extend it only where a declared public export lacks coverage. Config/bin implementation remains in its owning tasks.
- [x] Run `npm run pack:check` on Node 26.0.0 and 26.11.1; its check stage runs `npm run typecheck`, metadata validation and `npm test` once per invocation. Inspect all eight tarballs and verify tracked files, versions and statuses remain unchanged by the commands.
- [x] Document cache preparation and the two commands; state that versioning, executable CLI and publication remain pending. Commit with `[engineering-standards-9]: Verify packed workspace artifacts`.

## Completion

- [ ] Review the complete feature diff and related tooling requirements independently under AGENTS.md; record actual checks separately from future release behavior.
- [ ] Open an implementation PR with `Refs #9`, the two-command outcome and verification evidence. Retain remaining #9 versioning criteria; merge/publish still require explicit approval.

## Review evidence

Canonical findings and issue-edit record: [review response](../../architecture/2026-10-13-workspace-checks-review-response.md).
