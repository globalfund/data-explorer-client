import { css } from "styled-components/macro";

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const subtitle = css`
  color: #262c34;
  margin: 24px 0;
  font-size: 18px;
`;

export const datasetstitle = css`
  width: 100%;
  color: #262c34;
  font-size: 14px;
  margin-top: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

export const datasetslink = css`
  width: 100%;
  display: flex;
  margin-top: 16px;
  justify-content: flex-end;

  > a {
    color: #13183f;
  }
`;
