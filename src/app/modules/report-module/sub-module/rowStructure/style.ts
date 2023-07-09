import { css } from "styled-components/macro";

export const blockcss = css`
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: column;

  &:hover {
    > div {
      > div {
        background: #231d2c;
      }
    }
  }

  p {
    color: #495057;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.5px;
  }
`;

export const containercss = css`
  width: 100%;
  /* height: 259px; */
  background: #d9d9d900;
  padding: 5px 40px 35px 40px;

  position: relative;
  border-radius: 8px;
  border: 1px dashed #adb5bd;

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: center;
  }
`;

export const overlaycss = css`
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent; */
`;
