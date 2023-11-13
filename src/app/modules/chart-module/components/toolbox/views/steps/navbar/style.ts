import { css } from "styled-components";

export const stepcss = (activeStep: boolean, isClickable: boolean) => css`
  width: 67px;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${isClickable ? "pointer" : "default"};
  svg {
    width: ${activeStep ? "32px" : "24px"};
    height: ${activeStep ? "32px" : "24px"};
    path {
      fill: ${activeStep ? "#262C34" : "#ADB5BD"};
    }
  }
`;
