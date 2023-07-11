import { appColors } from "app/theme";
import { css } from "styled-components/macro";

export const styles = {
  container: css`
    gap: 12px;
    width: 100vw;
    display: flex;
    min-height: 52px;
    padding: 10px 20px;
    align-items: center;
    background: ${appColors.MOBILE_FILTER_BAR.CONTAINER_BACKGROUND_COLOR};

    > * {
      @supports (-webkit-touch-callout: none) and (not (translate: none)) {
        &:not(:last-child) {
          margin-right: 12px;
        }
      }
    }
  `,
  label: css`
    min-width: 80px;
    font-size: 12px;
    color: ${appColors.MOBILE_FILTER_BAR.LABEL_COLOR};
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
        background: ${appColors.MOBILE_FILTER_BAR.SCROLLBAR_BACKGROUND_COLOR};
      }
      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: ${appColors.MOBILE_FILTER_BAR
          .SCROLLBAR_TRACK_BACKGROUND_COLOR};
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: ${appColors.MOBILE_FILTER_BAR
          .SCROLLBAR_THUMB_BACKGROUND_COLOR};
      }
    }
  `,
};
