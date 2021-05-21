import React from "react";
import useMousePosition from "app/hooks/useMousePosition";
import {
  diseaseBurdens,
  EligibilityScatterplotHoveredNode,
  EligibilityScatterplotDataItemModel,
  incomeLevels,
} from "app/components/Charts/Eligibility/Scatterplot/data";

interface ScatterplotNodeProps {
  x: number;
  y: number;
  // id: string;
  showExtraData: boolean;
  data: EligibilityScatterplotDataItemModel;
  hovered: EligibilityScatterplotHoveredNode | null;
  onHover: (value: EligibilityScatterplotHoveredNode | null) => void;
  hoveredEligibilityLegend:
    | "Eligible"
    | "Not Eligible"
    | "Transition Funding"
    | null;
  hoveredBurdenLegend:
    | "Extreme"
    | "Severe"
    | "High"
    | "Not High"
    | "Moderate"
    | "Low"
    | "None"
    | null;
  hoveredIncomeLegend:
    | "None"
    | "Low"
    | "Low income"
    | "Lower-Lower middle income"
    | "Lower middle income"
    | "Upper-Lower middle income"
    | "Upper middle income"
    | "High income"
    | null;
}

const nodeColor = {
  Eligible: "#262C34",
  "Not Eligible": "#ADB5BD",
  "Transition Funding": "#FFFFFF",
};

const nodeBorder = {
  Eligible: "#ADB5BD",
  "Not Eligible": "#262C34",
  "Transition Funding": "#262C34",
};

export const backCircleRadius = [23, 38, 53, 68, 83, 97, 112];

const backCircleColor = [
  "transparent",
  "#70777E",
  "#98A1AA",
  "#C7CDD1",
  "#DFE3E6",
  "#F5F5F7",
  "#FFFFFF",
];

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
      `}
    >
      {props.showExtraData && (
        <circle
          cx={props.x}
          cy={props.y}
          r={backCircleRadius[props.data.diseaseBurden] / 2}
          fill={backCircleColor[props.data.incomeLevel] || "#fff"}
          css={`
            z-index: 1;
            stroke-width: 0.5px;
            mix-blend-mode: multiply;
            stroke: ${props.data.incomeLevel === 0 ? "#262c34" : "none"};
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
          stroke-width: 1px;
          stroke: ${nodeBorder[props.data.eligibility]};
          stroke-dasharray: ${props.data.eligibility === "Transition Funding"
            ? "1px"
            : "none"};
        `}
      />
    </g>
  );
}
