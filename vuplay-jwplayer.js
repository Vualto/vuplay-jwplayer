(function() {
    // Set the mpeg-dash stream URL.
    var dashStreamURL = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/tomorrowland2015/tomorrowland2015.ism/manifest.mpd";
    // Set the hls stream URL.
    // var hlsStreamURL = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/tomorrowland2015/tomorrowland2015.ism/manifest.m3u8";

    // Set the URL to retrieve the fairplay certificate from.
    // var fairplayCertURL = "https://fairplay-license.vudrm.tech/certificate/vualto-demo";

    // Please login to https://admin.vudrm.tech to generate a VUDRM token.
    var vudrmToken = "vualto-demo|2022-02-21T17:21:35Z|v2|TRo81vIXkMhtEe+sUyzr8qbLn5M0OWO2m93+ev5sDi9cv04YPdl0npxWXu3E4cRyc38NwbMK9ZUJiAm5Fxcpgw==|424f6662ce7f6793a0ba93a480758a78c99228aef85bf806bf394103a23ae172";
    
    // setup jwplayer, passing the stream URLs and DRM configurations.  
    jwplayer("vuplay-container").setup({
        "playlist": [{
            "sources": [{
                "file": dashStreamURL,
                "drm": {
                    "widevine": {
                        "url": "https://widevine-license.staging.vudrm.tech/proxy",
                        "headers": [{
                            "name": "X-VUDRM-TOKEN",
                            "value": vudrmToken
                        }],
                        "licenseResponseFilter": function(response, drmInfo) {
                            vudrmToken = response.headers["x-vudrm-renewal-token"];
                            console.log("license response occured", vudrmToken, response, drmInfo);
                        }
                    }
                }
            }]
        }]
    });
})();
