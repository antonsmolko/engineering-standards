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

1. Before editing, read all review sources: inline threads, review summary bodies,
   PR and issue comments, and user-provided review files. Fetch all pages and
   explicitly reconcile sections describing the status of previous findings.
2. Maintain one authoritative review ledger in the PR, issue or review-response
   document. For each finding record its source link or local path, affected
   files/issues, disposition and verification evidence. Use these dispositions:
   open, fixed, declined with rationale, or explicitly agreed deferred work with
   a reason and follow-up. Preserve confirmed closed findings across rounds;
   reopen them only when new evidence warrants it.

   Ledger columns: `Source | Finding | Affected files/issues | Disposition | Evidence`.

3. Before changing a contract, identify every affected representation: design,
   implementation plan, issue criteria/dependencies, handoff and published
   documentation. Update them together, replace superseded wording and merge
   duplicate criteria. Keep internal roadmap and review details out of published
   consumer documentation. Record GitHub issue edits separately from repository
   changes, and use publicly accessible sources in committed review responses.
4. Define a changed rule completely before submitting it: inputs, who derives
   and validates them, success/failure conditions, missing or invalid data,
   exceptions and scope. Check boundary cases, including an empty selection,
   extra unrelated packages, stale evidence and mismatched versions where
   applicable. Preserve existing approval gates; release approval is not a waiver
   of content or compatibility requirements.
5. Before each review-fix push, inspect the entire final PR diff against the
   ledger, including relevant unchanged passages and edited GitHub issues.
   Verify dependencies and documentation paths/anchors. Report requirements and
   documentation verification separately from runtime tests; passing tests alone
   does not establish contract consistency. Every finding must have a correction
   or an explicit disposition and reply before claiming review work complete.
6. For changes spanning multiple contracts or implementation stages, obtain an
   independent review of the complete result. When an independent reviewer is
   unavailable, record the solo-review limitation explicitly. For small changes,
   complete the ledger and consistency checklist without an additional reviewer.
