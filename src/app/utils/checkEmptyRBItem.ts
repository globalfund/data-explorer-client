import { RBReportItem } from "app/state/api/action-reducers/report-builder/sync";

export const checkEmptyItem = (item: RBReportItem): boolean => {
  if (item.type === "unknown") return false;
  switch (item.type) {
    case "text":
      return !!item.data.rte;
    case "chart":
      return (
        !!item.data.chartType &&
        !!item.data.dataset &&
        !!item.data.renderedChartData
      );
    case "kpi_box":
      return item.initialized;
    case "table":
      return !!item.data?.dataset;
    case "grid":
      return item.data.items.some((child) => checkEmptyItem(child));
    case "column":
      return item.data.items.some((child) => checkEmptyItem(child));
    case "image":
      return !!item.data.src;
    case "section_divider":
      return true;
    default:
      return false;
  }
};
