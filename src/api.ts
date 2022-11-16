import { IGNORED_POOLS_REGEX, IGNORED_TOKENS_REGEX } from "./constants";

export const getOrcaInfo = async (): Promise<OrcaApiResponse | null> => {
  try {
    const response = await fetch(ORCA_ENDPOINT);
    const info = await response.json<OrcaApiResponse>();

    return {
      pools: filteredIgnoredValues<Pool>({
        dataset: info.pools,
        condition: IGNORED_POOLS_REGEX,
      }),
      tokens: filteredIgnoredValues<Token>({
        dataset: info.tokens,
        condition: IGNORED_TOKENS_REGEX,
      }),
      programIds: info.programIds,
    };
  } catch (err) {
    return null;
  }
};

type FilterConfig<T> = {
  dataset: KeyValuePairs<T>;
  condition: RegExp;
};

export function filteredIgnoredValues<T>(
  config: FilterConfig<T>
): KeyValuePairs<T> {
  // const sets = Object.values(config.dataset) || {};

  const filteredEntries = Object.entries<T>(config.dataset).filter(([name]) => {
    return !config.condition.test(name);
  });

  return Object.fromEntries<T>(filteredEntries);
}
