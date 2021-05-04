import { css } from "styled-components/macro";

export const listitem = css`
  display: flex;
  color: #262c34;
  padding: 12px 20px;
  background: #f5f5f7;
  border-radius: 20px;
  flex-direction: column;
  border: 2px solid #f5f5f7;

  &:hover {
    cursor: pointer;
    border-color: #262c34;
  }
`;

export const row = (size: number, style: string) => css`
  display: flex;
  margin: 16px 0;
  line-height: 16px;
  flex-direction: row;
  font-size: ${size}px;
  font-weight: ${style};
  align-items: flex-end;
  justify-content: space-between;
`;
