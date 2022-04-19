import { css } from "styled-components/macro";

export const styles = {
  container: css`
    right: 0;
    top: 48px;
    z-index: 99;
    width: 400px;
    display: flex;
    position: fixed;
    padding: 25px 31px;
    background: #f1f3f5;
    flex-direction: column;
    height: calc(100vh - 48px);

    > h5 {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 16px 0;
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
    }

    > h6 {
      margin: 0;
      font-size: 14px;
      font-weight: 400;
      font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
    }
  `,
  contentlist: css`
    width: 100%;
    display: flex;
    margin-top: 40px;
    flex-direction: column;

    > div {
      display: flex;
      font-weight: 700;
      flex-direction: row;
      margin-bottom: 24px;
      align-items: center;
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

      > div {
        width: 32px;
        height: 32px;
        padding: 3px;
        margin-right: 14px;
        border-radius: 50%;
        border: 1px solid #373d43;
      }
    }
  `,
};
