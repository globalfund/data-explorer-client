import { css } from "styled-components/macro";

export const newsletterIllustrationcss = css`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding-left: 80px;
  padding-right: 80px;

  background: linear-gradient(180deg, #a4a0ff 0%, #f8fcfc 100%);
  padding-top: 271px;

  h1 {
    color: #6061e5;
    font-size: 34px;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    line-height: 41.5px;
  }
  p {
    font-size: 18px;
    font-family: "Gotham Narrow Bold", sans-serif;
    color: #231d2c;
    margin-top: 44px;
    font-weight: 700;
  }
  div {
    position: relative;
    width: 100%;
  }
`;

export const subscribedcss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 40px;
  padding-right: 48px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    b:nth-child(1),
    b:nth-child(2) {
      text-align: center;
      font-weight: 325;
      font-size: 18px;
      line-height: 22px;
      color: #231d2c;
      font-family: "Gotham Narrow", sans-serif;
    }
    p {
      font-family: "Gotham Narrow", sans-serif;

      text-align: center;
    }
    p:last-child {
      font-size: 14px;
      color: #b6b6b6;
    }
  }
`;

export const notSubscribedcss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 40px;
  padding-right: 48px;
  div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    p {
      text-align: center;
      font-weight: 325;
      font-size: 14px;
      line-height: 17px;
      font-family: "Gotham Narrow", sans-serif;
    }
  }
  input {
    background: #f7f7f7;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    outline: none;
    border: none;
    height: 100%;
    padding-left: 24px;
    width: 70%;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    color: #000000;
  }
  button {
    background: #231d2c;
    border-radius: 0px 34.5px 34.5px 0px;
    outline: none;
    border: none;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    height: 100%;
    width: 30%;
    :hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }
`;

export const bigEllipsecss = css`
  position: absolute;
  z-index: -1;
  top: -40px;
  left: -8%;
`;

export const midEllipsecss = css`
  position: absolute;
  z-index: -1;
  top: 16rem;
  left: 36%;
`;

export const btmGreenEllipsecss = css`
  position: absolute;
  z-index: -1;
  top: 23rem;
  left: 52%;
`;

export const btmPurpleEllipsecss = css`
  position: absolute;
  z-index: -1;
  top: 8rem;
  left: 74%;
`;

export const datasetIllustrationcss = css`
  position: absolute;
  z-index: 3;
  top: 13rem;
  left: 24%;
`;

export const chartIllustrationcss = css`
  position: absolute;
  z-index: 2;
  top: 6rem;
  left: 40%;
`;

export const reportIllustrationcss = css`
  position: absolute;
  z-index: 1;
  top: 45%;
  left: -1.5%;
`;

export const topEllipsecss = css`
  position: absolute;
  top: 0;
  right: 0%;
`;
