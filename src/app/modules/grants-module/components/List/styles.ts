import { appColors } from "app/theme";
import { css } from "styled-components/macro";

export const listitem = css`
  height: 300px;
  display: flex;
  color: ${appColors.GRANT_LIST.ITEM_TEXT_COLOR};
  padding: 19px 20px;
  background: ${appColors.GRANT_LIST.ITEM_BACKGROUND_COLOR};
  border-radius: 20px;
  text-decoration: none;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${appColors.GRANT_LIST.ITEM_BACKGROUND_HOVER_COLOR};

    * {
      fill: ${appColors.GRANT_LIST.ITEM_TEXT_HOVER_COLOR};
      color: ${appColors.GRANT_LIST.ITEM_TEXT_HOVER_COLOR};
    }
  }
`;

export const row = (size: number, style: string, lineHeight?: number) => css`
  display: flex;

  flex-direction: row;
  font-size: ${size}px;
  font-weight: ${style};
  align-items: flex-start;
  justify-content: space-between;
  line-height: ${lineHeight ?? 16}px;
  font-family: "GothamNarrow-${style === "bold" ? "Bold" : "Book"}",
    "Helvetica Neue", sans-serif;
`;
