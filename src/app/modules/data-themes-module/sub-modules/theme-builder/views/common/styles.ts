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
  previewInnercontainer: (isEditMode: boolean) => css`
    left: 0;
    top: 144px;
    padding-top: 20px;
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

      > div:first-of-type {
        width: 20px;
        flex: 1 1 100%;
        border-radius: 3px;
        position: relative;
        background: #262c34;

        &:hover {
          cursor: pointer;
          background: #adb5bd;

          &:before {
            content: url("data:image/svg+xml,%3Csvg width='11' height='20' viewBox='0 0 11 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='%2370777E'/%3E%3Ccircle cx='2' cy='10' r='2' fill='%2370777E'/%3E%3Ccircle cx='2' cy='18' r='2' fill='%2370777E'/%3E%3Ccircle cx='9' cy='2' r='2' fill='%2370777E'/%3E%3Ccircle cx='9' cy='10' r='2' fill='%2370777E'/%3E%3Ccircle cx='9' cy='18' r='2' fill='%2370777E'/%3E%3C/svg%3E%0A");
          }
        }

        &:before {
          top: 50%;
          left: 6px;
          position: absolute;
          content: url("data:image/svg+xml,%3Csvg width='11' height='20' viewBox='0 0 11 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='2' cy='10' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='2' cy='18' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='9' cy='2' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='9' cy='10' r='2' fill='%23CFD4DA'/%3E%3Ccircle cx='9' cy='18' r='2' fill='%23CFD4DA'/%3E%3C/svg%3E%0A");
        }
      }
    `}

    @media (max-width: 1280px) {
      width: calc(100vw - 400px);
    }
  `,
};
