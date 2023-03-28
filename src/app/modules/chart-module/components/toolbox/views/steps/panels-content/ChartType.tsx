/* third-party */
import React from "react";
import find from "lodash/find";
import { useStoreState } from "app/state/store/hooks";
/* project */
import {
  chartTypes,
  echartTypes,
  ChartTypeModel,
} from "app/modules/chart-module/routes/chart-type/data";

export function ChartToolBoxChartType() {
  const chartType = useStoreState((state) => state.charts.chartType.value);

  const fChartType = find(
    [...chartTypes, ...echartTypes],
    (ct: ChartTypeModel) => ct.id === chartType
  );

  return (
    <div
      css={`
        width: 100%;
        height: 340px;
        display: flex;
        flex-direction: column;
        align-items: ${chartType && fChartType ? "flex-start" : "center"};
        justify-content: ${chartType && fChartType ? "flex-start" : "center"};
      `}
    >
      {!chartType && (
        <div
          css={`
            color: #262c34;
            font-size: 14px;
            font-family: "Inter", "Helvetica Neue", sans-serif;
          `}
        >
          <b>Please select a chart type</b>
        </div>
      )}
      {chartType && fChartType && (
        <React.Fragment>
          <div
            css={`
              width: 100%;
              height: 200px;
              display: flex;
              align-items: center;
              justify-content: center;

              > svg {
                transform: scale(3);
              }
            `}
          >
            {fChartType.icon}
          </div>
          <div
            css={`
              font-size: 14px;
              margin-bottom: 20px;
              font-family: "Inter", "Helvetica Neue", sans-serif;
            `}
          >
            {fChartType.label}
          </div>
          <div
            css={`
              font-size: 14px;
              line-height: 17px;
              margin-bottom: 20px;
            `}
          >
            {fChartType.description}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
