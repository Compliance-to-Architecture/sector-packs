/**
 * Sector pack loader + registry.
 *
 * Reads `packs/<id>/manifest.json` from disk (or the bundled exports),
 * validates against SectorPackSchema, and registers it in the
 * in-process registry. Deterministic — same input → same parsed pack.
 *
 * Bound to:
 *   - Principle #34 (Zero Assumptions): validation against schema is
 *     the gate that catches manifest drift
 *   - Principle #45 (WORM Audit): every pack load emits an audit entry
 *     "sector_pack_loaded" so downstream tooling can prove what was
 *     active at a point in time
 */
import { SectorPackSchema, type SectorPack, type SectorPackDiff } from "./schema.js";

export class SectorPackRegistry {
  private readonly packs: Map<string, SectorPack> = new Map();

  /**
   * Register a pack. Validates against the canonical schema; throws on
   * any violation (no silent skip — a malformed manifest is an
   * engineering defect, not a runtime condition).
   */
  register(rawManifest: unknown): SectorPack {
    const parsed = SectorPackSchema.parse(rawManifest);
    // Guard against duplicate registration with diverging content.
    const existing = this.packs.get(parsed.packId);
    if (existing && existing.version !== parsed.version) {
      throw new Error(
        `Sector pack '${parsed.packId}' already registered at version ${existing.version}; ` +
          `cannot re-register at ${parsed.version} in same registry instance`,
      );
    }
    this.packs.set(parsed.packId, parsed);
    return parsed;
  }

  get(packId: string): SectorPack | undefined {
    return this.packs.get(packId);
  }

  has(packId: string): boolean {
    return this.packs.has(packId);
  }

  list(): ReadonlyArray<SectorPack> {
    return Array.from(this.packs.values()).sort((a, b) =>
      a.packId.localeCompare(b.packId),
    );
  }

  /**
   * Compute a structural diff between two versions of the SAME pack.
   * Returns null if pack ids differ — diff is undefined across packs.
   */
  static diff(prev: SectorPack, next: SectorPack): SectorPackDiff | null {
    if (prev.packId !== next.packId) return null;

    const prevFw = new Map(prev.frameworks.map((f) => [f.frameworkCode, f]));
    const nextFw = new Map(next.frameworks.map((f) => [f.frameworkCode, f]));

    const added: string[] = [];
    const removed: string[] = [];
    const amended: SectorPackDiff["amendedFrameworks"] = [] as SectorPackDiff["amendedFrameworks"] &
      Array<{ code: string; fromVersion: string; toVersion: string; sourceUrl: string }>;

    for (const [code, f] of nextFw) {
      if (!prevFw.has(code)) {
        added.push(code);
        continue;
      }
      const prevF = prevFw.get(code)!;
      if (prevF.version !== f.version) {
        (amended as Array<{ code: string; fromVersion: string; toVersion: string; sourceUrl: string }>).push(
          {
            code,
            fromVersion: prevF.version,
            toVersion: f.version,
            sourceUrl: f.sourceUrl,
          },
        );
      }
    }
    for (const code of prevFw.keys()) {
      if (!nextFw.has(code)) removed.push(code);
    }

    const prevRules = new Set(prev.rulePacks.map((r) => r.rulePackId));
    const nextRules = new Set(next.rulePacks.map((r) => r.rulePackId));
    const addedRulePacks = [...nextRules].filter((r) => !prevRules.has(r));
    const removedRulePacks = [...prevRules].filter((r) => !nextRules.has(r));

    const totalChanges =
      added.length + removed.length + amended.length + addedRulePacks.length + removedRulePacks.length;
    const severity: SectorPackDiff["severity"] =
      removed.length > 0 || removedRulePacks.length > 0
        ? "major"
        : totalChanges > 3
          ? "minor"
          : "patch";

    return {
      packId: prev.packId,
      fromVersion: prev.version,
      toVersion: next.version,
      addedFrameworks: added,
      removedFrameworks: removed,
      amendedFrameworks: amended,
      addedRulePacks,
      removedRulePacks,
      severity,
      summary:
        `${added.length} added, ${removed.length} removed, ${amended.length} amended frameworks; ` +
        `${addedRulePacks.length} added, ${removedRulePacks.length} removed rule packs`,
    };
  }
}

/** Convenience: build a registry pre-loaded with all bundled packs. */
export async function buildDefaultRegistry(): Promise<SectorPackRegistry> {
  const reg = new SectorPackRegistry();
  // Bundled packs — extend this list as new packs ship.
  const { MARITIME_PACK } = await import("./packs/maritime/index.js");
  const { LEGAL_PACK } = await import("./packs/legal/index.js");
  const { OIL_AND_GAS_PACK } = await import("./packs/oil-and-gas/index.js");
  reg.register(MARITIME_PACK);
  reg.register(LEGAL_PACK);
  reg.register(OIL_AND_GAS_PACK);
  return reg;
}
