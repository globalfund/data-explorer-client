import React, { useEffect } from "react";
import filter from "lodash/filter";
import { BudgetsTimeCycleTooltip } from "app/components/Charts/Budgets/TimeCycle/components/tooltip";

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

  let nodecss =
    "cursor: pointer;transition: opacity 0.2s ease-in-out;stroke: #1B2127;";
  if (props.selected === props.data.indexValue) {
    nodecss += "z-index: 2;";
  } else if (
    props.hoveredXIndex &&
    props.hoveredXIndex === props.data.indexValue
  ) {
    nodecss += "z-index: 2;";
  } else if (props.hoveredLegend && props.hoveredLegend === props.data.id) {
    nodecss += "z-index: 2;";
  } else if (props.selected || props.hoveredXIndex || props.hoveredLegend) {
    nodecss += "opacity: 0.1;";
  }

  function onMouseMoveOrEnter(e: React.MouseEvent<SVGGElement>) {
    if (
      (props.selected || { indexValue: "" }).indexValue !==
      props.data.indexValue
    ) {
      // return ''
      setTimeout(() => {
        props.showTooltip(<BudgetsTimeCycleTooltip {...props.data.data} />, e);
        props.setHoveredXIndex(props.data.indexValue);
      }, 500);
    }
  }

  return (
    <g
      {...fprops}
      onMouseMove={onMouseMoveOrEnter}
      onMouseEnter={onMouseMoveOrEnter}
      onMouseLeave={() => {
        setTimeout(() => {
          props.hideTooltip();
          props.setHoveredXIndex(null);
        }, 500);
      }}
      onTouchStart={(e: React.TouchEvent<SVGGElement>) => {
        if (props.data.indexValue !== props.selected) {
          props.onTouchStart({
            value: props.data.value,
            id: `Year ${props.data.indexValue}`,
            filterStr: props.data.indexValue.toString(),
            components: filter(
              Object.keys(props.data.data),
              (key: string) =>
                key.indexOf("Color") === -1 &&
                key.indexOf("Code") === -1 &&
                key !== "year" &&
                key !== "amount"
            ).map((key: string) => ({
              id: key,
              height: 0,
              value: props.data.data[key],
              color: props.data.data[`${key}Color`],
            })),
          });
          // props.onClick(props.data.indexValue, props.x - 100, 0);
        }
      }}
      css={
        props.selected === props.data.indexValue ||
        (props.hoveredXIndex && props.hoveredXIndex === props.data.indexValue)
          ? "z-index: 2;cursor: pointer;"
          : ""
      }
      onClick={() => {
        if (props.data.indexValue !== props.selected) {
          props.onClick(props.data.indexValue, props.x - 100, 0);
        }
      }}
      data-cy="budgets-time-cycle-bar-component"
    >
      <rect {...fprops} fill={props.color} css={nodecss} />
    </g>
  );
}
