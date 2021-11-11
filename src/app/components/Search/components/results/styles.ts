import { css } from "styled-components/macro";

export const container = css`
  left: 0;
  top: 52px;
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 20px 0;
  background: #fff;
  position: absolute;
  border-radius: 20px;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);

  @media (max-width: 767px) {
    padding: 0 0 20px 0;
  }
`;

export const tabs = css`
  width: 100%;
  display: flex;
  padding: 0 40px;
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
  justify-content: space-between;

  @media (max-width: 767px) {
    gap: 8px;
    padding: 0;
    max-width: 100%;
    overflow-x: auto;
    width: max-content;
    padding-bottom: 16px;
  }
`;

export const tab = (active: boolean) => css`
  color: #262c34;
  padding: 5px 0;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  border-bottom: 2px solid ${active ? "#262c34" : "transparent"};

  &:hover {
    cursor: pointer;
    border-color: #262c34;
  }

  @media (max-width: 767px) {
    padding: 2px 10px;
    border-radius: 16px;
    border-bottom-style: none;
    color: ${active ? "#fff" : "#262c34"};
    background: ${active ? "#262c34" : "#dfe3e6"};
  }
`;

export const results = css`
  width: 100%;
  height: 368px;
  display: flex;
  overflow-y: auto;
  min-height: 368px;
  max-height: 368px;
  flex-direction: column;
  @media (max-width: 767px) {
    height: calc(100vh - 200px);
    min-height: calc(100vh - 200px);
    max-height: calc(100vh - 200px);
  }
`;

export const result = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-decoration: none;
  padding: 10px 40px 10px 55px;
  border-top: 1px solid #dfe3e6;

  @media (max-width: 767px) {
    padding: 10px 10px 10px 0;

    &:first-of-type {
      border-top-style: none;
    }
  }

  &:hover {
    background: #13183f;

    > div {
      color: #fff;
    }
  }

  &:last-of-type {
    border-bottom: 1px solid #dfe3e6;
  }

  > div {
    color: #262c34;
    font-size: 14px;

    &:first-of-type {
      margin-right: 40px;
    }
  }
`;

export const noresults = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
