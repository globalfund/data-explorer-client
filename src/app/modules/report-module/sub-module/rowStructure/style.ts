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
  width: 100%;
  height: 252px;
  position: relative;
  padding: 5px 40px;
  margin: 20px 0;

  p {
    font-weight: 325;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
  }
`;
