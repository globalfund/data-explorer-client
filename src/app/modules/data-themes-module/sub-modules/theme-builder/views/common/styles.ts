import { css } from "styled-components/macro";

export const styles = {
  container: css`
    width: 100%;
    height: 100%;
  `,
  innercontainer: css`
    left: 0;
    // top: 136px;
    max-width: 1280px;
    position: relative;
    align-self: flex-start;
    padding: 136px 42px 0 0;
    min-height: calc(100vh - 144px);
    width: calc(100vw - ((100vw - 1280px) / 2) - 390px);

    @media (max-width: 1280px) {
      width: calc(100vw - 400px);
    }
  `,
  previewInnercontainer: (isEditMode: boolean) => css`
    left: 0;

    margin-top: 10rem;

    max-width: 1280px;
    position: relative;
    align-self: flex-start;
    width: calc(100vw - ((100vw - 1280px) / 2) - 400px - 24px);

    ${isEditMode &&
    `
      display: flex;
      flex-flow: row;
      flex: 1 1 100%;
      flex-direction: row;
      
      &:hover {
        background: #edf1f3;
        transition: background 0.2s ease-in-out;

        svg {
          > rect {
            fill: #edf1f3;
            transition: fill 0.2s ease-in-out;
          }
        }
      }

      > div:first-of-type {
        flex: 1 1 100%;
        max-width: 20px;
        border-radius: 3px;
        position: relative;
        background: #262c34;

        &:hover {
          cursor: move;
          background: #adb5bd;

          &:before {
            content: url("data:image/svg+xml,%3Csvg width='11' height='20' viewBox='0 0 11 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='%2370777E'/%3E%3Ccircle cx='2' cy='10' r='2' fill='%2370777E'/%3E%3Ccircle cx='2' cy='18' r='2' fill='%2370777E'/%3E%3Ccircle cx='9' cy='2' r='2' fill='%2370777E'/%3E%3Ccircle cx='9' cy='10' r='2' fill='%2370777E'/%3E%3Ccircle cx='9' cy='18' r='2' fill='%2370777E'/%3E%3C/svg%3E%0A");
          }
        }

        &:before {
          left: 5px;
          position: absolute;
          top: calc(50% - 8px);
          content: url("data:image/svg+xml,%3Csvg width='11' height='20' viewBox='0 0 11 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='2' cy='10' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='2' cy='18' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='9' cy='2' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='9' cy='10' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='9' cy='18' r='2' fill='%23CFD4DA'/%3E%3C/svg%3E%0A");
        }
      }
    `}

    @media (max-width: 1280px) {
      width: calc(100vw - 400px);
    }
  `,
};
