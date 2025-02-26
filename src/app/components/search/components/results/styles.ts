import { appColors } from "app/theme";
import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";

export const Container = styled.div`
  top: 48px;
  z-index: 2;
  padding: 5px;
  display: flex;
  position: absolute;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);
  background: ${appColors.SEARCH.RESULTS_CONTAINER_BACKGROUND_COLOR};
  width: ${(props) =>
    props.theme.withCatMenu ? "calc(100% - 144px)" : "100%"};
  ${(props) => props.theme.anchor}: ${(props) =>
    props.theme.withCatMenu ? "144px" : "0"};

  @media (max-width: 767px) {
    padding: 0 0 20px 0;
  }
`;

export const Results = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  overflow-y: auto;
  min-height: 400px;
  max-height: 400px;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 5px;
    background: ${appColors.SEARCH.DROPDOWN_SCROLLBAR_BACKGROUND_COLOR};
  }
  &::-webkit-scrollbar-track {
    background: ${appColors.SEARCH.DROPDOWN_SCROLLBAR_TRACK_BACKGROUND_COLOR};
  }
  &::-webkit-scrollbar-thumb {
    background: ${appColors.SEARCH.DROPDOWN_SCROLLBAR_THUMB_BACKGROUND_COLOR};
  }
`;

export const ResultA = styled.a`
  width: 100%;
  padding: 5px;
  display: flex;
  cursor: pointer;
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
  }

  > div {
    color: ${appColors.SEARCH.RESULT_TEXT_COLOR};
    font-size: 14px;
    width: calc(100% - 37px - 24px - 40px);
  }

  > svg {
    margin-right: 10px;
  }
`;

export const ResultLink = styled(Link)`
  width: 100%;
  padding: 5px;
  display: flex;
  cursor: pointer;
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
  }

  > div {
    color: ${appColors.SEARCH.RESULT_TEXT_COLOR};
    font-size: 14px;
    width: calc(100% - 37px - 24px - 40px);
  }

  > svg {
    margin-right: 10px;
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
