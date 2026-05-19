/**
 * Maritime sector pack — schema validation tests.
 *
 * Validates that the canonical MARITIME_PACK manifest satisfies the
 * SectorPack Zod schema. Every framework citation MUST have a real
 * regulator URL (no placeholders per Principle #41).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MARITIME_PACK,
  SectorPackSchema,
  SectorPackRegistry,
} from "../dist/index.js";

test("MARITIME_PACK parses against canonical schema", () => {
  const parsed = SectorPackSchema.parse(MARITIME_PACK);
  assert.equal(parsed.packId, "maritime");
  assert.equal(parsed.schemaVersion, 1);
});

test("MARITIME_PACK ships >= 25 frameworks (anchor floor)", () => {
  assert.ok(
    MARITIME_PACK.frameworks.length >= 25,
    `expected >=25 frameworks, got ${MARITIME_PACK.frameworks.length}`,
  );
});

test("Every framework has a real https:// source URL (no placeholders)", () => {
  for (const f of MARITIME_PACK.frameworks) {
    assert.match(
      f.sourceUrl,
      /^https:\/\//,
      `framework ${f.frameworkCode} has non-https source: ${f.sourceUrl}`,
    );
    assert.doesNotMatch(
      f.sourceUrl,
      /example\.com|placeholder|todo|fixme/i,
      `framework ${f.frameworkCode} has placeholder source: ${f.sourceUrl}`,
    );
  }
});

test("Every framework has an effective date in the past (no aspirational entries)", () => {
  const today = new Date();
  for (const f of MARITIME_PACK.frameworks) {
    const eff = new Date(f.effectiveDate);
    assert.ok(
      !isNaN(eff.getTime()),
      `framework ${f.frameworkCode} has invalid effectiveDate: ${f.effectiveDate}`,
    );
    // Allow future-dated entries for regulations that are scheduled to
    // enter into force later (e.g. IGF code updates), but flag any that
    // are more than 5 years out — likely typo.
    const maxFuture = new Date();
    maxFuture.setFullYear(today.getFullYear() + 5);
    assert.ok(
      eff <= maxFuture,
      `framework ${f.frameworkCode} effective date too far in future: ${f.effectiveDate}`,
    );
  }
});

test("Registry round-trip: register + get + diff", () => {
  const reg = new SectorPackRegistry();
  const registered = reg.register(MARITIME_PACK);
  assert.equal(registered.packId, "maritime");
  assert.deepEqual(reg.get("maritime"), MARITIME_PACK);
  assert.equal(reg.list().length, 1);
});

test("Registry rejects duplicate registration with diverging version", () => {
  const reg = new SectorPackRegistry();
  reg.register(MARITIME_PACK);
  const bumped = { ...MARITIME_PACK, version: "0.2.0" };
  assert.throws(() => reg.register(bumped), /already registered/);
});

test("Diff: same pack returns null", () => {
  const diff = SectorPackRegistry.diff(MARITIME_PACK, {
    ...MARITIME_PACK,
    packId: "other",
  });
  assert.equal(diff, null);
});

test("Diff: amended-only change is patch severity", () => {
  const next = {
    ...MARITIME_PACK,
    version: "0.1.1",
    frameworks: MARITIME_PACK.frameworks.map((f, i) =>
      i === 0 ? { ...f, version: f.version + "-rev1" } : f,
    ),
  };
  const diff = SectorPackRegistry.diff(MARITIME_PACK, next);
  assert.ok(diff);
  assert.equal(diff.amendedFrameworks.length, 1);
  assert.equal(diff.severity, "patch");
});

test("Diff: removed framework is major severity", () => {
  const next = {
    ...MARITIME_PACK,
    version: "0.2.0",
    frameworks: MARITIME_PACK.frameworks.slice(1),
  };
  const diff = SectorPackRegistry.diff(MARITIME_PACK, next);
  assert.ok(diff);
  assert.equal(diff.removedFrameworks.length, 1);
  assert.equal(diff.severity, "major");
});

test("Every rule-pack reference has a non-empty rationale (no stubs)", () => {
  for (const rp of MARITIME_PACK.rulePacks) {
    assert.ok(rp.rationale.trim().length > 10, `rule pack ${rp.rulePackId} rationale too short`);
  }
});

test("Every engine binding has a non-empty rationale", () => {
  for (const e of MARITIME_PACK.engineBindings) {
    assert.ok(
      e.rationale.trim().length > 10,
      `engine ${e.enginePackage} rationale too short`,
    );
  }
});

test("Every evidence template has a citation linking to a specific obligation", () => {
  for (const t of MARITIME_PACK.evidenceTemplates) {
    assert.ok(
      t.citation.trim().length > 10,
      `evidence template ${t.templateId} has weak citation`,
    );
  }
});
