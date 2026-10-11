# FSD module boundaries

ID: SVELTE-SPA-ARCH-001. Status: proposed; review before making this mandatory.

## Requirement
For the selected FSD architecture, higher layers depend on lower layers, slices expose public entrypoints, and peer slices do not import internals.

## Rationale
The selected stack needs explicit boundaries rather than relying on naming alone.

## Applicability
Svelte 5 and TypeScript SPA projects selecting this FSD profile.

## Verification
Check import boundaries automatically and review allowed exceptions.
