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
    let nodecss =
      "cursor: pointer;transition: opacity 0.2s ease-in-out;stroke: #1B2127;";
    if (props.selected === props.data.indexValue) {
      nodecss += "z-index: 2;";
    } else if (
      props.hoveredXIndex &&
      props.hoveredXIndex === `${props.data.indexValue}-${props.data.id}`
    ) {
      nodecss += "z-index: 2;";
    } else if (props.hoveredLegend && props.hoveredLegend === item.name) {
      nodecss += "z-index: 2;";
    } else if (props.selected || props.hoveredXIndex || props.hoveredLegend) {
      nodecss += "opacity: 0.1;";
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

  function onMouseMoveOrEnter(e: React.MouseEvent<SVGGElement>) {
    if (
      (props.selected || { indexValue: "" }).indexValue !==
      props.data.indexValue
    ) {
      props.showTooltip(<InvestmentsTimeCycleTooltip {...props.data} />, e);
      props.setHoveredXIndex(`${props.data.indexValue}-${props.data.id}`);
    }
  }

  return (
    <g
      {...fprops}
      onMouseMove={onMouseMoveOrEnter}
      onMouseEnter={onMouseMoveOrEnter}
      onMouseLeave={() => {
        props.hideTooltip();
        props.setHoveredXIndex(null);
      }}
      onClick={() => {
        if (props.data.indexValue !== props.selected) {
          props.onClick(props.data.indexValue, props.x - 100, 0);
        }
      }}
      onTouchStart={() => props.onTouchStart(props.data)}
      data-cy="budgets-time-cycle-bar-component"
    >
      <text
        display="none"
        className="investments-time-cycle-bar-label"
        css={`
          font-size: 10px;
          text-transform: capitalize;
          transform: translate(${props.x + 10}px, ${props.y - 10}px)
            rotate(-90deg);
        `}
      >
        {props.data.id}
      </text>
      {nodes}
    </g>
  );
}
