# Explicit UI state ownership

ID: FRONTEND-ARCH-001.

## Requirement

UI, state ownership and preparation of complex presentation data have explicit responsibilities. A presenter is not mandatory for a simple component.

## Rationale

Separating responsibilities keeps interactions testable without unnecessary abstractions.

## Applicability

Frontend features with stateful interactions.

## Verification

Test loading, empty, failure and successful states.
