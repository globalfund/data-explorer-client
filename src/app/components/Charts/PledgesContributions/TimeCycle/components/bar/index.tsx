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

  let nodecss =
    "cursor: pointer;transition: opacity 0.2s ease-in-out;stroke: #1B2127;";
  if (props.selected === `${props.data.indexValue}-${props.data.id}`) {
    nodecss += "z-index: 2;";
  } else if (
    props.hoveredXIndex &&
    props.hoveredXIndex === `${props.data.indexValue}-${props.data.id}`
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
      props.showTooltip(
        <PledgesContributionsTimeCycleTooltip {...props.data} />,
        e
      );
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
          props.onClick(
            `${props.data.indexValue}-${props.data.id}`,
            props.x - 100,
            0
          );
        }
      }}
      data-cy="pledges-contributions-time-cycle-bar-component"
    >
      <rect
        x={props.x}
        y={props.y}
        css={nodecss}
        fill={props.color}
        width={props.width}
        height={props.height}
      />
    </g>
  );
}
