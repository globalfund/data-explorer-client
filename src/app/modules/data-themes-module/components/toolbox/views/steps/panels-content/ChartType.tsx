/* third-party */
import React from "react";
import find from "lodash/find";
import { useStoreState } from "app/state/store/hooks";
/* project */
import {
  chartTypes,
  ChartTypeModel,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type/data";

export function DataThemesToolBoxChartType() {
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );

  const fChartType = find(
    chartTypes,
    (chartType: ChartTypeModel) => chartType.id === selectedChartType
  );

  return (
    <div
      css={`
        width: 100%;
        height: 340px;
        display: flex;
        flex-direction: column;
        align-items: ${selectedChartType && fChartType
          ? "flex-start"
          : "center"};
        justify-content: ${selectedChartType && fChartType
          ? "flex-start"
          : "center"};
      `}
    >
      {!selectedChartType && (
        <div
          css={`
            color: #262c34;
            font-size: 14px;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Please select a chart type
        </div>
      )}
      {selectedChartType && fChartType && (
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
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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
