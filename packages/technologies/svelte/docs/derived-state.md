# Derived state

ID: SVELTE-STATE-001.

Status: proposed (draft; not approved). Level: required.

## Requirement

Use derived state for computations from reactive inputs; effects synchronize with external systems rather than duplicate derived values.

## Rationale

Duplicated state can drift and cause feedback loops.

## Applicability

Svelte 5 reactive components and modules.

## Verification

Review reactive dependencies and test input changes.
