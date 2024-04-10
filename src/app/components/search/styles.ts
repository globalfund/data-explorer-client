import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import styled from "styled-components";
import Button from "@mui/material/Button";

export const Container = styled(Box)`
  display: flex;
  padding: 4px 20px;
  position: relative;
  border-radius: 8px;
  background: ${appColors.SEARCH.CONTAINER_BACKGROUND};
  width: ${(props) =>
    props.theme.withCatMenu ? "calc(100% - 200px)" : "100%"};

  @media (max-width: 767px) {
    ${(props) =>
      props.theme.focused
        ? `
      padding: 5px;
      border-radius: 0;
      border-bottom: 1px solid ${appColors.SEARCH.CONTAINER_BORDER_COLOR};
    `
        : ""}
  }
`;

export const MobileContainer = styled(Box)`
  width: 100%;
  position: relative;
  background: transparent;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 767px) {
    &:focus-within {
      top: 0;
      left: -16px;
      width: 100vw;
      height: 100vh;
      background: ${appColors.SEARCH.CONTAINER_BACKGROUND};
      position: absolute;
      padding: 20px 12px 0 12px;

      > div {
        padding: 5px;
        border-radius: 0;
        border-bottom: 1px solid ${appColors.SEARCH.CONTAINER_BORDER_COLOR};

        > span {
          display: block !important;
        }
      }
    }
    ${(props) =>
      props.theme.focused
        ? `
      top: 0;
      left: -16px;
      width: 100vw;
      height: 100vh;
      background: ${appColors.SEARCH.CONTAINER_BACKGROUND};
      position: absolute;
      padding: 20px 12px 0 12px;

      > div {
        padding: 5px;
        border-radius: 0;
        border-bottom: 1px solid ${appColors.SEARCH.CONTAINER_BORDER_COLOR};

        > span {
          display: block !important;
        }
      }
    `
        : ""}
  }
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  border-style: none;
  color: ${appColors.SEARCH.INPUT_COLOR};
  background: ${appColors.SEARCH.INPUT_BACKGROUND_COLOR};

  &:focus::placeholder {
    opacity: 0.3;
  }
`;

export const MobileBackButton = styled.span`
  top: 5px;
  left: -16px;
  position: absolute;

  > svg {
    transform: rotate(180deg) scale(1.5);
    > path {
      fill: ${appColors.COMMON.PRIMARY_COLOR_1};
    }
  }
`;

export const CategoryButton = styled(Button)`
  width: 200px;
  display: flex;
  font-size: 14px;
  padding: 7px 12px;
  border-radius: 4px;
  margin-right: 14px;
  text-transform: capitalize;
  max-width: calc(50vw - 32px);
  justify-content: space-between;
  background: ${appColors.SEARCH.DROPDOWN_BUTTON_BACKGROUND_COLOR};
  border: 1px solid ${appColors.SEARCH.DROPDOWN_BUTTON_BORDER_COLOR};
  color: ${(props) =>
    props.theme.anchorEl
      ? appColors.SEARCH.DROPDOWN_BUTTON_TEXT_HOVER_COLOR
      : appColors.SEARCH.DROPDOWN_BUTTON_TEXT_COLOR};
  background: ${(props) =>
    props.theme.anchorEl
      ? appColors.SEARCH.DROPDOWN_BUTTON_BACKGROUND_HOVER_COLOR
      : appColors.SEARCH.DROPDOWN_BUTTON_BACKGROUND_COLOR};

  &:hover {
    color: ${appColors.SEARCH.DROPDOWN_BUTTON_TEXT_HOVER_COLOR};
    background: ${appColors.SEARCH.DROPDOWN_BUTTON_BACKGROUND_HOVER_COLOR};

    svg {
      > path {
        fill: ${appColors.SEARCH.DROPDOWN_BUTTON_TEXT_HOVER_COLOR};
      }
    }
  }

  .MuiButton-label {
    justify-content: space-between;
  }

  svg {
    transition: all 0.2s ease-in-out;

    > path {
      fill: ${(props) =>
        props.theme.anchorEl
          ? appColors.SEARCH.DROPDOWN_BUTTON_TEXT_HOVER_COLOR
          : appColors.SEARCH.DROPDOWN_BUTTON_TEXT_COLOR};
    }
  }

  > span {
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
