# 0001 Architecture Baseline

- Status: Accepted
- Date: 2026-07-23

## Context

The project needs a local-first architecture with predictable behavior, easy deployment, and minimal operational overhead for open-source contributors.

## Decision

Use a static frontend architecture:

- React + TypeScript + Vite for UI and build tooling
- Deterministic planning engine logic in TypeScript modules
- JSON schemas for plan and dataset validation
- GitHub Actions for CI checks (lint, test, build)

## Consequences

Positive:

- Easy local development and static hosting
- Low operational complexity
- Clear schema contracts for interoperability

Tradeoffs:

- No server-side compute for heavy simulations
- Collaboration features remain out of scope until backend is introduced
