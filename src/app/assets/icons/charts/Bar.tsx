import React from "react";

interface Props {
  width?: string;
  height?: string;
  fill?: string;
}
export const BarIcon = (props: Props) => (
  <svg
    width={props.width || "24"}
    height={props.height || "24"}
    viewBox="0 0 24 24"
  >
    <path
      d="M15.9375 6.28125V21H20.8125V6.28125H15.9375ZM9.1875 21H14.0625V3.09375H9.1875V21ZM2.4375 21H7.3125V9.46875H2.4375V21Z"
      fill={props.fill || "#13183F"}
    />
  </svg>
);
