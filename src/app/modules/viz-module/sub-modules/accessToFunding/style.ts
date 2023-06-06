import { css } from "styled-components/macro";

export const chipcss = (active: boolean) => css`
  padding: 7px 24px;
  width: max-content;
  height: 32px;
  background: ${active ? "#252c34" : "#c7cdd1"};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 700;
  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  cursor: pointer;
  &:hover {
    background-color: #252c34;
  }
`;

export const descriptioncss = css`
  text-align: center;
  font-family: "Gotham Narrow";

  p {
    color: #000;
    width: 100%;
    margin: auto;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    a {
      font-weight: 700;
    }
  }

  h1 {
    color: #252c34;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0px;
  }

  h3 {
    color: #252c34;
    margin-top: 3px;
    font-size: 18px;
    font-weight: 400;
  }
`;

export const vizcss = css`
  a {
    color: #252c34;
  }
  h4 {
    font-size: 18px;
    color: #252c34;
    margin-bottom: 0;
    font-family: "Gotham Narrow";
  }
  hr {
    border: 0.5px solid #000000;
    width: 100%;
    height: 0px;
  }
`;
