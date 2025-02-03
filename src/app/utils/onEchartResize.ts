import * as echarts from "echarts";

export function onEchartResize(
  chart: echarts.ECharts,
  id: string,
  height?: number,
) {
  const container = document.getElementById(id);
  chart.resize({
    width: container?.clientWidth,
    height: height ?? "auto",
  });
}
