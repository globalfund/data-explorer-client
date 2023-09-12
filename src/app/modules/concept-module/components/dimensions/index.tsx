import React from "react";

interface Props {
  dimensions: {
    id: string;
    name: string;
  }[];
  selectedDimension: string;
  handleDimensionChange: (dimensionId: string) => () => void;
}

export function DisbursementConceptDimensions(props: Props) {
  return (
    <div
      css={`
        gap: 8px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
      `}
    >
      {props.dimensions.map((dimension) => (
        <button
          key={dimension.id}
          onClick={props.handleDimensionChange(dimension.id)}
          css={`
            height: 24px;
            outline: none;
            padding: 0 8px;
            font-size: 12px;
            border-style: none;
            border-radius: 40px;
            color: ${props.selectedDimension === dimension.id
              ? "#fff"
              : "#000"};
            font-weight: ${props.selectedDimension === dimension.id
              ? "700"
              : "400"};
            background: ${props.selectedDimension === dimension.id
              ? "#000"
              : "rgba(194, 201, 205, 0.25)"};

            &:hover {
              color: #fff;
              cursor: pointer;
              font-weight: 700;
              background: #000;
            }
          `}
        >
          {dimension.name}
        </button>
      ))}
    </div>
  );
}
