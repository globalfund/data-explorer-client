import { css } from "styled-components/macro";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;

  @media (max-width: 767px) {
    padding-top: 20vh;
    position: relative;
    justify-content: flex-start;
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

export const alignments = css`
  height: 31px;
  width: 104px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 700;
  line-height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px, 22px, 8px, 22px;
  background: #eeeeee;
  color: #0000008a;
`;

export const activeThemeCss = css`
  color: #fff;
  background: #262c34;
`;

export const containerCss = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    > svg {
      width: 100%;
    }
  }
`;

export const activeContainerCss = css`
  display: flex;
  margin-bottom: 2rem;
`;
