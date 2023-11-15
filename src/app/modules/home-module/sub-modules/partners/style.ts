import { css } from "styled-components/macro";

export const empowercss = css`
  display: flex;
  height: 445px;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 113px 0 55px 0;
  font-family: "Gotham Narrow Bold", sans-serif;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #f2f7fd 100%);
  a {
    text-decoration: none;
  }

  h1 {
    margin-top: 0;
    color: #231d2c;
    font-size: 40px;
    line-height: 48px;
    white-space: pre-line;
    text-align: center;
    margin-bottom: 36px;
    font-family: "Gotham Narrow Bold", sans-serif;
  }
  p {
    margin: 0;
    color: #495057;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    font-family: "Gotham Narrow Bold", sans-serif;
  }
  div {
    gap: 34px;
    display: flex;
    margin-top: 40px;
    align-items: center;
    justify-content: center;
  }
  #auth-buttons {
    button,
    a {
      padding: 9px 27px;
      height: 41px;
      border-radius: 30px;
      outline: none;
      border: none;
      color: #ffffff;
      font-family: "Inter", sans-serif;
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      text-decoration: none;

      :hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
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
  left: -5.1%;
  z-index: -1;
  position: absolute;
`;

export const useDXcss = css`
  color: #231d2c;
  width: 60%;
  h2 {
    font-weight: 350;
    font-size: 40px;
    line-height: 58px;
    text-align: center;
    font-weight: bold;
  }
  h3 {
    font-size: 24px;
    line-height: 29px;
    font-family: "Gotham Narrow Bold", sans-serif;
    text-align: center;
    margin-bottom: 0;
  }
  p {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    margin-top: 8px;
  }
`;

export const quotecss = css`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 78%;
  p {
    font-weight: 500;
    font-size: 40px;
    line-height: 58px;
    text-align: center;
    font-family: "Inter", sans-serif;

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
      font-family: "Inter", sans-serif !important;
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
  div {
    button {
      gap: 10px;
      color: #231d2c;
      display: flex;
      padding: 9px 18px;
      background: #fff;
      font-weight: 700;
      font-family: "Inter", sans-serif;
      font-size: 14px;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      border: none;
      outline: none;
      border-radius: 30px;
      :hover {
        opacity: 0.95;
        cursor: pointer;
      }
      > svg {
        transform: scale(0.8);
      }
    }
  }
  a {
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
      p {
        text-transform: uppercase;
        font-family: "Inter", sans-serif;
        font-weight: 700;
        font-size: 14px;
        color: #231d2c;
      }
      :hover {
        opacity: 0.95;
        cursor: pointer;
      }
    }
  }
`;
