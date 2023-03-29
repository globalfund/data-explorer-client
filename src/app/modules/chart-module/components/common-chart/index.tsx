import React from "react";
import get from "lodash/get";
import { useStoreState } from "app/state/store/hooks";
import { PageLoader } from "app/modules/common/page-loader";
import { useDataThemesEchart } from "app/hooks/useDataThemesEchart";
import { CHART_DEFAULT_WIDTH } from "app/modules/chart-module/data";
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";

interface Props {
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setRawViz?: React.Dispatch<any>;
  setVisualOptions: (value: any) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function CommonChart(props: Props) {
  const { render } = useDataThemesEchart();

  const domRef = React.useRef<HTMLDivElement>(null);

  const chartType = useStoreState((state) => state.charts.chartType.value);

  useUpdateEffectOnce(() => {
    if (
      props.containerRef.current &&
      props.visualOptions.width === CHART_DEFAULT_WIDTH
    ) {
      const tmpVisualOptions = {
        ...props.visualOptions,
        width: props.containerRef.current.clientWidth,
      };
      props.setVisualOptions(tmpVisualOptions);
    }
  }, [props.containerRef]);

  // server side rendering
  React.useEffect(() => {
    if (props.renderedChartSsr && domRef && domRef.current) {
      try {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
      } catch (e) {}
      try {
        const element = document.createElement("div");
        element.innerHTML = props.renderedChart.trim();
        const newRawViz = domRef.current.appendChild(
          element.firstChild || element
        );
        props.setRawViz && props.setRawViz(newRawViz);
      } catch (e) {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    }
  }, [props.renderedChart]);

  // client side rendering
  React.useEffect(() => {
    if (!props.renderedChartSsr && domRef && domRef.current && chartType) {
      try {
        render(
          props.renderedChartMappedData,
          // @ts-ignore
          domRef.current,
          chartType as
            | "echartsBarchart"
            | "echartsGeomap"
            | "echartsLinechart"
            | "echartsSankey"
            | "echartsTreemap",
          props.visualOptions
        );
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    }
  }, [
    chartType,
    props.visualOptions,
    props.renderedChartSsr,
    props.renderedChartMappedData,
  ]);

  let content;

  if (props.renderedChartSsr) {
    content = (
      <div
        ref={domRef}
        id="common-chart-render-container"
        css={`
          overflow-x: auto;
          margin-top: 40px;

          * {
            font-family: "Inter", "Helvetica Neue", sans-serif !important;
          }
        `}
      />
    );
  } else {
    content = (
      <div
        css={`
          width: 100%;
          overflow: hidden;
          margin-top: 40px;
          height: ${get(props.visualOptions, "height", 500)}px;

          * {
            font-family: "Inter", "Helvetica Neue", sans-serif !important;
          }
        `}
      >
        <div
          ref={domRef}
          id="common-chart-render-container"
          css={`
            width: auto !important;
            height: ${get(props.visualOptions, "height", 500)}px;

            > div:first-of-type {
              height: ${get(props.visualOptions, "height", 500)}px !important;

              > svg {
                height: ${get(props.visualOptions, "height", 500)}px;

                > rect {
                  height: ${get(props.visualOptions, "height", 500)}px;
                }
              }
            }
          `}
        />
      </div>
    );
  }

  return (
    <>
      <div
        id="extra-loader"
        css={`
          display: none;
        `}
      >
        <PageLoader />
      </div>
      {content}
    </>
  );
}
