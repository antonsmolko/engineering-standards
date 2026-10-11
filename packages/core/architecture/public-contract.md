# Public module contracts

ID: CORE-ARCH-001. Status: proposed; review before making this mandatory.

## Requirement

Each module with external consumers MUST identify its public entrypoints and
document its responsibility, inputs, outputs and failure behavior. Consumers
MUST use that contract rather than private implementation paths. Dependencies
MUST be explicit; sharing an internal representation requires an intentional
public contract or a recorded project exception.

## Rationale

An implementation can change without coordinating every consumer only when its
boundary is visible. A public entrypoint alone is insufficient if consumers
still rely on hidden state or undocumented failure behavior.

## Applicability

Software modules and published packages with consumers outside their boundary.
A private helper needs no extra wrapper or separate package solely to satisfy
this rule. This requirement does not prescribe a language, layer model, barrel
file, framework or dependency-injection library.

## Verification

Review the boundary and its consumers. Check that external imports use declared
entrypoints and that contract tests cover observable success and failure
behavior. Where the language permits it, add an import/export boundary check;
passing it does not prove the contract's semantic completeness.
