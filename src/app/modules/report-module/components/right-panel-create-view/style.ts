import { css } from "styled-components";

export const elementItemcss = (disabled: boolean, isDragging: boolean) => css`
  width: 90%;
  cursor: ${disabled ? "not-allowed" : "grab"};
  ${isDragging && "cursor: grabbing;"}
  height: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 8px 0 16px;
  background: #dfe3e5;
  border-radius: 8px;
  margin: 8px auto;
  transform: translate(0, 0);
  opacity: ${disabled ? 0.5 : 1};
  p {
    margin: 0px;
    line-height: normal;
    font-size: 12px;
  }
  b {
    font-size: 14px;
    line-height: normal;
    margin: 0;
  }
  ${!disabled &&
  "&:hover {svg {path {fill: #fff;}}background: #252c34;b,p {color: #fff;}}"}
`;
