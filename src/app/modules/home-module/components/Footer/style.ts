import { css } from "styled-components/macro";

export const homeFootercss = css`
  background-color: white;
  height: 64px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-family: "Inter", sans-serif;
    gap: 30px;
    padding: 0;
    color: #000000;
  }
  li {
    list-style-type: none;
  }
`;
