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
        d="M6 12.5C6 10.7761 6.68482 9.12279 7.90381 7.90381C9.12279 6.68482 10.7761 6 12.5 6H18V42H12.5C10.7761 42 9.12279 41.3152 7.90381 40.0962C6.68482 38.8772 6 37.2239 6 35.5V12.5Z"
        fill="#262C34"
      />
      <path
        d="M21 42H35.5C37.2239 42 38.8772 41.3152 40.0962 40.0962C41.3152 38.8772 42 37.2239 42 35.5V31H21V42Z"
        fill="#262C34"
      />
      <path
        d="M42 28V12.5C42 10.7761 41.3152 9.12279 40.0962 7.90381C38.8772 6.68482 37.2239 6 35.5 6H21V28H42Z"
        fill="#262C34"
      />
    </svg>
  );
}
