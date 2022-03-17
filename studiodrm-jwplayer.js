(function() {
    // Set the mpeg-dash stream URL.
    var dashStreamURL = "<dash-stream-url>";
    // Set the hls stream URL.
    var hlsStreamURL = "<hls-stream-url>";

    // Set the URL to retrieve the fairplay certificate from.
    var fairplayCertURL = "<fairplay-cert-url>";

    // TODO: Change the below to the JW Studio DRM docs 
    // Please login to https://admin.vudrm.tech to generate a StudioDRM token.
    var studioDrmToken = "<your-studiodrm-token>";
    
    // TODO: Change lines 23, 30, 50 with the new header name... X-STUDIODRM-TOKEN? - https://jwplayer.atlassian.net/browse/CP-27
    // setup jwplayer, passing the stream URLs and DRM configurations.
    jwplayer("studiodrm-container").setup({
        "playlist": [{
            "sources": [{
                "file": dashStreamURL,
                "drm": {
                    "widevine": {
                        "url": "https://widevine-license.vudrm.tech/proxy",
                        "headers": [{
                            "name": "X-VUDRM-TOKEN",
                            "value": studioDrmToken
                        }]
                    },
                    "playready": {
                        "url": "https://playready-license.vudrm.tech/rightsmanager.asmx",
                        "headers": [{
                            "name": "X-VUDRM-TOKEN",
                            "value": studioDrmToken
                        }]
                    }
                }
            }, 
            {
                "file": hlsStreamURL,
                "drm": {
                    "fairplay": {
                        "certificateUrl": fairplayCertURL,
                        "processSpcUrl": function (initData) {
                            return "https://" + initData.split("skd://").pop();
                        },
                        "licenseRequestHeaders": [
                            {
                                "name": "Content-type",
                                "value": "arraybuffer"
                            },
                            {
                                "name": "X-VUDRM-TOKEN",
                                "value": studioDrmToken
                            }
                        ]
                    }
                }
            }]
        }]
    });
})();
