import { appColors } from "app/theme";
import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";

export const Container = styled.div`
  left: 0;
  top: 52px;
  z-index: 2;
  width: 100%;
  display: flex;
  border-radius: 8px;
  position: absolute;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);
  background: ${appColors.SEARCH.RESULTS_CONTAINER_BACKGROUND_COLOR};

  @media (max-width: 767px) {
    padding: 0 0 20px 0;
  }
`;

export const Results = styled.div`
  width: 100%;
  height: 368px;
  display: flex;
  overflow-y: auto;
  min-height: 368px;
  max-height: 368px;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 4px;
    background: ${appColors.SEARCH.DROPDOWN_SCROLLBAR_BACKGROUND_COLOR};
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background: ${appColors.SEARCH.DROPDOWN_SCROLLBAR_TRACK_BACKGROUND_COLOR};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${appColors.SEARCH.DROPDOWN_SCROLLBAR_THUMB_BACKGROUND_COLOR};
  }
`;

export const ResultA = styled.a`
  width: 100%;
  display: flex;
  cursor: pointer;
  padding: 12px 37px;
  flex-direction: row;
  text-decoration: none;
  border-top: 1px solid ${appColors.SEARCH.RESULT_BORDER_COLOR};

  @media (max-width: 767px) {
    padding: 12px;
  }

  &:hover {
    background: ${appColors.SEARCH.RESULT_HOVER_BACKGROUND_COLOR};

    > div {
      color: ${appColors.SEARCH.RESULT_HOVER_TEXT_COLOR};
    }

    > svg {
      filter: invert(1);
    }
  }

  &:first-of-type {
    border-top-style: none;
    border-radius: 8px 8px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }

  > div {
    color: ${appColors.SEARCH.RESULT_TEXT_COLOR};
    font-size: 14px;
    width: calc(100% - 37px - 24px - 40px);
  }

  > svg {
    margin-right: 40px;
  }
`;

export const ResultLink = styled(Link)`
  width: 100%;
  display: flex;
  cursor: pointer;
  padding: 12px 37px;
  flex-direction: row;
  text-decoration: none;
  border-top: 1px solid ${appColors.SEARCH.RESULT_BORDER_COLOR};

  @media (max-width: 767px) {
    padding: 12px;
  }

  &:hover {
    background: ${appColors.SEARCH.RESULT_HOVER_BACKGROUND_COLOR};

    > div {
      color: ${appColors.SEARCH.RESULT_HOVER_TEXT_COLOR};
    }

    > svg {
      > path {
        fill: ${appColors.SEARCH.RESULT_HOVER_TEXT_COLOR};
      }
    }
  }

  &:first-of-type {
    border-top-style: none;
    border-radius: 8px 8px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }

  > div {
    color: ${appColors.SEARCH.RESULT_TEXT_COLOR};
    font-size: 14px;
    width: calc(100% - 37px - 24px - 40px);
  }

  > svg {
    margin-right: 40px;
  }
`;

export const NoResults = styled.div`
  width: 100%;
  color: #000;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
