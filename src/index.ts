import OrcaInfoCache from "./kv";
import { router } from "./router";

addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);

addEventListener("scheduled", (event) => {
  event.waitUntil(OrcaInfoCache.makeScheduledUpdate());
});

addEventListener("unhandledrejection", (event) => {
  // @TODO add a logger here
  console.error(event);
});
