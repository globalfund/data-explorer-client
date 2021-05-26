import { css } from "styled-components/macro";

export const listitem = css`
  display: flex;
  color: #262c34;
  padding: 12px 20px;
  background: #f5f5f7;
  border-radius: 20px;
  text-decoration: none;
  flex-direction: column;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #262c34;

    * {
      fill: #fff;
      color: #fff;
    }
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
