import { version } from "../package.json";
import { getOrcaInfo } from "./api";

type CacheKeys = "orca_info_hot" | "orca_info_cold";

class OrcaInfoCache {
  private readonly store: KVNamespace<CacheKeys>;
  private readonly CACHE_KEY_HOT: CacheKeys = "orca_info_hot";
  private readonly CACHE_KEY_COLD: CacheKeys = "orca_info_cold";
  private readonly CACHE_READ_OPTIONS: KVNamespaceGetOptions<"json"> = {
    type: "json",
  };
  private readonly EXPIRATION_HOT_PROD: number = 86400; // one day
  private readonly EXPIRATION_HOT_DEV: number = 60;
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

  private expirationTtl(type: CacheType): number | null {
    return type === "hot" ? this.expirationHot : null;
  }

  private buildCacheMeta(type: CacheType): KVNamespacePutOptions {
    const metadata: CacheMeta = {
      updatedAt: new Date().toUTCString(),
      type,
      version,
    };
    const expirationTtl = this.expirationTtl(type);

    return expirationTtl ? { metadata, expirationTtl } : { metadata };
  }

  private async updateHotCache(resp: OrcaApiResponse): Promise<void> {
    await this.store.put(
      this.CACHE_KEY_HOT,
      JSON.stringify(resp),
      this.buildCacheMeta("hot")
    );
  }

  private async updateColdCache(resp: OrcaApiResponse): Promise<void> {
    await this.store.put(
      this.CACHE_KEY_COLD,
      JSON.stringify(resp),
      this.buildCacheMeta("cold")
    );
  }

  private async hotCacheInfo() {
    return await this.store.getWithMetadata<OrcaInfo, CacheMeta>(
      this.CACHE_KEY_HOT,
      this.CACHE_READ_OPTIONS
    );
  }

  private async coldCacheInfo() {
    return await this.store.getWithMetadata<OrcaInfo, CacheMeta>(
      this.CACHE_KEY_COLD,
      this.CACHE_READ_OPTIONS
    );
  }

  async makeScheduledUpdate(): Promise<void> {
    const resp = await getOrcaInfo();

    if (resp) {
      await this.updateHotCache(resp);
      await this.updateColdCache(resp);
    }
  }

  async getInfo(): Promise<KVNamespaceGetWithMetadataResult<
    OrcaInfo,
    CacheMeta
  > | null> {
    const hotCacheInfo = await this.hotCacheInfo();

    if (hotCacheInfo.value) {
      return hotCacheInfo;
    }

    const coldCacheInfo = await this.coldCacheInfo();

    if (coldCacheInfo.value) {
      return coldCacheInfo;
    }

    return null;
  }

  async getCacheMeta(): Promise<CacheMeta | null> {
    const hotCacheInfo = await this.hotCacheInfo();

    if (hotCacheInfo.metadata) {
      return hotCacheInfo.metadata;
    }

    const coldCacheInfo = await this.coldCacheInfo();

    if (coldCacheInfo.metadata) {
      return coldCacheInfo.metadata;
    }

    return null;
  }
}

export default new OrcaInfoCache();
