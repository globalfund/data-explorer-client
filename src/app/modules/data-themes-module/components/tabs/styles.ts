import { css } from "styled-components/macro";

export const styles = {
  container: css`
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: flex-end;

    * {
      user-select: none;
    }
  `,
  innertabscontainer: css`
    display: flex;
    max-width: 100%;
    overflow-x: auto;
    flex-direction: row;

    &::-webkit-scrollbar {
      height: 5px;
      background: #495057;
    }
    &::-webkit-scrollbar-track {
      background: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background: #495057;
    }
  `,
  tab: (
    active: boolean,
    disabled: boolean,
    previewMode: boolean,
    isOnlyTab: boolean
  ) => css`
    gap: 14px;
    color: #fff;
    width: 200px;
    height: 34px;
    display: flex;
    font-size: 14px;
    font-weight: 700;
    min-width: 200px;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #dfe3e6;
    color: ${active ? "#fff" : "#495057"};
    opacity: ${active ? "100%" : disabled && "50%"};
    background-color: ${active ? "#495057" : "#c7cdd1"};
    font-family: "Inter", "Helvetica Neue", sans-serif;

    svg {
      path {
        fill: ${active ? "#fff" : "#495057"};
      }
    }

    &:hover {
      color: #fff;
      cursor: pointer;
      background-color: #495057;

      svg {
        path {
          fill: #fff;
        }
      }
    }

    &:last-of-type {
      border-style: none;
      border-radius: ${previewMode ? "0 20px 0 0" : 0};
    }

    &:first-of-type {
      border-radius: 20px 0 0 0;
    }

    ${isOnlyTab && previewMode
      ? "border-radius: 20px 20px 0 0 !important;"
      : ""}
  `,
  tabTitle: css`
    margin: 0;
    color: #fff;
    display: flex;
    font-size: 14px;
    font-weight: 700;
    border-style: none;
    text-align: center;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background: transparent;
    transition: background 0.2s ease-in-out;
    font-family: "Inter", "Helvetica Neue", sans-serif;

    &:focus {
      background: #495057;
    }
  `,
  addbtn: css`
    top: 0;
    right: 0;
    width: 60px;
    height: 34px;
    display: flex;
    min-width: 60px;
    position: sticky;
    align-items: center;
    justify-content: center;
    background-color: #c7cdd1;
    border-left: 1px solid #dfe3e6;
    border-radius: 0px 20px 0px 0px;

    &:hover {
      cursor: pointer;
      background-color: #495057;

      svg {
        path {
          fill: #fff;
        }
      }
    }
  `,
  addbtnDisabled: css`
    top: 0;
    right: 0;
    width: 60px;
    height: 34px;
    display: flex;
    min-width: 60px;
    position: sticky;
    align-items: center;
    justify-content: center;
    background-color: #c7cdd1;
    border-left: 1px solid #dfe3e6;
    border-radius: 0px 20px 0px 0px;

    opacity: 50%;
  `,
  tabPopup: css`
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
};
