# Agent instructions

Read the linked design and implementation plan before changing this repository.

When resuming the 2026-10-11 Engist work, start with the
[session handoff](docs/architecture/2026-10-11-session-handoff.md), then verify
its snapshot against the current branch and GitHub state.

- Keep specification, configuration and CLI packages independently versioned.
- Put shared architectural principles in core and domain-specific architecture in its domain.
- Never copy product-specific or private materials into published packages.
- Work on an issue-scoped feature branch; commits use `[engineering-standards-<issue>]: <English description>`.
- Write and run a failing behavior test before runtime changes; verify the full suite before claiming completion.
- Inspect packed artifacts and external consumer fixtures, not only workspace imports.
- Do not merge or publish without explicit release approval. Do not require a particular AI tool for consumers.

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
   Record applicable checks for empty inputs, unrelated extras, stale/forged
   evidence and version mismatches (or reasons they do not apply), preserving
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
   Only wording, typo or link-only corrections may skip it; when required review
   is unavailable, explicitly record the solo-review limitation in both ledger
   evidence and PR description.
