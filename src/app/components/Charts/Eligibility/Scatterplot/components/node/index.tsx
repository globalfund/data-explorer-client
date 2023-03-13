import React from "react";
import useMousePosition from "app/hooks/useMousePosition";
import {
  diseaseBurdens,
  EligibilityScatterplotHoveredNode,
  EligibilityScatterplotDataItemModel,
  incomeLevels,
  EligibilityType,
  DiseaseBurdenType,
  IncomeLevelType,
} from "app/components/Charts/Eligibility/Scatterplot/data";

interface ScatterplotNodeProps {
  x: number;
  y: number;
  // id: string;
  showExtraData: boolean;
  data: EligibilityScatterplotDataItemModel;
  invisible: boolean;
  hovered: EligibilityScatterplotHoveredNode | null;
  onHover: (value: EligibilityScatterplotHoveredNode | null) => void;
  hoveredEligibilityLegend: EligibilityType | null;
  hoveredBurdenLegend: DiseaseBurdenType | null;
  hoveredIncomeLegend: IncomeLevelType | null;
}

const nodeBorderStyle = {
  Eligible: "none",
  "Not Eligible": "1px",
  "Transition Funding": "3px",
};

const nodeColor = {
  Eligible: "#11AD6B",
  "Not Eligible": "#FA7355",
  "Transition Funding": "#FFD646",
};

const nodeBorder = {
  Eligible: "#1B2127",
  "Not Eligible": "#1B2127",
  "Transition Funding": "#1B2127",
};

export const backCircleRadius = [23, 38, 53, 68, 83, 97, 112];

// const backCircleColor = [
//   "transparent",
//   "#70777E",
//   "#98A1AA",
//   "#C7CDD1",
//   "#DFE3E6",
//   "#F5F5F7",
//   "#FFFFFF",
// ];

export function ScatterplotNode(props: ScatterplotNodeProps) {
  const { x, y } = useMousePosition();

  let opacity = 0.3;

  if (
    (!props.hoveredEligibilityLegend ||
      props.hoveredEligibilityLegend === props.data.eligibility) &&
    (!props.hoveredBurdenLegend ||
      props.hoveredBurdenLegend === diseaseBurdens[props.data.diseaseBurden]) &&
    (!props.hoveredIncomeLegend ||
      props.hoveredIncomeLegend === incomeLevels[props.data.incomeLevel])
  ) {
    opacity = 1;
  }

  return (
    <g
      css={`
        opacity: ${opacity};
        transition: opacity 0.2s ease-in-out;
        visibility: ${props.invisible ? "hidden" : "visible"};
      `}
    >
      {props.showExtraData && (
        <circle
          fill="#fff"
          cx={props.x}
          cy={props.y}
          r={
            props.data.diseaseBurden !== undefined &&
            props.data.diseaseBurden > -1
              ? backCircleRadius[props.data.diseaseBurden] / 2
              : 0
          }
          css={`
            z-index: 1;
            stroke: #231d2c;
            stroke-width: 0.5px;
          `}
        />
      )}
      <circle
        r="8"
        cx={props.x}
        cy={props.y}
        onMouseLeave={() => props.onHover(null)}
        onMouseEnter={() =>
          props.onHover({ ...props.data, yPosition: y, xPosition: x })
        }
        fill={nodeColor[props.data.eligibility]}
        css={`
          z-index: 2;
          strokewidth: 1px;
          stroke: ${nodeBorder[props.data.eligibility]};
          stroke-dasharray: ${nodeBorderStyle[props.data.eligibility]};
        `}
      />
    </g>
  );
}
