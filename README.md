<div align="center">

# Compliance-to-Architecture / sector-packs

**Vertical-grade compliance bundles. Each pack bundles regulator-authored frameworks + rule packs + evidence templates for a specific industry.**

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Status](https://img.shields.io/badge/status-public%20OSS-brightgreen.svg)](#) [![Spec](https://img.shields.io/badge/spec-v0.1-orange.svg)](#) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#) [![Packs](https://img.shields.io/badge/packs-3%20live-success.svg)](src/packs/) [![Tested](https://img.shields.io/badge/tests-passing-brightgreen.svg)](test/)

</div>

---

## Packs shipped

| Pack | Frameworks | Anchor refs |
| --- | --- | --- |
| **Maritime** | 30 | IMO SOLAS · MARPOL · STCW · EU MRV · BIMCO cyber · IACS UR E26/E27 |
| **Legal** | 26 | SRA Code · ABA Model Rules · CCBE Code · AML · Sanctions |
| **Oil & Gas** | 30+ | OSHA PSM · Seveso III · NORSOK · API standards · EU ETS/CBAM |

## Pack structure

Each `src/packs/<pack>/index.ts` exports a `SectorPack` object: `frameworks`, `rulePacks`, `evidenceTemplates`, `engineBindings`. Validated against `src/schema.ts`.

## Roadmap

Banking-grade · PCI QSA · HIPAA pharma · public-sector · retail/e-commerce.

---

## Sibling repos

| Repo | What |
| --- | --- |
| [`framework`](https://github.com/Compliance-to-Architecture/framework) | 25 framework dictionaries + crosswalks + policy-as-code compile targets |
| [`ontology`](https://github.com/Compliance-to-Architecture/ontology) | JSON-LD ontology + schemas + IaC examples |
| [`sector-packs`](https://github.com/Compliance-to-Architecture/sector-packs) | Maritime / legal / oil-and-gas vertical bundles |
| [`dictionaries`](https://github.com/Compliance-to-Architecture/dictionaries) | Canonical taxonomies (8 JSON dictionaries) |
| [`playbooks`](https://github.com/Compliance-to-Architecture/playbooks) | Skill files + worked examples |

## Provenance

Mirrored from the upstream [ReguNav/app](https://github.com/ReguNav/app) monorepo. Apache-2.0 contributions welcome — by contributing you agree your contribution is Apache-2.0.

[![Site](https://img.shields.io/badge/compliancetoarchitecture.com-→-1F6FEB.svg)](https://compliancetoarchitecture.com)
