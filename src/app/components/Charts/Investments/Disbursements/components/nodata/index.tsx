import React from "react";
import { appColors } from "app/theme";

export function NoDataTreemap() {
  return (
    <svg
      width="1232"
      height="591"
      viewBox="0 0 1232 591"
      css={`
        @media (max-width: 1232px) {
          width: 100%;
        }
        @media (max-width: 767px) {
          display: none;
        }
      `}
    >
      <rect
        width="1232"
        height="591"
        fill={appColors.COMMON.SECONDARY_COLOR_7}
      />
      <rect
        x="843"
        width="6"
        height="591"
        fill={appColors.COMMON.SECONDARY_COLOR_11}
      />
      <rect
        x="1232"
        y="393.673"
        width="6"
        height="385"
        transform="rotate(90 1232 393.673)"
        fill={appColors.COMMON.SECONDARY_COLOR_11}
      />
      <path
        d="M538.496 309.16H561.285V309.979H538.496V309.16Z"
        fill={appColors.COMMON.SECONDARY_COLOR_7}
      />
    </svg>
  );
}
