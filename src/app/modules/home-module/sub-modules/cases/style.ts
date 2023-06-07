import { css } from "styled-components/macro";

export const empowercss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Gotham Narrow Bold", sans-serif;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #f2f7fd 100%);

  padding: 113px 0;
  h1 {
    font-family: "Gotham Narrow Bold", sans-serif;
    color: #231d2c;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 36px;
  }
  p {
    font-size: 18px;
    line-height: 22px;
    font-family: "Gotham Narrow Bold", sans-serif;
    color: #495057;
    margin-top: 0;
  }
  div {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 34px;
  }
`;

export const TopRightEllipseCss = css`
  top: 0;
  right: 0;
  z-index: 1;
  position: absolute;
`;
export const BottomRightEllipseCss = css`
  bottom: 0%;
  right: 0;
  /* z-index: 1; */
  position: absolute;
`;
export const BottomLeftEllipseCss = css`
  bottom: 0%;
  left: 0;
  position: absolute;
`;
export const SmallEllipseCss = css`
  top: 218.2px;
  right: 10%;
  z-index: 0;
  position: absolute;
`;

export const TabCardEllipseCss = css`
  top: 7%;
  right: 25%;
  z-index: -1;
  position: absolute;
`;
export const quotesEllipseCss = css`
  top: 3%;
  left: -0.1%;
  z-index: 0;
  position: absolute;
`;

export const useDXcss = css`
  color: #231d2c;
  width: 60%;
  h2 {
    font-weight: 350;
    font-size: 48px;
    line-height: 58px;
    text-align: center;
    font-family: "Gotham Narrow Bold", sans-serif;
  }
  h3 {
    font-size: 24px;
    line-height: 29px;
    font-family: "Gotham Narrow Bold", sans-serif;
    text-align: center;
  }
  p {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
`;

export const quotecss = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-top: 97px;
  width: 78%;
  font-family: "Inter", sans-serif;
  p {
    font-weight: 500;
    font-size: 48px;
    line-height: 58px;
    text-align: center;
    margin: 0;
  }
  img {
    margin-bottom: 15px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 28px;
    b {
      color: #6061e5;
      margin: 0;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
    }
  }
`;

export const bestDecisioncss = css`
  h4 {
    font-size: 48px;
    line-height: 58px;
    text-align: center;
    font-family: "Gotham Narrow Bold", sans-serif;
    color: #231d2c;
    margin: 0;
    margin-bottom: 36px;
  }
  button {
    outline: none;
    border: none;
    background: #ffffff;
    border-radius: 30px;
    height: 41px;
    color: #231d2c;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 27px;
    gap: 10px;
    text-transform: uppercase;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #231d2c;
    :hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
`;
