import { css } from "styled-components/macro";

export const styles = {
  container: css`
    gap: 12px;
    width: 100vw;
    display: flex;
    padding: 16px 20px;
    background: #495057;
    align-items: center;
  `,
  label: css`
    color: #fff;
    min-width: 80px;
    font-size: 12px;
  `,
  chipsContainer: css`
    gap: 12px;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 767px) {
      flex-wrap: nowrap;
      overflow-x: overlay;

      &::-webkit-scrollbar {
        width: 6px;
        height: 2px;
        background: #ededf6;
      }
      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: #fff;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: #495057;
      }
    }
  `,
};
