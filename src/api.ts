import { IGNORED_POOLS_REGEX } from "./constants";

export const getOrcaInfo = async (): Promise<OrcaApiResponse | null> => {
  try {
    const response = await fetch(ORCA_ENDPOINT);
    const info = await response.json<OrcaApiResponse>();

    return {
      pools: filterOutIgnoredPools(info.pools),
      programIds: info.programIds,
      tokens: info.tokens,
    };
  } catch (err) {
    return null;
  }
};

export const filterOutIgnoredPools = (set: PoolList): PoolList => {
  const filteredEntries = Object.entries<Pool>(set).filter(([name]) => {
    return !IGNORED_POOLS_REGEX.test(name);
  });

  return Object.fromEntries<Pool>(filteredEntries);
};
