import { appColors } from "app/theme";
import { css } from "styled-components/macro";

export const scrollableCSS = css`
  display: flex;
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

export const rowNameCSS = (width: string) => css`
  z-index: 1;
  left: -10px;
  display: flex;
  font-size: 10px;
  position: sticky;
  min-height: 48px;
  max-height: 48px;
  text-align: right;
  line-height: 12px;
  min-width: ${width};
  max-width: ${width};
  align-items: center;
  word-wrap: break-word;
  justify-content: flex-end;
  background: ${appColors.EXPENDITURES.CHART_BG_COLOR};
`;

export const colNameCSS = css`
  display: flex;
  font-size: 10px;
  min-width: 92px;
  min-height: 48px;
  max-height: 48px;
  line-height: 12px;
  align-items: center;
  word-wrap: break-word;
  justify-content: center;
`;

export const rowColCSS = css`
  padding: 6px;
  display: flex;
  font-size: 10px;
  min-width: 92px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
