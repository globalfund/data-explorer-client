/* third-party */
import React from "react";
import get from "lodash/get";
import { DndProvider } from "react-dnd";
import { useSessionStorage } from "react-use";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  Switch,
  Route,
  useHistory,
  useParams,
  Redirect,
} from "react-router-dom";
import {
  parseDataset,
  getOptionsConfig,
  getDefaultOptionsValues,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { useDataThemesRawData } from "app/hooks/useDataThemesRawData";
import { DataThemesAlertDialog } from "app/modules/data-themes-module/components/alert-dialog";
import { DataThemesAddSectionButton } from "app/modules/data-themes-module/components/add-section-button";
import { DataThemesBuilderDataView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data";
import { DataThemesBuilderMapping } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping";
import { DataThemesBuilderPreview } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview";
import { DataThemesBuilderFilters } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters";
import { DataThemesBuilderCustomize } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize";
import { DataThemesBuilderInitialView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/initial";
import { DataThemesBuilderChartType } from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type";
import { DataThemesBuilderPreviewTheme } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview-theme";
import {
  charts,
  defaultChartOptions,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";

export function DataThemesBuilder() {
  const history = useHistory();
  const { page, view } = useParams<{ page: string; view?: string }>();

  const [currentChart, setCurrentChart] = React.useState([[]]);
  const [isEditMode, setIsEditMode] = React.useState(page !== "new");
  const [currentChartData, setCurrentChartData] = React.useState([[]]);
  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    [[{}]]
  );

  const activeTabIndex = useStoreState((state) => state.dataThemes.activeTabIndex.value);
  const activeVizIndex = useStoreState((state) => state.dataThemes.activeVizIndex.value);

  const setActiveTabIndex = useStoreActions((state) => state.dataThemes.activeTabIndex.setValue);
  const setActiveVizIndex = useStoreActions((state) => state.dataThemes.activeVizIndex.setValue);

  const {
    data,
    loading,
    clearStore,
    loadingData,
    loadDataset,
    filteredData,
    filterOptionGroups,
  } = useDataThemesRawData({
    setVisualOptions,
  });

  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const isSaveLoading = useStoreState(
    (state) => state.dataThemes.DataThemeCreate.loading
  );
  const isDataThemeLoading = useStoreState(
    (state) => state.dataThemes.DataThemeGet.loading
  );

  const loadDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGet.fetch
  );
  const clearDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGet.clear
  );
  const resetAppliedFilters = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters.reset
  );
  const resetMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.reset
  );
  const resetIsLiveData = useStoreActions(
    (actions) => actions.dataThemes.sync.liveData.reset
  );
  const resetSelectedChartType = useStoreActions(
    (actions) => actions.dataThemes.sync.chartType.reset
  );
  const stepSelectionsActions = useStoreActions(
    (actions) => actions.dataThemes.sync.stepSelections
  );
  const resetActiveTabIndex = useStoreActions(
    (actions) => actions.dataThemes.activeTabIndex.reset
  );
  const resetActiveVizIndex = useStoreActions(
    (actions) => actions.dataThemes.activeVizIndex.reset
  );

  function setVisualOptionsOnChange() {
    let tmpCurrentChart: any = { ...currentChart };
    tmpCurrentChart[activeTabIndex][activeVizIndex] = get(charts, selectedChartType[activeTabIndex][activeVizIndex] || "barchart", null);
    setCurrentChart(tmpCurrentChart);
    const options = {
      ...getOptionsConfig(
        get(charts, selectedChartType[activeTabIndex][activeVizIndex] || "barchart", charts.barchart)
          .visualOptions
      ),
      ...get(defaultChartOptions, selectedChartType[activeTabIndex][activeVizIndex] || "barchart", {}),
    };
    const defaultOptionsValues = getDefaultOptionsValues(options);
    let tmpVisualOptions: any = { ...visualOptions };
    tmpVisualOptions[activeTabIndex][activeVizIndex] = {
      ...defaultOptionsValues,
      ...visualOptions[activeTabIndex][activeVizIndex],
      width:
        !visualOptions[activeTabIndex][activeVizIndex].width ||
        visualOptions[activeTabIndex][activeVizIndex].width === defaultOptionsValues.width
          ? defaultOptionsValues.width
          : visualOptions[activeTabIndex][activeVizIndex].width,
    };
    setVisualOptions(tmpVisualOptions);
  }

  function clearDataThemeBuilder() {
    resetActiveTabIndex();
    resetActiveVizIndex();
    setCurrentChart([[]]);
    setCurrentChartData([[]]);
    setVisualOptions([[{}]]);
    resetMapping();
    resetIsLiveData();
    resetSelectedChartType();
    stepSelectionsActions.reset();
    resetAppliedFilters();
    clearStore();
  }

  React.useEffect(() => {
    document.body.style.background = "#fff";

    return () => {
      clearDataTheme();
      clearDataThemeBuilder();
    };
  }, []);

  React.useEffect(() => {
    setVisualOptionsOnChange();
  }, [selectedChartType]);

  React.useEffect(() => {
    let tmpCurrentChartData: any = { ...currentChartData };
    tmpCurrentChartData[activeTabIndex][activeVizIndex] = parseDataset(filteredData, null, {
      locale: navigator.language || "en-US",
      decimal: ".",
      group: ",",
    })
    setCurrentChartData(tmpCurrentChartData);
  }, [filteredData]);

  React.useEffect(() => {
    setIsEditMode(page !== "new");
  }, [page]);

  React.useEffect(() => {
    if (isEditMode) {
      loadDataTheme({
        getId: page,
        filterString:
          'filter={"fields":{"id":true,"title":true,"subTitle":true,"public":true,"tabs":false,"createdDate":true}}',
      });
    } else {
      clearDataTheme();
    }
  }, [isEditMode]);

  return (
    <React.Fragment>
      <DataThemesAlertDialog />
      <DndProvider backend={HTML5Backend}>
        <Switch>
          {(loadingData || isSaveLoading || isDataThemeLoading) && (
            <PageLoader />
          )}
          <Route path={`/data-themes/:page/customize`}>
            {/** for each viz in activeTab */}
            <DataThemesBuilderCustomize
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData[activeTabIndex][activeVizIndex]}
              filterOptionGroups={filterOptionGroups}
              dimensions={get(currentChart[activeTabIndex][activeVizIndex], "dimensions", [])}
            />
          </Route>
          <Route path={`/data-themes/:page/lock`}></Route>
          <Route path={`/data-themes/:page/filters`}>
            <DataThemesBuilderFilters
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData[activeTabIndex][activeVizIndex]}
              filterOptionGroups={filterOptionGroups}
              dimensions={get(currentChart[activeTabIndex][activeVizIndex], "dimensions", [])}
            />
          </Route>
          <Route path={`/data-themes/:page/mapping`}>
            <DataThemesBuilderMapping
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData[activeTabIndex][activeVizIndex]}
              filterOptionGroups={filterOptionGroups}
              dimensions={get(currentChart[activeTabIndex][activeVizIndex], "dimensions", [])}
            />
          </Route>
          <Route path={`/data-themes/:page/chart-type`}>
            <DataThemesBuilderChartType
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              currentChart={currentChart}
              setCurrentChart={setCurrentChart}
              setVisualOptions={setVisualOptions}
              filterOptionGroups={filterOptionGroups}
            />
          </Route>
          <Route path={`/data-themes/:page/preview`}>
            <DataThemesBuilderPreview
              allData={data}
              loading={loading}
              data={filteredData}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              filterOptionGroups={filterOptionGroups}
            />
          </Route>
          <Route path={`/data-themes/:page/data`}>
            <DataThemesBuilderDataView
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              filterOptionGroups={filterOptionGroups}
            />
          </Route>
          <Route path={`/data-themes/:page/initial`}>
            <DataThemesBuilderInitialView
              loading={loading}
              data={filteredData}
              visualOptions={visualOptions}
              filterOptionGroups={filterOptionGroups}
            />
          </Route>
          <Route
            path={`/data-themes/:page`}
            component={() => {
              if (page === "new") {
                return <Redirect to="/data-themes/new/initial" />;
              }
              return (
                <DataThemesBuilderPreviewTheme
                  data={data}
                  loading={loading}
                  loadDataset={loadDataset}
                  currentChart={currentChart[activeTabIndex][activeVizIndex]}
                  visualOptions={visualOptions}
                  setVisualOptions={setVisualOptions}
                  currentChartData={currentChartData[activeTabIndex][activeVizIndex]}
                  filterOptionGroups={filterOptionGroups}
                  dimensions={get(currentChart[activeTabIndex][activeVizIndex], "dimensions", [])}
                />
              );
            }}
          />
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </DndProvider>
      {(page === "new" || view) && (
        <DataThemesAddSectionButton
          showCreateYourStoryText={
            history.location.pathname === `/data-themes/new/initial`
          }
        />
      )}
    </React.Fragment>
  );
}
