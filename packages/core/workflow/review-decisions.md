# Review decisions

ID: CORE-WORKFLOW-002.

Status: proposed (draft; not approved). Level: required.

## Requirement

Changes to a public contract or a required standard MUST receive a recorded
review before acceptance. When an independent human reviewer is available,
the reviewer MUST be someone other than the author. In a solo-maintainer project,
record the lack of an independent human reviewer and use either a separate
documented self-review pass or independent AI-assisted review of the revision.
Identify the review method and its limitations; neither is represented as
independent human approval. The maintainer remains responsible for acceptance.
Every material review finding
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
Review identity is a person/role and method, not merely a hosting account:
shared account use does not prove either independence or its absence.
Projects define the review policy for other changes separately.

## Verification

Review the acceptance record, its revision and the findings' dispositions.
Confirm reviewer independence when available. For solo-maintainer projects,
confirm the recorded limitation, separate review pass/method and maintainer
decision for the reviewed revision. Automated checks may verify metadata but
cannot establish meaningful review or independent human approval.
