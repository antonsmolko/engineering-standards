# Engineering standards

Agreed product and future CLI name: **Engist** (`engist init`, `engist sync`,
`engist check`), with engist.json as the planned project configuration.
Repository/package renaming and name availability checks are separate work;
current package identities have not been changed or released.

Composable engineering specifications and independently versioned development tooling.

Implementation is in progress under [issue #1](https://github.com/antonsmolko/engineering-standards/issues/1). No npm release has been published.

- [Design](docs/superpowers/specs/2026-10-11-engineering-standards-design.md)
- [Implementation plan](docs/superpowers/plans/2026-10-11-engineering-standards-independent-packages.md)
- [CLI workflow and generated instructions](packages/tooling/standards-cli/docs/workflow.md)

Current implementation: package catalogs, validation, workspace consistency
checks and isolated packed-artifact/consumer verification. Initial requirements
remain proposed. CLI commands and lint/format configurations are not implemented
yet; workflow examples describe the intended behavior rather than available commands.

Run `npm ci --ignore-scripts` with registry access to explicitly prepare the npm
cache, then `npm run check` or `npm run pack:check`. Consumer installation stays
offline; an empty cache produces preparation guidance. Repository-local formatting
tooling/dogfooding remains pending: no reproducible npm formatting command is claimed yet.

Use Node 26; `.node-version` pins Node 26.11.1 for development. Older Node
versions are not supported. Test helpers use TypeScript: run `npm run typecheck`
to check their types and `npm test` to run them with Node's built-in TypeScript
support. Published packages retain their current JavaScript/Markdown/JSON formats.

`npm run check` runs typecheck, read-only package/manifest/workspace-lock checks
and the full test suite. Local `manifest.requires` ranges are checked against
workspace versions; external requirements are not verified against a registry.
`npm run pack:check` runs check, then packs all eight workspaces into temporary
storage, checks their file allowlists and existing exports, and installs the
artifacts into an offline consumer to verify metadata imports and catalog loading.
Errors stop subsequent stages; temporary artifacts and consumers are removed.
These commands leave source files and versions unchanged. Changesets/versioning,
executable CLI commands and publication are still pending.

With nvm, select the pinned version explicitly:
`nvm install "$(cat .node-version)"` followed by `nvm use "$(cat .node-version)"`.
nvm does not read `.node-version` automatically.

The technical platform is developed on synthetic test data before standards
content is filled and accepted. Fixture acceptance does not approve actual
catalog requirements or authorize a release.

Specifications are organized by scope: core, domains, technologies, stacks and optional modules. ESLint, Prettier and CLI tooling are separate packages. There is no repository-wide release version.
