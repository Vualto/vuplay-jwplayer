# VUPLAY JW Player

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Built with Grunt](http://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)

## Description

This repository will demonstrate how to use [Studio DRM](https://developer.jwplayer.com/jwplayer/docs/studio-drm-standalone-getting-started) with [JW Player](https://jwplayer.com).
If you have any questions please contact <support@jwplayer.com>

This repository is currently targeted at [version 8.24.3](https://releases.jwplayer.com/jw-player/#v8.24.3) of JW Player

## Instructions

### Install dependencies

1. Install [npm](https://www.npmjs.com/)
2. Install the [grunt-cli](https://www.npmjs.com/package/grunt-cli): `npm install -g grunt-cli`
3. Clone the repository: `git clone git@github.com:Vualto/vualto-jwplayer.git`
4. Navigate to the project's root folder: `cd studiodrm-jwplayer`
5. Install the dependencies: `npm install`

### Build and run the dev environment

1. Open the repository in your favourite javascript editor.
2. In the file `studiodrm-jwplayer.js` replace `<dash-stream-url>` with your [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) stream URL.
3. In the file `studiodrm-jwplayer.js` replace `<hls-stream-url>` with your [HLS](https://developer.apple.com/streaming/) stream URL.
4. In the file `studiodrm-jwplayer.js` replace `<fairplay-cert-url>` with the URL to the fairplay certificate. Please contact <support@jwplayer.com> if you do not have this URL.
5. In the file `studiodrm-jwplayer.js` replace `<your-studiodrm-token>` with a Studio DRM token. Details can be found in the [https://developer.jwplayer.com/jwplayer/docs/studio-drm-token-v2](Studio DRM Token v2 documentation)
6. In the file `index.html` replace `<jwplayer-key>` with your JWPlayer key.
7. Run `npm run build` in the project's root. This will create a `dist` folder that contains all the files needed to run this demo. 
8. Add the host `jwplayer.studiodrm.local` to your local machine's hosts file.
9. Load a supported browser and go to `https://jwplayer.studiodrm.local:14703`

You will need an enterprise license with JW Player in order to playback DRM encrypted content. Please contact <support@jwplayer.com> or see [JW Player pricing](https://www.jwplayer.com/pricing/) for more information. 

Retrieve the [JW Player key](https://dashboard.jwplayer.com/#/players/downloads) and copy the license key for the appropriate player in the `Downloads` section.

In order to allow DRM encrypted playback in chrome (<https://goo.gl/EEhZqT>), SSL has been enabled for the demo. You will get a warning about an invalid cert `NET::ERR_CERT_AUTHORITY_INVALID` but this can safely be ignored.

### Browser support

The browser must support [encrypted media extensions](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/).
Currently this includes the latest versions of Chrome, Firefox, Internet Explorer 11 and Edge.
For a complete breakdown of supported media extensions please contact <support@jwplayer.com>

## Useful links

### Studio DRM

-   [Contact JW Player](https://support.jwplayer.com/)
-   [Studio DRM](https://developer.jwplayer.com/jwplayer/docs/studio-drm-standalone-getting-started)
-   [Studio DRM token documentation](https://developer.jwplayer.com/jwplayer/docs/studio-drm-token-v2)

### JW Player

-   [Homepage](https://www.jwplayer.com/)
-   [Pricing](https://www.jwplayer.com/pricing/)
-   [Developer Portal](https://developer.jwplayer.com)
-   [JW Player documentation on the configuration of DRM with JWPlayer](https://developer.jwplayer.com/jw-player/docs/developer-guide/customization/configuration-reference/#drm)

### mpeg-DASH

-   [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)
-   [What is MPEG-DASH](https://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx)
-   [Widevine](https://www.widevine.com/)
-   [PlayReady](https://www.microsoft.com/playready/)

### HLS

-   [Apple's introduction to HLS](https://developer.apple.com/streaming/)
-   [FairPlay](https://developer.apple.com/streaming/fps/)

### Encrypted media extensions

-   [Encrypted media extensions specification](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/)
-   [Encrypted media extensions wikipedia](https://en.wikipedia.org/wiki/Encrypted_Media_Extensions)
-   [Encrypted media extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
-   [Intro to encrypted media extensions](https://www.html5rocks.com/en/tutorials/eme/basics/)

### Build tools

-   [npm](https://www.npmjs.com/)
-   [grunt](https://gruntjs.com/)
