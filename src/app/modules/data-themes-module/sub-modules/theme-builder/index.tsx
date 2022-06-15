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
  const themeIds = useStoreState((state) => state.dataThemes.ids.value);

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
  const resetThemeIds = useStoreActions(
    (actions) => actions.dataThemes.ids.reset
  );

  function setVisualOptionsOnChange() {
    let tmpCurrentChart: any = [ ...currentChart ];
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

    let tmpVisualOptions: any = [ ...visualOptions ];
    if (visualOptions[activeTabIndex][activeVizIndex] === undefined) {
      visualOptions[activeTabIndex][activeVizIndex] = { ...defaultOptionsValues };
    }
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

  function updateLocalStates(addTab?: boolean) {
    if (addTab) {
      setCurrentChart(prev => [...prev, []]);
      setCurrentChartData(prev => [...prev, []]);
      let tmpVisualOptions: any = [ ...visualOptions ];
      tmpVisualOptions.push([{}]);
      setVisualOptions(tmpVisualOptions);
    }
  }

  async function clear() {
    // TODO: Why does setVisualOptions([[{}]]); not work?
    // setVisualOptions([[{}]]);
    sessionStorage.setItem('visualOptions', JSON.stringify([[{}]]));
    resetActiveTabIndex();
    resetActiveVizIndex();
    resetThemeIds();
    setCurrentChart([[]]);
    setCurrentChartData([[]]);
    resetMapping();
    resetIsLiveData();
    resetSelectedChartType();
    stepSelectionsActions.reset();
    resetAppliedFilters();
    clearStore();
  }

  function clearDataThemeBuilder() {
    clear().then(() => {
      console.log(
        "TODO: End of reset.",
        "--resetActiveTabIndex", activeTabIndex,
        "--themeIds", themeIds,
        "--CurrentChart", currentChart,
        "--currentChartData", currentChartData,
        "--visualOptions", visualOptions,
      );
    });
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
    let tmpCurrentChartData: any = [ ...currentChartData ];
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
            { themeIds.map((vizIds, tabIndex) => (vizIds.map((vizIndex) => (
              tabIndex === activeTabIndex ? (
                <DataThemesBuilderCustomize
                  tabIndex={tabIndex}
                  vizIndex={vizIndex}
                  data={data}
                  loading={loading}
                  loadDataset={loadDataset}
                  currentChart={currentChart[tabIndex][vizIndex]}
                  visualOptions={visualOptions}
                  setVisualOptions={setVisualOptions}
                  currentChartData={currentChartData[tabIndex][vizIndex]}
                  filterOptionGroups={filterOptionGroups}
                  dimensions={get(currentChart[tabIndex][vizIndex], "dimensions", [])}
                  updateLocalStates={updateLocalStates}
                />
              ) : (<React.Fragment />)
            )))) }
          </Route>
          <Route path={`/data-themes/:page/lock`}></Route>
          <Route path={`/data-themes/:page/filters`}>
            { themeIds.map((vizIds, tabIndex) => (vizIds.map((vizIndex) => (
              tabIndex === activeTabIndex ? (
                <DataThemesBuilderFilters
                  tabIndex={tabIndex}
                  vizIndex={vizIndex}
                  data={data}
                  loading={loading}
                  loadDataset={loadDataset}
                  currentChart={currentChart[tabIndex][vizIndex]}
                  visualOptions={visualOptions}
                  setVisualOptions={setVisualOptions}
                  currentChartData={currentChartData[tabIndex][vizIndex]}
                  filterOptionGroups={filterOptionGroups}
                  dimensions={get(currentChart[tabIndex][vizIndex], "dimensions", [])}
                  updateLocalStates={updateLocalStates}
                />
              ) : (<React.Fragment />)
            )))) }
          </Route>
          <Route path={`/data-themes/:page/mapping`}>
            { themeIds.map((vizIds, tabIndex) => (vizIds.map((vizIndex) => (
              tabIndex === activeTabIndex ? (
                <DataThemesBuilderMapping
                  tabIndex={tabIndex}
                  vizIndex={vizIndex}
                  data={data}
                  loading={loading}
                  loadDataset={loadDataset}
                  currentChart={currentChart[tabIndex][vizIndex]}
                  visualOptions={visualOptions}
                  setVisualOptions={setVisualOptions}
                  currentChartData={currentChartData[tabIndex][vizIndex]}
                  filterOptionGroups={filterOptionGroups}
                  dimensions={get(currentChart[tabIndex][vizIndex], "dimensions", [])}
                  updateLocalStates={updateLocalStates}
                />
              ) : (<React.Fragment />)
            )))) }
          </Route>
          <Route path={`/data-themes/:page/chart-type`}>
            { themeIds.map((vizIds, tabIndex) => (vizIds.map((vizIndex) => (
              tabIndex === activeTabIndex ? (
                <DataThemesBuilderChartType
                  tabIndex={tabIndex}
                  vizIndex={vizIndex}
                  data={data}
                  loading={loading}
                  loadDataset={loadDataset}
                  visualOptions={visualOptions}
                  currentChart={currentChart}
                  setCurrentChart={setCurrentChart}
                  setVisualOptions={setVisualOptions}
                  filterOptionGroups={filterOptionGroups}
                  updateLocalStates={updateLocalStates}
                />
              ) : (<React.Fragment />)
            )))) }
          </Route>
          <Route path={`/data-themes/:page/preview`}>
            { themeIds.map((vizIds, tabIndex) => (vizIds.map((vizIndex) => (
              tabIndex === activeTabIndex ? (
                <DataThemesBuilderPreview
                  tabIndex={tabIndex}
                  vizIndex={vizIndex}
                  allData={data}
                  loading={loading}
                  data={filteredData}
                  loadDataset={loadDataset}
                  visualOptions={visualOptions}
                  filterOptionGroups={filterOptionGroups}
                  updateLocalStates={updateLocalStates}
                />
              ) : (<React.Fragment />)
            )))) }
          </Route>
          <Route path={`/data-themes/:page/data`}>
            { themeIds.map((vizIds, tabIndex) => (vizIds.map((vizIndex) => (
              tabIndex === activeTabIndex ? (
                <DataThemesBuilderDataView
                  tabIndex={tabIndex}
                  vizIndex={vizIndex}
                  data={data}
                  loading={loading}
                  loadDataset={loadDataset}
                  visualOptions={visualOptions}
                  filterOptionGroups={filterOptionGroups}
                  updateLocalStates={updateLocalStates}
                />
              ) : (<React.Fragment />)
            )))) }
          </Route>
          <Route path={`/data-themes/:page/initial`}>
            { /* The Initial route is not mapped to tab and viz index because there is always one tab and one viz. TODO: Disable tabs when on this page. */}
            <DataThemesBuilderInitialView
              loading={loading}
              data={filteredData}
              visualOptions={visualOptions}
              filterOptionGroups={filterOptionGroups}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route
            path={`/data-themes/:page`}
            component={() => {
              if (page === "new") {
                return <Redirect to="/data-themes/new/initial" />;
              }
              return (
                // TODO: Rework preview to handle multiple TABS.
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
                  updateLocalStates={updateLocalStates}
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
