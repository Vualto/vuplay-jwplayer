// Set the mpeg-dash stream url.
var mpegDashStreamUrl = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/sintel/sintel.ism/manifest.mpd";

// Set the hls stream url.
var hlsStreamUrl = "https://d1chyo78gdexn4.cloudfront.net/vualto-demo/sintel/sintel.ism/manifest.m3u8"

// Set the url to retrieve the fairplay certificate from.
// Please contact support@vualto.com if you do not know what this is.
var fairplayCertUrl = "https://fairplay-license.drm.technology/certificate"

// Please login to https://admin.drm.technology to generate a vudrm token.
var vudrmToken = "vualto-demo|2017-07-10T16:42:59Z|YSnJPmEceoKkA3sc3q2KdoasABL13fJ19sHQc/b9O++MWwGf/dJlbyTVOdoRpA3S|2c40f33c47f7fd7dbdce82e3bff6fc764f2497a9"


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

// setup jwplayer, passing the stream urls, fairplay cert url, license server urls and vudrm token.
jwplayer('player').setup({
  playlist: [{
    sources: [
      {
        file: mpegDashStreamUrl,
        drm: {
          playready: {
            url: "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken)
          }
        }
      },
      {
        file: hlsStreamUrl,
        drm: {
          fairplay: {
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
          }
        }
      }
    ]
  }]
});