import { Router } from "itty-router";

export const router = Router();

router.get("/info", () => {
  return new Response("jfs good");
});

router.get("/meta", () => {
  return new Response("info");
});

router.all("*", () => new Response("Not Found.", { status: 404 }));
