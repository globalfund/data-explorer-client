import { css } from "styled-components/macro";

export const benefitscss = css`
  position: relative;
  z-index: 1;

  h2 {
    font-weight: 400;
    font-size: 36px;
    line-height: 43px;
    text-align: center;
    color: #000000;
    font-family: "Gotham Narrow", sans-serif;
    margin-bottom: 60px;
    margin-top: 0px;
  }
  h3 {
    font-family: "Gotham Narrow", sans-serif;
    font-weight: 400;
    font-size: 40px;
    line-height: 48px;

    margin: 0;
  }

  p {
    font-weight: 325;
    font-size: 24px;
    line-height: 29px;
    /* width: 90%; */
    font-family: "Gotham Narrow Light", sans-serif;
    margin-top: 14px;
  }
`;

export const firstColcss = css`
  display: grid;
  grid-template-rows: 42.45% 55.5%;
  row-gap: 17px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 19px;
    padding-right: 19px;
  }
  div:nth-child(1) {
    width: 580px;
    height: 363px;
    background: #6061e5;
    border-radius: 16px;
    h3 {
      color: #fff;
    }
    p {
      color: #fff;
    }
  }
  div:nth-child(2) {
    width: 580px;
    height: 475px;
    background: #dadaf8;
    border-radius: 16px;
    h3 {
      color: #000000;
    }
    p {
      color: #000000;
    }
  }
`;

export const secondColcss = css`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 17px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 19px;
    padding-right: 19px;

    h3 {
      color: #fff;
    }
    p {
      color: #fff;
    }
  }
  div:nth-child(1) {
    width: 323px;
    height: 274px;
    background: #359c96;
    border-radius: 16px;
  }
  div:nth-child(2) {
    width: 323px;
    height: 273px;
    background: #231d2c;
    border-radius: 16px;
  }

  div:nth-child(3) {
    width: 323px;
    height: 273px;
    background: #e492bd;
    border-radius: 16px;
  }
`;

export const thirdColcss = css`
  display: grid;
  grid-template-rows: 72% 38%;
  row-gap: 17px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 19px;
    padding-right: 19px;
  }
  div:nth-child(1) {
    width: 296px;
    height: 609px;
    background: #daf5f3;
    border-radius: 16px;
    h3 {
      color: #000000;
    }
    p {
      color: #000000;
    }
  }
  div:nth-child(2) {
    width: 296px;
    height: 223px;
    background: #adb5bd;
    border-radius: 16px;
    h3 {
      color: #fff;
    }
    p {
      color: #fff;
    }
  }
`;

export const simpleStepsCss = css`
  z-index: 2;
  padding: 59px 190px 79px 190px;
  height: 587px;
  background: #dadaf8;
  box-shadow: 0px 4px 30px 4px rgba(206, 168, 188, 0.08);
  /**sets the content to the viewport width and centers it; because this div has to be wider than it's parent**/
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  /**end**/
  h2 {
    color: #231d2c;
    font-weight: 400;
    font-size: 40px;
    font-family: "Gotham Narrow", sans-serif;
    text-align: center;
    margin: 0;
    margin-bottom: 73px;
  }
  div {
    text-transform: uppercase;
    text-align: center;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    p:nth-of-type(1) {
      color: #000;
      text-align: center;
      font-family: "Gotham Narrow", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 325;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 0px;
    }
    p:nth-child(2) {
      color: #000;
      text-align: center;
      font-family: "Gotham Narrow", sans-serif;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 10px 0;
      /* margin-top: 10px; */
    }
    p:nth-of-type(3) {
      color: #000;

      text-align: center;
      font-family: "Gotham Narrow", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 125% */
      letter-spacing: 0.5px;
      margin: 0px;
    }
  }
`;
