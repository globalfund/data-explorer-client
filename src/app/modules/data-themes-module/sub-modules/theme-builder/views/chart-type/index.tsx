/* third-party */
import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { charts } from "app/modules/data-themes-module/sub-modules/theme-builder/data";
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
      let tmpCurrentChart = [...props.currentChart];
      tmpCurrentChart[activeTabIndex][activeVizIndex] =
        selectedChartType[activeTabIndex][activeVizIndex] === chartTypeId
          ? null
          : get(charts, chartTypeId, null);
      props.setCurrentChart(tmpCurrentChart);
    };

  if (props.data.length === 0 && !props.loading) {
    history.push(`/data-themes/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <DataThemesPageSubHeader
        data={props.data}
        loading={props.loading}
        themeData={props.themeData}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
        updateLocalStates={props.updateLocalStates}
        tabsDisabled={true}
        deleteTab={props.deleteTab}
      />
      <DataThemesToolBox
        dataSteps
        openPanel={2}
        data={props.data}
        loading={props.loading}
        loadDataset={props.loadDataset}
        filterOptionGroups={props.filterOptionGroups}
        forceNextEnabled={
          selectedChartType[activeTabIndex][activeVizIndex] !== null
        }
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
        </div>
      </div>
    </div>
  );
}
