import { appColors } from "app/theme";
import { css } from "styled-components/macro";

export const listitem = (outline: boolean) => css`
  height: 210px;
  display: flex;
  color: ${appColors.RESULTS_LIST.ITEM_TEXT_COLOR};
  background: ${appColors.RESULTS_LIST.ITEM_BACKGROUND_COLOR};
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid
    ${outline
      ? appColors.RESULTS_LIST.ITEM_ACTIVE_BORDER_COLOR
      : appColors.RESULTS_LIST.ITEM_BACKGROUND_COLOR};
`;

export const row = (size: number, style: string) => css`
  display: flex;
  margin: 16px 0;
  padding: 0 20px;
  flex-direction: row;
  font-size: ${size}px;
  font-weight: ${style};
  justify-content: space-between;
  font-family: "GothamNarrow-${style === "bold" ? "Bold" : "Book"}",
    "Helvetica Neue", sans-serif;
`;

export const buttonrow = (position: "up" | "down") => css`
  gap: 20px;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  padding: 16px 20px;
  flex-direction: row;
  align-items: center;
  transition: background 0.2s ease-in-out;
  color: ${
    position === "up"
      ? appColors.RESULTS_LIST.ITEM_BUTTON_UP_COLOR
      : appColors.RESULTS_LIST.ITEM_BUTTON_DOWN_COLOR
  };
  background: ${
    position === "up"
      ? appColors.RESULTS_LIST.ITEM_BUTTON_UP_BACKGROUND_COLOR
      : appColors.RESULTS_LIST.ITEM_BUTTON_DOWN_BACKGROUND_COLOR
  };
  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  border-${position === "up" ? "bottom" : "top"}: 1px solid ${
  appColors.RESULTS_LIST.ITEM_ACTIVE_COLOR
};
  border-radius: ${position === "up" ? "20px 20px 0 0" : "0 0 20px 20px"};

  > * {
    @supports (-webkit-touch-callout: none) and (not (translate: none)) {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }

  svg {
    transform: rotate(${position === "up" ? "180deg" : "0deg"});
    
    path {
      fill: ${
        position === "up"
          ? appColors.RESULTS_LIST.ITEM_BUTTON_UP_COLOR
          : appColors.RESULTS_LIST.ITEM_BUTTON_DOWN_COLOR
      };
    }
  }

  &:hover {
    cursor: pointer;
    color: ${
      position === "down"
        ? appColors.RESULTS_LIST.ITEM_BUTTON_UP_COLOR
        : appColors.RESULTS_LIST.ITEM_BUTTON_DOWN_COLOR
    };
    background: ${
      position === "down"
        ? appColors.RESULTS_LIST.ITEM_BUTTON_UP_BACKGROUND_COLOR
        : appColors.RESULTS_LIST.ITEM_BUTTON_DOWN_BACKGROUND_COLOR
    };

    path {
      fill: ${
        position === "down"
          ? appColors.RESULTS_LIST.ITEM_BUTTON_UP_COLOR
          : appColors.RESULTS_LIST.ITEM_BUTTON_DOWN_COLOR
      };
    }
  }
`;

export const locationlist = css`
  gap: 6px;
  color: ${appColors.RESULTS_LIST.LOCATION_LIST_ITEM_COLOR};
  display: flex;
  overflow-y: auto;
  max-height: 150px;
  min-height: 150px;
  padding: 14px 20px;
  background: ${appColors.RESULTS_LIST.LOCATION_LIST_BACKGROUND_COLOR};
  flex-direction: column;
  border-radius: 0 0 20px 20px;

  > * {
    @supports (-webkit-touch-callout: none) and (not (translate: none)) {
      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`;
