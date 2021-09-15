// @ts-nocheck
import React from "react";
import findIndex from "lodash/findIndex";
import { area, curveLinear } from "d3-shape";
import { CustomSvgLayerProps } from "@nivo/scatterplot";
import { incomeLevelColors } from "app/components/Charts/Eligibility/Scatterplot/data";

export function AreaLayer(props: CustomSvgLayerProps) {
  const { nodes, xScale, yScale } = props;

  const data = props.data.reverse();

  const areaGenerator = area()
    .x((d: any) => xScale(d.data.x))
    .y0((d: any) => yScale(d.data.y))
    .y1((d: any) => {
      const fYValueIndex = findIndex(data, { id: d.data.y });
      if (fYValueIndex === data.length - 1) {
        return yScale(d.data.y);
      }
      return yScale(data[fYValueIndex + 1].id);
    })
    .curve(curveLinear);

  const shapes: any[] = [];

  nodes.forEach((node, index) => {
    shapes.push(
      <path
        opacity="0.6"
        key={node.index}
        d={areaGenerator(nodes)}
        fill={
          incomeLevelColors[
            index === 0 ? nodes[1].data.incomeLevel : node.data.incomeLevel
          ]
        }
      />
    );
  });

  return shapes;
}
