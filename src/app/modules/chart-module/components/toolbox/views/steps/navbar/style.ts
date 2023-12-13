import { css } from "styled-components";

export const stepcss = (activeStep: boolean, isClickable: boolean) => css`
  width: 79px;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: ${isClickable ? "pointer" : "not-allowed"};
  svg {
    width: ${activeStep ? "32px" : "24px"};
    height: ${activeStep ? "32px" : "24px"};
    path {
      fill: ${activeStep ? "#262C34" : "#ADB5BD"};
    }
  }
`;
