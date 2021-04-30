import React from "react";
import { PledgesContributionsTimeCycleTooltip } from "../tooltip";

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

  return (
    <g
      {...fprops}
      onMouseEnter={(e: React.MouseEvent<SVGGElement>) => {
        if (
          (props.selected || { indexValue: "" }).indexValue !==
          props.data.indexValue
        ) {
          props.showTooltip(
            <PledgesContributionsTimeCycleTooltip {...props.data} />,
            e
          );
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
      data-cy="pledges-contributions-time-cycle-bar-component"
    >
      <rect
        x={props.x}
        y={props.y}
        fill={props.color}
        width={props.width}
        height={props.height}
        css={
          // use "fill: url(#diagonalHatch);" for selected
          (props.selected || { indexValue: "" }).indexValue ===
            props.data.indexValue ||
          (props.hoveredXIndex &&
            props.hoveredXIndex ===
              `${props.data.indexValue}-${props.data.id}`) ||
          props.hoveredLegend === props.data.id
            ? "z-index: 2;cursor: pointer;"
            : `cursor: pointer;${
                (props.selected ||
                  props.hoveredXIndex ||
                  props.hoveredLegend) &&
                "opacity: 0.3;"
              }`
        }
      />
    </g>
  );
}
