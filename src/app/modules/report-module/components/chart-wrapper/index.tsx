import React from "react";
import get from "lodash/get";
import Skeleton from "@material-ui/lab/Skeleton";
import { useChartsRawData } from "app/hooks/useChartsRawData";
import {
  ChartAPIModel,
  ChartRenderedItem,
  emptyChartAPI,
} from "app/modules/chart-module/data";
import { CommonChart } from "app/modules/chart-module/components/common-chart";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface Props {
  id: string;
}

export function ReportChartWrapper(props: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const loadChart = useStoreActions((actions) => actions.charts.ChartGet.fetch);

  const loadedChart = useStoreState(
    (state) =>
      (state.charts.ChartGet.crudData ?? emptyChartAPI) as ChartAPIModel
  );

  const [chartName, setChartName] = React.useState<string>("");
  const [rawViz, setRawViz] = React.useState<any>(null);
  const [visualOptions, setVisualOptions] = React.useState({});

  const [chartFromAPI, setChartFromAPI] =
    React.useState<ChartRenderedItem | null>(null);

  const renderedChart = React.useMemo(() => {
    return chartFromAPI
      ? chartFromAPI.renderedContent
      : get(chartFromAPI, "content", "");
  }, [chartFromAPI]);

  const renderedChartMappedData = React.useMemo(() => {
    return get(chartFromAPI, "mappedData", []);
  }, [chartFromAPI]);

  const renderedChartSsr = React.useMemo(() => {
    return get(chartFromAPI, "ssr", false);
  }, [chartFromAPI]);

  const renderedChartType = React.useMemo(() => {
    return get(chartFromAPI, "vizType", "echartsBarchart");
  }, [chartFromAPI]);

  React.useEffect(() => {
    loadChart({ getId: props.id });
  }, [props.id]);

  React.useEffect(() => {
    if (loadedChart && loadedChart.id !== "" && loadedChart.id === props.id) {
      if (loadedChart.name.length > 0) {
        setChartName(loadedChart.name);
      }
    }
  }, [loadedChart]);

  const { loadDataFromAPI, loading } = useChartsRawData({
    visualOptions,
    setVisualOptions,
    setChartFromAPI,
    chartFromAPI,
    inChartWrapper: true,
  });

  React.useEffect(() => {
    if (props.id) {
      loadDataFromAPI(undefined, props.id);
    }
  }, [props.id]);

  React.useEffect(() => {
    const visualOptionsWidth = get(visualOptions, "width", 0);
    const containerWidth = containerRef.current?.clientWidth;

    if (containerRef.current && visualOptionsWidth !== containerWidth) {
      const tmpVisualOptions = {
        ...visualOptions,
        width: containerWidth,
        height: containerRef.current?.clientHeight,
      };
      setVisualOptions(tmpVisualOptions);
    }
  }, [
    visualOptions,
    containerRef.current?.clientWidth,
    containerRef.current?.clientHeight,
  ]);

  if (!loading && !chartFromAPI) {
    return (
      <div
        css={`
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        Chart not found
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      css={`
        width: 100%;
        height: 100%;

        > div {
          margin: 0 !important;
          overflow: hidden !important;

          :nth-of-type(2) {
            #extra-loader {
              display: none !important;
            }
          }
        }
      `}
    >
      <div
        id="extra-loader"
        css={`
          .MuiSkeleton-wave::after {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(223, 227, 230, 1),
              transparent
            );
          }
        `}
      >
        <Skeleton animation="wave" variant="rect" width="100%" height="100%" />
      </div>

      <h4
        css={`
          margin: 0;
          margin-bottom: 12px;
        `}
      >
        {chartName}
      </h4>
      <CommonChart
        withHeader
        chartId={props.id}
        setRawViz={setRawViz}
        containerRef={containerRef}
        renderedChart={renderedChart}
        visualOptions={visualOptions}
        renderedChartSsr={renderedChartSsr}
        setVisualOptions={setVisualOptions}
        renderedChartType={renderedChartType}
        renderedChartMappedData={renderedChartMappedData}
      />
    </div>
  );
}
