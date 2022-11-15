import { filterOutIgnoredPools } from "../src/api";

describe("it should filter out BTC pools", () => {
  it("removes BTC/ETH", () => {
    const data = {
      pools: {
        "BTC/ETH": {
          account: "Fz6yRGsNiXK7hVu4D2zvbwNXW8FQvyJ5edacs3piR1P7",
        },
        "SOL/ETH": {
          account: "Fz6yRGsNiXK7hVu4D2zvbwNXW8FQvyJ5edacs3piR1P7",
        },
      },
    };

    const filtered = filterOutIgnoredPools(data);

    expect(Object.values(data.pools).length).toBe(2);
    expect(Object.values(filtered).length).toBe(1);
  });

  it("removes SOL/BTC", () => {
    const data = {
      pools: {
        "SOL/BTC": {
          account: "Fz6yRGsNiXK7hVu4D2zvbwNXW8FQvyJ5edacs3piR1P7",
        },
        "SRM/USDT": {
          account: "Fz6yRGsNiXK7hVu4D2zvbwNXW8FQvyJ5edacs3piR1P7",
        },
      },
    };

    const filtered = filterOutIgnoredPools(data);

    expect(Object.values(data.pools).length).toBe(2);
    expect(Object.values(filtered).length).toBe(1);
  });
});
