import { Router } from "itty-router";

// import { TOKENS_CACHE } from "./schedule";

export const router = Router();

router.get("/tokens", () => {
  return new Response("jfs good");
});

router.all("*", () => new Response("Not Found.", { status: 404 }));
