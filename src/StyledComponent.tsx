import { Empty, Result, Spin } from "antd";
import styled, { css } from "styled-components";

const centerMixin = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledEmpty = styled(Empty)`
  ${centerMixin};
`;

export const StyledResult = styled(Result)`
  ${centerMixin};
`;

export const StyledSpin = styled(Spin)`
  ${centerMixin};
`;
