import { css } from "styled-components/macro";

export const turnsDataCss = css`
  margin-top: 60px;
  position: relative;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
  background-color: yellow;
  h1 {
    font-family: "Gotham Narrow Bold", sans-serif;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    color: #231d2c;
    margin: 0;
  }

  p {
    color: #495057;
    font-family: "Gotham Narrow Bold", sans-serif;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    margin: 0;
  }

  button,
  a {
    padding: 12px 27px;
    height: 41px;
    border-radius: 30px;
    outline: none;
    border: none;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
    :nth-of-type(1) {
      background: #6061e5;
    }
    :nth-of-type(2) {
      background: #e492bd;
    }
  }
`;

export const featuredAssetsCss = css`
  h3 {
    font-size: 24px;
    font-family: "Gotham Narrow Bold", sans-serif;
    line-height: 29px;
    color: #000000;
    margin: 0;
  }
`;

export const datsetDetailImgcss = css`
  width: 710px;
  height: 428px;
  border-radius: 14px;
`;

export const rowFlexCss = css`
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const bottomLeftEllipseCss = css`
  position: absolute;
  left: -20%;
  bottom: 0;
`;
export const bottomRightEllipseCss = css`
  position: absolute;
  right: -17%;
  bottom: 0;
`;
export const TopRightEllipseCss = css`
  position: absolute;
  top: 0;
  right: -20%;
  z-index: -1;
`;

export const searchInputCss = (openSearch: boolean) => css`
  background: #dadaf8;
  display: flex;
  align-items: center;
  width: 385px;
  height: 32px;
  border-radius: 20px;
  opacity: ${openSearch ? 1 : 0};
  transition: all 0.5s ease-in-out 0s;
  input {
    outline: none;
    height: 100%;
    width: 92%;
    color: #231d2c;
    font-size: 14px;
    background: inherit;
    border-style: none;
    border-radius: 20px;

    padding: 6px 16px !important;
  }
`;

export const iconButtonCss = (active?: boolean) => css`
  padding: 3px;
  ${active
    ? ` svg > circle {
      fill:  #231d2c;
    }
    svg > path,
    svg > g > path,
    svg > g > rect {
      fill: #dadaf8;
    }`
    : ""}

  &:hover {
    background: transparent;
    padding: none;

    svg > circle {
      fill: #231d2c;
    }
    svg > path,
    svg > g > path,
    svg > g > rect {
      fill: #dadaf8;
    }
  }
`;
