export const getOrcaInfo = async (): Promise<OrcaResponse> => {
  const response = await fetch(ORCA_ENDPOINT);

  return await response.json<OrcaResponse>();
};
