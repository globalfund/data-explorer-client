import React from "react";
import get from "lodash/get";
import { InvestmentsTimeCycleTooltip } from "../tooltip";

export function BarComponent(props: any) {
  const fprops = {
    data: props.data,
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    color: props.color,
    theme: props.theme,
    label: props.label,
  };

  const children = get(props.data.data, `${props.data.id}Children`, []);
  let prevY = props.y;
  const nodes = children.map((item: any) => {
    const height = (item.value / props.data.value) * props.height;
    const localPrevY = prevY;
    prevY += height;
    let nodecss = "cursor: pointer;transition: opacity 0.2s ease-in-out;";
    if (props.selected === props.data.indexValue) {
      nodecss += "z-index: 2;fill: url(#diagonalHatch);";
    } else if (
      props.hoveredXIndex &&
      props.hoveredXIndex === `${props.data.indexValue}-${props.data.id}`
    ) {
      nodecss += "z-index: 2;";
    } else if (props.hoveredLegend && props.hoveredLegend === item.name) {
      nodecss += "z-index: 2;";
    } else if (props.selected || props.hoveredXIndex || props.hoveredLegend) {
      nodecss += "opacity: 0.3;";
    }

    return (
      <rect
        x={props.x}
        css={nodecss}
        y={localPrevY}
        height={height}
        fill={item.color}
        width={props.width}
        key={`${item.name}-${props.data.id}-${props.data.indexValue}`}
      />
    );
  });

  return (
    <g
      {...fprops}
      onMouseEnter={(e: React.MouseEvent<SVGGElement>) => {
        if (
          (props.selected || { indexValue: "" }).indexValue !==
          props.data.indexValue
        ) {
          props.showTooltip(<InvestmentsTimeCycleTooltip {...props.data} />, e);
          props.setHoveredXIndex(`${props.data.indexValue}-${props.data.id}`);
        }
      }}
      onMouseLeave={() => {
        props.hideTooltip();
        props.setHoveredXIndex(null);
      }}
      onClick={() => {
        if (props.data.indexValue !== props.selected) {
          props.onClick(props.data.indexValue, props.x - 100, 0);
        }
      }}
      data-cy="budgets-time-cycle-bar-component"
    >
      <text
        y={props.y - 10}
        x={props.x + props.width / 4}
        css={`
          font-size: 10px;
          text-transform: capitalize;
        `}
      >
        {props.data.id}
      </text>
      {nodes}
    </g>
  );
}
