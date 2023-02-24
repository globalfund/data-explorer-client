import React from "react";
import { appColors } from "app/theme";

const ZoomInIcon = (props: any) => (
  <svg width={24} height={24} {...props}>
    <path
      fill={appColors.COMMON.PRIMARY_COLOR_1}
      d="M15.5,14 L14.71,14 L14.43,13.73 C15.41,12.59 16,11.11 16,9.5 C16,5.91 13.09,3 9.5,3 C5.91,3 3,5.91 3,9.5 C3,13.09 5.91,16 9.5,16 C11.11,16 12.59,15.41 13.73,14.43 L14,14.71 L14,15.5 L19,20.49 L20.49,19 L15.5,14 L15.5,14 Z M9.5,14 C7.01,14 5,11.99 5,9.5 C5,7.01 7.01,5 9.5,5 C11.99,5 14,7.01 14,9.5 C14,11.99 11.99,14 9.5,14 Z M12,10 L12,9 L10,9 L10,7 L9,7 L9,9 L7,9 L7,10 L9,10 L9,12 L10,12 L10,10 L12,10 Z"
    />
  </svg>
);

export default ZoomInIcon;
