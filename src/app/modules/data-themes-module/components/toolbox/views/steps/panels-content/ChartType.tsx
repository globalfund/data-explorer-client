/* third-party */
import React from "react";
import find from "lodash/find";
import { useStoreState } from "app/state/store/hooks";
/* project */
import {
  chartTypes,
  echartTypes,
  ChartTypeModel,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type/data";

export function DataThemesToolBoxChartType() {
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );

  const fChartType = find(
    [...chartTypes, ...echartTypes],
    (chartType: ChartTypeModel) =>
      chartType.id === selectedChartType[activeTabIndex][activeVizIndex]
  );

  return (
    <div
      css={`
        width: 100%;
        height: 340px;
        display: flex;
        flex-direction: column;
        align-items: ${selectedChartType[activeTabIndex][activeVizIndex] &&
        fChartType
          ? "flex-start"
          : "center"};
        justify-content: ${selectedChartType[activeTabIndex][activeVizIndex] &&
        fChartType
          ? "flex-start"
          : "center"};
      `}
    >
      {!selectedChartType[activeTabIndex][activeVizIndex] && (
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
      {selectedChartType[activeTabIndex][activeVizIndex] && fChartType && (
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
