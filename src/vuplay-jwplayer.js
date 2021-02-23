(function() {
    // Set the mpeg-dash stream URL.
    var dashStreamURL = "<dash-stream-url>";
    // Set the hls stream URL.
    var hlsStreamURL = "<hls-stream-url>";

    // Set the URL to retrieve the fairplay certificate from.
    var fairplayCertURL = "<fairplay-cert-url>";

    // Please login to https://admin.vudrm.tech to generate a VUDRM token.
    var vudrmToken = "<your-vudrm-token>";

    // Required by JWPlayer: https://developer.jwplayer.com/jwplayer/docs/jw8-enable-drm-through-the-web-player#section-implementation
    function base64EncodeUint8Array(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
    
        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
            chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here
    
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
    
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    }
    
    // setup jwplayer, passing the stream URLs and DRM configurations.  
    jwplayer("vuplay-container").setup({
        "playlist": [{
            "sources": [{
                "file": dashStreamURL,
                "drm": {
                    "widevine": {
                        "url": "https://widevine-license.vudrm.tech/proxy",
                        "headers": [{
                            "name": "X-VUDRM-TOKEN",
                            "value": vudrmToken
                        }]
                    },
                    "playready": {
                        "url": "https://playready-license.vudrm.tech/rightsmanager.asmx",
                        "headers": [{
                            "name": "X-VUDRM-TOKEN",
                            "value": vudrmToken
                        }]
                    }
                }
            }, 
            {
                "file": hlsStreamURL,
                // "drm": {
                //     "fairplay": {
                //         "certificateUrl": fairplayCertURL,
                //         "processSpcUrl": "https://fairplay-license.vudrm.tech/license",
                //         "licenseRequestFilter": function(request, drmInfo) {
                //             console.info("got here");
                //         }// TODO get the URL from the manifest.
                //     }
                // }
            }]
        }]
    });
})();
