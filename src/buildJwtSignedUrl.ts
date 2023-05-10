import { sign } from "jsonwebtoken-esm";

const DEFAULT_HOST = "https://cdn.jwplayer.com";

/**
 * https://docs.jwplayer.com/platform/docs/protection-studio-drm-generate-a-signed-content-url-for-drm-playback
 */
export default function buildJwtSignedUrl(
  path: string,
  apiSecret: string,
  host = DEFAULT_HOST
) {
  const time = new Date();

  const token = sign(
    {
      exp: Math.ceil((time.getTime() + 3600) / 300) * 300,
      resource: path,
    },
    apiSecret
  );

  return `${host}${path}?token=${token}`;
}
