import React from "react";
import get from "lodash/get";
import * as echarts from "echarts";
import { useCMSData } from "app/hooks/useCMSData";
import {
  EchartBaseChartProps,
  getChartConfigAsPerType,
} from "app/components/Charts/common/echartBaseChart/data";

const id = "echart-container";

export function EchartBaseChart(props: EchartBaseChartProps) {
  const cmsData = useCMSData({ returnData: true });

  const ref = React.useRef<HTMLDivElement>(null);

  function onResize(chart: echarts.EChartsType, id: string, height?: number) {
    const container = document.getElementById(id);
    chart.resize({
      width: container?.clientWidth,
      height: height || "auto",
    });
  }

  React.useEffect(() => {
    if (!ref.current) return;

    new ResizeObserver(() =>
      onResize(chart, id, ref.current?.clientHeight)
    ).observe(ref.current);

    const chart = echarts.init(ref.current, undefined, {
      renderer: "canvas",
    });

    window.removeEventListener("resize", () => onResize(chart, id));

    const option = getChartConfigAsPerType(props.type, props.data, cmsData);

    chart.setOption(option);

    chart.on("click", (params) => {
      if (props.onNodeClick && get(params, "data.children.length", 0) === 0) {
        const node = `${get(params, "data.code", "")}-${get(
          params,
          "data.tooltip.header",
          ""
        )}`;
        props.onNodeClick(
          node,
          get(params, "data.code", ""),
          get(params, "data.name", "")
        );
      }
    });

    window.addEventListener("resize", () => onResize(chart, id));
  }, [ref.current, props.data]);

  return (
    <div
      id={id}
      ref={ref}
      css={`
        height: 870px;
      `}
    />
  );
}
