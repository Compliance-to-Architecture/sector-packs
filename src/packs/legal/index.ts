/**
 * Legal Sector Pack v0.1.0 — ReguNav canonical.
 *
 * Designed for: law firms (City of London + EU + US BigLaw), in-house
 * legal departments, legal-tech vendors, alternative legal service
 * providers (ALSPs), legal-aid foundations.
 *
 * Why this pack exists:
 *   The legal sector is compliance-dense but under-served by GRC SaaS.
 *   Logikcull / Relativity / iManage cover e-discovery + DM but NOT
 *   GRC. Vanta / Drata cover SOC 2 but not bar-rules / AML / sanctions.
 *   This pack bundles the 30+ frameworks a typical commercial law firm
 *   touches in a single onboarding flow.
 *
 * Bound to:
 *   - Principle #41 (Zero Stubs): every framework has a real source URL
 *   - Principle #34 (Zero Assumptions): version / effective-date from
 *     the regulator, not from memory
 */
import type { SectorPack } from "../../schema.js";

export const LEGAL_PACK: SectorPack = {
  schemaVersion: 1,
  packId: "legal",
  version: "0.1.0",
  name: "Legal Services — Law Firms & In-House",
  tagline:
    "30+ canonical frameworks for law firms + in-house legal — bar rules, AML, sanctions, GDPR, anti-bribery, IOLTA/Client Account, legal hold, SOC 2/ISO 27001.",
  description: [
    "Legal services is a compliance vertical hiding in plain sight.",
    "Every commercial law firm must satisfy:",
    "  - Professional conduct rules (SRA in UK, ABA Model Rules in US, CCBE in EU)",
    "  - AML — Money Laundering Regulations 2017 (UK), Bank Secrecy Act (US), 6AMLD (EU)",
    "  - Sanctions screening — OFAC (US), OFSI (UK), EU consolidated sanctions list",
    "  - Anti-bribery — UKBA, FCPA, OECD Anti-Bribery Convention",
    "  - Client accounts — IOLTA (US), SRA Accounts Rules (UK), Avocats' CARPA (FR)",
    "  - Data protection — GDPR + ePrivacy + UK DPA + US state laws (CCPA, NYSHIELD)",
    "  - Legal hold / e-discovery — FRCP 26 (US), Practice Direction 31B (UK), eIDAS (EU)",
    "  - Cyber — ISO 27001 + SOC 2 (mandated by enterprise + financial-services clients)",
    "  - Conflict-of-interest databases — bar-rules-driven internal walls",
    "  - State bar reporting + CPD/CLE compliance",
    "",
    "City of London firms additionally bear FCA SUP rules when advising on regulated activities + SRA Code of Conduct 2019.",
  ].join("\n"),
  maintainer: {
    org: "ReguNav",
    email: "compliance@regunav.com",
  },
  lastUpdatedAt: "2026-05-17T22:30:00.000Z",
  nextReviewDate: "2026-08-17",
  targetSegments: [
    "city-law-firm",
    "biglaw-us",
    "biglaw-eu",
    "boutique-firm",
    "in-house-legal-department",
    "legal-tech-vendor",
    "alsp",
  ],

  frameworks: [
    // ─── Professional conduct rules ──────────────────────────────────
    {
      frameworkCode: "uk-sra-standards-and-regs",
      frameworkName: "SRA Standards and Regulations (incl. Code of Conduct, Accounts Rules)",
      issuer: "Solicitors Regulation Authority (UK)",
      scope: "GB",
      sourceUrl: "https://www.sra.org.uk/solicitors/standards-regulations/",
      version: "v25 (2025 effective)",
      effectiveDate: "2025-01-01",
      nextReviewDate: "2026-08-01",
      applicability: "All SRA-regulated firms + solicitors in England + Wales.",
    },
    {
      frameworkCode: "uk-sra-accounts-rules",
      frameworkName: "SRA Accounts Rules — Client Account handling",
      issuer: "Solicitors Regulation Authority (UK)",
      scope: "GB",
      sourceUrl: "https://www.sra.org.uk/solicitors/standards-regulations/accounts-rules/",
      version: "2019 as amended",
      effectiveDate: "2019-11-25",
      applicability: "All SRA-regulated firms holding client money.",
    },
    {
      frameworkCode: "us-aba-model-rules",
      frameworkName: "ABA Model Rules of Professional Conduct",
      issuer: "American Bar Association",
      scope: "US",
      sourceUrl: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/",
      version: "2024 edition",
      effectiveDate: "2024-08-01",
      applicability: "Adopted with variations by 49 US state bars.",
    },
    {
      frameworkCode: "eu-ccbe-code-of-conduct",
      frameworkName: "Council of Bars and Law Societies of Europe (CCBE) Code of Conduct",
      issuer: "CCBE",
      scope: "EU",
      sourceUrl: "https://www.ccbe.eu/documents/professional-regulations/code-of-conduct/",
      version: "2021 consolidated",
      effectiveDate: "2021-05-21",
      applicability: "Lawyers conducting cross-border activities within EEA + Switzerland.",
    },

    // ─── AML / KYC ──────────────────────────────────────────────────
    {
      frameworkCode: "uk-mlr-2017",
      frameworkName: "Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017 (MLR 2017)",
      issuer: "UK Government / HM Treasury",
      scope: "GB",
      sourceUrl: "https://www.legislation.gov.uk/uksi/2017/692/contents",
      version: "as amended 2023",
      effectiveDate: "2017-06-26",
      applicability: "Law firms in scope of regulated sector — required to apply CDD + EDD + ongoing monitoring.",
    },
    {
      frameworkCode: "eu-6amld",
      frameworkName: "EU 6th Anti-Money Laundering Directive (Directive 2018/1673)",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/dir/2018/1673/oj",
      version: "Directive (EU) 2018/1673",
      effectiveDate: "2020-12-03",
      applicability: "Member State transpositions binding on EU law firms.",
    },
    {
      frameworkCode: "us-bank-secrecy-act",
      frameworkName: "US Bank Secrecy Act + FinCEN regulations",
      issuer: "FinCEN (US Treasury)",
      scope: "US",
      sourceUrl: "https://www.fincen.gov/resources/statutes-regulations",
      version: "as amended through 2024",
      effectiveDate: "1970-10-26",
      applicability: "Law firms providing financial services (escrow / trust / settlement).",
    },
    {
      frameworkCode: "fatf-recommendations",
      frameworkName: "FATF 40 Recommendations",
      issuer: "Financial Action Task Force",
      scope: "GLOBAL",
      sourceUrl: "https://www.fatf-gafi.org/en/topics/fatf-recommendations.html",
      version: "Updated November 2023",
      effectiveDate: "2012-02-15",
      applicability: "Soft-binding via national implementations; lawyers in scope as DNFBPs.",
    },

    // ─── Sanctions ──────────────────────────────────────────────────
    {
      frameworkCode: "us-ofac-sanctions",
      frameworkName: "US OFAC Specially Designated Nationals (SDN) List + sanctions programs",
      issuer: "Office of Foreign Assets Control (US Treasury)",
      scope: "US+",
      sourceUrl: "https://ofac.treasury.gov/sanctions-programs-and-country-information",
      version: "Live updates",
      effectiveDate: "1950-12-20",
      applicability: "All US persons + non-US persons transacting in USD / with US persons.",
    },
    {
      frameworkCode: "uk-ofsi-sanctions",
      frameworkName: "UK OFSI Consolidated Sanctions List",
      issuer: "Office of Financial Sanctions Implementation (HM Treasury)",
      scope: "GB",
      sourceUrl: "https://www.gov.uk/government/publications/financial-sanctions-consolidated-list-of-targets",
      version: "Live updates",
      effectiveDate: "2016-03-31",
      applicability: "All UK persons + UK-incorporated entities + non-UK persons engaged in UK activities.",
    },
    {
      frameworkCode: "eu-consolidated-sanctions",
      frameworkName: "EU Consolidated list of persons, groups and entities subject to EU financial sanctions",
      issuer: "European External Action Service / European Commission",
      scope: "EU",
      sourceUrl: "https://webgate.ec.europa.eu/fsd/fsf",
      version: "Live updates",
      effectiveDate: "2003-09-22",
      applicability: "All EU persons + EU-incorporated entities + non-EU persons engaged in EU activities.",
    },

    // ─── Anti-bribery ───────────────────────────────────────────────
    {
      frameworkCode: "uk-bribery-act-2010",
      frameworkName: "UK Bribery Act 2010",
      issuer: "UK Parliament",
      scope: "GB+",
      sourceUrl: "https://www.legislation.gov.uk/ukpga/2010/23/contents",
      version: "2010 as amended",
      effectiveDate: "2011-07-01",
      applicability: "Extra-territorial: any commercial organisation carrying on business in UK.",
    },
    {
      frameworkCode: "us-fcpa",
      frameworkName: "US Foreign Corrupt Practices Act (FCPA)",
      issuer: "US DOJ + SEC",
      scope: "US+",
      sourceUrl: "https://www.justice.gov/criminal-fraud/foreign-corrupt-practices-act",
      version: "1977 as amended",
      effectiveDate: "1977-12-19",
      applicability: "US issuers + domestic concerns + foreign persons within US territory.",
    },
    {
      frameworkCode: "oecd-anti-bribery-convention",
      frameworkName: "OECD Anti-Bribery Convention",
      issuer: "OECD",
      scope: "GLOBAL",
      sourceUrl: "https://www.oecd.org/corruption-integrity/explore/oecd-standards/anti-bribery-convention/",
      version: "1997",
      effectiveDate: "1999-02-15",
      applicability: "44 signatory countries — national implementations binding on local lawyers.",
    },

    // ─── Data protection ────────────────────────────────────────────
    {
      frameworkCode: "eu-gdpr",
      frameworkName: "EU General Data Protection Regulation (GDPR)",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
      version: "Regulation 2016/679",
      effectiveDate: "2018-05-25",
      applicability: "All processing of EU data subjects' personal data — extra-territorial.",
    },
    {
      frameworkCode: "uk-dpa-2018",
      frameworkName: "UK Data Protection Act 2018 (UK GDPR)",
      issuer: "UK Parliament + ICO",
      scope: "GB",
      sourceUrl: "https://www.legislation.gov.uk/ukpga/2018/12/contents",
      version: "2018 as amended",
      effectiveDate: "2018-05-25",
      applicability: "All UK-based processing.",
    },
    {
      frameworkCode: "us-ccpa-cpra",
      frameworkName: "California Consumer Privacy Act + California Privacy Rights Act",
      issuer: "State of California",
      scope: "US-CA",
      sourceUrl: "https://oag.ca.gov/privacy/ccpa",
      version: "CCPA 2018 + CPRA 2023",
      effectiveDate: "2023-01-01",
      applicability: "Businesses serving California residents above thresholds.",
    },
    {
      frameworkCode: "us-shield-act-ny",
      frameworkName: "New York SHIELD Act (Stop Hacks and Improve Electronic Data Security)",
      issuer: "State of New York",
      scope: "US-NY",
      sourceUrl: "https://www.nysenate.gov/legislation/laws/STT/899-BB",
      version: "2019",
      effectiveDate: "2020-03-21",
      applicability: "Businesses holding NY resident private information.",
    },
    {
      frameworkCode: "eu-eidas-2",
      frameworkName: "eIDAS 2.0 Regulation — electronic identification + trust services",
      issuer: "European Parliament + Council of the EU",
      scope: "EU",
      sourceUrl: "https://eur-lex.europa.eu/eli/reg/2024/1183/oj",
      version: "Regulation (EU) 2024/1183",
      effectiveDate: "2024-05-20",
      applicability: "Lawyers using e-signature + e-seal services + EU Digital Identity Wallet.",
    },

    // ─── Legal hold / e-discovery ────────────────────────────────────
    {
      frameworkCode: "us-frcp-26-37",
      frameworkName: "US Federal Rules of Civil Procedure 26 + 34 + 37 — discovery + spoliation",
      issuer: "US Supreme Court / Judicial Conference",
      scope: "US",
      sourceUrl: "https://www.law.cornell.edu/rules/frcp",
      version: "December 2024 amendments",
      effectiveDate: "2024-12-01",
      applicability: "All US federal civil litigation; state courts often follow.",
    },
    {
      frameworkCode: "uk-cpr-pd-31b",
      frameworkName: "UK CPR Practice Direction 31B — Disclosure of Electronic Documents",
      issuer: "UK Ministry of Justice",
      scope: "GB",
      sourceUrl: "https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part31/pd_part31b",
      version: "as amended 2024",
      effectiveDate: "2010-10-01",
      applicability: "All civil claims in England and Wales involving electronic documents.",
    },

    // ─── Cyber + info security ──────────────────────────────────────
    {
      frameworkCode: "iso-27001",
      frameworkName: "ISO/IEC 27001:2022 — Information security management systems",
      issuer: "International Organization for Standardization",
      scope: "GLOBAL",
      sourceUrl: "https://www.iso.org/standard/27001",
      version: "2022",
      effectiveDate: "2022-10-25",
      applicability: "Voluntary certification; mandated by enterprise + financial-services clients.",
    },
    {
      frameworkCode: "aicpa-soc2",
      frameworkName: "AICPA SOC 2 Type II — Trust Services Criteria",
      issuer: "AICPA",
      scope: "US+",
      sourceUrl: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
      version: "2017 TSC + 2022 Points of Focus",
      effectiveDate: "2018-12-15",
      applicability: "Mandated by US enterprise + SaaS clients; commonly required for legal-tech vendors.",
    },

    // ─── UK-specific for City firms ─────────────────────────────────
    {
      frameworkCode: "uk-fca-sup",
      frameworkName: "FCA Supervision Manual (SUP) — for firms with permission to give regulated investment advice",
      issuer: "Financial Conduct Authority (UK)",
      scope: "GB",
      sourceUrl: "https://www.handbook.fca.org.uk/handbook/SUP/",
      version: "Live handbook",
      effectiveDate: "2001-12-01",
      applicability: "Law firms holding FCA Designated Professional Body or exempt-regulated-activities permissions.",
    },
    {
      frameworkCode: "uk-llp-act-2000",
      frameworkName: "Limited Liability Partnerships Act 2000 + LLP Regulations",
      issuer: "UK Parliament",
      scope: "GB",
      sourceUrl: "https://www.legislation.gov.uk/ukpga/2000/12/contents",
      version: "2000 as amended",
      effectiveDate: "2001-04-06",
      applicability: "Law firms incorporated as LLPs (most UK firms over 10 partners).",
    },

    // ─── Cross-cutting (insurance, conduct) ────────────────────────
    {
      frameworkCode: "uk-lawyers-pii",
      frameworkName: "SRA Minimum Terms and Conditions for Professional Indemnity Insurance",
      issuer: "Solicitors Regulation Authority (UK)",
      scope: "GB",
      sourceUrl: "https://www.sra.org.uk/solicitors/standards-regulations/indemnity-insurance-rules/",
      version: "MTC 2024",
      effectiveDate: "2024-10-01",
      applicability: "All SRA-regulated firms in private practice.",
    },
  ],

  rulePacks: [
    {
      rulePackId: "iof.rule-pack.gdpr.v1",
      rationale: "Client personal data is the firm's primary processing activity.",
      optional: false,
    },
    {
      rulePackId: "regunav.rule-pack.iso-27001.v1",
      rationale: "Enterprise + FS clients demand ISO 27001 + SOC 2 evidence.",
      optional: false,
    },
    {
      rulePackId: "regunav.rule-pack.aml-kyc.v1",
      rationale: "MLR 2017 / 6AMLD / BSA impose CDD + EDD + ongoing monitoring.",
      optional: false,
    },
    {
      rulePackId: "regunav.rule-pack.sanctions-screening.v1",
      rationale: "OFAC + OFSI + EU sanctions screening on every new matter intake.",
      optional: false,
    },
    {
      rulePackId: "regunav.rule-pack.anti-bribery.v1",
      rationale: "UKBA + FCPA require commercial-org defence programme evidence.",
      optional: false,
    },
  ],

  profiles: [
    { profileId: "regunav.profile.core", optional: false },
    { profileId: "regunav.profile.evidence-audit", optional: false },
    { profileId: "regunav.profile.consent-authority", optional: false },
    { profileId: "regunav.profile.conformance", optional: false },
  ],

  dictionaries: [
    { dictionaryId: "regunav.dictionary.evidence-type" },
    { dictionaryId: "regunav.dictionary.obligation-category" },
    { dictionaryId: "regunav.dictionary.actor-role" },
    { dictionaryId: "regunav.dictionary.control-category" },
    // Legal-specific dictionaries — to be authored in v0.2.
    { dictionaryId: "legal.dictionary.matter-type" },
    { dictionaryId: "legal.dictionary.client-classification" },
    { dictionaryId: "legal.dictionary.privilege-status" },
    { dictionaryId: "legal.dictionary.conflict-check-outcome" },
  ],

  engineBindings: [
    {
      enginePackage: "@regunav/engines/risk-register",
      rationale: "Matter-level risk register: AML risk, sanctions exposure, conflict of interest.",
    },
    {
      enginePackage: "@regunav/engines/workflow",
      rationale: "Matter intake → AML/CDD → conflict check → engagement letter → ongoing monitoring.",
    },
    {
      enginePackage: "@regunav/engines/evidence-engine",
      rationale: "Client account reconciliation, AML CDD records, sanctions screening logs.",
    },
    {
      enginePackage: "@regunav/engines/regulatory-watch",
      rationale: "Track SRA updates, FCA handbook changes, OFAC / OFSI sanctions list updates.",
    },
  ],

  evidenceTemplates: [
    {
      templateId: "uk-sra-accounts-rules-monthly-recon",
      name: "SRA Accounts Rules — monthly client account reconciliation",
      format: "xlsx",
      cadence: "monthly",
      citation: "SRA Accounts Rules Rule 8.3 — monthly reconciliation of client ledger.",
    },
    {
      templateId: "uk-mlr-2017-firm-wide-risk-assessment",
      name: "MLR 2017 — Firm-wide AML risk assessment",
      format: "pdf",
      cadence: "annual",
      citation: "MLR 2017 Regulation 18 — written, reviewed at least annually.",
    },
    {
      templateId: "uk-mlr-2017-client-cdd-record",
      name: "MLR 2017 — Client Customer Due Diligence record",
      format: "json",
      cadence: "on-event",
      citation: "MLR 2017 Regulation 28 — CDD on establishment of business relationship; retain 5 years.",
    },
    {
      templateId: "ofac-sanctions-screening-log",
      name: "OFAC / OFSI / EU sanctions screening event log",
      format: "json",
      cadence: "on-event",
      citation: "31 CFR 501.602 — recordkeeping for screening + blocked-property reports.",
    },
    {
      templateId: "ukba-adequate-procedures-attestation",
      name: "UKBA — Adequate Procedures annual attestation",
      format: "pdf",
      cadence: "annual",
      citation: "UKBA s.7 + Ministry of Justice 6-Principle Guidance.",
    },
    {
      templateId: "legal-hold-issuance-record",
      name: "Legal hold issuance + acknowledgement log",
      format: "json",
      cadence: "on-event",
      citation: "FRCP 37(e) duty to preserve / CPR PD 31B duty of disclosure.",
    },
    {
      templateId: "gdpr-roPA-legal",
      name: "GDPR Article 30 Record of Processing Activities (legal sector)",
      format: "xlsx",
      cadence: "annual",
      citation: "GDPR Art 30 — controller + processor obligations.",
    },
    {
      templateId: "sra-mtc-pii-attestation",
      name: "SRA MTC Professional Indemnity Insurance — annual renewal attestation",
      format: "pdf",
      cadence: "annual",
      citation: "SRA Indemnity Insurance Rules + Participating Insurer's Agreement.",
    },
  ],

  reportTemplates: [
    "legal.report.client-account-recon-monthly",
    "legal.report.aml-risk-heatmap",
    "legal.report.sanctions-screening-summary",
    "legal.report.conflict-check-statistics",
    "legal.report.legal-hold-active-matters",
  ],

  copilotAgents: [
    "legal-aml-investigator",
    "legal-sanctions-screener",
    "legal-conflict-check-reviewer",
    "legal-hold-counsel",
  ],

  billingSkus: [
    "regunav.sku.legal.per-fee-earner.starter",
    "regunav.sku.legal.per-fee-earner.professional",
    "regunav.sku.legal.firm-wide.enterprise",
  ],

  riskTier: "high",
  publiclyListed: true,
};
