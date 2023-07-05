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
        d="M31.875 12.5625V42H41.625V12.5625H31.875ZM18.375 42H28.125V6.1875H18.375V42ZM4.875 42H14.625V18.9375H4.875V42Z"
        fill="#262C34"
      />
    </svg>
  );
}
