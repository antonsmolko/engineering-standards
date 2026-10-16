# @antonsmolko/standards-core

Common engineering principles, public architecture contracts, workflow and protection of published materials.

## Status and application

Version 0.1.0 is unreleased. All standards listed below are proposed drafts,
not approved requirements. Installation or passing tests does not approve them.
Select this package as a whole and read this README and all linked standards;
apply only the applicable approved requirements once the owner accepts them.
No particular AI tool, catalog loader or rule-selection configuration is needed.

## Standards (proposed)

- [CORE-ARCH-001 — Public module contracts](architecture/public-contract.md)
- [CORE-WORKFLOW-001 — Acceptance evidence](workflow/acceptance-evidence.md)
- [CORE-WORKFLOW-002 — Review decisions](workflow/review-decisions.md)
- [CORE-SECURITY-001 — Protect published materials](security/published-materials.md)

## Optional authoring templates

- [Architecture decision](templates/adr.md)
- [Requirement](templates/requirement.md)
- [Module specification](templates/module.md)

## Applicability and compatibility

Combine with the domain, technology and stack packages applicable to your project. Core does not prescribe a frontend architecture.

The five packages at 0.1.0 are the currently tested combination. Compatibility
is documented here rather than checked by a semantic resolver. Review the
[CHANGELOG](CHANGELOG.md) before upgrading; packages are versioned independently.
To use this package with an AI agent, manually reference this installed README
from your project's AGENTS.md and instruct the agent to read its linked standards.
Installation does not generate instructions or change lint/format configuration.
