declare const ORCA_ENDPOINT: string;
declare const ENVIRONMENT: "development" | "production";
declare const KV_TOKEN_LIST_DEV: KVNamespace;
declare const KV_TOKEN_LIST_PROD: KVNamespace;
declare type Token = {
  mint: string;
  name: string;
  decimals: number;
  fetchPrice: boolean;
};

declare type Pool = {
  account: string;
  authority: string;
  nonce: number;
  poolTokenMint: string;
  tokenAccountA: string;
  tokenAccountB: string;
  feeAccount: string;
  feeNumerator: number;
  feeDenominator: number;
  ownerTradeFeeNumerator: number;
  ownerTradeFeeDenominator: number;
  ownerWithdrawFeeNumerator: number;
  ownerWithdrawFeeDenominator: number;
  hostFeeNumerator: number;
  hostFeeDenominator: number;
  tokenAName: string;
  tokenBName: string;
  curveType: string;
  deprecated: boolean;
};

declare type TokenList = KeyValuePairs<Token>;

declare type PoolList = KeyValuePairs<Pool>;

declare type OrcaResponse = {
  programIds: KeyValuePairs;
  tokens: TokenList;
  pools: PoolList;
};

type KeyValuePairs<T = string> = {
  [K: string]: T;
};
