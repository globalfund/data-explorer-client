import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { InfoIcon } from "app/assets/icons/Info";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  PerformanceRatingProps,
  ratingValues,
} from "app/components/Charts/PerformanceRating/data";

export function PerformanceRating(props: PerformanceRatingProps) {
  const matches = useMediaQuery("(max-width: 767px)");

  return (
    <div
      css={`
        width: 100%;
        height: 600px;
      `}
    >
      <div
        css={`
          display: flex;
          font-weight: bold;
          align-items: center;

          > svg {
            margin-left: 10px;
          }
        `}
      >
        Performance Rating <InfoIcon />
      </div>
      <ResponsiveBar
        animate
        enableGridY
        indexBy="year"
        innerPadding={6}
        data={props.data}
        keys={["rating"]}
        motionDamping={15}
        groupMode="grouped"
        enableLabel={false}
        colors={["#495057"]}
        motionStiffness={90}
        isInteractive={false}
        padding={matches ? 0.3 : 0.5}
        gridYValues={[0, 1, 2, 3, 4, 5]}
        margin={{
          top: 60,
          right: 30,
          bottom: props.data.length > 5 ? 120 : 80,
          left: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: "Rating",
          legendOffset: -60,
          legendPosition: "middle",
          tickValues: [0, 1, 2, 3, 4, 5],
          format: (value: number | string | Date) =>
            ratingValues[value as number],
        }}
        axisBottom={{
          format: (value: number | string | Date) => {
            return matches && props.data.length > 2
              ? value.toString().slice(2, 4)
              : value.toString();
          },
          tickRotation: matches && props.data.length > 3 ? 45 : 0,
        }}
        theme={{
          axis: {
            ticks: {
              line: {
                strokeWidth: 1,
                stroke: "#868E96",
                strokeOpacity: 0.3,
              },
              text: {
                fill: "#262c34",
                fontSize: 12,
              },
            },
            legend: {
              text: {
                fontWeight: "bold",
              },
            },
          },
          legends: {
            text: {
              fontSize: 12,
            },
          },
          grid: {
            line: {
              strokeWidth: 1,
              stroke: "#868E96",
              strokeOpacity: 0.3,
            },
          },
        }}
      />
    </div>
  );
}
