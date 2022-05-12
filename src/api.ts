import type { TokenList } from "./types";

export const getTokensList = async (): Promise<TokenList> => {
  const response = await fetch(ORCA_ENDPOINT);

  return await response.json<TokenList>();
};
