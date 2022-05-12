import { Router } from "itty-router";

// import { TOKENS_CACHE } from "./schedule";

export const router = Router();

router.get("/tokens", () => {
  // const tokensCache = await caches.open(TOKENS_CACHE);

  return new Response("jfs good");
});

router.all("*", () => new Response("Not Found.", { status: 404 }));
