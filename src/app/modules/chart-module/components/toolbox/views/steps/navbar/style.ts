import { css } from "styled-components";

export const stepcss = (activeStep: boolean) => css`
  width: 67px;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: ${activeStep ? "32px" : "24px"};
    height: ${activeStep ? "32px" : "24px"};
    path {
      fill: ${activeStep ? "#262C34" : "#ADB5BD"};
    }
  }
`;
