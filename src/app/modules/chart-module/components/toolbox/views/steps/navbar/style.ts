import { css } from "styled-components";

export const stepcss = (activeStep: boolean) => css`
  width: 67px;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${activeStep ? "#F5F5F7" : "#ffffff"};
`;
