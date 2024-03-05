import { appColors } from "app/theme";
import styled from "styled-components";

export const Scrollable = styled.div`
  display: flex;
  padding: 10px;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  max-height: calc(60vh - 50px);

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #ebebeb;
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 24px;
  }
`;

export const Container = styled.div`
  gap: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RowName = styled.div`
  z-index: 1;
  left: -10px;
  display: flex;
  font-size: 10px;
  position: sticky;
  min-height: 36px;
  max-height: 36px;
  text-align: right;
  line-height: 12px;
  min-width: ${(props) => props.theme.width};
  max-width: ${(props) => props.theme.width};
  align-items: center;
  word-wrap: break-word;
  justify-content: flex-end;
  color: ${appColors.HEATMAP.CHART_TEXT_COLOR};
  // background: ${appColors.HEATMAP.CHART_BG_COLOR};
`;

export const ColName = styled.div`
  display: flex;
  font-size: 10px;
  min-height: 36px;
  max-height: 36px;
  line-height: 12px;
  align-items: center;
  word-wrap: break-word;
  justify-content: center;
  color: ${appColors.HEATMAP.CHART_TEXT_COLOR};
`;

export const RowCol = styled.div`
  padding: 6px;
  display: flex;
  font-size: 10px;
  min-height: 36px;
  max-height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  color: ${appColors.HEATMAP.CHART_TEXT_COLOR};
`;