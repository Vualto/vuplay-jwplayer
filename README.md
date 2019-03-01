# VUPLAY JW Player

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Built with Grunt](http://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)

## Description

This repository will demostrate how to use [VUDRM](https://vudrm.vualto.com/) with the [JW Player](https://jwplayer.com).
If you have any questions please contact <support@vualto.com>

This repository is currently targeted at [version 8.7.6](https://developer.jwplayer.com/release-notes/jw-player/?id=14373250) of JW Player

## Instructions

### Install dependencies

1. Install [npm](https://www.npmjs.com/)
2. Install the [grunt-cli](https://www.npmjs.com/package/grunt-cli): `npm install -g grunt-cli`
3. Clone the repository: `git clone git@github.com:Vualto/vuplay-jwplayer.git`
4. Navigate to the project's root folder: `cd vuplay-jwplayer`
5. Install the dependencies: `npm install`

### Build and run the dev environment

1. Open the repository in your favourite javascript editor.
2. In the file `vuplay-jwplayer.js` replace `<dash-stream-url>` with your [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) stream URL.
3. In the file `vuplay-jwplayer.js` replace `<hls-stream-url>` with your [HLS](https://developer.apple.com/streaming/) stream URL.
4. In the file `vuplay-jwplayer.js` replace `<fairplay-cert-url>` with the URL to the fairplay certificate. Please contact support@vualto.com if you do not have this URL.
5. In the file `vuplay-jwplayer.js` replace `<your-vudrm-token>` with a VUDRM token from [https://admin.drm.technology](https://admin.drm.technology)
6. Run `npm run build` in the project's root. This will create a `dist` folder that contains all the files needed to run this demo. N.B. You will need to add the host `bitmovin.local.vuplay.co.uk` to your local machine's hosts file in order for this to work. This domain will need to be white listed within your Bitmovin dashboard.
7. Load a supported browser and go to `https://jwplayer.vuplay.local.drm.technology:14703`

You will need an enterprise license with JW Player in order to playback DRM encrypted content. Please contact support@vualto.com or [JW Player](https://www.jwplayer.com/pricing/) for more information. To retrieve the JW Player key [click here](https://dashboard.jwplayer.com/#/players/downloads) and copy the license key for the appropriate player in the `Downloads` section.

In order to allow DRM encrypted playback in chrome (<https://goo.gl/EEhZqT>), SSL has been enabled for the demo. You will get a warning about an invalid cert `NET::ERR_CERT_AUTHORITY_INVALID` but this can safely be ignored.

### Browser support

The browser must support [encrypted media extensions](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/).
Currently this includes the latest versions of Chrome, Firefox, Internet Explorer 11 and Edge.
For a complete breakdown of supported media extensions please contact support@vualto.com

## Useful links

### VUDRM

-   [Contact vualto](https://www.vualto.com/contact-us/)
-   [VUDRM](https://vudrm.vualto.com/)
-   [VUDRM token documentation](https://docs.vualto.com/projects/vudrm/en/latest/VUDRM-token.html)

### mpeg-DASH

-   [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)
-   [What is MPEG-DASH](https://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx)
-   [Widevine](https://www.widevine.com/)
-   [PlayReady](https://www.microsoft.com/playready/)

### HLS

-   [Apple's introduction to HLS](https://developer.apple.com/streaming/)
-   [Fairplay](https://developer.apple.com/streaming/fps/)

### Encrypted media extensions

-   [Encrypted media extensions specification](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/)
-   [Encrypted media extensions wikipedia](https://en.wikipedia.org/wiki/Encrypted_Media_Extensions)
-   [Encrypted media extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
-   [Intro to encrypted media extensions](https://www.html5rocks.com/en/tutorials/eme/basics/)

### JW Player

-   [Homepage](https://www.jwplayer.com/)
-   [Pricing](https://www.jwplayer.com/pricing/)
-   [Developer Portal](https://developer.jwplayer.com)
-   [JW Player article on DRM](https://support.jwplayer.com/customer/portal/articles/2561182-drm-digital-rights-management)
-   [JW Player documentation on the configuration of DRM with JWPlayer](https://developer.jwplayer.com/jw-player/docs/developer-guide/customization/configuration-reference/#drm)

### Build tools

-   [npm](https://www.npmjs.com/)
-   [grunt](https://gruntjs.com/)
