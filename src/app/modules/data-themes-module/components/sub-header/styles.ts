import { css } from "styled-components/macro";

export const styles = {
  container: css`
    left: 0;
    top: 48px;
    z-index: 10;
    width: 100vw;
    height: 96px;
    display: flex;
    position: fixed;
    background: #dfe3e6;
    flex-direction: column;
  `,
  innercontainer: css`
    height: 100%;
    display: flex;
    max-width: 1280px;
    position: relative;
    flex-direction: column;
    padding: 13px 24px 0 24px;
    margin-left: calc((100vw - 1280px) / 2);
    width: calc(100vw - ((100vw - 1280px) / 2) - 400px);

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
  `,
  secondrow: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  `,
};
