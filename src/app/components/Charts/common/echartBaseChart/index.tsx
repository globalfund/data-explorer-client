import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import * as echarts from "echarts";
import { useCMSData } from "app/hooks/useCMSData";
import {
  EchartBaseChartProps,
  getChartConfigAsPerType,
} from "app/components/Charts/common/echartBaseChart/data";

const id = "echart-container";

const height = {
  treemap: 800,
  sankey: 800,
  polarbar: 700,
};

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
      if (props.onNodeClick) {
        if (
          props.type === "treemap" &&
          get(params, "data.children.length", 0) === 0
        ) {
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
        } else if (props.type === "sankey") {
          if (params.dataType === "node") {
            props.onNodeClick({
              id: get(params, "data.id", ""),
              filterStr: get(params, "data.filterStr", ""),
            });
          } else if (params.dataType === "edge") {
            const target = find(props.data.nodes, {
              id: get(params, "data.target", ""),
            });
            if (target) {
              props.onNodeClick({
                id: get(params, "data.target", ""),
                filterStr: get(target, "filterStr", ""),
              });
            }
          }
        } else if (props.type === "polarbar") {
          props.onNodeClick(get(params, "name", ""));
        }
      }
    });

    window.addEventListener("resize", () => onResize(chart, id));
  }, [ref.current, props.data]);

  return (
    <div
      id={id}
      ref={ref}
      css={`
        height: ${height[props.type]}px;
      `}
    />
  );
}
