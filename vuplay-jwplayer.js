(function() {
    // Set the mpeg-dash stream URL.
    var dashStreamURL = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/tomorrowland2015/tomorrowland2015.ism/manifest.mpd";
    // Set the hls stream URL.
    // var hlsStreamURL = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/tomorrowland2015/tomorrowland2015.ism/manifest.m3u8";

    // Set the URL to retrieve the fairplay certificate from.
    // var fairplayCertURL = "https://fairplay-license.vudrm.tech/certificate/vualto-demo";

    // Please login to https://admin.vudrm.tech to generate a VUDRM token.
    var vudrmToken = "vualto-demo|2022-02-18T13:50:40Z|v2|WdN04P3cGLhXVMP32EdI4g0/lY3f0GEzQbo4gngGVqxeQv0zTO7zNgMBq7LyV/0KkT8O84Y5wAJjEITGjqlmhg==|233ba637b81f241553b08a7d44bfa59c7c9a1ef201b2a824482d592c70b9fb08";
    
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
