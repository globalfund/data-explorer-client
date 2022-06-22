import { css } from "styled-components/macro";

export const themeCardCss = css`
  padding: 20px 15px;
  color: #262c34;
  background: #fff;
  border: 2px solid #fff;
  height: 205px;
  width: 353px;
  border-radius: 23px;
  cursor: pointer;

  &:hover {
    border-color: #13183f;
  }

  > h1 {
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 0;
    margin-bottom: 1rem;
    color: #000;
  }
`;

export const cardGraphsCss = css`
  display: flex;
  justify-content: space-between;
  > div {
    height: 91px;
    width: 150px;
    left: 17px;
    top: 90px;
    border-radius: 5px;
    padding: 1rem;
    background: #f1f3f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const cardLabelCss = css`
  display: flex;
  margin-bottom: 1rem;
  > h3 {
    height: 15px;
    width: 79px;
    border-radius: 26.707237243652344px;
    background: #868e96;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0.5px;
    margin: 0;
  }
  > p {
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    color: #262c34;
    margin: 0;
    margin-left: 1rem;
  }
`;
