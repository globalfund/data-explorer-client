import { appColors } from "app/theme";
import { css } from "styled-components/macro";

export const overlaycss = css`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
`;

export const modalContainercss = css`
  background: ${appColors.COMMON.SECONDARY_COLOR_10};
  border-radius: 21px;
  padding: 2rem;
  text-align: center;
  font-family: "Gotham Narrow";
  font-size: 14px;
  z-index: 12;

  position: absolute;
  width: 40vw;
  top: 23vw;
  left: 30vw;

  color: ${appColors.COMMON.PRIMARY_COLOR_2};
  @media (max-width: 768px) {
    width: 60vw;
    left: 20vw;
    top: 47vw;
  }
  @media (max-width: 500px) {
    width: 88vw;
    left: 6vw;
    top: 67vw;
  }

  button {
    border: none;
    outline: none;
    height: 100%;
    background: ${appColors.COMMON.PRIMARY_COLOR_2};
    border-radius: 55px;
    text-align: center;
    padding: 11px 60px;
    width: 113px;
    @media (max-width: 500px) {
      padding: 11px 47px;
    }
    font-size: 14px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
