# Strict compiler checking

ID: TS-CONFIG-001.

## Requirement

Each TypeScript project configuration used to check authored production code
MUST enable `strict`. Individual strict-family options MUST NOT be disabled
without a documented project exception. A verification command MUST check the
production code using that effective configuration. Compiler upgrades MUST be
checked before integration; a configuration file's mere presence is not proof
that the build uses it.

## Rationale

Strict checking catches unsafe assumptions that permissive defaults may accept.
Inherited configuration or an unused tsconfig can otherwise create a false
impression of type safety.

## Applicability

Authored TypeScript production code. Generated or third-party files may be
excluded under a documented project policy. This rule does not require extra
options outside the strict family, a particular bundler, or a particular
tsconfig package. Runtime validation is a separate requirement, TS-TYPES-001.

## Verification

Inspect the effective compiler configuration, including inherited files and
option overrides, and run the project's type-check command. Check every
production project reference. A negative fixture that would pass only with a
disabled strict-family option must fail for a type error rather than a tooling
or module-resolution error.

## References

[TypeScript strict option](https://www.typescriptlang.org/tsconfig/strict)
documents its family of checks and the possibility of new checks on upgrade.
