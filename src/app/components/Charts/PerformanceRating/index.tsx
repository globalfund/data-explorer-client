import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { InfoIcon } from "app/assets/icons/Info";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  PerformanceRatingProps,
  ratingValues,
} from "app/components/Charts/PerformanceRating/data";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

export function PerformanceRating(props: PerformanceRatingProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        width: 100%;
        height: 600px;

        @media (max-width: 767px) {
          height: 500px;
        }
      `}
    >
      <div
        css={`
          display: flex;
          font-weight: bold;
          align-items: center;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

          > svg {
            margin-left: 10px;
          }
        `}
      >
        {get(
          cmsData,
          "componentsChartsPerformanceRating.performanceRating",
          ""
        )}{" "}
        <InfoIcon />
      </div>
      <ResponsiveBar
        animate
        enableGridY
        maxValue={5}
        indexBy="year"
        innerPadding={6}
        data={props.data}
        keys={["rating"]}
        motionDamping={15}
        groupMode="grouped"
        enableLabel={false}
        colors={["#1B2127"]}
        motionStiffness={90}
        isInteractive={false}
        padding={isMobile ? 0.3 : 0.5}
        gridYValues={[0, 1, 2, 3, 4, 5]}
        margin={{
          top: !isMobile ? 60 : 20,
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
          legendPosition: "end",
          tickValues: [0, 1, 2, 3, 4, 5],
          format: (value: number | string | Date) =>
            ratingValues[value as number],
        }}
        axisBottom={{
          tickRotation: isMobile || props.data.length > 5 ? 45 : 0,
          format: (value: number | string | Date) => {
            if (isMobile) {
              const splits = value.toString().split(" - ");
              const date1 = splits[0].split(" ");
              const date2 = splits[1].split(" ");
              return `${date1[0]} - ${date2[0]} ${date1[1]}`;
            }
            return value.toString();
          },
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
                fill: "#231d2c",
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
