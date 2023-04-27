import { useChartsRawData } from "app/hooks/useChartsRawData";
import { useDataThemesEchart } from "app/hooks/useDataThemesEchart";
import { CommonChart } from "app/modules/chart-module/components/common-chart";
import { ChartRenderedItem } from "app/modules/chart-module/data";

import { get, isEmpty } from "lodash";
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
  const domRef = React.useRef<HTMLDivElement>(null);
  const { render } = useDataThemesEchart();

  const data = [
    { bars: "1", size: "14" },
    { bars: "50", size: "6" },
    { bars: "2", size: "4" },
    { bars: "3", size: "10" },
    { bars: "4", size: "1" },
    { bars: "59", size: "1" },
    { bars: "6", size: "4" },
    { bars: "4199", size: "6" },
  ];
  const renderedChartSsr = false;
  const renderedChart = "";
  const [renderedChartMappedData, setRenderedChartMappedData] =
    React.useState<{ bars: string; size: string }[]>(data);

  const [visualOptions, setVisualOptions] = React.useState({
    barWidth: 15.84,
    background: "transparent",
    color: "#000000",
    splitLineY: false,
    width: "100%",
    height: 100,
    marginBottom: 20,
    showXAxis: true,
    realTimeSort: false,
    xAxisLineColor: "#ADB5BD",
    xAxisLabelColor: "#262C34",
    barRadius: [2, 2, 0, 0],
    xAxisLabelInterval: (index: number) => {
      return index === 0 || index === renderedChartMappedData.length - 1;
    },
  });

  React.useEffect(() => {
    if (domRef && domRef.current && !isEmpty(visualOptions)) {
      try {
        const loader = document.getElementById("chart-placeholder");

        new Promise((resolve, reject) => {
          try {
            if (loader) {
              loader.style.display = "flex";
            }
            if (renderedChartSsr) {
              const element = document.createElement("div");
              element.innerHTML = renderedChart.trim();
              // @ts-ignore
              domRef.current.appendChild(element.firstChild || element);
            } else {
              render(
                renderedChartMappedData,
                // @ts-ignore
                domRef.current,
                "echartsBarchart",
                visualOptions,
                "common-chart-render-container"
              );
            }
            resolve(1);
          } catch (e) {
            if (process.env.NODE_ENV === "development") {
              console.log("chart error", e);
            }

            if (loader) {
              loader.style.display = "none";
            }
            reject(0);
          }
        })
          .then(() => {
            if (loader) {
              loader.style.display = "none";
            }
          })
          .catch(() => {
            if (loader) {
              loader.style.display = "none";
            }
          });
      } catch (e) {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    }
  }, [visualOptions, "", renderedChartSsr, renderedChartMappedData]);
  console.log(domRef, "reff");
  return (
    <div
      id="common-chart-render-container"
      ref={domRef}
      css={`
        height: ${visualOptions.height}px;
        width: ${visualOptions.width}px;
        margin-top: 20px;
      `}
    ></div>
  );
};

export const TotalValues = () => {
  return (
    <div
      css={`
        color: #262c34;
        font-size: 12px;
        text-align: center;
      `}
    >
      <p>
        <b>1,599,200</b> unique values
      </p>
    </div>
  );
};
