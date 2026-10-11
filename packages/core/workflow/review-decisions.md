# Review decisions

ID: CORE-WORKFLOW-002. Status: proposed; owner review required.

## Requirement

Changes to a public contract or a required standard MUST receive review from
someone other than the author before acceptance. Every material review finding
MUST have an explicit disposition: corrected, rejected with reasoning, or
deferred with a recorded follow-up and its impact. Acceptance MUST identify the
reviewed revision and decision; an author's implementation report is not review
approval.

## Rationale

Independent review reduces shared blind spots. Recorded dispositions prevent
unresolved concerns from disappearing during implementation or a release.

## Applicability

Public APIs, normative requirements and changes to required checks. This rule
does not require a particular hosting platform, number of reviewers or AI tool.
Projects define the review policy for other changes separately.

## Verification

Review the acceptance record, its revision and the findings' dispositions.
Confirm that the approving reviewer is not the author. Automated checks may
verify metadata, but they cannot establish meaningful independent review.
