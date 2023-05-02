import { css } from "styled-components/macro";

export const dataSetsCss = css`
  /* width: 100%; */
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  /* overflow: auto; */
  a {
    text-decoration: none;
  }
`;

export const dataSetsGridCss = css`
  width: 100%;
  height: 28vh;
  padding: 20px;
  color: #231d2c;
  background: #fff;
  border-radius: 20px;
  border: 2px solid #fff;

  @media screen and (min-width: 900px) {
    height: 370px;
  }

  @media screen and (max-width: 767px) {
    height: 227px;
    padding: 12px;
  }

  > div {
    font-weight: bold;
    margin-bottom: 10px;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  }

  > svg {
    width: 100%;
    height: calc(100% - 30px);
  }

  &:hover {
    border-color: #13183f;
  }
`;

export const datasetsBottomCss = css`
  width: 100%;
  height: 50px;

  @media (max-width: 767px) {
    height: 90px;
  }
`;
