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
  // const selectedNode = (_selectedNode || { id: '' }).id === node.id;
  const nodes = children.map((item: any) => {
    const height = (item.value / props.data.value) * props.height;
    const localPrevY = prevY;
    prevY += height;
    return (
      <rect
        x={props.x}
        y={localPrevY}
        height={height}
        fill={item.color}
        width={props.width}
        key={`${item.name}-${props.data.id}-${props.data.indexValue}`}
        // css={_selectedNode && !selectedNode ? "opacity: 0.3;" : ""}
        css={
          // use "fill: url(#diagonalHatch);" for selected
          (props.selected || { indexValue: "" }).indexValue ===
            props.data.indexValue ||
          (props.hoveredXIndex &&
            props.hoveredXIndex ===
              `${props.data.indexValue}-${props.data.id}`) ||
          props.hoveredLegend === item.name
            ? "z-index: 2;cursor: pointer;"
            : `cursor: pointer;${
                (props.selected ||
                  props.hoveredXIndex ||
                  props.hoveredLegend) &&
                "opacity: 0.3;"
              }`
        }
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
      // onClick={() => {
      //   if (props.data.indexValue !== get(props.selected, "indexValue", "")) {
      //     props.onClick({
      //       selection: props.data,
      //       translation: { x: props.x * -1 + 100, y: 0 },
      //     });
      //   } else {
      //     props.onZoomOut();
      //   }
      // }}
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
