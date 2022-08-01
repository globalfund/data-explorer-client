import { css } from "styled-components/macro";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  padding-top: 15vh;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 767px) {
    padding-top: 20vh;
    position: relative;
  }
`;

export const subtitle = css`
  color: #262c34;
  font-size: 18px;
  margin: 12px 0 24px 0;

  @media (max-width: 767px) {
    font-size: 12px;
    margin-top: 0;
  }
`;

export const datasetstitle = css`
  width: 100%;
  color: #262c34;
  font-size: 14px;
  margin-top: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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
