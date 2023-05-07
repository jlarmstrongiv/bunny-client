# `bunny-client` The TypeScript API Client for BunnyCDN

## Motivation

Provide an unofficial TypeScript API Client for BunnyCDN with few dependencies.

## Documentation

- [quick start guide](https://github.com/jlarmstrongiv/bunny-client#quick-start)
- [official API documentation](https://docs.bunny.net/docs)
- [generated TypeScript documentation](https://bunny-client.surge.sh)

<!-- Better documentation in comments than the official api! -->

### Supported APIs

<!--

- private apis
  - abuse and dmca endpoint
    - https://toshy.github.io/BunnyNet-PHP/base-api/#abuse-case
    - https://github.com/ToshY/BunnyNet-PHP/issues/55
  - billing
    - https://toshy.github.io/BunnyNet-PHP/base-api/#billing
    - https://github.com/ToshY/BunnyNet-PHP/issues/34
    - https://github.com/ToshY/BunnyNet-PHP/issues/58
  - compute
    - https://toshy.github.io/BunnyNet-PHP/base-api/#compute
    - https://docs.bunny.net/reference/computeedgescriptpublic_addscript
  - drm certificates
    - https://toshy.github.io/BunnyNet-PHP/base-api/#drm-certificate
  - user
    - https://toshy.github.io/BunnyNet-PHP/base-api/#user
    - https://docs.bunny.net/reference/userpublic_index
    - https://docs.bunny.net/reference/userpublic_dpa
  - api keys
    - https://docs.bunny.net/reference/apikeypublic_listapikeys
    - https://web.archive.org/web/20230428220030/https://docs.bunny.net/reference/apikeypublic_listapikeys
  - other
    - https://toshy.github.io/BunnyNet-PHP/image-processing/
    - https://toshy.github.io/BunnyNet-PHP/token-authentication/
    - https://github.com/BunnyWay/BunnyCDN.TokenAuthentication/blob/master/nodejs/token.js
  - documentation vs api reference https://docs.bunny.net/docs/cdn-logging

  - consider writing a surge.sh cli alternative
  - consider a react-query client
  - consider nextjs examples
  - documentation site https://nextra.site/

  - tus https://docs.bunny.net/reference/tus-resumable-uploads
    - https://www.npmjs.com/package/tus-js-client
    - https://www.npmjs.com/package/tus
    - https://www.npmjs.com/package/use-tus
    - https://www.npmjs.com/package/@uppy/tus

-->

- 🏗️ API
  - ✅ Countries
    - ✅ Get Country List
  - ✅ Support
    - ✅ Get Ticket List
    - ✅ Get Ticket Details
    - ✅ Close Ticket
    - ✅ Reply Ticket
    - ✅ Create Ticket
  - ✅ Region
    - ✅ Region List
  - 🏗️ Stream Video Library
  - 🏗️ DNS Zone
  - 🏗️ Pull Zone
    - 🏗️ List Pull Zones
    - 🏗️ Add Pull Zone
    - 🏗️ Get Pull Zone
    - 🏗️ Update Pull Zone
    - 🏗️ Delete Pull Zone
    - 🏗️ Delete Edge Rule
    - 🏗️ Add/Update Edge Rule
    - 🏗️ Set Edge Rule Enabled
    - 🏗️ Get Origin Shield Queue Statistics
    - 🏗️ Get SafeHop Statistics
    - 🏗️ Get Optimizer Statistics
    - 🏗️ Load Free Certificate
    - 🏗️ Purge Cache
    - 🏗️ Check the pull zone availability
    - 🏗️ Add Custom Certificate
    - 🏗️ Remove Certificate
    - 🏗️ Add Custom Hostname
    - 🏗️ Remove Custom Hostname
    - 🏗️ Set Force SSL
    - 🏗️ Reset token Key
    - 🏗️ Add Allowed Referer
    - 🏗️ Remove Allowed Referer
    - 🏗️ Add Blocked Referer
    - 🏗️ Remove Blocked Referer
    - 🏗️ Add Blocked IP
    - 🏗️ Remove Blocked IP
  - 🏗️ Purge
  - ✅ Statistics
    - ✅ Get Statistics
  - ✅ Storage Zone
    - ✅ List Storage Zones
    - ✅ Add Storage Zone
    - ✅ Check the Storage Zone Availability
    - ✅ Get Storage Zone
    - ✅ Update Storage Zone
    - ✅ Delete Storage Zone
    - ✅ Get Storage Zone Statistics
    - ✅ Reset Password
    - ✅ Reset Read-Only Password
- ✅ Edge Storage API
  - ✅ Manage Files
    - ✅ Download File
    - ✅ Upload File
    - ✅ Delete File
  - ✅ Browse Files
    - ✅ List Files
- 🏗️ Stream API
  - 🏗️ TUS
  - 🏗️ Manage Collections
  - 🏗️ Manage Videos

## Quick start

<!-- types -->
<!-- https://app.quicktype.io/?l=ts -->
<!-- https://transform.tools/json-to-typescript -->

<!-- avoiding zod due to performance concerns -->
<!-- https://github.com/colinhacks/zod/issues/205 -->

### Installation

Install via [npm](https://www.npmjs.com/package/bunny-client):

```shell
npm install bunny-client
```

### Required polyfills

- `fetch` API
- Web Streams API

Supports [Node.js 18+](https://nodejs.org/en/blog/announcements/v18-release-announce#fetch-experimental) and [evergreen browsers](https://caniuse.com/fetch)

### Account Access Key

<!-- https://www.jhanley.com/blog/bunny-client-account-and-api-keys/ -->

<!-- some api keys cannot be created with an entity, such as zones -->

Get your API Key from your [account settings](https://dash.bunny.net/account/settings)

API Key example:

```
cb1a7c68-89a0-462a-9495-13ebd7366cfe
```

### Client

<!-- GET /url format https://stackoverflow.com/a/16230133 -->

Each client matches with a menu item in the Bunny CDN [docs](https://docs.bunny.net/reference/bunnynet-api-overview)

1. Import the client
1. Optionally set globals, like the `apiKey`
1. Use the client methods to call the API

The main differences between the API and the TypeScript Client are:

- `camelCase` inputs and outputs to match TypeScript style guides
- `tsdoc` examples for all inputs and outputs
- Replace the generic `AccessKey` with `apiKey` and `storageZonePassword`
- More default parameters

<!-- TODO: storageZoneClient input to lowercase refactor -->

```ts
const storageZoneClient = createStorageZoneClient({
  apiKey: API_ACCESS_KEY,
});

const response = await storageZoneClient("addStorageZone", {
  Name: "api-example",
  Region: "NY",
  ZoneTier: 1,
});
```

## License

<!-- https://creativecommons.org/choose/ -->
<!-- https://chooser-beta.creativecommons.org/ -->
<!-- https://github.com/idleberg/Creative-Commons-Markdown -->

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/jlarmstrongiv/bunny-client/">bunny-client</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/jlarmstrongiv/">John L. Armstrong IV</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution-NonCommercial-ShareAlike 4.0 International<br><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>

Alternative licenses available by request.

## Contributing

PRs welcome! All contributors must sign the CLA Agreement so that the project license can be changed to MIT when sponsored. Thank you for your contributions.
