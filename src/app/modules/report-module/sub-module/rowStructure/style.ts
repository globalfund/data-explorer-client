import { css } from "styled-components/macro";

export const blockcss = css`
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: column;

  p {
    color: #495057;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.5px;
  }
`;

export const containercss = css`
  width: 100%;
  height: 252px;
  padding: 5px 40px;
  position: relative;
  border: 1px dashed #adb5bd;

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: center;
  }
`;
