# JW Player DRM Tester

## Description

This repository will demonstrate how to use [Studio DRM](https://developer.jwplayer.com/jwplayer/docs/studio-drm-standalone-getting-started) with [JW Player](https://jwplayer.com).
If you have any questions please contact <support@jwplayer.com>

## Instructions

### Install dependencies

1. Install [npm](https://www.npmjs.com/)
1. Clone the repository: `git clone git@github.com:hahow/studiodrm-jwplayer.git`
1. Navigate to the project's root folder: `cd studiodrm-jwplayer`
1. Install the dependencies: `npm install`

### Build and run the dev environment

1. Open the repository in your favorite javascript editor.
1. Run `npm run dev` in the project's root.
1. Load a supported browser and go to `http://127.0.0.1:5173`
1. In the demo page replace `Player Library URL` with the cloud player library url found in the "Player Downloads & Keys" section of your JW Player account on the dashboard. Please refer to the following documentation for guidance on retrieving your [cloud player library url](https://developer.jwplayer.com/jwplayer/docs/jw8-add-a-player-library#cloud-hosted)
1. In the demo page replace `API Secret`. Please refer to the following documentation for guidance on retrieving your [signature](https://docs.jwplayer.com/platform/reference/protect-your-content-with-signed-urls#signature)
1. In the demo page replace `Media ID` and `Policy ID`. Please refer to the following documentation for guidance on retrieving your [policy ID](https://docs.jwplayer.com/platform/docs/protection-studio-drm-generate-a-signed-content-url-for-drm-playback)

You will need an enterprise license with JW Player in order to playback DRM encrypted content. Please contact <support@jwplayer.com> or see [JW Player pricing](https://www.jwplayer.com/pricing/) for more information. 

### Browser support

The browser must support [encrypted media extensions](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/).
Currently this includes the latest versions of Chrome, Firefox, Internet Explorer 11 and Edge.
For a complete breakdown of supported media extensions please contact <support@jwplayer.com>
