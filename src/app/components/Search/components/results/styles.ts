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
`;

export const tabs = css`
  width: 100%;
  display: flex;
  padding: 0 40px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
`;

export const tab = (active: boolean) => css`
  color: #262c34;
  padding: 5px 0;
  font-size: 12px;
  font-weight: bold;
  border-bottom: 2px solid ${active ? "#262c34" : "transparent"};

  &:hover {
    cursor: pointer;
    border-color: #262c34;
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

  &::-webkit-scrollbar {
    width: 5px;
    background: #262c34;
  }
  &::-webkit-scrollbar-track {
    background: #dfe3e6;
  }
  &::-webkit-scrollbar-thumb {
    background: #262c34;
  }
`;

export const result = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-decoration: none;
  padding: 10px 40px 10px 55px;
  border-top: 1px solid #dfe3e6;

  &:hover {
    background: #262c34;

    > div {
      color: #fff;
    }
  }

  &:last-of-type {
    border-bottom: 1px solid #dfe3e6;
  }

  > div {
    color: #262c34;
    font-size: 12px;

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
