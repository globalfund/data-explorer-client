import { css } from "styled-components/macro";

export const homeFootercss = css`
  bottom: 0;
  width: 100vw;
  height: 92px;
  display: flex;
  background: #fff;
  position: absolute;
  align-items: center;
  justify-content: flex-start;

  ul {
    gap: 30px;
    padding: 0;
    color: #000;
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: flex-start;
    font-family: "Inter", sans-serif;
  }

  li {
    list-style-type: none;

    a {
      color: #000;
      text-decoration: none;
    }
  }
`;
