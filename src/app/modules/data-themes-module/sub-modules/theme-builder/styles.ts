import { css } from "styled-components/macro";

export const styles = {
  container: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  `,
  innercontainer: css`
    left: 0;
    top: 144px;
    padding-top: 20px;
    max-width: 1280px;
    position: relative;
    align-self: flex-start;
    min-height: calc(100vh - 144px);
    width: calc(100vw - ((100vw - 1280px) / 2) - 400px - 24px);

    @media (max-width: 1280px) {
      width: calc(100vw - 400px);
    }
  `,
};
