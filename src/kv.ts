type CacheKeys = "token_list_hot" | "token_list_cold";

// @TODO cache meta
// @TODO TTL
class OrcaInfoCache {
  private readonly store: KVNamespace<CacheKeys>;
  private readonly CACHE_KEY_HOT: CacheKeys = "token_list_hot";

  constructor() {
    this.store =
      ENVIRONMENT === "development" ? KV_TOKEN_LIST_DEV : KV_TOKEN_LIST_PROD;
  }

  async getInfo(): Promise<OrcaResponse | null> {
    const tokenList = await this.store.get(this.CACHE_KEY_HOT);

    return tokenList ? JSON.parse(tokenList) : null;
  }

  // @FIXME
  // eslint-disable-next-line
  async setInfo(tokenList: OrcaResponse) {
    await this.store.put(this.CACHE_KEY_HOT, JSON.stringify(tokenList));
  }
}

export default new OrcaInfoCache();
