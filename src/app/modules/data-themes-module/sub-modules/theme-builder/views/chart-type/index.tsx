/* third-party */
import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import {
  getOptionsConfig,
  getDefaultOptionsValues,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import {
  charts,
  defaultChartOptions,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import {
  chartTypes,
  ChartTypeModel,
  DataThemesBuilderChartTypeProps,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type/data";

export function DataThemesBuilderChartType(
  props: DataThemesBuilderChartTypeProps
) {
  useTitle("Data Themes - Chart Type");

  const history = useHistory();

  const loading = useStoreState((state) => state.dataThemes.rawData.loading);
  const data = useStoreState(
    (state) =>
      get(state.dataThemes, "rawData.data.data", []) as {
        [key: string]: number | string | null;
      }[]
  );

  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const setChartType = useStoreActions(
    (actions) => actions.dataThemes.sync.chartType.setValue
  );

  const onChartTypeChange =
    (chartTypeId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      setChartType(selectedChartType === chartTypeId ? null : chartTypeId);
      props.setCurrentChart(
        selectedChartType === chartTypeId
          ? null
          : get(charts, chartTypeId, null)
      );
      const options = {
        ...getOptionsConfig(
          get(charts, chartTypeId, charts.barchart).visualOptions
        ),
        ...get(defaultChartOptions, chartTypeId, charts.barchart),
      };
      props.setVisualOptions(getDefaultOptionsValues(options));
    };

  if (data.length === 0 && !loading) {
    history.push("/data-themes/create/data");
  }

  return (
    <div css={commonStyles.container}>
      <DataThemesPageSubHeader />
      <DataThemesToolBox
        dataSteps
        openPanel={2}
        forceNextEnabled={selectedChartType !== null}
      />
      <div css={commonStyles.innercontainer}>
        <div
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <Grid container spacing={2}>
            {chartTypes.map((chartType: ChartTypeModel) => (
              <Grid item xs={12} sm={6} md={4} key={chartType.id}>
                <div
                  onClick={onChartTypeChange(chartType.id)}
                  css={`
                    width: 100%;
                    height: 64px;
                    display: flex;
                    padding: 0 15px;
                    user-select: none;
                    border-radius: 8px;
                    flex-direction: row;
                    align-items: center;
                    background: ${selectedChartType === chartType.id
                      ? "#cfd4da"
                      : "#dfe3e6"};
                    border: 1px solid
                      ${selectedChartType === chartType.id
                        ? "#262c34"
                        : "#dfe3e6"};

                    &:hover {
                      cursor: pointer;
                      background: #cfd4da;
                      border-color: #262c34;
                    }
                  `}
                >
                  {chartType.icon}
                  <div
                    css={`
                      display: flex;
                      margin-left: 15px;
                      flex-direction: column;
                    `}
                  >
                    <div
                      css={`
                        font-size: 14px;
                        font-family: "GothamNarrow-Bold", "Helvetica Neue",
                          sans-serif;
                      `}
                    >
                      {chartType.label}
                    </div>
                    <div
                      css={`
                        font-size: 12px;
                        font-family: "GothamNarrow-Book", "Helvetica Neue",
                          sans-serif;
                      `}
                    >
                      {chartType.categories.join(", ")}
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
