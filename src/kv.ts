import { getOrcaInfo } from "./api";

type CacheKeys = "orca_info_hot" | "orca_info_cold" | "orca_meta";

// @TODO cache meta
// @TODO TTL
// @TODO hot cache
// @TODO cold fall-back
class OrcaInfoCache {
  private readonly store: KVNamespace<CacheKeys>;
  private readonly CACHE_KEY_HOT: CacheKeys = "orca_info_hot";
  private readonly CACHE_KEY_COLD: CacheKeys = "orca_info_cold";
  private readonly CACHE_KEY_META: CacheKeys = "orca_meta";
  // private readonly EXPIRATION_HOT: number = 86400;
  private readonly EXPIRATION_HOT: number = 60;

  constructor() {
    this.store =
      ENVIRONMENT === "development" ? KV_TOKEN_LIST_DEV : KV_TOKEN_LIST_PROD;
  }

  async getInfo(): Promise<OrcaInfo | null> {
    const cacheInfo = await this.store.get(this.CACHE_KEY_HOT);

    // console.log("get info  from KV", cacheInfo);

    return cacheInfo ? JSON.parse(cacheInfo) : null;
  }

  private getCacheMeta(): KVNamespacePutOptions {
    return {
      metadata: { updatedAt: Date.now() },
      expirationTtl: this.EXPIRATION_HOT,
    };
  }

  private updateHotCache(resp: OrcaApiResponse): void {
    // console.log("update hot cache");
    this.store.put(
      this.CACHE_KEY_HOT,
      JSON.stringify(resp),
      this.getCacheMeta()
    );
  }

  async makeScheduledUpdate(): Promise<void> {
    const resp = await getOrcaInfo();

    // console.log("get new resp from orca", resp);

    if (resp) {
      this.updateHotCache(resp);
    }
  }
}

export default new OrcaInfoCache();
