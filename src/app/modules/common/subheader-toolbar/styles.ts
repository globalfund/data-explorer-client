import { css } from "styled-components/macro";

export const styles = {
  container: css`
    left: 0;
    top: 48px;
    z-index: 100;
    width: 100vw;
    height: 50px;
    display: flex;
    position: fixed;
    background: #f4f4f4;
    flex-direction: column;
    justify-content: center;
  `,
  innercontainer: css`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 1280px) {
      margin-left: 0;
      width: calc(100vw - 400px);
    }

    @media (max-width: 600px) {
      padding: 13px 16px 0 16px;
    }
  `,
  sharePopup: css`
    width: 240px;
    display: flex;
    padding: 6px 13px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    * {
      margin: 0;
      color: #fff;
      font-size: 14px;
    }

    .MuiSwitch-track {
      background: #98a1aa;
    }

    .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
      background: #000;
    }

    hr {
      width: 100%;
      background: #cfd4da;
    }

    button {
      padding: 6px 0;

      span {
        text-transform: initial;
      }

      svg {
        margin-right: 10px;

        path {
          fill: #fff;
        }
      }
    }
  `,
  nameInput: css`
    margin: 0;
    width: 600px;
    height: 24px;
    display: flex;
    color: #262c34;
    font-size: 24px;
    font-weight: 700;
    border-style: none;
    background: transparent;
    transition: background 0.2s ease-in-out;
    font-family: "Inter", "Helvetica Neue", sans-serif;

    &:focus {
      background: #f1f3f5;
    }
  `,
  iconbtns: css`
    right: 0;
    display: flex;
    position: absolute;
    flex-direction: row;

    > a,
    button {
      width: 42px;
      height: 42px;
      padding: 9px;
    }
  `,
};
