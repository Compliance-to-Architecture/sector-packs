/**
 * Oil & Gas / Refineries / EPC Sector Pack v0.1.0 — ReguNav canonical.
 *
 * Designed for: upstream operators, midstream + downstream operators,
 * refineries, EPC contractors (Foster Wheeler / Wood Group / Saipem /
 * Technip Energies / Bechtel), offshore-installation owners, FPSO
 * operators, NOCs (national oil companies).
 *
 * Geographic anchors in v0.1: Norway (NORSOK + NPD), UK Scotland
 * (OPRED + HSE COMAH), Italy (Seveso III + IMQ), EU (CBAM + IED + ETS),
 * US (OSHA PSM + EPA RMP).
 *
 * Process-safety + environmental + financial-disclosure overlap makes
 * this one of the deepest verticals. v0.1 ships 30 anchor frameworks;
 * v0.2 adds API recommended-practices (API 510/570/653/580/650), IOGP
 * standards (IOGP 510 EPC, IOGP 423 asset integrity), and Subsea
 * 7 / Aker BP / Equinor supplier requirements.
 *
 * Bound to:
 *   - Zero Stubs (every entry references real regulator material): every framework has a real source URL
 *   - Zero Assumptions (evidence-based): version + date from regulator
 */
import type { SectorPack } from "../../schema.js";

