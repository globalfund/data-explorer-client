import { appColors } from "app/theme";
import { css } from "styled-components/macro";

export const container = css`
  width: 100%;
  display: flex;
  position: relative;
  padding: 10px 20px;
  border-radius: 20px;
  background: ${appColors.GRANT_LIST.SEARCH_CONTAINER_BACKGROUND_COLOR};
  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
`;

export const input = css`
  width: 100%;
  outline: none;
  color: ${appColors.GRANT_LIST.SEARCH_INPUT_COLOR};
  font-size: 14px;
  border-style: none;
  background: ${appColors.GRANT_LIST.SEARCH_INPUT_BACKGROUND_COLOR};

  ::placeholder {
    color: ${appColors.GRANT_LIST.SEARCH_INPUT_COLOR};
    font-weight: bold;
  }

  &:focus::placeholder {
    opacity: 0.3;
  }
`;
