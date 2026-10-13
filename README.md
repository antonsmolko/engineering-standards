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

Current implementation: package catalogs, validation, read-only workspace checks
and isolated packed-artifact tests. Initial requirements remain proposed.
Executable CLI commands and lint/format configurations are not implemented.

Run `npm ci --ignore-scripts` with registry access to prepare the npm cache,
then `npm run check`. It runs typecheck, workspace lock/version and local
`manifest.requires` compatibility checks, and the full test suite. Errors stop
subsequent stages. Source files and versions stay unchanged; external semantic
requirements are not verified against a registry. The existing tarball tests
install consumers offline; an empty cache produces preparation guidance.

Use Node 26; `.node-version` pins Node 26.11.1 for development. Older Node
versions are not supported. Root scripts and test helpers use TypeScript and
are included in `npm run typecheck`; Node runs their erasable types directly.
Published packages retain their JavaScript/Markdown/JSON formats. Changesets
and publication are pending. No repository-local formatting command exists yet.

With nvm, select the pinned version explicitly:
`nvm install "$(cat .node-version)"` followed by `nvm use "$(cat .node-version)"`.
nvm does not read `.node-version` automatically.

The technical platform is developed on synthetic test data before standards
content is filled and accepted. Fixture acceptance does not approve actual
catalog requirements or authorize a release.

Specifications are organized by scope: core, domains, technologies, stacks and optional modules. ESLint, Prettier and CLI tooling are separate packages. There is no repository-wide release version.
