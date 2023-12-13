import React from "react";
import {
  ProgressBar,
  TotalValues,
  BarChartRepresentation,
} from "app/components/Table/Preview-table/StatisticalRepresentations";

interface Props {
  type: "bar" | "percentage" | "unique";
  data: { name: string; value: number }[];
}

export default function StatisticDisplay(props: Props) {
  if (props.type === "percentage") {
    return (
      <div
        css={`
          gap: 12px;
          display: flex;
          padding: 7px 0;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        `}
      >
        {props.data.map((item) => (
          <ProgressBar
            key={item.name}
            progress={`${item.value}%`}
            label={item.name}
          />
        ))}
      </div>
    );
  } else if (props.type === "bar") {
    return (
      <BarChartRepresentation
        data={props.data}
        containerId="common-chart-render-container"
      />
    );
  } else if (props.type === "unique") {
    return <TotalValues value={props.data[0].value} />;
  }
  return <></>;
}
