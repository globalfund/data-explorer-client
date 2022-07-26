import React from "react";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";

interface Props {
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
}

export function VizBackBtn(props: Props) {
  return (
    <button
      id="viz-back-button"
      css={`
        padding: 0;
        display: flex;
        outline: none;
        margin: 10px 0;
        font-size: 12px;
        border-style: none;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: transparent;

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        > svg {
          margin-right: 5px;
          transform: rotate(-90deg);
        }
      `}
      onClick={() => props.setVizLevel(props.vizLevel - 1)}
    >
      <TriangleXSIcon /> Back
    </button>
  );
}
