import JWPlayer from "@jwplayer/jwplayer-react";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, Layout, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import JSONPretty from "react-json-pretty";

import "react-json-pretty/themes/monikai.css";

import buildJwtSignedUrl from "./buildJwtSignedUrl";
import ExternalLink from "./ExternalLink";
import { StyledEmpty, StyledResult, StyledSpin } from "./StyledComponent";

const DEFAULT_PLAYER_LIBRARY_URL =
  "https://cdn.jwplayer.com/libraries/WsGPf9OL.js";
const DEFAULT_MEDIA_ID = "uyt8hBv0";
const DEFAULT_POLICY_ID = "reHxl2Dd";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

function App() {
  const [playerLibraryUrl, setPlayerLibraryUrl] = useState("");

  const [apiSecret, setApiSecret] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [policyId, setPolicyId] = useState("");

  const [signedUrl, setSignedUrl] = useState("");

  const { data, error, isError, isFetched, isFetching, isSuccess } = useQuery<
    any,
    Error
  >({
    queryKey: ["playlist", { apiSecret, mediaId, policyId }],
    queryFn: async () => {
      // https://stackoverflow.com/questions/63015103/handling-unauthorized-request-in-react-query
      // https://tanstack.com/query/v4/docs/react/guides/query-functions#handling-and-throwing-errors
      const res = await fetch(signedUrl);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
    enabled: !!signedUrl,
  });

  const onFinish = (values) => {
    const { apiSecret, mediaId, playerLibraryUrl, policyId } = values;

    const jwtSignedUrl = buildJwtSignedUrl(
      `/v2/media/${mediaId}/drm/${policyId}`,
      apiSecret
    );

    setPlayerLibraryUrl(playerLibraryUrl);

    setApiSecret(apiSecret);
    setMediaId(mediaId);
    setPolicyId(policyId);

    setSignedUrl(jwtSignedUrl);
  };

  return (
    <Layout>
      <Content>
        <Row>
          <Col span={8} style={{ padding: 16 }}>
            <Space direction="vertical">
              <Typography>
                <Title>JW Player DRM Tester</Title>
                <Paragraph ellipsis={{ expandable: true, rows: 10 }}>
                  <p>
                    This is a Stream Tester for{" "}
                    <ExternalLink href="https://docs.jwplayer.com/platform/docs/protection-studio-drm-overview">
                      Studio DRM with JW Platform
                    </ExternalLink>
                    .
                  </p>
                  <p>
                    JW Player provides a simplified approach to protecting your
                    content with industry-standard Digital Rights Management
                    (DRM). By enabling DRM on a property from your JW Player
                    dashboard, the complex aspects of DRM management are managed
                    by JW Player on your behalf:
                  </p>
                  <ul>
                    <li>Several configured DRM policies</li>
                    <li>
                      DRM license generation and management for Widevine,
                      PlayReady, and Fairplay DRM solutions
                    </li>
                    <li>
                      License delivery services for content playback on any
                      device
                    </li>
                  </ul>
                  <p>
                    With JW Player managing the technical aspects of DRM, you
                    can focus on the design and implementation of engaging
                    content experiences.
                  </p>
                </Paragraph>
              </Typography>
              <Form
                initialValues={{
                  mediaId: DEFAULT_MEDIA_ID,
                  playerLibraryUrl: DEFAULT_PLAYER_LIBRARY_URL,
                  policyId: DEFAULT_POLICY_ID,
                }}
                layout="vertical"
                name="form"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Player Library URL"
                  name="playerLibraryUrl"
                  rules={[{ required: true }]}
                  tooltip={
                    <ExternalLink href="https://docs.jwplayer.com/players/docs/jw8-add-a-player-library#cloud-hosted">
                      Add a player library (Web Player)
                    </ExternalLink>
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="API Secret"
                  name="apiSecret"
                  rules={[{ required: true }]}
                  tooltip={
                    <ExternalLink href="https://docs.jwplayer.com/platform/reference/protect-your-content-with-signed-urls#signature">
                      Protect your content with signed URLs
                    </ExternalLink>
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Media ID"
                  name="mediaId"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Policy ID"
                  name="policyId"
                  rules={[{ required: true }]}
                  tooltip={
                    <ExternalLink href="https://docs.jwplayer.com/platform/docs/protection-studio-drm-generate-a-signed-content-url-for-drm-playback">
                      Generate a signed content URL for DRM playback
                    </ExternalLink>
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" loading={isFetching} type="primary">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Col>
          <Col span={16}>
            {!isFetched && !isFetching && <StyledEmpty />}
            {!isFetched && isFetching && <StyledSpin size="large" />}
            {isError && (
              <StyledResult
                status="error"
                title="Submission Failed"
                subTitle={error.message}
              />
            )}
            {isSuccess && (
              <Space direction="vertical" style={{ display: "flex" }}>
                <JWPlayer
                  config={{ height: "100%" }}
                  key={mediaId} // FIXME: https://github.com/jwplayer/jwplayer-react/issues/20
                  library={playerLibraryUrl}
                  playlist={data.playlist}
                />
                <Input
                  addonBefore="GET"
                  disabled
                  size="large"
                  value={signedUrl}
                />
                <JSONPretty data={data} />
              </Space>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
