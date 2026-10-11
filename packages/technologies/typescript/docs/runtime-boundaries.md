# Validate external values

ID: TS-TYPES-001. Status: proposed; review before making this mandatory.

## Requirement
Enable strict checking and validate external unknown values before treating them as trusted application data.

## Rationale
Static types do not validate network or storage input.

## Applicability
TypeScript programs with external data.

## Verification
Check compiler settings and test malformed input.
