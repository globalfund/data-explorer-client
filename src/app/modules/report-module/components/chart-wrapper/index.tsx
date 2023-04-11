import React from "react";
import get from "lodash/get";
import Skeleton from "@material-ui/lab/Skeleton";
import { useChartsRawData } from "app/hooks/useChartsRawData";
import { ChartRenderedItem } from "app/modules/chart-module/data";
import { CommonChart } from "app/modules/chart-module/components/common-chart";

interface Props {
  id: string;
}

export function ReportChartWrapper(props: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  const { loadDataFromAPI } = useChartsRawData({
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
      <CommonChart
        chartId={props.id}
        setRawViz={setRawViz}
        containerRef={containerRef}
        renderedChart={renderedChart}
        visualOptions={visualOptions}
        renderedChartSsr={renderedChartSsr}
        setVisualOptions={setVisualOptions}
        renderedChartMappedData={renderedChartMappedData}
      />
    </div>
  );
}
