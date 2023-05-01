import { css } from "styled-components";

export const layoutcss = css`
  margin-top: 3rem;
`;
export const tabcss = (active: boolean) => css`
  width: 224px;
  height: 48px;
  border: 1px solid #231d2c;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  p {
    text-transform: capitalize;
    color: ${active ? "#6061E5" : "#231D2C"};
  }
`;
export const profilecss = css`
  font-family: "Inter", "Helvetica Neue", sans-serif;
  font-style: normal;

  h4 {
    font-weight: 700;
    font-size: 24px;
    color: #6061e5;
  }
  p {
    width: 11vw;
    font-weight: 400;
  }
`;
export const flexContainercss = css`
  display: grid;
  grid-template-columns: 31% auto;
  align-items: center;
  margin-bottom: 20px;
`;
export const bigAvicss = css`
  width: 223px;
  height: 223px;
  background: #dadaf8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-weight: 500;
    font-size: 96px;
    color: #231d2c;
  }
`;
export const avicss = css`
  width: 52px;
  height: 52px;
  background: #dadaf8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  justify-self: flex-start;
  b {
    font-size: 22.0606px;
    line-height: 32px;
  }
`;
export const inputcss = css`
  border: 1px solid #231d2c;
  border-radius: 10px;
  background: #ffffff;

  width: 100%;
  height: 48px;
  color: #231d2c;
  padding-left: 20px;
`;
