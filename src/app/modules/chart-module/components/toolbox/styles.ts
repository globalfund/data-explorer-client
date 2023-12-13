import { css } from "styled-components/macro";

export const styles = {
  container: (placeUnderSubHeader?: boolean) => css`
    right: 0;
    top: ${!placeUnderSubHeader ? 105 : 97}px;
    z-index: 99;
    display: flex;
    position: fixed;
    background: #f5f5f7;
    flex-direction: column;

    box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);

    > section {
      padding: 0 31px 25px 31px;

      > h5 {
        font-size: 18px;
        font-weight: 700;
        margin: 25px 0 16px 0;
        font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
      }

      > h6 {
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
      }
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

      :nth-of-type(1),
      :nth-of-type(2) {
        cursor: pointer;
      }

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
  textcontent: css`
    width: 192px;
    display: flex;
    color: #98a1aa;
    font-size: 18px;
    font-weight: 700;
    padding-top: 96px;
    line-height: 22px;
    text-align: center;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  `,
  exportview: css`
    width: 400px;
    background: red;
    padding: 24px;
  `,
};
