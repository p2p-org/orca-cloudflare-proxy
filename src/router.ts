import { Router } from "itty-router";

import OrcaInfoCache from "./kv";
import { getOrcaInfo } from "./api";

const router = Router();

const getCorsHeaders = (request: Request) => {
  const headers = new Headers();

  headers.set("Content-Type", "application/json");

  try {
    const url = new URL(request.headers.get("Origin") as string);
    const whiteList = ["localhost:3000", "wallet.p2p.org", "p2p-org.github.io"];

    if (whiteList.includes(url.host)) {
      headers.set(
        "Access-Control-Allow-Origin",
        url.toString().replace(/\/$/, "")
      );
    }
  } catch (e) {
    console.error(e);
  }

  return headers;
};

router.get("/info", async (request: Request) => {
  const orcaInfo = await OrcaInfoCache.getInfo();

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return new Response(JSON.stringify(orcaInfo, null, 2), {
    headers: getCorsHeaders(request),
  });
});

router.get("/meta", async (request: Request) => {
  const cacheMeta = await OrcaInfoCache.getCacheMeta();

  return new Response(JSON.stringify(cacheMeta), {
    headers: getCorsHeaders(request),
  });
});

router.get("/bypass-cache", async (request: Request) => {
  if (ENVIRONMENT !== "development") {
    return null;
  }

  const orcaInfo = await getOrcaInfo();

  return new Response(JSON.stringify(orcaInfo), {
    headers: getCorsHeaders(request),
  });
});

router.all(
  "*",
  (request: Request) =>
    new Response("Not Found.", {
      status: 404,
      headers: getCorsHeaders(request),
    })
);

export { router };
