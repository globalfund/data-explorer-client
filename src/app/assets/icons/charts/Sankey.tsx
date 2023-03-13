import React from "react";

interface Props {
  width?: string;
  height?: string;
  fill?: string;
}
export const SankeyIcon = (props: Props) => (
  <svg
    width={props.width || "24"}
    height={props.height || "24"}
    viewBox="0 0 24 24"
  >
    <path
      d="M20 4V6H4V4H2V12H4V10C8.16 10 9.92 12.11 11.77 14.34C13.62 16.57 15.65 19 20 19V21H22V15H20V17C16.59 17 15.07 15.17 13.31 13.06C11.34 10.69 9.1 8 4 8H20V10H22V4H20Z"
      fill={props.fill || "#13183F"}
    />
  </svg>
);
