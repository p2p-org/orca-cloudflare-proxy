import OrcaInfoCache from "./kv";
import { router } from "./router";

// @FIXME add mandatory linters checks
// @TODO check build TSC to throw errors
// @TODO onunhanlded rejection hanlde
// @TODO pullable eslint config
// @TODO setup sttricter TS
addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);

addEventListener("scheduled", (event) => {
  event.waitUntil(OrcaInfoCache.makeScheduledUpdate());
});
