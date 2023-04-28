# `bunny-client` The TypeScript API Client for BunnyCDN

## License

<!-- https://creativecommons.org/choose/ -->
<!-- https://chooser-beta.creativecommons.org/ -->
<!-- https://github.com/idleberg/Creative-Commons-Markdown -->

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/jlarmstrongiv/bunny-client/blob/main/README.md">bunny-client</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/jlarmstrongiv/">John L. Armstrong IV</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution-NonCommercial-ShareAlike 4.0 International<br><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>

### Sponsorships

If [bunny.net](https://bunny.net/) or you would like to sponsor this package, the license can be changed to the MIT License if we reach our goal of $5,000 / mo.

### Commercial licenses

Unfortunately, this package has no sponsors. Affordable commercial licenses are available:

- $100 lifetime license for indie developers
- $10 / mo for businesses with 1–5 employees
- $25 / mo for businesses with 6–15 employees
- $75/ mo for businesses with 16–24 employees
- $150 / mo for businesses with 25+ employees

For purchasing instructions, please create a github discussion with your contact email. Support not included. Thank you!

## Motivation

Provide a TypeScript API Client for BunnyCDN with few dependencies.

## Documentation

See the official API documentation at [https://docs.bunny.net/docs](https://docs.bunny.net/docs)

This package aims to provide a matching TypeScript API Client for the bunny.net API.

<!-- Better documentation in comments than the official api! -->

### Supported APIs

- 🏗️ API
  - ✅ Countries
    - ✅ Get Country List
  - ✅ Statistics
    - ✅ Get Statistics
  - 🏗️ Region
    - 🏗️ Region List
  - 🏗️ Storage Zone
    - ✅ List Storage Zones
    - ✅ Add Storage Zone
    - 🏗️ Check the Storage Zone Availability
    - ✅ Get Storage Zone
    - 🏗️ Update Storage Zone
    - ✅ Delete Storage Zone
    - 🏗️ Get Storage Zone Statistics
    - ✅ Reset Password
    - ✅ Reset Read-Only Password
- 🏗️ Edge Storage API
  - 🏗️ Download File
  - 🏗️ Upload File
  - 🏗️ Delete File
  - 🏗️ List Files
- 🏗️ Stream API

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
