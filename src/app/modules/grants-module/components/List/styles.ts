import { css } from "styled-components/macro";

export const listitem = css`
  height: 100%;
  display: flex;
  color: #231d2c;
  padding: 12px 20px;
  background: #f4f4f4;
  border-radius: 20px;
  pointer-events: none;
  text-decoration: none;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #13183f;

    * {
      fill: #fff;
      color: #fff;
    }
  }
`;

export const row = (size: number, style: string, lineHeight?: number) => css`
  display: flex;
  margin: 16px 0;
  flex-direction: row;
  font-size: ${size}px;
  font-weight: ${style};
  align-items: flex-end;
  justify-content: space-between;
  line-height: ${lineHeight ?? 16}px;
  font-family: "Inter", "Helvetica Neue", sans-serif;
`;
