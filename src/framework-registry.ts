/**
 * Cross-pack Framework Registry — flattens all frameworks across all
 * sector packs into ONE canonical searchable / queryable / indexable
 * registry.
 *
 * This is the SSOT consumed by:
 *   - REST API endpoints (/v1/frameworks, /v1/frameworks/:code, /v1/frameworks/search)
 *   - Search indexer (Meilisearch / native search-port) — full-text searchable
 *   - Knowledge graph ingestor (adds each framework as a node with relations
 *     to its sector packs + issuer + jurisdiction)
 *   - Webhook event emitter (regulatory.framework.changed events when the
 *     regulatory-watch worker detects a regulator publication update)
 *   - Marketing surfaces (sitemap entries per framework, /frameworks/:code
 *     landing pages)
 *
 * Bound to:
 *   - Principle #24 (SSOT): one definition for every framework across
 *     all sector packs. Same framework cited by 2 packs (e.g. GDPR by
 *     legal + maritime) is ONE registry entry with multi-pack membership.
 *   - Principle #44 (8-Layer Spine): Frameworks live at Layer 4 (Manifest)
 *     wrapped in their containing Sector Pack.
 *   - Principle #41 (Zero Stubs): every entry references a real regulator
 *     URL (validated by SectorPackSchema upstream).
 */
import type { FrameworkCitation, SectorPack } from "./schema.js";

/** Flattened framework view — adds pack membership to the citation. */
export interface FrameworkRegistryEntry extends FrameworkCitation {
  /** Sector pack ids that include this framework. */
  readonly memberOfPacks: ReadonlyArray<string>;
  /** Canonical knowledge-graph node id (sha-style slug). */
  readonly nodeId: string;
  /** Search-index document id (Meilisearch-friendly). */
  readonly searchDocId: string;
}

/**
 * Build a cross-pack framework registry. Deterministic — same input
 * (set of packs) → same output ordering.
 */
export function buildFrameworkRegistry(
  packs: ReadonlyArray<SectorPack>,
): ReadonlyArray<FrameworkRegistryEntry> {
  const map = new Map<string, { fw: FrameworkCitation; packs: Set<string> }>();
  for (const pack of packs) {
    for (const fw of pack.frameworks) {
      const existing = map.get(fw.frameworkCode);
      if (existing) {
        // Same framework cited by another pack — merge pack membership.
        // First citation wins on version/date (assume packs are kept in
        // sync; SSOT-drift surfaced by the diff workflow elsewhere).
        existing.packs.add(pack.packId);
      } else {
        map.set(fw.frameworkCode, {
          fw,
          packs: new Set([pack.packId]),
        });
      }
    }
  }
  return Array.from(map.values())
    .sort((a, b) => a.fw.frameworkCode.localeCompare(b.fw.frameworkCode))
    .map(({ fw, packs }): FrameworkRegistryEntry => ({
      ...fw,
      memberOfPacks: Array.from(packs).sort(),
      nodeId: `framework:${fw.frameworkCode}`,
      searchDocId: `framework__${fw.frameworkCode.replace(/-/g, "_")}`,
    }));
}

/**
 * Search shape — what the API + Meilisearch consume.
 * Mirrors the FrameworkRegistryEntry but flattens metadata into
 * search-friendly fields (lower-case haystack, tags, etc.).
 */
export interface FrameworkSearchDoc {
  readonly id: string;
  readonly frameworkCode: string;
  readonly frameworkName: string;
  readonly issuer: string;
  readonly scope: string;
  readonly version: string;
  readonly sourceUrl: string;
  readonly effectiveDate: string;
  readonly applicability?: string;
  readonly memberOfPacks: ReadonlyArray<string>;
  readonly tags: ReadonlyArray<string>;
  readonly haystack: string;
}

export function toSearchDoc(entry: FrameworkRegistryEntry): FrameworkSearchDoc {
  const tags: string[] = [
    `pack:${entry.memberOfPacks.join(",")}`,
    `issuer:${entry.issuer.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`,
    `scope:${entry.scope.toLowerCase()}`,
  ];
  return {
    id: entry.searchDocId,
    frameworkCode: entry.frameworkCode,
    frameworkName: entry.frameworkName,
    issuer: entry.issuer,
    scope: entry.scope,
    version: entry.version,
    sourceUrl: entry.sourceUrl,
    effectiveDate: entry.effectiveDate,
    ...(entry.applicability !== undefined ? { applicability: entry.applicability } : {}),
    memberOfPacks: entry.memberOfPacks,
    tags,
    haystack: [
      entry.frameworkCode,
      entry.frameworkName,
      entry.issuer,
      entry.scope,
      entry.version,
      entry.applicability ?? "",
      entry.memberOfPacks.join(" "),
    ]
      .join(" ")
      .toLowerCase(),
  };
}

/**
 * Knowledge-graph node + edge emitter. Each framework becomes a node;
 * each (framework → pack) membership becomes an edge.
 *
 * Output shape matches the ReguNav `knowledge-engine` graph format
 * (`{ nodes: [...], edges: [...] }` in
 * `.claude/knowledge/graph.json`).
 */
export interface KnowledgeNode {
  readonly id: string;
  readonly kind: "framework" | "pack" | "issuer" | "jurisdiction";
  readonly label: string;
  readonly attrs: Readonly<Record<string, string | number | boolean>>;
}
export interface KnowledgeEdge {
  readonly from: string;
  readonly to: string;
  readonly kind: "member-of" | "issued-by" | "applies-in" | "supersedes" | "amends";
}

export interface KnowledgeGraphFragment {
  readonly nodes: ReadonlyArray<KnowledgeNode>;
  readonly edges: ReadonlyArray<KnowledgeEdge>;
}

export function buildKnowledgeGraph(
  registry: ReadonlyArray<FrameworkRegistryEntry>,
  packs: ReadonlyArray<SectorPack>,
): KnowledgeGraphFragment {
  const nodes: KnowledgeNode[] = [];
  const edges: KnowledgeEdge[] = [];
  const seenNodes = new Set<string>();

  const addNode = (n: KnowledgeNode): void => {
    if (seenNodes.has(n.id)) return;
    seenNodes.add(n.id);
    nodes.push(n);
  };

  for (const pack of packs) {
    addNode({
      id: `pack:${pack.packId}`,
      kind: "pack",
      label: pack.name,
      attrs: {
        version: pack.version,
        riskTier: pack.riskTier,
        frameworkCount: pack.frameworks.length,
        billingSkuCount: pack.billingSkus.length,
      },
    });
  }

  for (const f of registry) {
    addNode({
      id: f.nodeId,
      kind: "framework",
      label: f.frameworkName,
      attrs: {
        frameworkCode: f.frameworkCode,
        version: f.version,
        scope: f.scope,
        effectiveDate: f.effectiveDate,
        sourceUrl: f.sourceUrl,
      },
    });

    const issuerId = `issuer:${f.issuer.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}`;
    addNode({
      id: issuerId,
      kind: "issuer",
      label: f.issuer,
      attrs: {},
    });
    edges.push({ from: f.nodeId, to: issuerId, kind: "issued-by" });

    const jurisdictionId = `jurisdiction:${f.scope.toUpperCase()}`;
    addNode({
      id: jurisdictionId,
      kind: "jurisdiction",
      label: f.scope,
      attrs: {},
    });
    edges.push({ from: f.nodeId, to: jurisdictionId, kind: "applies-in" });

    for (const packId of f.memberOfPacks) {
      edges.push({
        from: f.nodeId,
        to: `pack:${packId}`,
        kind: "member-of",
      });
    }
  }
  return { nodes, edges };
}
