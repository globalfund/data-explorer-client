import { css } from "styled-components/macro";

export const blockcss = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  p {
    font-weight: 325;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #495057;
  }
`;

export const containercss = css`
  border: 1px dashed #adb5bd;
  width: 916px;
  height: 252px;
  position: relative;
  padding: 5px 40px;

  p {
    font-weight: 325;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
  }
`;
