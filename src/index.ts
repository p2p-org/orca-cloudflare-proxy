import { router } from "./router";
import { updateOrcaPools } from "./schedule";

// @FIXME add mandatory linters checks
// @TODO check build TSC to throw errors
// @TODO onunhanlded rejection hanlde
// @TODO commitlint
// @TODO pullable eslint config
addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);

addEventListener("scheduled", (event) => {
  event.waitUntil(updateOrcaPools());
});
