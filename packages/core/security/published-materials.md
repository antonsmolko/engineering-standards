# Protect published materials

ID: CORE-SECURITY-001. Status: proposed; owner review required.

## Requirement

Before distributing an artifact, the author MUST inspect its actual contents
for credentials, private keys, access tokens, personal or confidential data and
materials without distribution rights. Fixtures MUST use synthetic data.
Credentials MUST remain outside source control and published files. A detected
live credential MUST block distribution and trigger the project's incident
procedure; merely deleting the current copy is not sufficient remediation.

## Rationale

An artifact may contain files that were not apparent in source review. A
published credential or private dataset cannot be made safe by ignoring it.

## Applicability

Public packages, generated documentation, release bundles and distributed test
fixtures. Public nonsecret identifiers and intentionally public content are not
credentials. Product-specific access policies remain in the product's rules.

## Verification

Inspect the packed artifact and its inclusion policy, perform a human content
and licensing review, and run appropriate secret checks. Confirm that fixtures
are synthetic. Passing a scanner is evidence, not a guarantee that every secret
or distribution-rights issue has been detected.
