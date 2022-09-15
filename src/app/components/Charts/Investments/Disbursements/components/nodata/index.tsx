import React from "react";

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
      <rect width="1232" height="591" fill="#DFE3E6" />
      <rect x="843" width="6" height="591" fill="#C7CDD1" />
      <rect
        x="1232"
        y="393.673"
        width="6"
        height="385"
        transform="rotate(90 1232 393.673)"
        fill="#C7CDD1"
      />
      <path
        d="M538.496 309.16H561.285V309.979H538.496V309.16Z"
        fill="#231d2c"
      />
    </svg>
  );
}
