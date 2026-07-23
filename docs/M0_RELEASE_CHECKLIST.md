# M0 Release Checklist

## CI and quality gates

- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] CI workflow passes on main branch and pull requests

## Schema and validation

- [ ] `schemas/plan.schema.json` reviewed
- [ ] `schemas/species.schema.json` reviewed
- [ ] `schemas/dataset-metadata.schema.json` reviewed
- [ ] `npm run validate:plan` passes
- [ ] `npm run validate:data` passes

## Data and metadata

- [ ] Pilot species dataset present
- [ ] Pilot metadata includes source and license
- [ ] Data license policy references pilot contract

## Documentation and governance

- [ ] ADR baseline documented
- [ ] Contribution workflow verified
- [ ] PR template requests issue/test evidence/screenshots

## Sign-off

- [ ] Milestone 0 accepted by maintainers
- [ ] Follow-up backlog for Milestone 1 finalized
