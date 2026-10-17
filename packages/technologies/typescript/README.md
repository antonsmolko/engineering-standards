# @antonsmolko/standards-typescript

TypeScript function conventions, checking and runtime data boundaries for any application domain.

## Status and application

Version 0.1.0 is unreleased. All standards listed below are proposed drafts,
not approved requirements. Installation or passing tests does not approve them.
Select this package as a whole and read this README and all linked standards;
apply only the applicable approved requirements once the owner accepts them.
No particular AI tool, catalog loader or rule-selection configuration is needed.

## Standards (proposed)

- [TS-TYPES-001 — Validate external values](docs/runtime-boundaries.md)
- [TS-FUNCTIONS-001 — Prefer arrow functions](docs/arrow-functions.md)
- [TS-CONFIG-001 — Strict compiler checking](docs/strict-checking.md)

## Applicability and compatibility

Use with standards-core. TypeScript is not limited to frontend; select frontend or stack documents only when applicable.

The five packages at 0.1.0 are the currently tested combination. Compatibility
is documented here rather than checked by a semantic resolver. Review the
[CHANGELOG](CHANGELOG.md) before upgrading; packages are versioned independently.
To use this package with an AI agent, manually reference this installed README
from your project's AGENTS.md and instruct the agent to read its linked standards.
Installation does not generate instructions or change lint/format configuration.
