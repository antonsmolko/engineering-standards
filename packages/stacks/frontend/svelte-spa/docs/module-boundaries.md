# FSD module boundaries

ID: SVELTE-SPA-ARCH-001. Status: proposed; review before making this mandatory.

## Requirement

Projects selecting this FSD profile MUST assign modules to the ordered layers
`app`, `pages`, `widgets`, `features`, `entities`, `shared`, using only the layers
they need. A slice MUST import another slice only from a lower layer and through
that slice's declared public entrypoint. Importing a peer slice's public API is
not an implicit exception. Imports inside one slice may use its private files.

`app` and `shared` are organized into segments, not business slices; their
segments may depend on one another within their layer. `shared` MUST NOT depend
on a higher layer. `app` composes lower-layer modules and application setup;
cross-slice workflows MUST live in an appropriate higher layer rather than
creating circular peer dependencies. Any deliberate cross-import, including an
entity cross-reference API, requires a recorded exception to this profile.

## Rationale

Naming folders alone does not prevent coupling. Explicit import direction and
entrypoints keep a slice's implementation replaceable and make application
composition visible.

## Applicability

Svelte 5 and TypeScript SPAs explicitly choosing this FSD architecture. This is
not a requirement for every frontend or Svelte application. Layer folders may
be omitted when unnecessary; the profile does not mandate a presenter, store,
API client, routing library, alias spelling or `index.ts` for every helper.

## Verification

Review module placement and the project layer map. Run an import-boundary check
that resolves both relative paths and aliases and verifies public entrypoints.
Negative fixtures MUST include an upward dependency, a private lower-slice
import and a peer-slice import; valid fixtures MUST include a public lower-slice
import and an internal same-slice import. Review recorded exceptions separately.
These checks are a proposed verification contract; this package does not yet
ship the checker.

## References

[FSD layers](https://feature-sliced.design/docs/reference/layers) and
[public API](https://feature-sliced.design/docs/reference/public-api) describe
the architecture. This profile deliberately requires explicit project decisions
for cross-import exceptions instead of enabling them by default.
