// Set the mpeg-dash stream url.
var mpegDashStreamUrl = "<mpeg-dash-stream-url>";

// Set the hls stream url.
var hlsStreamUrl = "<hls-stream-url>"

// Please login to https://admin.drm.technology to generate a vudrm token.
var vudrmToken = "<your-vudrm-token>"

// setup jwplayer, passing the stream urls, license server urls and vudrm token.
jwplayer('player').setup({
  playlist: [
    {
    file: mpegDashStreamUrl,
      drm: {
        playready: {
          url: "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken)
        }
      }
    }]
});