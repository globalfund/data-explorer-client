import { css } from "styled-components";

export const statisticalTableToolBoxStyle = {
  container: (placeUnderSubHeader?: boolean, display?: boolean) => css`
    background: #f2f7fd;
    width: 400px;
    height: 727px;
    position: fixed;
    left: ${display ? 0 : -400}px;
    top: ${!placeUnderSubHeader ? 40 : 144}px;
    height: calc(100vh - ${!placeUnderSubHeader ? 40 : 144}px);
    z-index: 100;
    background: #f5f5f7;
    box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
    transition: all ease-in 0.3s;
  `,
  row: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  clockStyle: css`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    align-items: center;
    display: flex;
    justify-content: center;
    background: #ffffff;
  `,
  topGrid: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dfe3e6;
    border-top: 1px solid #dfe3e6;
    div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0px 24px;
      height: 59px;

      /* align-items: center;
      /*  */
      p {
        color: #262c34;
        font-size: 10px;
        margin: 0;
      }
      h4 {
        font-size: 14px;
        margin: 0;
        margin-top: -4px;
        line-height: 20px;
      }
    }
  `,
};
