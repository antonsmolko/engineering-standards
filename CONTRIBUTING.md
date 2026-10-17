# Contributing

Use Node 26: the supported minimum is 26.0.0 and `.node-version` pins 26.11.1.
From the repository root:

```sh
npm ci --ignore-scripts
npm run check
```

The check runs TypeScript validation, workspace consistency checks and the full
suite, including installed tarballs and external consumers. Registry access is
needed to prepare dependencies/cache; consumer tests then install offline.
GitHub Actions runs these checks on both Node versions for PRs into `main` and
pushes to `main`. Packed inventory is logged; artifact tests inspect the files.

## Propose a change

Keep each PR focused on one verifiable outcome. Use an issue-scoped feature
branch and commits like `[engineering-standards-<issue>]: Describe the change`.
Write a failing behavior test before runtime changes, then run the full check.
Write public documentation and diagnostics in English.

A PR changing any package file, including Markdown, needs a committed changeset.
For a release change, run `npm run changeset`; choose the affected packages and
bumps using the [versioning guide](.changeset/README.md). For a package edit that
does not need a release, create and commit an empty changeset:

```sh
npm run changeset -- add --empty
```

Changes outside the packages do not need a changeset. PR CI runs Changesets
status against the PR base commit and fails on package edits without one.
On pushes to `main`, status reads config and assembles the pending plan; it does
not check package changes against the previous push.

See the [manual publication runbook](docs/publication.md) for release preparation,
artifact review, approval and recovery steps.

## Review and publication

Contact the repository owner, [@antonsmolko](https://github.com/antonsmolko), for
scope and review decisions. Merge, content acceptance and permission to publish
are separate decisions. Green checks and synthetic accepted documents do not
approve real standards or authorize a release.

Only contribute materials suitable for public distribution. Never copy private
or product-specific content into packages. Automated checks catch forbidden
paths, missing documents and broken local links, but do not prove the absence of
secrets or establish redistribution rights. Before any real release, manually
audit each tarball for secrets, product-specific information and licensing, and
obtain content/applicability decisions and explicit publication approval.
See [content approval](docs/architecture/content-approval.md).
