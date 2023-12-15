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

export const mappingStyles = {
  selectedButtoncss: (dimension: any) => css`
    width: 100%;
    display: flex;
    font-size: 14px;
    padding: 12px 16px;
    margin-bottom: 8px;
    margin-top: 6px;
    flex-direction: row;
    height: 31px;
    border-radius: 36px;
    border: ${dimension.mappedValues.length > 0 && !dimension.multiple
      ? "none"
      : "0.722px dashed #262c34"};
    background: ${dimension.mappedValues.length > 0 && !dimension.multiple
      ? "#262c34"
      : "#dfe3e5"};
    text-transform: capitalize;
    justify-content: space-between;
    color: ${dimension.mappedValues.length > 0 && !dimension.multiple
      ? "#fff"
      : "#868e96"};

    &:hover {
      background: #262c34;
      color: #fff;
      svg {
        path {
          fill: #fff;
        }
      }
    }

    svg {
      transition: all 0.2s ease-in-out;
      transform: rotate(${dimension.mapValuesDisplayed ? "180" : "0"}deg);
      > path {
        fill: ${dimension.mappedValues.length > 0 && !dimension.multiple
          ? "#fff"
          : "#262c34"};
      }
      span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
      }
    }
  `,
  mappingItemcss: (props: any) => css`
    height: 31px;
    display: flex;
    gap: 13px;
    min-height: 31px;
    position: relative;
    padding-left: 16px;
    align-items: center;
    border-radius: 25px;
    /* z-index: 10; */
    transform: translate(0px, 0px);
    margin-bottom: ${props.marginBottom};
    color: #262c34;
    background: ${props.backgroundColor ?? "#cfd4da"};
    ${props.dimension.mappedValues.includes(props.mappingItemValue) &&
    "background: #262c34; color: #fff;"}
    p {
      font-family: "Roboto", sans-serif;
      font-size: 14px;
    }
    &:last-child {
      margin-bottom: 0px;
    }
    &:hover {
      background: #262c34;
      color: #fff;
      svg {
        path {
          fill: #fff;
        }
      }
    }
    cursor: pointer;
  `,
  mappedValuecss: css`
    height: 31px;
    display: flex;
    gap: 13px;
    min-height: 31px;
    position: relative;
    padding-left: 16px;
    width: 100%;
    align-items: center;
    border-radius: 25px;
    z-index: 10;
    transform: translate(0px, 0px);
    margin-bottom: 8px;
    background: #262c34;
    border: none;
    gap: 12px;
    outline: none;
    color: #fff;
    p {
      font-family: "Roboto", sans-serif;
      font-size: 14px;
    }
    &:last-child {
      margin-bottom: 0px;
    }
    &:hover {
      background: #262c34;
      color: #fff;
      svg {
        path {
          fill: #fff;
        }
      }
    }
    cursor: pointer;
  `,
};
