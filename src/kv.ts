import { getOrcaInfo } from "./api";

type CacheKeys = "orca_info_hot" | "orca_info_cold" | "orca_meta";

// @TODO cache meta
class OrcaInfoCache {
  private readonly store: KVNamespace<CacheKeys>;
  private readonly CACHE_KEY_HOT: CacheKeys = "orca_info_hot";
  private readonly CACHE_KEY_COLD: CacheKeys = "orca_info_cold";
  private readonly CACHE_KEY_META: CacheKeys = "orca_meta";
  private readonly CACHE_READ_OPTIONS: KVNamespaceGetOptions<"json"> = {
    type: "json",
  };
  private readonly EXPIRATION_HOT_PROD: number = 86400; // one day
  private readonly EXPIRATION_COLD_PROD: number = this.EXPIRATION_HOT_PROD * 7; // one week
  private readonly EXPIRATION_HOT_DEV: number = 60;
  private readonly EXPIRATION_COLD_DEV: number = 180;
  private readonly DEVELOPMENT: boolean;

  constructor() {
    this.DEVELOPMENT = ENVIRONMENT === "development";
    this.store = this.DEVELOPMENT ? KV_TOKEN_LIST_DEV : KV_TOKEN_LIST_PROD;
  }

  private get expirationHot() {
    return this.DEVELOPMENT
      ? this.EXPIRATION_HOT_DEV
      : this.EXPIRATION_HOT_PROD;
  }

  private get expirationCold() {
    return this.DEVELOPMENT
      ? this.EXPIRATION_COLD_DEV
      : this.EXPIRATION_COLD_PROD;
  }

  private expirationTtl(type: CacheType) {
    return type === "hot" ? this.expirationHot : this.expirationCold;
  }

  async getInfo(): Promise<KVNamespaceGetWithMetadataResult<
    OrcaInfo,
    CacheMeta
  > | null> {
    const hotCacheInfo = await this.store.getWithMetadata<OrcaInfo, CacheMeta>(
      this.CACHE_KEY_HOT,
      this.CACHE_READ_OPTIONS
    );

    if (hotCacheInfo.value) {
      return hotCacheInfo;
    }

    const coldCacheInfo = await this.store.getWithMetadata<OrcaInfo, CacheMeta>(
      this.CACHE_KEY_COLD,
      this.CACHE_READ_OPTIONS
    );

    if (coldCacheInfo.value) {
      return coldCacheInfo;
    }

    return null;
  }

  private getCacheMeta(type: CacheType): KVNamespacePutOptions {
    const metadata: CacheMeta = {
      updatedAt: new Date().toUTCString(),
      type,
    };
    const expirationTtl = this.expirationTtl(type);

    return {
      metadata,
      expirationTtl,
    };
  }

  private updateHotCache(resp: OrcaApiResponse): void {
    this.store.put(
      this.CACHE_KEY_HOT,
      JSON.stringify(resp),
      this.getCacheMeta("hot")
    );
  }

  private updateColdCache(resp: OrcaApiResponse): void {
    this.store.put(
      this.CACHE_KEY_COLD,
      JSON.stringify(resp),
      this.getCacheMeta("cold")
    );
  }

  async makeScheduledUpdate(): Promise<void> {
    const resp = await getOrcaInfo();
    const shouldUpdateCold = !(await this.store.get(this.CACHE_KEY_COLD));

    if (resp) {
      this.updateHotCache(resp);
    }

    if (resp && shouldUpdateCold) {
      this.updateColdCache(resp);
    }
  }
}

export default new OrcaInfoCache();
