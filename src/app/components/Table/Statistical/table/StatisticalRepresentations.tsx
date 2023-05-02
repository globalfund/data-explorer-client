import { useDataThemesEchart } from "app/hooks/useDataThemesEchart";

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

export interface ChartRepresentationProps {
  visualOptions: any;
  domRef: React.RefObject<HTMLDivElement>;
  containerId: string;
  renderedChartMappedData: any;
  setRenderedChartMappedData: React.Dispatch<React.SetStateAction<any[]>>;
}
export const BarChartRepresentaion = (props: ChartRepresentationProps) => {
  const domRef = React.useRef<HTMLDivElement>(null);
  const { render } = useDataThemesEchart();

  const renderedChartSsr = false;
  const renderedChart = "";

  React.useEffect(() => {
    if (domRef && domRef.current && !isEmpty(props.visualOptions)) {
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
                props.renderedChartMappedData,
                // @ts-ignore
                domRef.current,
                "echartsBarchart",
                props.visualOptions
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
  }, [
    props.visualOptions,
    "",
    renderedChartSsr,
    props.renderedChartMappedData,
  ]);
  return (
    <div
      css={`
        width: 100%;
      `}
    >
      <div
        id={props.containerId}
        ref={domRef}
        css={`
          height: ${props.visualOptions.height}px;
          width: ${props.visualOptions.width}px;
          margin-top: 20px;
        `}
      ></div>
    </div>
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
