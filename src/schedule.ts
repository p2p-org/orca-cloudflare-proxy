// @TODO hot cache
// @TODO cold fall-back
// metadata
// TTL
const BACKEND_ENDPOINT = "https://api.github.com/users/defunkt";
const MOCK_CONFIG = {
  headers: {
    "User-Agent": "request",
  },
};
export const CACHE_KEY = "token-list";
export const TOKENS_CACHE = "tokens:cache";

export async function updateOrcaPools() {
  const cache = await caches.open(TOKENS_CACHE);
  const tokensInfoResponse = await fetch(BACKEND_ENDPOINT, MOCK_CONFIG);

  if (tokensInfoResponse.ok) {
    const tokenList = await tokensInfoResponse.json();

    return cache.put(
      CACHE_KEY,
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      new Response(JSON.stringify(tokenList, null, 2))
    );
  }

  return Promise.reject("Error updating tokens cache");
}
