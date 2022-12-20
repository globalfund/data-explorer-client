/* third-party */
import React from "react";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import Divider from "@material-ui/core/Divider";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import {
  chartTypes,
  ChartTypeModel,
  DataThemesBuilderChartTypeProps,
  echartTypes,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type/data";

export function DataThemesBuilderChartType(
  props: DataThemesBuilderChartTypeProps
) {
  useTitle("Data Themes - Chart Type");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );
  const setChartType = useStoreActions(
    (actions) => actions.dataThemes.sync.chartType.setValue
  );
  const clearMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.clearValue
  );
  const setActivePanels = useStoreActions(
    (state) => state.dataThemes.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Chart Type component is rendered, we are at step 2.
    setActivePanels({
      tabIndex: activeTabIndex,
      vizIndex: activeVizIndex,
      panel: 2,
    });
  }, []);

  const onChartTypeChange =
    (chartTypeId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      clearMapping({ tab: activeTabIndex, viz: activeVizIndex });
      setChartType({
        tab: activeTabIndex,
        viz: activeVizIndex,
        value:
          selectedChartType[activeTabIndex][activeVizIndex] === chartTypeId
            ? null
            : chartTypeId,
      });
    };

  if (
    stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset === null &&
    !props.loading
  ) {
    history.push(`/data-themes/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        <Grid
          container
          spacing={2}
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <Grid container item spacing={2}>
            {echartTypes.map((chartType: ChartTypeModel) => (
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
                    background: ${selectedChartType[activeTabIndex][
                      activeVizIndex
                    ] === chartType.id
                      ? "#cfd4da"
                      : "#dfe3e6"};
                    border: 1px solid
                      ${selectedChartType[activeTabIndex][activeVizIndex] ===
                      chartType.id
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
          <Divider
            css={`
              margin: 8px 0 8px 8px;
              width: calc(100% - 16px);
            `}
          />
          <Grid container item spacing={2}>
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
                    background: ${selectedChartType[activeTabIndex][
                      activeVizIndex
                    ] === chartType.id
                      ? "#cfd4da"
                      : "#dfe3e6"};
                    border: 1px solid
                      ${selectedChartType[activeTabIndex][activeVizIndex] ===
                      chartType.id
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
                        font-family: "Inter", "Helvetica Neue", sans-serif;
                      `}
                    >
                      {chartType.label}
                    </div>
                    <div
                      css={`
                        font-size: 12px;
                        font-family: "Inter", "Helvetica Neue", sans-serif;
                      `}
                    >
                      {chartType.categories.join(", ")}
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
