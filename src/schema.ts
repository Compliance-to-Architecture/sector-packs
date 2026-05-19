/**
 * Canonical Sector Pack schema.
 *
 * A Sector Pack is the bundled assembly that maps a vertical industry
 * (maritime, hospitals, banking, ...) onto the 8-Layer Spine:
 *
 *   - Layer 1 Profile         → which conformance profiles apply
 *   - Layer 2 Rule Pack       → which rule packs are enabled by default
 *   - Layer 3 Dictionary      → vertical vocabulary (IMO terms, DICOM tags, ...)
 *   - Layer 4 Manifest        → SKU / billable unit
 *   - Layer 6 Engine bindings → which engines must be wired
 *
 * One pack = one installable / billable / certifiable / verifiable unit
 * per vertical. Customer onboarding becomes "load the Maritime pack"
 * instead of "pick from 21 frameworks and 200 rule packs".
 *
 * Bound to:
 *   - Principle #44 (8-Layer Spine): SectorPack is a manifest envelope
 *     wrapping a curated bundle of Layer 1+2+3 entries
 *   - Principle #34 (Zero Assumptions): every framework / control / rule
 *     citation is verifiable against the regulator's source-of-truth
 *   - Principle #41 (Zero Stubs): every framework entry MUST have a real
 *     regulator-published source URL — no fake citations
 */
import { z } from "zod";

// ─── Framework citation ──────────────────────────────────────────────────
export const FrameworkCitationSchema = z.object({
  /** Canonical framework code (e.g. "imo-solas", "eu-gdpr"). Lower-case slug. */
  frameworkCode: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  /** Human-readable framework name. */
  frameworkName: z.string().min(1),
  /** Issuing body (e.g. "IMO", "European Commission", "Lloyd's Register"). */
  issuer: z.string().min(1),
  /** Geographic / jurisdictional scope: ISO 3166-1 alpha-2, "EU", "GLOBAL", etc. */
  scope: z.string().min(2),
  /** Authoritative source URL (regulator's official publication). */
  sourceUrl: z.string().url(),
  /** Framework version / edition (e.g. "2024", "Consolidated 2020"). */
  version: z.string().min(1),
  /** Effective date (ISO 8601). */
  effectiveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Optional: next review date (compliance team must re-check by this date). */
  nextReviewDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  /** Applicability hint: which sub-sector / vessel-type / institution-class. */
  applicability: z.string().optional(),
});
export type FrameworkCitation = z.infer<typeof FrameworkCitationSchema>;

// ─── Rule pack reference ─────────────────────────────────────────────────
export const RulePackRefSchema = z.object({
  /** Canonical rule-pack id from @regunav/rules-engine-core. */
  rulePackId: z.string().min(1),
  /** Why this rule pack is in the sector default set. */
  rationale: z.string().min(1),
  /** Whether the customer can disable this rule pack on opt-out. */
  optional: z.boolean().default(false),
});
export type RulePackRef = z.infer<typeof RulePackRefSchema>;

// ─── Profile reference ───────────────────────────────────────────────────
export const ProfileRefSchema = z.object({
  /** Canonical profile id (e.g. "iof.profile.core", "obf.profile.account-info"). */
  profileId: z.string().min(1),
  /** Whether the customer can disable this profile on opt-out. */
  optional: z.boolean().default(false),
});
export type ProfileRef = z.infer<typeof ProfileRefSchema>;

// ─── Dictionary reference ────────────────────────────────────────────────
export const DictionaryRefSchema = z.object({
  /** Canonical dictionary id from @regunav/dictionaries-core. */
  dictionaryId: z.string().min(1),
});
export type DictionaryRef = z.infer<typeof DictionaryRefSchema>;

// ─── Engine binding ──────────────────────────────────────────────────────
export const EngineBindingSchema = z.object({
  /** Canonical engine package name (e.g. "@regunav/risk-register"). */
  enginePackage: z.string().min(1),
  /** Why this engine is required for the sector. */
  rationale: z.string().min(1),
});
export type EngineBinding = z.infer<typeof EngineBindingSchema>;

