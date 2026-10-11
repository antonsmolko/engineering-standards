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

Current implementation: package catalogs, validation and isolated packed-artifact
tests. Initial requirements remain proposed. CLI commands and lint/format
configurations are not implemented yet; workflow examples describe the intended
behavior rather than available commands.

Run `npm ci --ignore-scripts` with registry access to explicitly prepare the npm
cache, then `npm test`. Consumer installation stays offline; an empty cache
produces preparation guidance. Repository-local formatting tooling/dogfooding
remains pending: no reproducible npm formatting command is claimed yet.

Specifications are organized by scope: core, domains, technologies, stacks and optional modules. ESLint, Prettier and CLI tooling are separate packages. There is no repository-wide release version.
