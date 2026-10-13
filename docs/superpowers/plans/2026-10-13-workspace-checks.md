# Workspace check implementation plan — issue #9, first delivery

Исторический план выполненного PR #29. #9 закрыта; оставшийся Changesets criterion
перенесён в [#34](https://github.com/antonsmolko/engineering-standards/issues/34).
Актуальный roadmap — [общий план](2026-10-11-engineering-standards-independent-packages.md).
Указания ниже про второй PR #9 и незакрытую #9 описывают состояние до merge, не текущую работу.

Status: amended by [owner scope decision](https://github.com/antonsmolko/engineering-standards/issues/9#issuecomment-6139713816) and the direct request to fix PR #29 and use TypeScript. Native execution; independent whole-result review required. Existing design/plan approval and merge/publication gates remain distinct.

Goal: one `npm run check` for all eight workspaces. [Design](../specs/2026-10-11-engist-monorepo-tooling-design.md) defines input trust, diagnostics, exceptions and scope. npm scripts provide sequencing; node:test and tsc retain existing responsibilities. Official npm docs and maintained upstream example are linked in the design.

## Implementation and verification

- [x] Record the public scope change before expanding work: check only; Changesets is a second PR, package inventory belongs to #18, full roadmap cleanup is a separate docs-PR under #1.
- [x] Run existing workspace behavior tests against the requested TS entry before implementation: RED. Keep missing/stale locks for specification and all three tooling packages, incompatible local requires, read-only snapshots, I/O diagnostics, external requires and stop-before-tests cases.
- [x] Replace check-workspaces.js with typed check-workspaces.ts. Remove guards already owned by existing layout/schema tests. Include scripts/**/*.ts in tsc; add exact @types/semver development dependency. Retain only direct workspace lock comparisons and local semver.satisfies checks.
- [x] Remove pack:check, pack-check.js, verify-consumer.js and pack-check.test.js; restore catalog-artifacts.test.js to main. Test-only install-offline.ts remains with its existing callers.
- [x] Targeted tests and typecheck pass after implementation.
- [x] Run npm run check on Node 26.0.0 and 26.11.1: typecheck, metadata check and the entire suite, including existing real packed-artifact/offline-consumer coverage. Preserve all versions, catalogs and published sources.
- [x] Review the entire main-to-feature diff and affected documents/issues independently; check dependency and link consistency separately from tests.
- [x] Push and answer all four inline threads and the summary through the [canonical ledger](../../architecture/2026-10-13-workspace-checks-review-response.md). PR #29 uses Refs #9 and does not close the remaining Changesets work.

## Superseded preparation

The original first-delivery check/pack plan and its 109-test verification were valid for the then-current criteria, but are superseded by the owner decision above. Historical dispositions remain recorded in the ledger; neither the original approval nor the new scope permits merge/publication.