// ─── Evidence template reference ─────────────────────────────────────────
export const EvidenceTemplateSchema = z.object({
  /** Template id (e.g. "imo-ism-annual-review-template-v1"). */
  templateId: z.string().min(1),
  /** Human-readable name. */
  name: z.string().min(1),
  /** Output format. */
  format: z.enum(["pdf", "xlsx", "docx", "md", "json"]),
  /** Cadence: when this evidence is due. */
  cadence: z.enum([
    "one-time",
    "on-event",
    "monthly",
    "quarterly",
    "semi-annual",
    "annual",
    "biennial",
    "five-year",
  ]),
  /** Citation linking this evidence to a specific obligation. */
  citation: z.string().min(1),
});
export type EvidenceTemplate = z.infer<typeof EvidenceTemplateSchema>;

// ─── Sector pack manifest envelope ───────────────────────────────────────
export const SectorPackSchema = z.object({
  /** Spec version of THIS schema (for forward-compat). */
  schemaVersion: z.literal(1),
  /** Canonical pack id (slug). E.g. "maritime", "hospitals", "banking". */
  packId: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  /** Pack version (semver). */
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  /** Human-readable pack name. */
  name: z.string().min(1),
  /** One-line tagline (used in customer onboarding UI). */
  tagline: z.string().min(1).max(200),
  /** Multi-paragraph description (markdown allowed). */
  description: z.string().min(1),
  /** Maintainer info (Regunav team or operator-supplied). */
  maintainer: z.object({
    org: z.string().min(1),
    email: z.string().email(),
  }),
  /** ISO 8601 timestamp of last canonical update. */
  lastUpdatedAt: z.string().datetime(),
  /** Next mandatory review date — once past, customer dashboard flags it. */
  nextReviewDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Target audience / ICP (sub-sector segments). */
  targetSegments: z.array(z.string().min(1)).min(1),
  /** Frameworks bundled in this pack (the regulatory landscape). */
  frameworks: z.array(FrameworkCitationSchema).min(1),
  /** Rule packs that activate by default. */
  rulePacks: z.array(RulePackRefSchema),
  /** Profiles enabled by default. */
  profiles: z.array(ProfileRefSchema),
  /** Vocabularies needed by the engines + UI. */
  dictionaries: z.array(DictionaryRefSchema),
  /** Engines that the pack requires to be wired. */
  engineBindings: z.array(EngineBindingSchema),
  /** Evidence templates pre-loaded for this sector. */
  evidenceTemplates: z.array(EvidenceTemplateSchema),
  /** Sector-specific dashboards / report templates (canonical ids). */
  reportTemplates: z.array(z.string().min(1)).default([]),
  /** Sector-specific agents (`.claude/agents/*` ids). */
  copilotAgents: z.array(z.string().min(1)).default([]),
  /** Billing SKU(s) this pack maps to. */
  billingSkus: z.array(z.string().min(1)).min(1),
  /** Risk tier of the sector (used to flag onboarding velocity). */
  riskTier: z.enum(["low", "medium", "high", "critical"]),
  /** Marketing surface flag — is this pack publicly listed? */
  publiclyListed: z.boolean().default(true),
});
export type SectorPack = z.infer<typeof SectorPackSchema>;

/**
 * Sector-pack diff result — used by the regulatory-watch worker to
 * surface "your maritime pack has 3 framework updates pending review".
 */
export interface SectorPackDiff {
  readonly packId: string;
  readonly fromVersion: string;
  readonly toVersion: string;
  readonly addedFrameworks: ReadonlyArray<string>;
  readonly removedFrameworks: ReadonlyArray<string>;
  readonly amendedFrameworks: ReadonlyArray<{
    code: string;
    fromVersion: string;
    toVersion: string;
    sourceUrl: string;
  }>;
  readonly addedRulePacks: ReadonlyArray<string>;
  readonly removedRulePacks: ReadonlyArray<string>;
  readonly severity: "patch" | "minor" | "major";
  readonly summary: string;
}
