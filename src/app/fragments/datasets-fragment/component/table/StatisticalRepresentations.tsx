import { useChartsRawData } from "app/hooks/useChartsRawData";
import { CommonChart } from "app/modules/chart-module/components/common-chart";
import { ChartRenderedItem } from "app/modules/chart-module/data";
import { get } from "lodash";
import React from "react";

export const ProgressBar = (props: { progress: string; label: string }) => {
  return (
    <div
      css={`
        width: 171px;
      `}
    >
      <div
        css={`
          width: 100%;
          display: flex;
          justify-content: space-between;
          color: #262c34;
          height: 35px;
        `}
      >
        <p>{props.label}</p>
        <p>{props.progress}</p>
      </div>
      <div
        css={`
          width: 171px;
          height: 5px;
          background: #d9d9d9;
          border-radius: 50px;
        `}
      >
        <div
          css={`
            background: #000000;
            border-radius: 50px;
            height: 100%;
            width: ${props.progress};
          `}
        ></div>
      </div>
    </div>
  );
};

export const BarChartRepresentaion = () => {
  const ref = React.useRef(null);
  const data = [
    { bars: "bar1", size: "8" },
    { bars: "bar2", size: "10" },
  ];
  const [renderedChartMappedData, setRenderedChartMappedData] =
    React.useState(data);
  const [visualOptions, setVisualOptions] = React.useState({
    barWidth: 15.84,
    width: 162,
    height: 81,
    background: "transparent",
  });

  // console.log(data, "data");
  // console.log(visualOptions, "visualOptions");
  return (
    <div
      ref={ref}
      css={`
        height: "81px";
        width: "162px";
      `}
    >
      <CommonChart
        renderedChartMappedData={renderedChartMappedData}
        renderedChartSsr={false}
        renderedChartType="echartsBarchart"
        renderedChart=""
        visualOptions={visualOptions}
        setVisualOptions={setVisualOptions}
        containerRef={ref}
      />
    </div>
  );
};
