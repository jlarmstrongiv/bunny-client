# `bunny-client` The TypeScript API Client for BunnyCDN

## License

<!-- https://creativecommons.org/choose/ -->
<!-- https://chooser-beta.creativecommons.org/ -->
<!-- https://github.com/idleberg/Creative-Commons-Markdown -->

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/jlarmstrongiv/bunny-client/blob/main/README.md">bunny-client</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/jlarmstrongiv/">John L. Armstrong IV</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution-NonCommercial-ShareAlike 4.0 International<br><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>

Alternative licenses available by request.

## Motivation

Provide a TypeScript API Client for BunnyCDN with few dependencies.

## Documentation

See the official API documentation at [https://docs.bunny.net/docs](https://docs.bunny.net/docs)

This package aims to provide a matching TypeScript API Client for the bunny.net API.

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
  - other
    - https://toshy.github.io/BunnyNet-PHP/image-processing/
    - https://toshy.github.io/BunnyNet-PHP/token-authentication/

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
- 🏗️ Edge Storage API
  - 🏗️ Download File
  - 🏗️ Upload File
  - 🏗️ Delete File
  - 🏗️ List Files
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

```shell
npm install bunny-client
```

### Polyfills

- `fetch` API
- Web Streams API

- Supports [Node.js 18+](https://nodejs.org/en/blog/announcements/v18-release-announce#fetch-experimental)
- Supports [evergreen browsers](https://caniuse.com/fetch)

### Account Access Key

<!-- https://www.jhanley.com/blog/bunny-client-account-and-api-keys/ -->

<!-- some api keys cannot be created with an entity, such as zones -->

Get your API Access Key from [https://panel.bunny.net/account](https://panel.bunny.net/account)

API Access Key example:

```
cb1a7c68-89a0-462a-9495-13ebd7366cfe
```

### Client

Coming soon!

## Contributing

PRs welcome! All contributors must sign the CLA Agreement so that the project license can be changed to MIT when sponsored. Thank you for your contributions.
