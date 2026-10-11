# PR #3 review disposition

Review target: f7e6c47. The subsequent Engist setup discussion does not invalidate
the catalog/content findings. No acceptance of proposed normative wording or
publication authorization is inferred from this correction.

## Local manifest validation

Corrected canonical profile ID syntax and matching kind, undeclared local
profile requirements and direct requirement self-links through requires,
refines, replaces and conflicts. Both canonical/bundled schemas are updated.
Profile ID syntax supports future domain/technology/stack names, not a hard-coded
enum of the first five shipped profiles.

Cross-package reference existence, traversal and cycles remain the resolver's
responsibility (Task 4). Local loading cannot reject an external profile merely
because its package is not loaded yet. Malformed external profile identifiers
are nevertheless rejected locally. CLI README/design/plan make this boundary
explicit; successful loading is not successful selected-graph resolution.

Declared requirements may be unselected by all profiles: they can be catalog
candidates or selected by future modules. They are not active by declaration;
the resolver must only activate explicitly selected applicable accepted entries.

## Lifecycle source of truth

Removed status labels from all nine normative document headers. Manifest.json
is the sole lifecycle/level source. Updated the requirement template and content
acceptance procedure; readers retain stable document IDs, and future rendering
attributes metadata from the manifest. All current requirements remain proposed.

## FSD verification

SVELTE-SPA-ARCH-001 now declares manual verification. The text describes current
review checks, not a nonexistent mandatory checker/fixture suite. Moving to
combined requires separately reviewed implemented automatic coverage.
Engist check does not verify source import boundaries.

## Solo-maintainer review

Revised the proposed CORE-WORKFLOW-002 wording to distinguish independent human
review from a recorded separate solo self-review or AI-assisted review. The
record identifies method, reviewed revision, limitations and the maintainer's
acceptance decision. Shared hosting-account identity alone is not evidence of
human independence. The wording still requires finding dispositions and does
not mandate an AI tool or treat self-review as independent human approval.

## Offline artifacts and formatting

The real empty-cache regression demonstrates actionable ENOTCACHED preparation
guidance. Offline install remains offline/ignore-scripts; no hidden fallback to
network. Its timeout is named and increased to 120 seconds. Successful packed
consumer tests exercise the same helper; pack subprocesses retain their separate
timeout.

The PR no longer claims a checkout-reproducible formatting command. Existing
changed-file formatting was an external local check, not repository tooling.
Repository-local ESLint/Prettier configuration and dogfooding remain Tasks 9/11;
README explicitly states that boundary. Corrected the obsolete Task 1 config/bin
cross-reference to Tasks 7/9/9.1.
