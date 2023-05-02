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
    justify-content: center;

    flex-direction: column;
  `,
  innercontainer: css`
    height: 100%;
    display: flex;

    position: relative;
    flex-direction: column;
    padding: 13px 24px 0 13.8rem;

    @media (max-width: 1280px) {
      margin-left: 0;
      width: calc(100vw - 400px);
    }

    @media (max-width: 600px) {
      padding: 13px 16px 0 16px;
    }
  `,
  firstrow: css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    > div {
      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }

    > h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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
  titleInput: css`
    margin: 0;
    width: 200px;
    height: 24px;
    display: flex;
    color: #262c34;
    font-size: 24px;
    font-weight: 700;
    border-style: none;
    background: transparent;
    transition: background 0.2s ease-in-out;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

    &:focus {
      background: #f1f3f5;
    }
  `,
  subTitleInput: css`
    margin: 0;
    width: 110px;
    height: 14px;
    color: #262c34;
    font-size: 14px;
    font-weight: 400;
    border-style: none;
    background: transparent;
    transition: background 0.2s ease-in-out;
    font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;

    &:focus {
      background: #f1f3f5;
    }
  `,
  iconbtns: css`
    display: flex;
    margin-top: -10px;
    flex-direction: row;

    > a,
    button {
      width: 42px;
      height: 42px;
      padding: 9px;
    }
  `,
  secondrow: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  `,
};
