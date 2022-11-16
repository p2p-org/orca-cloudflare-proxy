import { filteredIgnoredValues } from "../src/api";
import { IGNORED_POOLS_REGEX, IGNORED_TOKENS_REGEX } from "../src/constants";

describe("it should filter out BTC pools", () => {
  it("removes BTC/ETH", () => {
    const dataset = {
      "BTC/ETH": {
        account: "Fz6yRGsNiXK7hVu4D2zvbwNXW8FQvyJ5edacs3piR1P7",
      },
      "SOL/ETH": {
        account: "Fz6yRGsNiXK7hVu4D2zvbwNXW8FQvyJ5edacs3piR1P7",
      },
    };

    const filtered = filteredIgnoredValues({
      dataset,
      condition: IGNORED_POOLS_REGEX,
    });

    expect(filtered["BTC/ETH"]).toBeFalsy();
    expect(filtered["SOL/ETH"]).toBeTruthy();
  });

  it("removes SOL/BTC", () => {
    const dataset = {
      "SOL/BTC": {
        account: "Fz6yRGsNiXK7hVu4D2zvbwNXW8FQvyJ5edacs3piR1P7",
      },
      "SRM/USDT": {
        account: "Fz6yRGsNiXK7hVu4D2zvbwNXW8FQvyJ5edacs3piR1P7",
      },
    };

    const filtered = filteredIgnoredValues({
      dataset,
      condition: IGNORED_POOLS_REGEX,
    });

    expect(filtered["SOL/BTC"]).toBeFalsy();
    expect(filtered["SRM/USDT"]).toBeTruthy();
  });

  it("removes LP BTC/ORCA tokens", () => {
    const dataset = {
      "BTC/ETH": {
        mint: "8pFwdcuXM7pvHdEGHLZbUR8nNsjj133iUXWG6CgdRHk2",
      },
      "BTC/ORCA[aquafarm]": {
        mint: "dfplfcqzqdkykydepgip4r6mexvmbkwqta12ezq6qxuy",
      },
      "PRE/BTC": {
        mint: "dfplfcqzqdkykydepgip4r6mexvmbkwqta12ezq6qxuy",
      },
      "SUSHI/USDC": {
        mint: "DFpLFcQZqDKykyDePgip4r6MExVmBKWqTa12ezq6qxUY",
      },
    };

    const filtered = filteredIgnoredValues({
      dataset,
      condition: IGNORED_TOKENS_REGEX,
    });

    expect(filtered["BTC/ETH"]).toBeFalsy();
    expect(filtered["BTC/ORCA[aquafarm]"]).toBeFalsy();
    expect(filtered["PRE/BTC"]).toBeFalsy();
    expect(filtered["SUSHI/USDC"]).toBeTruthy();
  });

  it("leaves out empty set", () => {
    const dataset = {
      "BTC/ETH": {
        mint: "8pFwdcuXM7pvHdEGHLZbUR8nNsjj133iUXWG6CgdRHk2",
      },
      "BTC/ORCA[aquafarm]": {
        mint: "dfplfcqzqdkykydepgip4r6mexvmbkwqta12ezq6qxuy",
      },
    };

    const filtered = filteredIgnoredValues({
      dataset,
      condition: IGNORED_TOKENS_REGEX,
    });

    expect(filtered["BTC/ETH"]).toBeFalsy();
    expect(filtered["BTC/ORCA[aquafarm]"]).toBeFalsy();
    expect(filtered).toMatchObject({});
  });
});
