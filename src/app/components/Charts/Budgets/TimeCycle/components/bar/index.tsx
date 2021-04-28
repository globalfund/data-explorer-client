import React from "react";
import { BudgetsTimeCycleTooltip } from "../tooltip";

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
            <BudgetsTimeCycleTooltip {...props.data.data} />,
            e
          );
          props.setHoveredXIndex(props.data.indexValue);
        }
      }}
      onMouseLeave={() => {
        props.hideTooltip();
        props.setHoveredXIndex(null);
      }}
      css={
        (props.selected || { indexValue: "" }).indexValue ===
          props.data.indexValue ||
        (props.hoveredXIndex && props.hoveredXIndex === props.data.indexValue)
          ? "z-index: 2;cursor: pointer;"
          : `cursor: pointer;${
              (props.selected || props.hoveredXIndex) && "opacity: 0.3;"
            }`
      }
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
      <rect
        {...fprops}
        fill={props.color}
        css={
          props.selected && props.selected === props.data.indexValue
            ? "stroke-width: 3px;stroke: #FBAC1B;"
            : ""
        }
      />
    </g>
  );
}
