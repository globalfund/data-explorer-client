import React from "react";

interface Props {
  big?: boolean;
  pathFill?: string;
}
export default function Icon(props: Props) {
  return (
    <svg
      width={props.big ? "74" : "48"}
      height={props.big ? "74" : "48"}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41 6L40.68 6.06L30 10.2L18 6L6.72 9.8C6.3 9.94 6 10.3 6 10.76V41C6 41.56 6.44 42 7 42L7.32 41.94L18 37.8L30 42L41.28 38.2C41.7 38.06 42 37.7 42 37.24V7C42 6.44 41.56 6 41 6ZM30 38L18 33.78V10L30 14.22V38Z"
        fill="#262C34"
      />
    </svg>
  );
}
