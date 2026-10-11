# Proposed requirements inventory

This inventory records the first consumer's engineering topics, not its private
implementation. All listed requirements remain **proposed** until the owner
reviews their complete text. Package documentation is the normative text; this
matrix is a review aid, not a second source of obligations.

## Core review set

| Topic                           | Proposed ID and document                                                 | Applicability                           | Rationale and verification                                                 |
| ------------------------------- | ------------------------------------------------------------------------ | --------------------------------------- | -------------------------------------------------------------------------- |
| Public boundaries               | [CORE-ARCH-001](../../packages/core/architecture/public-contract.md)     | Modules with external consumers         | Limit private coupling; review contracts, imports and behavior tests       |
| Completion evidence             | [CORE-WORKFLOW-001](../../packages/core/workflow/acceptance-evidence.md) | Software and artifact changes           | Avoid unsupported completion claims; compare acceptance and current checks |
| Review dispositions             | [CORE-WORKFLOW-002](../../packages/core/workflow/review-decisions.md)    | Public contracts and required standards | Require independent decisions; review revision and finding dispositions    |
| Secrets and distribution rights | [CORE-SECURITY-001](../../packages/core/security/published-materials.md) | Distributed artifacts and fixtures      | Prevent private-data publication; inspect packed files and licenses        |

## TypeScript review set

| Topic                     | Proposed ID and document                                                          | Applicability                       | Rationale and verification                                                                          |
| ------------------------- | --------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| External-data boundaries  | [TS-TYPES-001](../../packages/technologies/typescript/docs/runtime-boundaries.md) | TypeScript consuming untrusted data | Static declarations cannot validate runtime data; review adapters and malformed-input failure tests |
| Effective strict checking | [TS-CONFIG-001](../../packages/technologies/typescript/docs/strict-checking.md)   | Authored TypeScript production code | Avoid permissive or unused configuration; inspect effective settings and real compiler errors       |

Both remain proposed. Runtime validation is independent of a consumer's guard
names; strict checking is independent of formatting preferences.

## Svelte SPA review set

| Topic                            | Proposed ID and document                                                                   | Applicability                                                         | Rationale and verification                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Composition and slice boundaries | [SVELTE-SPA-ARCH-001](../../packages/stacks/frontend/svelte-spa/docs/module-boundaries.md) | Svelte 5 / TypeScript SPAs explicitly selecting the FSD stack profile | Make dependencies and ownership explicit; check upward, private and peer imports, plus allowed same-slice and public lower-slice imports |

FSD is a selected stack policy, not universal core architecture. App and Shared
segments are not business slices. No presenter, state library, guard API or
application alias is implied. The proposed import checker is not implemented.

## Local-only topics

| Topic                                                   | Disposition             | Reason                                                                                       |
| ------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| Mandatory named guard methods                           | Local-only              | Depends on an application's helper API; runtime validation does not require that API         |
| arrow-body-style and blank-line preferences             | Local-only              | Readability preferences need a separately approved style profile                             |
| Alias names and project paths                           | Local-only              | Consumer-specific imports are not universal architecture                                     |
| Authentication and API business contracts               | Product-local           | Product identities, session policies and endpoint payloads are not engineering standards     |
| Mandatory Superpowers or another agent tool             | Local-only              | Standards must be usable without a particular agent or plugin                                |
| Store/presenter conventions, forms and API error models | Separate design pending | State ownership and failure policies need explicit applicability and their own module review |

## Deferred content

Frontend state ownership, accessibility and form states, and Svelte reactivity
and lifecycle form separate review sets after the first vertical slice. Existing
FRONTEND-ARCH-001 and SVELTE-STATE-001 are proposed seeds, not complete packages
of accepted conventions. Authentication, authorization, API-client and
frontend-state modules require separate designs; no module package is created
by this inventory.
