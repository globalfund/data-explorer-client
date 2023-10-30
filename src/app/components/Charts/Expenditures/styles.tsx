import { css } from "styled-components/macro";

export const scrollableCSS = css`
  padding: 10px;
  max-width: 100%;
  max-height: calc(60vh - 50px);
  overflow-x: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: #ebebeb;
  }
  ::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 24px;
  }
`;

export const containerCSS = css`
  gap: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const rowCSS = css`
  gap: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const rowNameCSS = css`
  display: flex;
  font-size: 10px;
  min-width: 150px;
  max-width: 150px;
  min-height: 48px;
  max-height: 48px;
  text-align: right;
  line-height: 12px;
  align-items: center;
  word-wrap: break-word;
  justify-content: flex-end;
`;

export const colNameCSS = css`
  display: flex;
  font-size: 10px;
  min-width: 92px;
  max-width: 92px;
  min-height: 64px;
  max-height: 64px;
  line-height: 12px;
  align-items: center;
  word-wrap: break-word;
`;

export const rowColCSS = css`
  padding: 6px;
  display: flex;
  font-size: 10px;
  min-width: 92px;
  max-width: 92px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
