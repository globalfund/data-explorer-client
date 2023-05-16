import React from "react";
import { appColors } from "app/theme";

export const TableIcon = () => {
  console.log(appColors.COMMON.SECONDARY_COLOR_13);
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M10 10.02H15V21H10V10.02ZM17 21H20C21.1 21 22 20.1 22 19V10H17V21ZM20 3H5C3.9 3 3 3.9 3 5V8H22V5C22 3.9 21.1 3 20 3ZM3 19C3 20.1 3.9 21 5 21H8V10H3V19Z"
        fill={appColors.COMMON.SECONDARY_COLOR_13}
      />
    </svg>
  );
};