export const OIL_AND_GAS_PACK: SectorPack = {
  schemaVersion: 1,
  packId: "oil-and-gas",
  version: "0.1.0",
  name: "Oil & Gas, Refineries, EPC",
  tagline:
    "30+ canonical frameworks for upstream + downstream + EPC — NORSOK, COMAH/Seveso III, OSHA PSM, EU CBAM/ETS/IED, API standards.",
  description: [
    "Oil & Gas is the deepest process-industry compliance vertical.",
    "Every refinery + offshore installation + EPC contractor must satisfy:",
    "  - Process safety: OSHA PSM (US), COMAH (UK), Seveso III (EU), NORSOK S-001 (NO), IOGP 510",
    "  - Environmental: EU IED + EU ETS + EU CBAM, OSPAR (NE Atlantic), MARPOL Annex I (tankers)",
    "  - Asset integrity: API 510 (pressure vessels), API 570 (piping), API 653 (storage tanks),",
    "    API 580/581 (risk-based inspection), API 650 (welded tank design)",
    "  - Offshore (Norway): Petroleum Safety Authority NORSOK series + Norwegian Petroleum Directorate regs",
    "  - Offshore (UK): OPRED Safety Case Regs + HSE OCR 2013 + OSDR 2015",
    "  - Refineries: NFPA 70/77/780, API RP 752/753/756 (facility siting), EPA RMP",
    "  - Pipelines: PHMSA 49 CFR 192/195 (US), EN 1594 (gas), ISO 13623 (oil)",
    "  - Cyber: IEC 62443 (industrial automation), API 1164 (pipeline SCADA), NIS2",
    "  - Anti-corruption: UKBA, FCPA, OECD (extra-territorial scope critical for O&G majors)",
    "  - Sustainability disclosure: CSRD (EU) + SEC climate rules + IFRS S2",
    "",
    "EPC contractors layer in IOGP 423 (Asset Integrity), IOGP 510 (EPC HSE management), IOGP 459 (process safety leadership), and project-specific FEED + DBM standards.",
  ].join("\n"),
  maintainer: {
    org: "ReguNav",
    email: "compliance@regunav.com",
  },
  lastUpdatedAt: "2026-05-17T22:45:00.000Z",
  nextReviewDate: "2026-08-17",
  targetSegments: [
    "upstream-operator",
    "offshore-installation",
    "fpso-operator",
    "midstream-pipeline",
    "downstream-refinery",
    "epc-contractor",
    "drilling-contractor",
    "subsea-engineering",
    "lng-terminal",
  ],

  frameworks: [
    // ─── Process safety (US + UK + EU) ──────────────────────────────
    {
      frameworkCode: "us-osha-psm",
      frameworkName: "OSHA Process Safety Management of Highly Hazardous Chemicals (29 CFR 1910.119)",
      issuer: "US OSHA",
      scope: "US",
      sourceUrl: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119",
      version: "1992 as amended",
      effectiveDate: "1992-05-26",
      applicability: "Facilities with threshold quantities of HHCs — refineries, petrochemical, gas processing.",
    },
    {
      frameworkCode: "us-epa-rmp",
      frameworkName: "EPA Risk Management Program (40 CFR Part 68)",
      issuer: "US EPA",
      scope: "US",
      sourceUrl: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-68",
      version: "as amended 2024",
      effectiveDate: "1996-06-21",
      applicability: "Facilities with regulated substance > threshold quantity.",
    },
    {
      frameworkCode: "uk-comah-2015",
      frameworkName: "UK Control of Major Accident Hazards Regulations 2015 (COMAH)",
      issuer: "UK HSE + Environment Agency",
      scope: "GB",
      sourceUrl: "https://www.legislation.gov.uk/uksi/2015/483/contents/made",
      version: "SI 2015/483 as amended",
      effectiveDate: "2015-06-01",
      applicability: "Lower-tier + upper-tier COMAH establishments — refineries, terminals, storage.",
    },
    {
      frameworkCode: "eu-seveso-iii",
      frameworkName: "EU Seveso III Directive (2012/18/EU) — control of major-accident hazards involving dangerous substances",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/dir/2012/18/oj",
      version: "Directive 2012/18/EU",
      effectiveDate: "2015-06-01",
      applicability: "Lower + upper-tier Seveso sites in all EU member states.",
    },

    // ─── Norway-specific ────────────────────────────────────────────
    {
      frameworkCode: "no-norsok-s-001",
      frameworkName: "NORSOK S-001 — Technical Safety (Norwegian offshore standard)",
      issuer: "Standards Norway / NORSOK",
      scope: "NO",
      sourceUrl: "https://standard.no/en/sectors/oil-and-gas/norsok-standards/safety-shf/s-001/",
      version: "Edition 5 (2023)",
      effectiveDate: "2023-10-01",
      applicability: "Petroleum activities on the Norwegian Continental Shelf.",
    },
    {
      frameworkCode: "no-petroleum-safety-authority",
      frameworkName: "Norwegian Petroleum Safety Authority (PSA) Management Regulations + Framework Regulations",
      issuer: "Petroleum Safety Authority Norway (Havtil)",
      scope: "NO",
      sourceUrl: "https://www.havtil.no/en/regulations/regulations/",
      version: "Consolidated 2024",
      effectiveDate: "2011-01-01",
      applicability: "Operators + licensees + contractors on Norwegian Continental Shelf.",
    },
    {
      frameworkCode: "no-sodir-resource-mgmt",
      frameworkName: "Norwegian Offshore Directorate (Sokkeldirektoratet / SODIR) — resource management regulations",
      issuer: "Sokkeldirektoratet (formerly Norwegian Petroleum Directorate)",
      scope: "NO",
      sourceUrl: "https://www.sodir.no/en/regulations/",
      version: "Consolidated 2024",
      effectiveDate: "1985-01-01",
      applicability: "Petroleum-resource reporting + reserves disclosure (Norwegian Continental Shelf).",
    },

    // ─── UK Scotland-specific ───────────────────────────────────────
    {
      frameworkCode: "uk-opred",
      frameworkName: "UK OPRED Offshore Petroleum Regulator for Environment and Decommissioning — Environmental + Decommissioning Regulations",
      issuer: "UK Government — Offshore Petroleum Regulator (OPRED)",
      scope: "GB",
      sourceUrl: "https://www.gov.uk/government/groups/offshore-petroleum-regulator-for-environment-and-decommissioning-opred",
      version: "Consolidated 2024",
      effectiveDate: "1999-01-01",
      applicability: "Offshore petroleum operations + decommissioning in UK Continental Shelf.",
    },
    {
      frameworkCode: "uk-ocr-2013",
      frameworkName: "UK Offshore Installations (Safety Case) Regulations 2015 (SCR 2015) + OCR 2013",
      issuer: "UK HSE",
      scope: "GB",
      sourceUrl: "https://www.legislation.gov.uk/uksi/2015/398/contents/made",
      version: "SI 2015/398",
      effectiveDate: "2015-07-19",
      applicability: "Operators + duty holders of offshore installations in UK waters.",
    },

    // ─── Italy-specific (refineries) ────────────────────────────────
    {
      frameworkCode: "it-d-lgs-105-2015-seveso",
      frameworkName: "Italy D.Lgs. 105/2015 — Seveso III transposition",
      issuer: "Italian Government — Ministry of Environment",
      scope: "IT",
      sourceUrl: "https://www.gazzettaufficiale.it/eli/id/2015/07/14/15G00121/sg",
      version: "D.Lgs. 26 giugno 2015, n. 105",
      effectiveDate: "2015-07-29",
      applicability: "Italian Seveso establishments — refineries, depots, petrochemical plants.",
    },
    {
      frameworkCode: "it-aia-ied",
      frameworkName: "Italy AIA (Autorizzazione Integrata Ambientale) — IED implementation",
      issuer: "Italian Ministry of Environment / Regions",
      scope: "IT",
      sourceUrl: "https://www.mase.gov.it/pagina/aia",
      version: "D.Lgs. 152/2006 Part II Title III-bis",
      effectiveDate: "2014-08-11",
      applicability: "Italian installations carrying out activities listed in Annex VIII of D.Lgs. 152/2006.",
    },

    // ─── EU horizontal regulations ──────────────────────────────────
    {
      frameworkCode: "eu-ied-2010-75",
      frameworkName: "EU Industrial Emissions Directive (2010/75/EU) — IED",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/dir/2010/75/oj",
      version: "Directive 2010/75/EU as amended 2024",
      effectiveDate: "2013-01-07",
      applicability: "All industrial installations in IED Annex I — refineries, large combustion, chemicals.",
    },
    {
      frameworkCode: "eu-ets-stationary",
      frameworkName: "EU Emissions Trading System — stationary installations (Directive 2003/87/EC as amended)",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/dir/2003/87/oj",
      version: "Phase IV (2021-2030)",
      effectiveDate: "2005-01-01",
      applicability: "Refineries + large combustion + chemicals — surrender allowances for verified emissions.",
    },
    {
      frameworkCode: "eu-cbam-2023-956",
      frameworkName: "EU Carbon Border Adjustment Mechanism (Regulation (EU) 2023/956)",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/reg/2023/956/oj",
      version: "Regulation (EU) 2023/956",
      effectiveDate: "2023-10-01",
      nextReviewDate: "2026-08-01",
      applicability: "EU importers of cement, iron, steel, aluminium, fertiliser, electricity, hydrogen.",
    },
    {
      frameworkCode: "eu-csrd-2022-2464",
      frameworkName: "EU Corporate Sustainability Reporting Directive (Directive (EU) 2022/2464)",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/dir/2022/2464/oj",
      version: "Directive (EU) 2022/2464",
      effectiveDate: "2024-01-01",
      applicability: "Large EU + non-EU undertakings — sustainability reporting under ESRS.",
    },

    // ─── Asset integrity (API standards) ────────────────────────────
    {
      frameworkCode: "api-510",
      frameworkName: "API 510 — Pressure Vessel Inspection Code",
      issuer: "American Petroleum Institute",
      scope: "GLOBAL",
      sourceUrl: "https://www.api.org/products-and-services/standards/important-standards-announcements/standard-510",
      version: "11th Edition (2022)",
      effectiveDate: "2022-04-01",
      applicability: "In-service pressure vessels in refineries + chemical plants.",
    },
    {
      frameworkCode: "api-570",
      frameworkName: "API 570 — Piping Inspection Code",
      issuer: "American Petroleum Institute",
      scope: "GLOBAL",
      sourceUrl: "https://www.api.org/products-and-services/standards/important-standards-announcements/standard-570",
      version: "5th Edition (2023)",
      effectiveDate: "2023-12-01",
      applicability: "In-service piping in refineries + petrochemicals.",
    },
    {
      frameworkCode: "api-653",
      frameworkName: "API 653 — Tank Inspection, Repair, Alteration, and Reconstruction",
      issuer: "American Petroleum Institute",
      scope: "GLOBAL",
      sourceUrl: "https://www.api.org/products-and-services/standards/important-standards-announcements/standard-653",
      version: "6th Edition (2022)",
      effectiveDate: "2022-09-01",
      applicability: "Aboveground storage tanks in refineries + terminals.",
    },
    {
      frameworkCode: "api-580",
      frameworkName: "API 580 — Risk-Based Inspection (RBI)",
      issuer: "American Petroleum Institute",
      scope: "GLOBAL",
      sourceUrl: "https://www.api.org/products-and-services/standards/important-standards-announcements/standard-580",
      version: "4th Edition (2023)",
      effectiveDate: "2023-04-01",
      applicability: "Refineries + petrochemical + chemical asset-integrity management programmes.",
    },

    // ─── IOGP standards (EPC + offshore) ────────────────────────────
    {
      frameworkCode: "iogp-510",
      frameworkName: "IOGP 510 — Operating Management System framework for controlling risk",
      issuer: "International Association of Oil & Gas Producers",
      scope: "GLOBAL",
      sourceUrl: "https://www.iogp.org/bookstore/product/operating-management-system-framework-for-controlling-risk-and-delivering-high-performance/",
      version: "2014",
      effectiveDate: "2014-06-01",
      applicability: "EPC contractors + operators — industry baseline for HSE management.",
    },
    {
      frameworkCode: "iogp-423-asset-integrity",
      frameworkName: "IOGP 423 — Asset Integrity Process Safety",
      issuer: "IOGP",
      scope: "GLOBAL",
      sourceUrl: "https://www.iogp.org/bookstore/product/asset-integrity-the-key-to-managing-major-incident-risks/",
      version: "2017",
      effectiveDate: "2017-11-01",
      applicability: "Operators + EPC contractors — asset integrity programmes for offshore + downstream.",
    },

    // ─── Pipelines ───────────────────────────────────────────────────
    {
      frameworkCode: "us-phmsa-49-cfr-192",
      frameworkName: "PHMSA 49 CFR Part 192 — Transportation of Natural and Other Gas by Pipeline",
      issuer: "Pipeline and Hazardous Materials Safety Administration",
      scope: "US",
      sourceUrl: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-D/part-192",
      version: "as amended 2024",
      effectiveDate: "1970-11-12",
      applicability: "Onshore + offshore gas-pipeline operators in US.",
    },
    {
      frameworkCode: "us-phmsa-49-cfr-195",
      frameworkName: "PHMSA 49 CFR Part 195 — Hazardous Liquid Pipeline Safety",
      issuer: "PHMSA",
      scope: "US",
      sourceUrl: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-D/part-195",
      version: "as amended 2024",
      effectiveDate: "1980-04-01",
      applicability: "Hazardous-liquid pipeline operators in US.",
    },

    // ─── Cyber (industrial) ─────────────────────────────────────────
    {
      frameworkCode: "iec-62443",
      frameworkName: "IEC 62443 — Industrial communication networks — IT security for industrial automation and control systems",
      issuer: "IEC / ISA",
      scope: "GLOBAL",
      sourceUrl: "https://www.iec.ch/dyn/www/f?p=103:38:::::FSP_ORG_ID,FSP_LANG_ID:1250,25",
      version: "Series 2018-2024",
      effectiveDate: "2018-09-01",
      applicability: "ICS / OT cybersecurity baseline for refineries + offshore + pipelines.",
    },
    {
      frameworkCode: "eu-nis2",
      frameworkName: "EU NIS2 Directive — high common level of cybersecurity (Directive (EU) 2022/2555)",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
      version: "Directive (EU) 2022/2555",
      effectiveDate: "2024-10-17",
      applicability: "Essential entities — energy operators (electricity, gas, oil) in all EU member states.",
    },

    // ─── Anti-corruption (extra-territorial) ────────────────────────
    {
      frameworkCode: "uk-bribery-act-2010-og",
      frameworkName: "UK Bribery Act 2010 (extra-territorial scope critical for O&G)",
      issuer: "UK Parliament",
      scope: "GB+",
      sourceUrl: "https://www.legislation.gov.uk/ukpga/2010/23/contents",
      version: "2010",
      effectiveDate: "2011-07-01",
      applicability: "Any commercial organisation with UK nexus — Foster Wheeler / Wood / Saipem etc.",
    },
    {
      frameworkCode: "us-fcpa-og",
      frameworkName: "US Foreign Corrupt Practices Act (FCPA) — applies to O&G operators",
      issuer: "US DOJ + SEC",
      scope: "US+",
      sourceUrl: "https://www.justice.gov/criminal-fraud/foreign-corrupt-practices-act",
      version: "1977 as amended",
      effectiveDate: "1977-12-19",
      applicability: "US-listed E&P companies + EPC contractors + subsidiaries.",
    },

    // ─── Sustainability disclosure ──────────────────────────────────
    {
      frameworkCode: "ifrs-s2-climate",
      frameworkName: "IFRS S2 Climate-related Disclosures",
      issuer: "International Sustainability Standards Board (ISSB)",
      scope: "GLOBAL",
      sourceUrl: "https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/ifrs-s2-climate-related-disclosures.html",
      version: "Effective 2024",
      effectiveDate: "2024-01-01",
      applicability: "Public-listed entities under jurisdictions adopting ISSB standards (UK, EU member states, Australia, etc.).",
    },

    // ─── Tanker terminals (interface with maritime pack) ────────────
    {
      frameworkCode: "marpol-annex-i-terminals",
      frameworkName: "MARPOL Annex I — Oil pollution prevention (tanker terminal interface)",
      issuer: "IMO",
      scope: "GLOBAL",
      sourceUrl: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx",
      version: "1973/78 as amended",
      effectiveDate: "1983-10-02",
      applicability: "Crude + product tanker loading/discharge — terminal operators bear interface obligations.",
    },

    // ─── Offshore environmental (OSPAR) ─────────────────────────────
    {
      frameworkCode: "ospar-convention",
      frameworkName: "OSPAR Convention — protection of marine environment of NE Atlantic",
      issuer: "OSPAR Commission",
      scope: "EU+",
      sourceUrl: "https://www.ospar.org/convention",
      version: "1992 as amended",
      effectiveDate: "1998-03-25",
      applicability: "Offshore O&G operations in NE Atlantic — Norway, UK, Ireland, France, Netherlands, etc.",
    },
  ],

  rulePacks: [
    {
      rulePackId: "regunav.rule-pack.process-safety.v1",
      rationale: "Process Safety Management — required by OSHA PSM / COMAH / Seveso III / NORSOK.",
      optional: false,
    },
    {
      rulePackId: "regunav.rule-pack.iso-14001.v1",
      rationale: "Environmental Management System — required by IED + ETS + OSPAR + customer audits.",
      optional: false,
    },
    {
      rulePackId: "regunav.rule-pack.iso-45001.v1",
      rationale: "Occupational Health and Safety Management — IOGP baseline + EPC contractor pre-qualification.",
      optional: false,
    },
    {
      rulePackId: "regunav.rule-pack.iso-50001.v1",
      rationale: "Energy Management — required by EU EED for large enterprises + refineries.",
      optional: true,
    },
    {
      rulePackId: "regunav.rule-pack.anti-bribery.v1",
      rationale: "UKBA + FCPA exposure on every overseas contract; OECD Anti-Bribery Convention.",
      optional: false,
    },
    {
      rulePackId: "regunav.rule-pack.iec-62443.v1",
      rationale: "OT cybersecurity baseline for ICS / SCADA / DCS in refineries + offshore.",
      optional: false,
    },
  ],

  profiles: [
    { profileId: "regunav.profile.core", optional: false },
    { profileId: "regunav.profile.evidence-audit", optional: false },
    { profileId: "regunav.profile.connector", optional: false },
    { profileId: "regunav.profile.conformance", optional: false },
  ],

  dictionaries: [
    { dictionaryId: "regunav.dictionary.evidence-type" },
    { dictionaryId: "regunav.dictionary.obligation-category" },
    { dictionaryId: "regunav.dictionary.actor-role" },
    { dictionaryId: "regunav.dictionary.control-category" },
    // O&G-specific dictionaries — to be authored in v0.2.
    { dictionaryId: "oil-and-gas.dictionary.hazop-node-type" },
    { dictionaryId: "oil-and-gas.dictionary.psm-element" },
    { dictionaryId: "oil-and-gas.dictionary.rbi-consequence-class" },
    { dictionaryId: "oil-and-gas.dictionary.major-accident-hazard-type" },
  ],

  engineBindings: [
    {
      enginePackage: "@regunav/engines/risk-register",
      rationale: "Major Accident Hazard register + HAZOP/LOPA findings tracking.",
    },
    {
      enginePackage: "@regunav/engines/audit-engine",
      rationale: "Internal + external PSM audits, IOGP supplier audits, COMAH / Seveso III competent authority reviews.",
    },
    {
      enginePackage: "@regunav/engines/evidence-engine",
      rationale: "Safety Case revisions, ETS verified emissions reports, CBAM declarations.",
    },
    {
      enginePackage: "@regunav/engines/workflow",
      rationale: "PHA / HAZOP / LOPA workflow, MOC (management of change), PTW (permit to work).",
    },
    {
      enginePackage: "@regunav/engines/regulatory-watch",
      rationale: "Track OSHA / EPA / HSE / OPRED / PSA / EU Commission / API publications.",
    },
  ],

  evidenceTemplates: [
    {
      templateId: "psm-pha-revalidation",
      name: "PSM Process Hazard Analysis revalidation",
      format: "pdf",
      cadence: "five-year",
      citation: "OSHA 29 CFR 1910.119(e)(6) — PHA revalidated at least every 5 years.",
    },
    {
      templateId: "comah-safety-report",
      name: "COMAH Safety Report (upper-tier)",
      format: "pdf",
      cadence: "five-year",
      citation: "COMAH 2015 Regulation 8 + Schedule 4 — submit to Competent Authority + review every 5 years.",
    },
    {
      templateId: "seveso-iii-major-accident-report",
      name: "Seveso III Major Accident Notification (eMARS)",
      format: "json",
      cadence: "on-event",
      citation: "Directive 2012/18/EU Article 16 — notify Commission via eMARS within 1 year.",
    },
    {
      templateId: "norsok-management-regulation-report",
      name: "Norwegian PSA Management Regulations annual report",
      format: "pdf",
      cadence: "annual",
      citation: "Norwegian PSA Management Regulations §11 — annual reporting to PSA.",
    },
    {
      templateId: "eu-ets-verified-emissions-report",
      name: "EU ETS Verified Emissions Report",
      format: "json",
      cadence: "annual",
      citation: "Directive 2003/87/EC Article 14 — verified by accredited verifier; submit by 31 March.",
    },
    {
      templateId: "eu-cbam-quarterly-report",
      name: "EU CBAM quarterly report (transitional period 2023-2025)",
      format: "json",
      cadence: "quarterly",
      citation: "Regulation (EU) 2023/956 + Implementing Regulation 2023/1773.",
    },
    {
      templateId: "api-510-inspection-record",
      name: "API 510 Pressure Vessel Inspection record",
      format: "xlsx",
      cadence: "on-event",
      citation: "API 510 Section 5.5 — inspection intervals + recordkeeping.",
    },
    {
      templateId: "api-580-rbi-assessment",
      name: "API 580 Risk-Based Inspection assessment",
      format: "xlsx",
      cadence: "annual",
      citation: "API 580 Section 8 — RBI assessments + driver-of-frequency updates.",
    },
    {
      templateId: "iogp-510-management-review",
      name: "IOGP 510 OMS Annual Management Review",
      format: "pdf",
      cadence: "annual",
      citation: "IOGP 510 Section 6 — management review effectiveness assessment.",
    },
    {
      templateId: "ied-best-available-techniques-assessment",
      name: "IED Best Available Techniques Reference (BREF) assessment",
      format: "pdf",
      cadence: "annual",
      citation: "Directive 2010/75/EU Article 14 + BREF Conclusion compliance demonstration.",
    },
  ],

  reportTemplates: [
    "oil-and-gas.report.major-accident-hazards-register",
    "oil-and-gas.report.psm-element-compliance-scorecard",
    "oil-and-gas.report.ets-emissions-balance",
    "oil-and-gas.report.cbam-declaration-package",
    "oil-and-gas.report.api-rbi-priority-list",
    "oil-and-gas.report.permit-to-work-statistics",
  ],

  copilotAgents: [
    "oil-and-gas-psm-auditor",
    "oil-and-gas-rbi-planner",
    "oil-and-gas-ets-reporter",
    "oil-and-gas-cbam-reporter",
    "oil-and-gas-management-of-change-reviewer",
  ],

  billingSkus: [
    "regunav.sku.oil-and-gas.per-asset.starter",
    "regunav.sku.oil-and-gas.per-asset.professional",
    "regunav.sku.oil-and-gas.enterprise",
  ],

  riskTier: "critical",
  publiclyListed: true,
};
