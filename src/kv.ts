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
  private readonly CACHE_READ_OPTIONS: KVNamespaceGetOptions<"json"> = {
    type: "json",
  };
  // private readonly EXPIRATION_HOT: number = 86400; // one day
  // private readonly EXPIRATION_COLD: number = this.EXPIRATION_HOT * 7; // one week
  private readonly EXPIRATION_HOT: number = 60;
  private readonly EXPIRATION_COLD: number = 120;

  constructor() {
    this.store =
      ENVIRONMENT === "development" ? KV_TOKEN_LIST_DEV : KV_TOKEN_LIST_PROD;
  }

  async getInfo(): Promise<KVNamespaceGetWithMetadataResult<
    OrcaInfo,
    CacheMeta
  > | null> {
    const cacheInfo = await this.store.getWithMetadata<OrcaInfo, CacheMeta>(
      this.CACHE_KEY_HOT,
      this.CACHE_READ_OPTIONS
    );

    if (!cacheInfo?.value) {
      return null;
    }

    return cacheInfo;
  }

  private getCacheMeta(type: CacheType): KVNamespacePutOptions {
    const metadata: CacheMeta = {
      updatedAt: new Date().toUTCString(),
      type,
    };
    const expirationTtl =
      type === "hot" ? this.EXPIRATION_HOT : this.EXPIRATION_COLD;

    return {
      metadata,
      expirationTtl,
    };
  }

  private updateHotCache(resp: OrcaApiResponse): void {
    // console.log("update hot cache");
    this.store.put(
      this.CACHE_KEY_HOT,
      JSON.stringify(resp),
      this.getCacheMeta("hot")
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
