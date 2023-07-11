import React from "react";
import { appColors } from "app/theme";

export const TreemapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M3 6.25C3 5.38805 3.34241 4.5614 3.9519 3.9519C4.5614 3.34241 5.38805 3 6.25 3H9V21H6.25C5.38805 21 4.5614 20.6576 3.9519 20.0481C3.34241 19.4386 3 18.612 3 17.75V6.25Z"
      fill={appColors.COMMON.SECONDARY_COLOR_13}
    />
    <path
      d="M10.5 21H17.75C18.612 21 19.4386 20.6576 20.0481 20.0481C20.6576 19.4386 21 18.612 21 17.75V15.5H10.5V21Z"
      fill={appColors.COMMON.SECONDARY_COLOR_13}
    />
    <path
      d="M21 14V6.25C21 5.38805 20.6576 4.5614 20.0481 3.9519C19.4386 3.34241 18.612 3 17.75 3H10.5V14H21Z"
      fill={appColors.COMMON.SECONDARY_COLOR_13}
    />
  </svg>
);
