import { css } from "styled-components/macro";

export const container = (focused: boolean, withCatMenu: boolean) => css`
  display: flex;
  background: #fff;
  position: relative;
  padding: 10px 20px;
  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
  width: ${withCatMenu ? "calc(100% - 200px)" : "100%"};
  border-radius: ${withCatMenu ? "0 20px 20px 0" : "20px"};

  @media (max-width: 767px) {
    ${focused
      ? `
      padding: 5px;
      border-radius: 0;
      border-bottom: 1px solid #262c34;
    `
      : ""}
  }
`;

export const mobilecontainer = (focused: boolean) => css`
  width: 100%;
  background: transparent;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 767px) {
    &:focus-within {
      top: 0;
      left: -16px;
      width: 100vw;
      height: 100vh;
      background: #fff;
      position: absolute;
      padding: 20px 12px 0 12px;

      > div {
        padding: 5px;
        border-radius: 0;
        border-bottom: 1px solid #262c34;

        > span {
          display: block !important;
        }
      }
    }
    ${focused
      ? `
      top: 0;
      left: -16px;
      width: 100vw;
      height: 100vh;
      background: #fff;
      position: absolute;
      padding: 20px 12px 0 12px;

      > div {
        padding: 5px;
        border-radius: 0;
        border-bottom: 1px solid #262c34;

        > span {
          display: block !important;
        }
      }
    `
      : ""}
  }
`;

export const input = css`
  width: 100%;
  outline: none;
  color: #262c34;
  font-size: 14px;
  background: #fff;
  font-weight: bold;
  border-style: none;
  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

  &:focus::placeholder {
    opacity: 0.3;
  }
`;

export const mobilebackbutton = css`
  top: 5px;
  left: -16px;
  position: absolute;

  > svg {
    transform: rotate(180deg) scale(1.5);
    > path {
      fill: #000;
    }
  }
`;
