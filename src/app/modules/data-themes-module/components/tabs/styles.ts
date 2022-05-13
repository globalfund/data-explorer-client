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
  tab: (active: boolean) => css`
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
    background-color: ${active ? "#495057" : "#c7cdd1"};
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

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

    &:first-of-type {
      border-radius: 20px 0 0 0;
    }

    &:last-of-type {
      border-style: none;
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
};