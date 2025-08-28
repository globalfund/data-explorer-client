import { appColors } from "app/theme";
import styled from "styled-components";

export const Scrollable = styled.div`
  display: flex;
  min-width: 100%;
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
  height: 100%;
  display: flex;
  min-width: 100%;
  flex-direction: column;
`;

export const Row = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${appColors.HEATMAP.CHART_ROW_BORDER_COLOR};
`;

export const RowName = styled.div`
  left: 0px;
  z-index: 1;
  display: flex;
  margin-top: 2px;
  font-size: 14px;
  position: sticky;
  min-height: 30px;
  max-height: 30px;
  line-height: 12px;
  margin-bottom: 2px;
  align-items: center;
  word-wrap: break-word;
  justify-content: flex-start;
  cursor: ${(props) => props.theme.cursor};
  min-width: ${(props) => props.theme.width};
  max-width: ${(props) => props.theme.width};
  color: ${appColors.HEATMAP.CHART_TEXT_COLOR};
  background: ${(props) => props.theme.background ?? appColors.COMMON.WHITE};

  @media (max-width: 920px) {
    min-width: 250px;
    max-width: 250px;
  }
`;

export const ColName = styled.div`
  display: flex;
  font-size: 14px;
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
  font-size: 14px;
  min-height: 30px;
  max-height: 30px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  color: ${appColors.HEATMAP.CHART_TEXT_COLOR};
`;
