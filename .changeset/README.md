# Package versioning

We use [Changesets](https://changesets.dev/guide/getting-started) to manage the
five documentation packages independently. The private repository root has no
release version. The CLI is a development dependency, not a consumer tool.

Prepare the checkout with Node 26 and `npm ci --ignore-scripts`. Run commands
from the repository root.

## Describe a package change

For a change that requires a package release, create a changeset:

```sh
npm run changeset
```

Select only the affected packages, choose each bump type, and write an English
summary explaining the change. Review the generated Markdown file and commit it
with the package change. PR CI requires a committed changeset for every package-file edit, including
Markdown. If a package edit needs no release, create and commit an empty one:

```sh
npm run changeset -- add --empty
```

An empty changeset records the no-release decision without bumping a version or
accepting content. Changes outside packages do not require a changeset.

The supported non-interactive form is also available, for example:

```sh
npm run changeset -- add --patch @antonsmolko/standards-core --message "Clarify wording without changing meaning."
```

Choose the bump by meaning; Changesets applies your choice and does not analyze
the standards or verify migration instructions:

| Change | Bump | Example |
| --- | --- | --- |
| Editorial change with no change in meaning | patch | 0.1.0 → 0.1.1 |
| Breaking change before 1.0 | minor | 0.1.0 → 0.2.0 |
| Breaking change from 1.0 onward | major | 1.2.3 → 2.0.0 |

Include migration instructions in the English summary for breaking changes.
Authors and reviewers are responsible for choosing the correct bump. In
particular, choosing major at 0.1.0 produces 1.0.0, so use minor for a breaking
0.x change under this project's policy.

## Inspect the plan

```sh
npm run changeset -- status
```

This shows the pending plan without changing project files. On PRs, CI uses
`npm run changeset -- status --since "$BASE_SHA"` with the PR base commit and
full Git history; a package edit without a changeset fails. On pushes to `main`,
ordinary status reads config and assembles the pending plan. Its default base
branch is `main`, which equals HEAD there, so this step does not detect package
edits without changesets. To inspect the
upstream JSON result, add `--output` with a temporary file path.

## Apply an approved version preparation

The commands below change package versions and changelogs. Run them in the real
checkout only for an explicitly approved version preparation. Infrastructure
tests run them in disposable projects instead; adding Changesets does not grant
that approval or approve any draft standard.

```sh
npm run changeset -- version
npm install --package-lock-only --ignore-scripts
npm run check
```

`version` consumes the pending changesets and updates the selected packages and
changelogs. It does not update npm's lockfile; the second command does that using
npm. Stop after any failure, inspect the cause and the diff, and fix or restore
the partial changes before retrying.

Review the resulting package versions, changelogs and lockfile together. The
configuration uses upstream defaults for independent versions, the changelog
format and exclusion of private packages; automatic commits are disabled.

These steps do not publish or tag packages. Content acceptance, material audits
and explicit publication approval remain separate requirements.

Command reference: [Changesets CLI](https://changesets.dev/guide/cli).
Configuration reference: [Changesets config](https://changesets.dev/guide/config).
