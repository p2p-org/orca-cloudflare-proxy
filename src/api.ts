export const getOrcaInfo = async (): Promise<OrcaApiResponse | null> => {
  try {
    const response = await fetch(ORCA_ENDPOINT);
    const info = await response.json<OrcaApiResponse>();

    return {
      programIds: info.programIds,
      pools: info.pools,
      tokens: info.tokens,
    };
  } catch (err) {
    // console.log("Error fetching orca", err);

    return null;
  }
};
