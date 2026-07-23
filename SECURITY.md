# Security Policy

## Supported Versions

Until the first stable release, security fixes are applied to the default branch.
After v1.0.0, supported versions will be listed here.

## Reporting a Vulnerability

Please do not open public issues for suspected vulnerabilities.

Instead:

1. Use GitHub Security Advisories private reporting for this repository.
2. Include steps to reproduce, impact, and affected files or modules.
3. Include proof-of-concept only when needed to explain risk.

If private reporting is unavailable, contact:

- security@miyawakiforestplanner.org

If the email is not active yet, use private maintainers contact through repository owners.

## What to Include in a Report

- Vulnerability type and impact
- Reproduction steps
- Affected commit, branch, or version
- Suggested mitigation (if known)
- Whether exploitation requires authentication or user interaction

## Response Targets

- Initial acknowledgement: within 3 business days
- Triage decision: within 7 business days
- Mitigation plan or fix timeline: within 14 business days

These targets are best-effort for an early-stage open-source project.

## Disclosure Process

1. Report received privately.
2. Maintainers triage severity and validate issue.
3. Fix prepared and reviewed.
4. Coordinated disclosure posted with remediation guidance.
5. Advisory references affected commits and versions.

## Security Scope Notes

This project is a static web application. Core security priorities include:

- Client-side input validation and schema validation
- Safe parsing of uploaded local plan files
- Dependency vulnerability management
- Export generation safety (PDF, SVG, GeoJSON, DXF)
- Protection against malicious payload injection in imported data

## Dependency and Supply Chain Hygiene

- Keep dependencies updated regularly
- Use lockfiles and reproducible installs
- Run automated dependency scanning in CI once configured

## Responsible Testing

Security testing must avoid service abuse, privacy violations, or attempts to access third-party systems.
