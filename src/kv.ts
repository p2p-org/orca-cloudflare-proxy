type CacheKeys = "token_list_hot" | "token_list_cold";

class TokensCache {
  private readonly store: KVNamespace<CacheKeys>;
  private readonly CACHE_KEY_HOT: CacheKeys = "token_list_hot";

  constructor() {
    this.store =
      ENVIRONMENT === "development" ? KV_TOKENS_LIST_DEV : KV_TOKENS_LIST_PROD;
  }

  async getTokensCache() {
    const tokenList = await this.store.get(this.CACHE_KEY_HOT);

    return tokenList ? JSON.parse(tokenList) : null;
  }

  // @FIXME
  // eslint-disable-next-line
  async setTokensCache(tokenList: Array<any>) {
    await this.store.put(this.CACHE_KEY_HOT, JSON.stringify(tokenList));
  }
}

export default new TokensCache();
