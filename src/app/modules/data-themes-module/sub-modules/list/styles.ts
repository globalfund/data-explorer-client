import { css } from "styled-components/macro";

export const styles = {
  container: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  `,
  innercontainer: css`
    left: 0;
    top: 144px;
    width: 100%;
    position: relative;
    min-height: calc(100vh - 144px);
  `,
  toolbar: css`
    width: 100%;
    height: 72px;
    padding: 18px 0;
  `,
  gridItem: css`
    height: 219px;
    background: #fff;
    position: relative;
    border-radius: 30px;
    padding: 16px !important;
  `,
  gridItemTitle: css`
    color: #262c34;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  `,
  gridItemLabel: css`
    color: #262c34;
    padding: 0 8px;
    font-size: 10px;
    width: fit-content;
    margin-bottom: 25px;
    background: #dfe3e6;
    border-radius: 46px;
  `,
  gridItemDetails: css`
    width: 100%;
    display: flex;
    flex-direction: row;

    > div {
      display: flex;
      width: calc(100% / 3);
      flex-direction: column;

      &:not(:first-child) {
        padding-left: 18px;
      }
      &:not(:last-child) {
        border-right: 1px solid #dfe3e6;
      }

      > div {
        color: #262c34;
        font-size: 12px;

        &:last-child {
          font-weight: 700;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        }
      }
    }
  `,
  gridItemLinkBtn: css`
    left: 0;
    bottom: 0;
    color: #fff;
    width: 100%;
    font-size: 18px;
    padding: 16px 0;
    font-weight: 700;
    position: absolute;
    text-align: center;
    background: #262c34;
    text-decoration: none;
    border-radius: 0px 0px 30px 30px;
    transition: background 0.2s ease-in-out;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

    &:hover {
      color: #262c34;
      background: #fff;
      border-top: 1px solid #f0f3f5;
    }
  `,
  gridItemCreateNew: css`
    width: 100%;
    height: 219px;

    > a {
      width: 100%;
      height: 100%;
      display: flex;
      color: #262c34;
      background: #fff;
      align-items: center;
      border-radius: 30px;
      text-decoration: none;
      flex-direction: column;
      justify-content: center;
      border: 1px solid #262c34;
    }
  `,
};
