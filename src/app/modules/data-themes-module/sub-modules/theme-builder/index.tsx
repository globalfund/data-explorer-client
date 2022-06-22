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
import { DataThemesBuilderTextView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/text";
import {
  charts,
  defaultChartOptions,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";

export function DataThemesBuilder() {
  const history = useHistory();
  const { page, view } = useParams<{ page: string; view?: string }>();

  const [currentChart, setCurrentChart] = React.useState([[{}]]);
  const [isEditMode, setIsEditMode] = React.useState(page !== "new");
  const [currentChartData, setCurrentChartData] = React.useState([[{}]]);
  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    [[{}]]
  );

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const themeIds = useStoreState((state) => state.dataThemes.ids.value);
  const activePanels = useStoreState((state) => state.dataThemes.activePanels.value);
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );

  const setActiveTabIndex = useStoreActions(
    (state) => state.dataThemes.activeTabIndex.setValue
  );
  const setActiveVizIndex = useStoreActions(
    (state) => state.dataThemes.activeVizIndex.setValue
  );

  const {
    loading,
    clearStore,
    loadingData,
    loadDataset,
    filteredData,
    rawData,
    setIsInSession,
    setRawData,
  } = useDataThemesRawData({
    visualOptions,
    setVisualOptions,
    currentChart,
    setCurrentChart,
    currentChartData,
    setCurrentChartData,
    updateLocalStates,
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
  const resetActivePanels = useStoreActions(
    (actions) => actions.dataThemes.activePanels.reset
  );
  const resetTitles = useStoreActions(
    (actions) => actions.dataThemes.titles.reset
  );
  const resetTextContent = useStoreActions(
    (actions) => actions.dataThemes.textContent.reset
  );

  function setVisualOptionsOnChange() {
    let tmpCurrentChart: any = [...currentChart];
    tmpCurrentChart[activeTabIndex][activeVizIndex] = get(
      charts,
      selectedChartType[activeTabIndex][activeVizIndex] || "barchart",
      null
    );
    setCurrentChart(tmpCurrentChart);
    const options = {
      ...getOptionsConfig(
        get(
          charts,
          selectedChartType[activeTabIndex][activeVizIndex] || "barchart",
          charts.barchart
        ).visualOptions
      ),
      ...get(
        defaultChartOptions,
        selectedChartType[activeTabIndex][activeVizIndex] || "barchart",
        {}
      ),
    };
    const defaultOptionsValues = getDefaultOptionsValues(options);

    let tmpVisualOptions: any = [...visualOptions];
    if (visualOptions[activeTabIndex][activeVizIndex] === undefined) {
      visualOptions[activeTabIndex][activeVizIndex] = {
        ...defaultOptionsValues,
      };
    }
    tmpVisualOptions[activeTabIndex][activeVizIndex] = {
      ...defaultOptionsValues,
      ...visualOptions[activeTabIndex][activeVizIndex],
      width:
        !visualOptions[activeTabIndex][activeVizIndex].width ||
        visualOptions[activeTabIndex][activeVizIndex].width ===
          defaultOptionsValues.width
          ? defaultOptionsValues.width
          : visualOptions[activeTabIndex][activeVizIndex].width,
    };
    setVisualOptions(tmpVisualOptions);
  }

  function updateLocalStates(addTab?: boolean) {
    if (addTab) {
      let tmpVisualOptions: any = [...visualOptions];
      tmpVisualOptions.push([{}]);
      setVisualOptions(tmpVisualOptions);
    }
    setCurrentChart((prev) => [...prev, []]);
    setCurrentChartData((prev) => [...prev, []]);
    setRawData((prev) => [
      ...prev,
      [
        {
          id: 0,
          count: 0,
          data: [],
          filterOptionGroups: [],
        },
      ],
    ]);
  }

  function addVizToLocalStates() {
    let tmpVisualOptions: any = [...visualOptions];
    tmpVisualOptions[activeTabIndex].push({});
    setVisualOptions(tmpVisualOptions);

    let tmpCurrentChart: any = [...currentChart];
    tmpCurrentChart[activeTabIndex].push(undefined);
    setCurrentChart(tmpCurrentChart);

    let tmpCurrentChartData: any = [...currentChartData];
    tmpCurrentChartData[activeTabIndex].push(undefined);
    setCurrentChartData(tmpCurrentChartData);

    let tmpRawData = [...rawData];
    tmpRawData[activeTabIndex].push({
      id: 0,
      count: 0,
      data: [],
      filterOptionGroups: [],
    });
    setRawData(tmpRawData);
  }

  async function clear() {
    sessionStorage.setItem("visualOptions", JSON.stringify([[{}]]));
    setRawData([
      [
        {
          id: 0,
          count: 0,
          data: [],
          filterOptionGroups: [],
        },
      ],
    ]);
    setCurrentChart([[]]);
    setCurrentChartData([[]]);
    resetActiveTabIndex();
    resetActiveVizIndex();
    resetActivePanels();
    resetThemeIds();
    resetMapping();
    resetIsLiveData();
    resetSelectedChartType();
    resetTitles();
    resetTextContent();
    stepSelectionsActions.reset();
    resetAppliedFilters();
    clearStore();
    setIsInSession(0);
  }

  function clearDataThemeBuilder() {
    clear().then(() => {
      console.log(
        "End of reset.",
        "--resetActiveTabIndex",
        activeTabIndex,
        "--themeIds",
        themeIds,
        "--CurrentChart",
        currentChart,
        "--currentChartData",
        currentChartData,
        "--visualOptions",
        visualOptions
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
    !loading && setVisualOptionsOnChange();
  }, [selectedChartType, loading]);

  React.useEffect(() => {
    if (!loading) {
      let tmpCurrentChartData: any = [...currentChartData];
      tmpCurrentChartData[activeTabIndex][activeVizIndex] = parseDataset(
        filteredData,
        null,
        {
          locale: navigator.language || "en-US",
          decimal: ".",
          group: ",",
        }
      );
      setCurrentChartData(tmpCurrentChartData);
      let tmpCurrentChart: any = [...currentChart];
      tmpCurrentChart[activeTabIndex][activeVizIndex] = get(
        charts,
        selectedChartType[activeTabIndex][activeVizIndex] || "barchart",
        null
      );
      setCurrentChart(tmpCurrentChart);
    }
  }, [filteredData, loading]);

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
            <DataThemesBuilderCustomize
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData[activeTabIndex][activeVizIndex]}
              filterOptionGroups={
                rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              }
              themeData={rawData}
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/lock`}></Route>
          <Route path={`/data-themes/:page/filters`}>
            <DataThemesBuilderFilters
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData[activeTabIndex][activeVizIndex]}
              filterOptionGroups={
                rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              }
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/mapping`}>
            <DataThemesBuilderMapping
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData[activeTabIndex][activeVizIndex]}
              filterOptionGroups={
                rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              }
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/chart-type`}>
            <DataThemesBuilderChartType
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              currentChart={currentChart}
              setCurrentChart={setCurrentChart}
              setVisualOptions={setVisualOptions}
              filterOptionGroups={
                rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              }
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/preview`}>
            <DataThemesBuilderPreview
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              allData={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              data={filteredData}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              filterOptionGroups={
                rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              }
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/data`}>
            <DataThemesBuilderDataView
              tabIndex={activeTabIndex}
              vizIndex={activeVizIndex}
              data={rawData[activeTabIndex][activeVizIndex].data}
              loading={loading}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
              filterOptionGroups={
                rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              }
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/initial`}>
            <DataThemesBuilderInitialView
              loading={loading}
              data={filteredData}
              visualOptions={visualOptions}
              filterOptionGroups={
                rawData[activeTabIndex][activeVizIndex].filterOptionGroups
              }
              updateLocalStates={updateLocalStates}
            />
          </Route>
          <Route path={`/data-themes/:page/text`}>
            <DataThemesBuilderTextView
              data={rawData}
              loading={loading}
              visualOptions={visualOptions}
              filterOptionGroups={rawData}
              updateLocalStates={updateLocalStates}
            />
            <React.Fragment />
          </Route>
          <Route
            path={`/data-themes/:page`}
            component={() => {
              if (page === "new" && (activePanels[activeTabIndex][activeVizIndex] !== 6) && !vizIsTextContent[activeTabIndex][activeVizIndex]) {
                return <Redirect to="/data-themes/new/initial" />;
              }
              return (
                <React.Fragment>
                  {loading ? (
                    <PageLoader/>
                  ) : (
                    <React.Fragment>
                      {rawData.map((content, tabIndex) =>
                        content.map((_, vizIndex) =>
                          tabIndex === activeTabIndex ? (
                            <DataThemesBuilderPreviewTheme
                              tabIndex={tabIndex}
                              vizIndex={vizIndex}
                              data={rawData[tabIndex][vizIndex].data}
                              loading={loading}
                              loadDataset={loadDataset}
                              currentChart={currentChart[tabIndex][vizIndex]}
                              visualOptions={visualOptions}
                              setVisualOptions={setVisualOptions}
                              currentChartData={
                                currentChartData[tabIndex][vizIndex]
                              }
                              filterOptionGroups={
                                rawData[tabIndex][vizIndex].filterOptionGroups
                              }
                              dimensions={get(
                                currentChart[tabIndex][vizIndex],
                                "dimensions",
                                []
                              )}
                              updateLocalStates={updateLocalStates}
                              themeData={rawData}
                            />
                          ) : (
                            <React.Fragment />
                          )
                        )
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              );
            }}
          />
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </DndProvider>
      {(page === "new" && (!view || view === "initial")) && (
        <DataThemesAddSectionButton
          showCreateYourStoryText={
            history.location.pathname === `/data-themes/new/initial`
          }
          addVizToLocalStates={addVizToLocalStates}
        />
      )}
    </React.Fragment>
  );
}
