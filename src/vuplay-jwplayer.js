(function() {
    // Set the mpeg-dash stream URL.
    var dashStreamURL = "<mpeg-dash-stream-url>";
    // Set the hls stream URL.
    var hlsStreamURL = "<hls-stream-url>";
    // Please login to https://admin.drm.technology to generate a VUDRM token.
    var vudrmToken = "<your-vudrm-token>";

    // Set the URL to retrieve the fairplay certificate from.
    // Replace "<client>" with your client name. Please contact support@vualto.com if you do not know what this is.
    var fairplayCertURL =
        "https://fairplay-license.drm.technology/certificate/<client>";

    // The following three methods are required by JWPlayer for the VUDRM Fairplay integration.
    // This method will extract the content id that is used when creating the SCP and when making the license request.
    var contentId = null;
    var extractContentId = function(initData) {
        var laURLAsArray = initData.split("/");
        contentId = laURLAsArray[laURLAsArray.length - 1];
        return contentId;
    };

    // This method overrides the normal license request body with a VUDRM compatible one.
    // The VUDRM token and content id are required by the VUDRM license server.
    // The playload is the SCP used by the KSM to create the CKC
    var createLicenseRequestMessage = function(keyMessage) {
        var body = {
            token: vudrmToken,
            contentId: contentId,
            payload: base64EncodeUint8Array(keyMessage),
        };
        return JSON.stringify(body);
    };

    // This is a utility method used to convert the Uint8Array key message into a base64 encoded string used as the payload in the license request.
    var base64EncodeUint8Array = function(input) {
        var keyStr =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN;
            chr3 = i < input.length ? input[i++] : Number.NaN;

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output +=
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
        }
        return output;
    };

    // Create the PlayReady DRM configuration. The VUDRM token can be attached to the license server URL.
    // The VUDRM token must be URL encoded.
    var playReadyDrmConfig = {
        url:
            "https://playready-license.drm.technology/rightsmanager.asmx?token=" +
            encodeURIComponent(vudrmToken),
    };

    // Create the Widevine DRM configuration. Pass the license server URL.
    // VUDRM requests a custom json body to be sent and so will override the default license request body injecting the vudrm token and key id.
    var widevineDrmConfig = {
        url: "https://widevine-proxy.drm.technology/proxy",
        licenseRequestFilter: function(request, drmInfo) {
            var keyId = drmInfo.keyIds[0].toUpperCase();
            var body = JSON.stringify({
                token: vudrmToken,
                drm_info: Array.apply(null, new Uint8Array(request.body)),
                kid: keyId,
            });
            request.body = body;
            request.headers["Content-Type"] = "application/json";
        },
    };

    // Create the Fairplay DRM configuration. Pass the fairplay certificate URL, the license server URL (processSpcUrl) and the extracted content id.
    var fairplayDrmConfig = {
        certificateUrl: fairplayCertURL,
        processSpcUrl: "https://fairplay-license.drm.technology/license",
        extractContentId: extractContentId,
        licenseRequestHeaders: [
            {
                name: "Content-Type",
                value: "application/json",
            },
        ],
        licenseResponseType: "arraybuffer",
        licenseRequestMessage: createLicenseRequestMessage,
    };

    // setup jwplayer, passing the stream URLs and DRM configurations.
    jwplayer("player").setup({
        playlist: [
            {
                sources: [
                    {
                        file: dashStreamURL,
                        drm: {
                            playready: playReadyDrmConfig,
                            widevine: widevineDrmConfig,
                        },
                        image: "vuplay_poster.png",
                    },
                    {
                        file: hlsStreamURL,
                        drm: {
                            fairplay: fairplayDrmConfig,
                        },
                        image: "vuplay_poster.png",
                    },
                ],
            },
        ],
    });
})();
