import { Router } from "itty-router";

// import OrcaInfoCache from "./kv";

const router = Router();

router.get("/info", () => {
  const orcaInfo = KV_TOKENS_LIST_DEV.get("t");

  return new Response(JSON.stringify(orcaInfo));
});

router.get("/meta", () => {
  return new Response("info");
});

router.all("*", () => new Response("Not Found.", { status: 404 }));

export { router };
