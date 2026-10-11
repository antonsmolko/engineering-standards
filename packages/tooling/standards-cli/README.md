# @antonsmolko/standards-cli

Independently versioned package within engineering-standards.

Agreed product/command name: Engist; planned configuration: engist.json.
The npm package identity remains unchanged pending separate naming checks.

Status: implementation in progress. No release is published yet.

The catalog loader validates schema version 1 using bundled snapshots in
`lib/schemas`. They must match the canonical schemas in `standards-core`;
`npm test` checks parity before changes can be integrated. Installation does
not select or install any specification profile transitively.

Requirement IDs use `NAMESPACE-CATEGORY-NNN`. Parsing from the right preserves
hyphenated namespaces and leading zeros; ownership uses exact namespace equality.
Package roots may be symlinks, but referenced files inside their physical roots
cannot be symlinks or escape those roots. Hostile concurrent filesystem mutation
is not a supported isolation guarantee.

The CLI commands, resolver and managed-file writer are not implemented yet.

Local validation enforces canonical profile ID syntax and matching kind,
locally declared profile requirements, and rejects direct requirement self-links.
Cross-package existence and graph cycles belong to the planned resolver.
Unselected catalog requirements are allowed, but are not activated by declaration.
Lifecycle status and level come only from manifest.json, not Markdown labels.

See [the planned project workflow](docs/workflow.md) for the purpose of the
generated document, the difference between init and sync, names-only package
selection, optional confirmed dependency/tool setup, and terminal diff previews.
Sync performs both first generation and updates; init creates the selection.
The workflow is a future command
contract, not evidence that the commands are available.
