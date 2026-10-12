# Normative content approval

Implementation-plan approval is not acceptance of new normative wording. All
catalog requirements are currently proposed. The author must not change their
status on the strength of schema tests, a generic continuation request or their
own review.

On 2026-10-12 the owner chose to finish the technical platform using synthetic
test data before filling the standards catalogs. Technical CLI, packaging,
configuration and release-pipeline tests may use test-only accepted requirements.
They do not change actual catalog statuses or satisfy the content release gate.

## Decisions required before the first accepted-content vertical slice

| Package              | Requirement ID      | Owner decision | Reviewed revision / decision link |
| -------------------- | ------------------- | -------------- | --------------------------------- |
| standards-core       | CORE-ARCH-001       | Pending        | No content approval recorded      |
| standards-typescript | TS-TYPES-001        | Pending        | No content approval recorded      |
| standards-svelte-spa | SVELTE-SPA-ARCH-001 | Pending        | No content approval recorded      |

The three rows above are minimum candidates, not predetermined decisions.
Add a row for every other reviewed ID, including deferred or rejected IDs,
with its package, owner decision and reviewed revision / decision link.

Other proposed core and TypeScript requirements may be accepted, revised or
deferred independently. Acceptance of one candidate does not approve its entire
package. Frontend and Svelte expansion is reviewed after the first vertical
slice; future modules have separate design and acceptance gates.

## Review checklist

- Is the requirement understandable without first-consumer code or an agent tool?
- Does it belong to core, a domain, a technology, a stack or a future module?
- Are its applicability and exceptions explicit and no broader than necessary?
- Does the rationale justify the required or recommended level?
- Can verification distinguish compliance from a real violation?
- Are manual checks distinguished from implemented automatic checks?
- Does it conflict with, refine or depend on another registered requirement?
- Is the stable ID preserved, and are source references and licenses appropriate?

## Recording acceptance

The owner reviews the complete proposed text and identifies accepted IDs in a
PR review or another explicit decision. Record that decision's link and the
reviewed revision here. A follow-up acceptance commit changes only confirmed
manifest statuses, then validates actual catalogs. Lifecycle status and level
live only in manifest.json; normative document headers retain stable IDs, not
duplicate labels. Generated instructions attribute lifecycle metadata from the
manifest, not from prose. Readers of source documents consult the catalog.
Changes after review must be assessed again rather than inheriting approval.

At least one accepted, applicable requirement from each of core, TypeScript and
Svelte SPA is needed for the first real vertical slice: at least three in total.
Fixtures with accepted data cannot satisfy this gate. Until then, content
acceptance, the accepted vertical slice and release remain incomplete. Nothing
in this document authorizes publication.
