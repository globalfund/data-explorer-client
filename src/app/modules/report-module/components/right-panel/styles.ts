import { css } from "styled-components/macro";

export const styles = {
  container: css`
    right: 0;
    top: 108px;
    z-index: 99;
    width: 400px;
    display: flex;
    position: fixed;
    background: #f5f5f7;
    flex-direction: column;
    height: calc(100vh - 98px);
    box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);
  `,
  initial: css`
    display: flex;
    color: #98a1aa;
    padding: 100px;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  `,
};
