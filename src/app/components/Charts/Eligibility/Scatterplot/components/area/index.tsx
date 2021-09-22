// @ts-nocheck
import React from "react";
import filter from "lodash/filter";
import groupBy from "lodash/groupBy";
import findIndex from "lodash/findIndex";
import { area, curveLinear } from "d3-shape";
import { useStoreState } from "app/state/store/hooks";
import { CustomSvgLayerProps } from "@nivo/scatterplot";
import {
  incomeLevels,
  diseaseBurdens,
  incomeLevelColors,
} from "app/components/Charts/Eligibility/Scatterplot/data";

export function AreaLayer(props: CustomSvgLayerProps) {
  const {
    nodes,
    xScale,
    yScale,
    hoveredIncomeLegend,
    hoveredBurdenLegend,
    hoveredEligibilityLegend,
  } = props;

  const showExtraData = useStoreState(
    (state) => state.ToolBoxPanelEligibilityAdvancedCheckboxState.value
  );

  if (!showExtraData) {
    return <g />;
  }

  const data = [...props.data].reverse();

  const areaGenerator = area()
    .x((d: any) => xScale(d.data.x))
    .y0((d: any) => {
      const fYValueIndex = findIndex(data, { id: d.data.y });
      if (fYValueIndex !== undefined && fYValueIndex > -1) {
        return yScale(data[fYValueIndex].id);
      }
      return d.data.y;
    })
    .y1((d: any) => {
      const fYValueIndex = findIndex(data, { id: d.data.y });
      if (fYValueIndex === data.length - 1) {
        return yScale(data[fYValueIndex].id);
      }
      return yScale(data[fYValueIndex + 1].id);
    })
    .curve(curveLinear);

  const shapes: any[] = [];

  const groupedYNodes = groupBy(
    // filter(
    nodes,
    //   (d: any) =>
    //     d.id.split(".")[0] !== "dummy1" && d.id.split(".")[0] !== "dummy2"
    // ),
    (d: any) => d.id.split(".")[0]
  );

  Object.keys(groupedYNodes).forEach((key: string) => {
    groupedYNodes[key].forEach((yNode: any, index: number) => {
      let opacity = 0.3;
      if (
        (!hoveredEligibilityLegend ||
          hoveredEligibilityLegend === yNode.data.eligibility) &&
        (!hoveredBurdenLegend ||
          hoveredBurdenLegend === diseaseBurdens[yNode.data.diseaseBurden]) &&
        (!hoveredIncomeLegend ||
          hoveredIncomeLegend === incomeLevels[yNode.data.incomeLevel])
      ) {
        opacity = 1;
      }

      shapes.push(
        <path
          opacity={opacity}
          d={areaGenerator(
            groupedYNodes[key].slice(
              index,
              index + 2 > groupedYNodes[key].length ? index : index + 2
            )
          )}
          fill={incomeLevelColors[index === 0 ? 0 : yNode.data.incomeLevel]}
        />
      );
    });
  });

  return <g>{shapes}</g>;
}
