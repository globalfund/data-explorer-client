import { appColors } from "app/theme";
import styled from "styled-components/macro";

export const XsContainer = styled.div`
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  * {
    z-index: 1010;
  }
`;

export const TooltipButton = styled.button`
  width: 100%;
  padding: 12px;
  color: ${appColors.COMMON.PRIMARY_COLOR_1};
  font-size: 14px;
  border-width: 0px;
  border-radius: 20px;
  font-weight: 700;
  background: ${appColors.COMMON.SECONDARY_COLOR_7};
  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
`;
