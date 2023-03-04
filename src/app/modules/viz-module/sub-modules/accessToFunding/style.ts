import { css } from "styled-components/macro";

export const chipcss = css`
  padding: 7px 24px;
  width: max-content;
  height: 32px;
  background: #c7cdd1;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #252c34;
  }
`;

export const descriptioncss = css`
  text-align: center;
  font-family: "Gotham Narrow";
  p {
    font-weight: 325;
    font-size: 14px;
    color: #000000;
    width: 60%;
    margin: auto;
    line-height: 17px;
  }
  h1 {
    font-weight: 700;
    font-size: 24px;
    color: #252c34;
    margin-bottom: 0px;
  }
  h3 {
    font-weight: 400;
    font-size: 18px;
    color: #252c34;
    margin-top: 3px;
  }
`;

export const vizcss = css`
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
    margin-bottom: 3rem;
  }
`;
