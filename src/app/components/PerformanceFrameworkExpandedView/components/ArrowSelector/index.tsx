import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";

interface ArrowSelectorProps {
  indicator: string;
}

export function ArrowSelector(props: ArrowSelectorProps) {
  return (
    <div
      css={`
        gap: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        > div {
          color: #262c34;
          font-size: 10px;
          max-width: 150px;
          line-height: 15px;
        }

        > button {
          &:nth-of-type(1) {
            transform: rotate(-90deg);
          }
          &:nth-of-type(2) {
            transform: rotate(90deg);
          }
        }
      `}
    >
      <IconButton>
        <TriangleXSIcon />
      </IconButton>
      <div>{props.indicator}</div>
      <IconButton>
        <TriangleXSIcon />
      </IconButton>
    </div>
  );
}
