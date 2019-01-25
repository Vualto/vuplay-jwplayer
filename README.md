# vuplay jwplayer

## Description

This repo will demostrate how to use [vudrm](http://vudrm.vualto.com/) with the [JWPlayer](https://jwplayer.com).
If you have any questions please contact support@vualto.com

This repo is currently targeted at [version 8.5.6](https://developer.jwplayer.com/release-notes/jw-player/?id=12380325) of JWPlayer

## Instructions

### Install dependencies

1. Install [npm](https://www.npmjs.com/)
2. Install the [grunt-cli](https://www.npmjs.com/package/grunt-cli): `npm install -g grunt-cli`
3. Clone the repo: `git clone git@github.com:Vualto/vuplay-jwplayer.git`
4. Navigate to the project's root folder: `cd vuplay-jwplayer`
5. Install the dependencies: `npm install`

### Set required variables

1. Open the repo in your favourite javascript editor.
2. In the file `vuplay.js` replace `<mpeg-dash-stream-url>` with your [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) stream url.
3. In the file `vuplay.js` replace `<hls-stream-url>` with your [HLS](https://developer.apple.com/streaming/) stream url.
4. In the file `vuplay.js` replace `<fairplay-cert-url>` with the url to the fairplay certificate. Please contact support@vualto.com if you do not have this url.
4. In the file `vuplay.js` replace `<vudrm-token>` with a vudrm token from [https://admin.drm.technology](https://admin.drm.technology)

### Build and run the code

This repo contains a development node.js server. This server is not suitable for production.

1. Add the host `jwplayer.vuplay.local.drm.technology` to your local machine's hosts file.
2. Run `grunt serve --jwplayer-key=<your-jwplayer-key>`, replacing `<your-jwplayer-key>` with your jwplayer key.
3. Load a supported browser and go to `https://jwplayer.vuplay.local.drm.technology:14703`

You will need an enterprise license with JWPlayer in order to playback DRM encrypted content. Please contact support@vualto.com or [JWPlayer](https://www.jwplayer.com/pricing/) for more information. To retrieve the jwplayer key [click here](https://dashboard.jwplayer.com/#/players/downloads) and copy the license key for the appropriate player in the `Downloads` section.

In order to allow DRM encrypted playback in chrome (https://goo.gl/EEhZqT), SSL has been enabled for the demo. You will get a warning about an invalid cert `NET::ERR_CERT_AUTHORITY_INVALID` but this can safely be ignored.

### Browser support

The browser must support [encrypted media extensions](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/).
Currently this includes the latest versions of Chrome, Firefox, Internet Explorer 11 and Edge.
For a complete breakdown of supported media extensions please contact support@vualto.com

## Useful links

### vudrm

- [Contact vualto](http://www.vualto.com/contact-us/)
- [vudrm](http://vudrm.vualto.com/)
- [vudrm token documentation](http://readme.drm.technology/vudrm/VuDrmTokenIntegration/)

### mpeg-DASH

- [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)
- [What is MPEG-DASH](http://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx)
- [Widevine](http://www.widevine.com/)
- [PlayReady](https://www.microsoft.com/playready/)

### HLS

- [Apple's introduction to HLS](https://developer.apple.com/streaming/)
- [Fairplay](https://developer.apple.com/streaming/fps/)

### Encrpyted media extensions

- [Encrypted media extensions specification](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/)
- [Encrypted media extensions wikipedia](https://en.wikipedia.org/wiki/Encrypted_Media_Extensions)
- [Encrypted media extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
- [Intro to encrypted media extensions](https://www.html5rocks.com/en/tutorials/eme/basics/)

### JWPlayer

- [Homepage](https://www.jwplayer.com/)
- [Pricing](https://www.jwplayer.com/pricing/)
- [Developer Portal](https://developer.jwplayer.com)
- [JWPlayer article on DRM](https://support.jwplayer.com/customer/portal/articles/2561182-drm-digital-rights-management)
- [JWPlayer documentation on the configuration of DRM with JWPlayer](https://developer.jwplayer.com/jw-player/docs/developer-guide/customization/configuration-reference/#drm)

### Build tools

- [npm](https://www.npmjs.com/)
- [grunt](http://gruntjs.com/)
