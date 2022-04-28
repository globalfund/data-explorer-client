import { css } from "styled-components/macro";

export const styles = {
  container: css`
    z-index: 99;
    bottom: 10px;
    position: fixed;
    left: calc((100vw - 1280px) / 2);
  `,
  innercontainer: css`
    gap: 24px;
    height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  contenttypeicons: css`
    gap: 24px;
    display: flex;
    padding: 12px 20px;
    margin-left: -20px;
    flex-direction: row;
    align-items: center;
    border-radius: 13px;
    background-color: #f1f3f5;

    > * {
      padding: 3px;
      border-radius: 50%;
      border: 1px solid #373d43;
    }
  `,
};
