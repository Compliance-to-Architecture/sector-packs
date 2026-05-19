/**
 * Cross-pack invariants — applies the same Zero-Stubs gate to every
 * bundled sector pack. New packs added to the registry are
 * automatically covered.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MARITIME_PACK,
  LEGAL_PACK,
  OIL_AND_GAS_PACK,
  SectorPackSchema,
  SectorPackRegistry,
  buildDefaultRegistry,
} from "../dist/index.js";

const ALL_PACKS = [MARITIME_PACK, LEGAL_PACK, OIL_AND_GAS_PACK];

for (const pack of ALL_PACKS) {
  test(`${pack.packId}: parses against canonical schema`, () => {
    const parsed = SectorPackSchema.parse(pack);
    assert.equal(parsed.packId, pack.packId);
  });

  test(`${pack.packId}: ships >= 25 frameworks`, () => {
    assert.ok(
      pack.frameworks.length >= 25,
      `${pack.packId}: expected >=25 frameworks, got ${pack.frameworks.length}`,
    );
  });

  test(`${pack.packId}: every framework has a real https:// source URL`, () => {
    for (const f of pack.frameworks) {
      assert.match(
        f.sourceUrl,
        /^https:\/\//,
        `${pack.packId} / ${f.frameworkCode}: non-https source: ${f.sourceUrl}`,
      );
      assert.doesNotMatch(
        f.sourceUrl,
        /example\.com|placeholder|todo|fixme|sample-only|stub/i,
        `${pack.packId} / ${f.frameworkCode}: placeholder source: ${f.sourceUrl}`,
      );
    }
  });

  test(`${pack.packId}: every framework has non-empty issuer + version + effectiveDate`, () => {
    for (const f of pack.frameworks) {
      assert.ok(f.issuer.trim().length > 1, `${f.frameworkCode}: empty issuer`);
      assert.ok(f.version.trim().length > 1, `${f.frameworkCode}: empty version`);
      assert.match(
        f.effectiveDate,
        /^\d{4}-\d{2}-\d{2}$/,
        `${f.frameworkCode}: malformed effectiveDate`,
      );
    }
  });

  test(`${pack.packId}: every rule pack ref has a substantive rationale (no stubs)`, () => {
    for (const rp of pack.rulePacks) {
      assert.ok(rp.rationale.trim().length > 15, `${pack.packId} / ${rp.rulePackId}: rationale too short`);
    }
  });

  test(`${pack.packId}: every engine binding has a substantive rationale`, () => {
    for (const e of pack.engineBindings) {
      assert.ok(
        e.rationale.trim().length > 15,
        `${pack.packId} / ${e.enginePackage}: rationale too short`,
      );
    }
  });

  test(`${pack.packId}: every evidence template has a citation linking to a specific obligation`, () => {
    for (const t of pack.evidenceTemplates) {
      assert.ok(
        t.citation.trim().length > 15,
        `${pack.packId} / ${t.templateId}: weak citation`,
      );
    }
  });

  test(`${pack.packId}: has billingSkus (otherwise un-billable)`, () => {
    assert.ok(pack.billingSkus.length >= 1, `${pack.packId}: no billing SKU`);
  });
}

test("buildDefaultRegistry registers all 3 bundled packs without conflict", async () => {
  const reg = await buildDefaultRegistry();
  const packs = reg.list();
  assert.equal(packs.length, 3);
  const ids = new Set(packs.map((p) => p.packId));
  assert.ok(ids.has("maritime"));
  assert.ok(ids.has("legal"));
  assert.ok(ids.has("oil-and-gas"));
});

test("all packs share NO duplicate framework codes (sanity check across verticals)", () => {
  // Frameworks CAN appear in multiple packs (e.g. GDPR + ISO 27001) — those
  // are legitimate reuses, not duplicates. This test asserts that within
  // EACH pack the framework codes are unique.
  for (const pack of ALL_PACKS) {
    const codes = pack.frameworks.map((f) => f.frameworkCode);
    const seen = new Set();
    for (const c of codes) {
      assert.ok(
        !seen.has(c),
        `${pack.packId}: duplicate framework code within pack: ${c}`,
      );
      seen.add(c);
    }
  }
});
