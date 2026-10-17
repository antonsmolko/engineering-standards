# Agent instructions

Read the linked design and implementation plan before changing this repository.

When resuming gost-spec work, start with the
[session handoff](docs/architecture/2026-10-11-session-handoff.md), then verify
its snapshot against the current branch and GitHub state.

- Keep the five specification packages independently versioned. Future configuration
  or CLI packages require their own scope and independent versions.
- Put shared architectural principles in core and domain-specific architecture in its domain.
- Never copy product-specific or private materials into published packages.
- Work on an issue-scoped feature branch; commits use `[gost-spec-<issue>]: <English description>`.
  Existing carrier branches retain their established issue prefix.
  The branch's issue is the carrier; each related owner-requested addition needs
  its own linked issue, recorded with the request and retained prefix in the
  carrier issue, added issue and PR; carrier criteria and closure are unaffected.
- Write and run a failing behavior test before runtime changes; verify the full suite before claiming completion.
- Inspect packed artifacts and external consumer fixtures, not only workspace imports.
- Do not merge or publish without explicit release approval. Do not require a particular AI tool for consumers.

## Task scope

- Start infrastructure work from official documentation and a maintained upstream
  example. Cite the baseline and identify the concrete project requirement before
  proposing custom tooling; reuse supported upstream behavior where it fits.
- Give each implementation PR one independently verifiable outcome. If review
  introduces another outcome, revise the issue scope and split the work before
  extending implementation; count carrier additions as separate outcomes and
  retain already agreed requirements and approval gates.
- Keep future tasks at the level of requirements and acceptance criteria.
  Choose their implementation mechanisms in their own design/implementation PR,
  supported by a current use case; do not add speculative APIs during review fixes.

## Review handling

1. Read all pages of inline threads, summary reviews, PR/issue comments and supplied
   review files; reconcile their previous-finding status against the ledger.
   Record the sources read and retain reviewer-confirmed closures unless new
   evidence warrants reopening, with that evidence recorded.
2. Use the committed review-response document as the canonical ledger when one
   exists; otherwise use the PR description (or issue body before a PR exists).
   Replies link to individual ledger entries without adding unrecorded dispositions;
   record every finding using
   `Source | Finding | Affected files/issues | Disposition | Evidence`, with public
   source links in committed responses; local/private inputs must be labelled
   "private input, not a public basis" and paired with a public actionable source.
3. Identify and update all affected representations: design, plan, issue criteria
   and dependencies, handoff and published documentation; replace superseded
   wording and record GitHub issue edits in a dedicated ledger section.
   Keep internal roadmap/review details out of published consumer documentation.
4. Define changed contracts in the design/plan: inputs and their derivation/trust,
   validation, success/failure, missing/invalid data, exceptions and scope.
   Record boundary checks relevant to the current task's contract, preserving
   content/compatibility gates independently of release approval.
5. Inspect the complete final PR diff once per review round and, for every changed
   contract, search relevant unchanged documents and issue bodies for conflicts;
   verify dependencies and links/anchors and report this separately from runtime
   tests. Completion requires no open findings and a reply for every thread and
   summary: each finding is fixed with evidence, declined with rationale, or
   explicitly agreed deferred work with a reason, owner agreement and follow-up.
6. Contract/gate changes and requirements spanning documents require independent
   review of the complete result by another person or a separate agent given
   artifacts/requirements without the author's working conversation.
   Only wording, typo or link-only corrections may skip it; when the owner
   determines required review is unavailable, record that decision and the
   solo-review limitation in ledger evidence and, when a PR exists, its description.
