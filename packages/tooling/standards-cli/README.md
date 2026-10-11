# @antonsmolko/standards-cli

Independently versioned package within engineering-standards.

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
