import { Router } from "itty-router";

import OrcaInfoCache from "./kv";

const router = Router();

router.get("/info", async () => {
  const orcaInfo = await OrcaInfoCache.getInfo();

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return new Response(JSON.stringify(orcaInfo, null, 2));
});

router.get("/meta", () => {
  // @TODO to implement
  return new Response("info");
});

router.all("*", () => new Response("Not Found.", { status: 404 }));

export { router };
