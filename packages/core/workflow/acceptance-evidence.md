# Acceptance evidence

ID: CORE-WORKFLOW-001. Status: proposed; owner review required.

## Requirement

Before reporting a change as complete, the author MUST compare its result with
the agreed acceptance criteria and run the relevant verification against the
current revision. The handoff MUST distinguish executed checks, failures,
unverified conditions and deferred work. A behavior fix MUST include a check
that exercises the reported failure and demonstrates the corrected result.

## Rationale

A passing subset or an earlier revision does not establish that the requested
outcome is complete. Explicit evidence makes residual risk visible to reviewers.

## Applicability

Changes to software, executable configuration and release artifacts. Human-only
prose requires review for meaning and consistency, not tests for exact wording.
The project chooses tools and checks in proportion to the affected behavior.

## Verification

Compare the acceptance criteria with the handoff and current verification
results. Review whether checks exercise the changed behavior and whether known
failures are disclosed. A green test suite does not replace missing acceptance
criteria, a security assessment or release approval.
