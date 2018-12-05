// Set the mpeg-dash stream url.
var mpegDashStreamUrl = "<mpeg-dash-stream-url>";

// Set the hls stream url.
var hlsStreamUrl = "<hls-stream-url>"

// Set the url to retrieve the fairplay certificate from.
// Replace "<client>" with your client name. Please contact support@vualto.com if you do not know what this is.
var fairplayCertUrl = "https://fairplay-license.drm.technology/certificate/<client>"

// Please login to https://admin.drm.technology to generate a vudrm token.
var vudrmToken = "<vudrm-token>"


// The following three methods are required by JWPlayer for the vudrm Fairplay integration.
// This method will extract the content id that is used when creating the SCP and when making the license request.
var contentId = null;
var extractContentId = function (initData) {
  var laurlAsArray = initData.split("/");
  contentId = laurlAsArray[laurlAsArray.length - 1];
  return contentId;
};

// This method overrides the normal license request body with a vudrm compatible one. 
// The vudrm token and content id are required by the vudrm license server.
// The playload is the SCP used by the KSM to create the CKC
var createLicenseRequestMessage = function (keyMessage) {
  var body = {
    "token": vudrmToken,
    "contentId": contentId,
    "payload": base64EncodeUint8Array(keyMessage)
  };
  return JSON.stringify(body);
};

// This is a utility method used to convert the Uint8Array key message into a base64 encoded string used as the payload in the license request.
var base64EncodeUint8Array = function (input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
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
    output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
};

// Create the PlayReady DRM configuration. The vudrm token can be attached to the license server url. 
// The vudrm token must be URL encoded.
var playReadyDrmConfig = {
  url: "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken)
};

// Create the Widevine DRM configuration. Pass the license server url.
// vudrm requests a custom json body to be sent and so will override the default license request body injecting the vudrm token and key id.
var widevineDrmConfig = {
  url: "https://widevine-proxy.drm.technology/proxy",
  licenseRequestFilter: function (request, drmInfo) {
    var keyId = drmInfo.keyIds[0].toUpperCase();
    var body = JSON.stringify({
      token: vudrmToken,
      drm_info: Array.apply(null, new Uint8Array(request.body)),
      kid: keyId
    });
    request.body = body;
    request.headers["Content-Type"] = "application/json";
  }
};

// Create the Fairplay DRM configuration. Pass the fairplay certificate url, the license server url (processSpcUrl) and the extracted content id. 
var fairplayDrmConfig = {
  certificateUrl: fairplayCertUrl,
  processSpcUrl: "https://fairplay-license.drm.technology/license",
  extractContentId: extractContentId,
  licenseRequestHeaders: [
    {
      "name": "Content-Type",
      "value": "application/json"
    }
  ],
  licenseResponseType: "arraybuffer",
  licenseRequestMessage: createLicenseRequestMessage
};

// setup jwplayer, passing the stream urls and DRM configurations.
jwplayer('player').setup({
  playlist: [{
    sources: [
      {
        file: mpegDashStreamUrl,
        drm: {
          playready: playReadyDrmConfig,
          widevine: widevineDrmConfig
        }
      },
      {
        file: hlsStreamUrl,
        drm: {
          fairplay: fairplayDrmConfig
        }
      }
    ]
  }]
});
