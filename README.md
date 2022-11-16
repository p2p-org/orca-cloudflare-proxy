## Orca proxy

A cloudflare worker for caching [Orca](https://www.orca.so/) data on pools and tokens.

## Built With

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)

## KV stores

This project uses [Cloudflare KV stores](https://developers.cloudflare.com/workers/runtime-apis/kv/) to cache data.
To work with one you will need to create those first via
[wrangler CLI tool](https://developers.cloudflare.com/workers/wrangler/).

```
wrangler kv:namespace create <KV_NAMESPACE> [OPTIONS]
```

and paste the output of this run into the respective part of `wrangler.toml`

```
$ wrangler kv:namespace create "MY_KV"
🌀  Creating namespace with title "worker-MY_KV"
✨  Success!
Add the following to your wrangler.toml:
kv_namespaces = [  { binding = "MY_KV", preview_id = "15137f8edf6c09742227e99b08aaf273" } ]
```

use `--env development` and `--env production` for `[env.development]` and `[env.production]` configurations
respectively.

use the `--preview` flag for `[env.development]` only. `preview_id` should be the same as `id`.

you will need to update `src/global.d.ts` `KV_TOKEN_LIST_DEV` and `KV_TOKEN_LIST_PROD` names with your `<KV_NAMESPACE>`
to avoid TS errors.

## Wrangler

This project uses [wrangler CLI tool](https://developers.cloudflare.com/workers/wrangler/) to run the worker locally or
to publish it to cloudflare. To run it you first need to fill its configuration file `wrangler.toml` in the root of the
project as follows:

- `name` field for both `dev` and `prod` environments (those should not be the same)
- `account_id` from [Cloudflare workers control panel](https://workers.cloudflare.com/). Those could be different for
  production and local development. You need to fill in at least your dev credentials to run it locally. Production
  credentials are managed through the GitHub environments here.
- `kv_namespaces` See [KV stores](#kv-stores)

Keep in mind that development variables are kept in `.dev.vars`. You can create one from `.dev.vars.example`.

You also might want to update the `[triggers]` field. This field is used to set the schedule for API calls via the
`crons` var. Its value is `["0 13 * * *"]` which means running the script at 1p.m. every day. To see actions faster while
developing locally or to debug use value of `["*/1 * * * *"]` which would run it every minute.

To run the worker locally execute:

`wrangler dev --env development`

To publish your worker to your dev environment execute:

`wrangler publish --env development`

To see changes applied locally (in opposite to viewing changes on the Cloudflare control panel) you will also need to
set it specifically (`l` key press) while running the dev server. This applies to data written to KV stores or running
`crone` triggers.

<img width="856" alt="Screen Shot 2022-05-23 at 6 34 16 PM" src="https://user-images.githubusercontent.com/28143822/169855891-f246375c-b8be-4f9c-8333-7942be7b35f6.png">
