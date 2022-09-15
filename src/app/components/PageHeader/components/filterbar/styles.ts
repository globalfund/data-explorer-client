import { css } from "styled-components/macro";

export const styles = {
  container: css`
    gap: 12px;
    width: 100vw;
    display: flex;
    min-height: 52px;
    padding: 10px 20px;
    background: #231d2c;
    align-items: center;

    > * {
      @supports (-webkit-touch-callout: none) and (not (translate: none)) {
        &:not(:last-child) {
          margin-right: 12px;
        }
      }
    }
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

    > * {
      @supports (-webkit-touch-callout: none) and (not (translate: none)) {
        &:not(:last-child) {
          margin-right: 12px;
        }
      }
    }

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
        background: #231d2c;
      }
    }
  `,
};
