# Agent instructions

Read the linked design and implementation plan before changing this repository.

When resuming the 2026-10-11 Engist work, start with the
[session handoff](docs/architecture/2026-10-11-session-handoff.md), then verify
its snapshot against the current branch and GitHub state.

- Keep specification, configuration and CLI packages independently versioned.
- Put shared architectural principles in core and domain-specific architecture in its domain.
- Never copy product-specific or private materials into published packages.
- Work on an issue-scoped feature branch; commits use `[engineering-standards-<issue>]: <English description>`.
- Write and run a failing behavior test before runtime changes; verify the full suite before claiming completion.
- Inspect packed artifacts and external consumer fixtures, not only workspace imports.
- Do not merge or publish without explicit release approval. Do not require a particular AI tool for consumers.
