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
    gap: 1.5rem;
    height: 72px;
    padding: 18px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > * {
      cursor: pointer;
    }

    button {
      width: 90px;
      min-width: 90px;
      height: 23px;
      border-radius: 20px;
      background: #262c34;
      cursor: pointer;
      color: #fff;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0.5px;
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
    }
  `,
  toolbarSearch: (showInput: boolean) => css`
    display: flex;
    margin-left: 0;
    position: relative;
    border-radius: 20px;
    width: ${showInput ? "100%" : ""};
    padding: ${showInput ? "5px 20px" : "0"};
    box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
    background: ${showInput ? "#dfe3e6" : "transparent"};

    > input {
      width: 100%;
      outline: none;
      color: #262c34;
      font-size: 14px;
      border-style: none;
      background: #dfe3e6;
      display: ${showInput ? "inherit" : "none"};

      ::placeholder {
        color: #262c34;
        font-weight: bold;
      }

      &:focus::placeholder {
        opacity: 0.3;
      }
    }
  `,
  gridItem: css`
    height: 219px;
    background: #fff;
    position: relative;
    border-radius: 30px;
    padding: 16px !important;

    #delete-button,
    #edit-button {
      display: none;
    }

    &:hover {
      #delete-button,
      #edit-button {
        display: inherit;
      }
    }
  `,
  gridItemTitle: css`
    height: 30px;
    display: flex;
    color: #262c34;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
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
