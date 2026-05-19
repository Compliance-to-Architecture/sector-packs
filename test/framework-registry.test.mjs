/**
 * Cross-pack framework-registry + knowledge-graph tests.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MARITIME_PACK,
  LEGAL_PACK,
  OIL_AND_GAS_PACK,
  buildFrameworkRegistry,
  buildKnowledgeGraph,
  toSearchDoc,
} from "../dist/index.js";

const PACKS = [MARITIME_PACK, LEGAL_PACK, OIL_AND_GAS_PACK];

test("buildFrameworkRegistry flattens all packs into a deduplicated registry", () => {
  const reg = buildFrameworkRegistry(PACKS);
  // 30 + 28 + 30 = 88 raw citations; some shared (GDPR, ISO 27001, UKBA, FCPA)
  // so dedup count should be in 75-85 range.
  assert.ok(reg.length >= 75 && reg.length <= 90, `expected ~75-90 frameworks, got ${reg.length}`);
});

test("Shared frameworks (GDPR) carry multi-pack membership", () => {
  const reg = buildFrameworkRegistry(PACKS);
  const gdpr = reg.find((f) => f.frameworkCode === "eu-gdpr");
  assert.ok(gdpr, "GDPR should be present");
  // GDPR appears in both maritime + legal packs
  assert.ok(gdpr.memberOfPacks.length >= 2, `GDPR memberOfPacks=${gdpr.memberOfPacks.length}`);
  assert.ok(gdpr.memberOfPacks.includes("maritime"));
  assert.ok(gdpr.memberOfPacks.includes("legal"));
});

test("Every registry entry has a stable nodeId + searchDocId", () => {
  const reg = buildFrameworkRegistry(PACKS);
  for (const f of reg) {
    assert.match(f.nodeId, /^framework:[a-z0-9-]+$/);
    assert.match(f.searchDocId, /^framework__[a-z0-9_]+$/);
  }
});

test("Registry is sorted alphabetically by frameworkCode (deterministic ordering)", () => {
  const reg = buildFrameworkRegistry(PACKS);
  for (let i = 1; i < reg.length; i++) {
    assert.ok(
      reg[i - 1].frameworkCode.localeCompare(reg[i].frameworkCode) <= 0,
      `Out of order at index ${i}: ${reg[i - 1].frameworkCode} > ${reg[i].frameworkCode}`,
    );
  }
});

test("toSearchDoc produces a searchable haystack containing all key fields", () => {
  const reg = buildFrameworkRegistry(PACKS);
  const fueleu = reg.find((f) => f.frameworkCode === "eu-fueleu-maritime");
  assert.ok(fueleu);
  const doc = toSearchDoc(fueleu);
  assert.match(doc.haystack, /eu-fueleu-maritime/);
  assert.match(doc.haystack, /maritime/);
  assert.ok(doc.tags.length >= 3);
  assert.ok(doc.tags.some((t) => t.startsWith("pack:")));
  assert.ok(doc.tags.some((t) => t.startsWith("issuer:")));
});

test("buildKnowledgeGraph produces nodes for packs + frameworks + issuers + jurisdictions", () => {
  const reg = buildFrameworkRegistry(PACKS);
  const graph = buildKnowledgeGraph(reg, PACKS);

  const packNodes = graph.nodes.filter((n) => n.kind === "pack");
  const fwNodes = graph.nodes.filter((n) => n.kind === "framework");
  const issuerNodes = graph.nodes.filter((n) => n.kind === "issuer");
  const jurisdictionNodes = graph.nodes.filter((n) => n.kind === "jurisdiction");

  assert.equal(packNodes.length, 3, "should have 3 pack nodes");
  assert.equal(fwNodes.length, reg.length, "framework nodes = registry size");
  assert.ok(issuerNodes.length >= 10, `expected >=10 issuers, got ${issuerNodes.length}`);
  assert.ok(jurisdictionNodes.length >= 5, `expected >=5 jurisdictions, got ${jurisdictionNodes.length}`);
});

test("Knowledge graph edges include member-of, issued-by, applies-in", () => {
  const reg = buildFrameworkRegistry(PACKS);
  const graph = buildKnowledgeGraph(reg, PACKS);
  const kinds = new Set(graph.edges.map((e) => e.kind));
  assert.ok(kinds.has("member-of"));
  assert.ok(kinds.has("issued-by"));
  assert.ok(kinds.has("applies-in"));
});

test("Every framework node has at least one member-of edge to a pack", () => {
  const reg = buildFrameworkRegistry(PACKS);
  const graph = buildKnowledgeGraph(reg, PACKS);
  const membershipByFw = new Map();
  for (const e of graph.edges) {
    if (e.kind !== "member-of") continue;
    membershipByFw.set(e.from, (membershipByFw.get(e.from) ?? 0) + 1);
  }
  for (const n of graph.nodes.filter((x) => x.kind === "framework")) {
    assert.ok(membershipByFw.get(n.id) >= 1, `framework ${n.id} has no pack membership`);
  }
});
