# @antonsmolko/standards-frontend

Frontend architecture and interface concerns, independent of a particular UI framework.

## Status and application

Version 0.1.0 is unreleased. All standards listed below are proposed drafts,
not approved requirements. Installation or passing tests does not approve them.
Select this package as a whole and read this README and all linked standards;
apply only the applicable approved requirements once the owner accepts them.
No particular AI tool, catalog loader or rule-selection configuration is needed.

## Standards (proposed)

- [FRONTEND-ARCH-001 — Explicit UI state ownership](architecture/state-ownership.md)

## Applicability and compatibility

Use with standards-core for shared principles. Select standards-typescript or standards-svelte when using those technologies; standards-svelte-spa adds the specific FSD SPA policy.

The five packages at 0.1.0 are the currently tested combination. Compatibility
is documented here rather than checked by a semantic resolver. Review the
[CHANGELOG](CHANGELOG.md) before upgrading; packages are versioned independently.
To use this package with an AI agent, manually reference this installed README
from your project's AGENTS.md and instruct the agent to read its linked standards.
Installation does not generate instructions or change lint/format configuration.
