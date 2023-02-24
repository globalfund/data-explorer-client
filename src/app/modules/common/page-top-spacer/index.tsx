import React from "react";

export const PageTopSpacer = () => (
  <div
    css={`
      width: 100%;
      height: 20px;

      @media (max-width: 767px) {
        height: 14px;
      }
    `}
  />
);
