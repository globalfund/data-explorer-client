/* third-party */
import React from "react";
import get from "lodash/get";
import { DndProvider } from "react-dnd";
import findIndex from "lodash/findIndex";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSessionStorage, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  parseDataset,
  getOptionsConfig,
  chart as rawChart,
  getDefaultOptionsValues,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { useDataThemesRawData } from "app/hooks/useDataThemesRawData";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { DataThemesAlertDialog } from "app/modules/data-themes-module/components/alert-dialog";
import { DataThemesAddSectionButton } from "app/modules/data-themes-module/components/add-section-button";
import { DataThemesBuilderLock } from "app/modules/data-themes-module/sub-modules/theme-builder/views/lock";
import { DataThemesBuilderExport } from "app/modules/data-themes-module/sub-modules/theme-builder/views/export";
import { DataThemesBuilderDataView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data";
import { DataThemesBuilderTextView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/text";
import { DataThemesBuilderMapping } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping";
import { DataThemesBuilderPreview } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview";
import { DataThemesBuilderFilters } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters";
import { DataThemesBuilderCustomize } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize";
import { DataThemesBuilderInitialView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/initial";
import { DataThemesBuilderChartType } from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type";
import { getRequiredFieldsAndErrors } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping/utils";
import { DataThemesBuilderPreviewThemePage } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview-theme";
import {
  charts,
  emptyDataThemeAPI,
  DataThemeAPIModel,
  defaultChartOptions,
  routeToConfig,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";

export function DataThemesBuilder() {
  const history = useHistory();
  const location = useLocation();
  const { page, view } = useParams<{ page: string; view?: string }>();

  const [currentChart, setCurrentChart] = React.useState([[{}]]);
  const [isEditMode, setIsEditMode] = React.useState(page !== "new");
  const [currentChartData, setCurrentChartData] = React.useState([[{}]]);
  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    [[{}]]
  );
  const [rawViz, setRawViz] = React.useState<any>(null);

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const themeIds = useStoreState((state) => state.dataThemes.ids.value);

  const {
    loading,
    clearStore,
    loadingData,
    loadDataset,
    filteredData,
    rawData,
    setIsInSession,
    setRawData,
    setFilteredData,
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
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const isSaveLoading = useStoreState(
    (state) => state.dataThemes.DataThemeCreate.loading
  );
  const isDataThemeLoading = useStoreState(
    (state) => state.dataThemes.DataThemeGet.loading
  );

  const loadDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGet.fetch
  );
  const loadedDataTheme = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGet.crudData ??
        emptyDataThemeAPI) as DataThemeAPIModel
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
  const clearOrderData = useStoreActions(
    (actions) => actions.dataThemes.sync.vizOrderData.clear
  );
  const setTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setTitle
  );
  const setSubTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setSubTitle
  );
  const setTabDeleted = useStoreActions(
    (actions) => actions.dataThemes.sync.tabDeleted.setValue
  );
  const setVizDeleted = useStoreActions(
    (actions) => actions.dataThemes.sync.vizDeleted.setValue
  );
  const setVizDuplicated = useStoreActions(
    (actions) => actions.dataThemes.sync.vizDuplicated.setValue
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
    setFilteredData((prev) => [...prev, [[]]]);
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
    tmpCurrentChart[activeTabIndex].push(null);
    setCurrentChart(tmpCurrentChart);

    let tmpCurrentChartData: any = [...currentChartData];
    tmpCurrentChartData[activeTabIndex].push(null);
    setCurrentChartData(tmpCurrentChartData);

    let tmpRawData = [...rawData];
    if (
      tmpRawData[activeTabIndex].length === 0 ||
      tmpRawData[activeTabIndex][tmpRawData[activeTabIndex].length - 1].data
        .length > 0
    ) {
      tmpRawData[activeTabIndex].push({
        id: 0,
        count: 0,
        data: [],
        filterOptionGroups: [],
      });
      setRawData(tmpRawData);
    }
  }

  function deleteTab(tabIndex: number) {
    let tmpRawData = [...rawData];
    let tmpVisualOptions: any = [...visualOptions];
    let tmpCurrentChartData: any = [...currentChartData];
    if (
      tmpRawData[tabIndex] &&
      tmpVisualOptions[tabIndex] &&
      tmpCurrentChartData[tabIndex]
    ) {
      tmpRawData.splice(tabIndex, 1);
      setRawData(tmpRawData);
      tmpVisualOptions.splice(tabIndex, 1);
      setVisualOptions(tmpVisualOptions);
      tmpCurrentChartData.splice(tabIndex, 1);
      setCurrentChartData(tmpCurrentChartData);
      setTabDeleted(true);
    }
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
    setFilteredData([[[]]]);
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

  function setFilterOptionGroups(key: string, value: boolean) {
    const fOptionGroupsIndex = findIndex(
      rawData[activeTabIndex][activeVizIndex].filterOptionGroups,
      { name: key }
    );
    if (fOptionGroupsIndex > -1) {
      const updRawData = [...rawData];
      updRawData[activeTabIndex][activeVizIndex].filterOptionGroups[
        fOptionGroupsIndex
      ].enabled = value;
      setRawData(updRawData);
    }
  }

  function getForceNextEnabledValue(param?: string) {
    switch (param) {
      case "initial":
        return false;
      case "data":
        return (
          get(rawData, `[${activeTabIndex}][${activeVizIndex}].data`, [])
            .length > 0
        );
      case "preview":
        return (
          get(rawData, `[${activeTabIndex}][${activeVizIndex}].data`, [])
            .length > 0
        );
      case "chart-type":
        return selectedChartType[activeTabIndex][activeVizIndex] !== null;
      case "export":
      case "lock":
      case "customize":
      case "mapping":
        const { updRequiredFields, updErrors, updMinValuesFields } =
          getRequiredFieldsAndErrors(
            mapping[activeTabIndex][activeVizIndex],
            get(currentChart[activeTabIndex][activeVizIndex], "dimensions", [])
          );
        return (
          updRequiredFields.length === 0 &&
          updErrors.length === 0 &&
          updMinValuesFields.length === 0
        );
      case "filters":
        return true;
      default:
        return false;
    }
  }

  function getMappedData() {
    try {
      const viz = rawChart(
        get(currentChart, `[${activeTabIndex}][${activeVizIndex}]`, {}),
        {
          data: get(
            currentChartData,
            `[${activeTabIndex}][${activeVizIndex}].dataset`,
            []
          ),
          mapping: get(mapping, `[${activeTabIndex}][${activeVizIndex}]`, {}),
          visualOptions: get(
            visualOptions,
            `[${activeTabIndex}][${activeVizIndex}]`,
            {}
          ),
          dataTypes: get(
            currentChartData,
            `[${activeTabIndex}][${activeVizIndex}].dataTypes`,
            {}
          ),
        }
      );
      return viz._getVizData();
    } catch (e) {
      return null;
    }
  }

  React.useEffect(() => {
    document.body.style.background = "#fff";

    return () => {
      clearDataTheme();
      clearDataThemeBuilder();
      clearOrderData();
      setTabDeleted(false);
      setVizDeleted(false);
      setVizDuplicated(false);
    };
  }, []);

  React.useEffect(() => {
    !loading && setVisualOptionsOnChange();
  }, [selectedChartType, loading]);

  React.useEffect(() => {
    if (!loading) {
      let tmpCurrentChartData: any = [...currentChartData];
      let tmpCurrentChart: any = [...currentChart];

      filteredData.forEach((tab, tabIndex) => {
        tab.forEach((viz, vizIndex) => {
          if (
            tmpCurrentChartData[tabIndex] &&
            tmpCurrentChartData[tabIndex][vizIndex] !== undefined
          ) {
            tmpCurrentChartData[tabIndex][vizIndex] = parseDataset(
              get(filteredData, `[${tabIndex}][${vizIndex}]`, []),
              null,
              {
                locale: navigator.language || "en-US",
                decimal: ".",
                group: ",",
              }
            );
          } else if (tmpCurrentChartData[tabIndex]) {
            tmpCurrentChartData[tabIndex].push(
              parseDataset(
                get(filteredData, `[${tabIndex}][${vizIndex}]`, []),
                null,
                {
                  locale: navigator.language || "en-US",
                  decimal: ".",
                  group: ",",
                }
              )
            );
          } else {
            tmpCurrentChartData.push([
              parseDataset(
                get(filteredData, `[${tabIndex}][${vizIndex}]`, []),
                null,
                {
                  locale: navigator.language || "en-US",
                  decimal: ".",
                  group: ",",
                }
              ),
            ]);
          }
          if (
            tmpCurrentChart[tabIndex] &&
            tmpCurrentChart[tabIndex][vizIndex] !== undefined
          ) {
            tmpCurrentChart[tabIndex][vizIndex] = get(
              charts,
              get(selectedChartType, `[${tabIndex}][${vizIndex}]`, "barchart"),
              null
            );
          } else if (tmpCurrentChart[tabIndex]) {
            tmpCurrentChart[tabIndex].push(
              get(
                charts,
                get(
                  selectedChartType,
                  `[${tabIndex}][${vizIndex}]`,
                  "barchart"
                ),
                null
              )
            );
          } else {
            tmpCurrentChart.push([
              get(
                charts,
                selectedChartType[tabIndex][vizIndex] || "barchart",
                null
              ),
            ]);
          }
        });
      });

      setCurrentChartData(tmpCurrentChartData);
      setCurrentChart(tmpCurrentChart);
    }
  }, [filteredData, loading]);

  React.useEffect(() => {
    const locationStateSet: boolean = typeof location.state !== "undefined";
    setIsEditMode(page !== "new" && locationStateSet);
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

  React.useEffect(() => {
    if (loadedDataTheme) {
      if (loadedDataTheme.title.length > 0) {
        setTitle({ title: loadedDataTheme.title });
      }
      if (loadedDataTheme.subTitle.length > 0) {
        setSubTitle({ subTitle: loadedDataTheme.subTitle });
      }
    }
  }, [loadedDataTheme]);

  useUpdateEffect(() => {
    clearOrderData();
    setVizDeleted(false);
    setTabDeleted(false);
    setVizDuplicated(false);
  }, [activeTabIndex]);

  const config = get(
    routeToConfig,
    `["${view}"]`,
    routeToConfig["preview-theme"]
  );

  return (
    <React.Fragment>
      <DataThemesAlertDialog />
      <DndProvider backend={HTML5Backend}>
        <DataThemesPageSubHeader
          themeData={rawData}
          deleteTab={deleteTab}
          visualOptions={visualOptions}
          updateLocalStates={updateLocalStates}
          loading={loading || isDataThemeLoading}
          previewMode={!isEditMode && page !== "new"}
          validMapping={getForceNextEnabledValue("mapping")}
          tabsDisabled={config.tabsDisabled && page !== "new" && !isEditMode}
          data={get(rawData, `[${activeTabIndex}][${activeVizIndex}].data`, [])}
          filterOptionGroups={get(
            rawData,
            `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
            []
          )}
        />
        <DataThemesToolBox
          rawViz={rawViz}
          themeData={rawData}
          tabIndex={activeTabIndex}
          vizIndex={activeVizIndex}
          loadDataset={loadDataset}
          textView={config.textView}
          dataSteps={config.dataSteps}
          guideView={config.guideView}
          openPanel={config.openPanel}
          mappedData={getMappedData()}
          visualOptions={visualOptions}
          exportView={config.exportView}
          filtersView={config.filtersView}
          setVisualOptions={setVisualOptions}
          loading={loading || isDataThemeLoading}
          addVizToLocalStates={addVizToLocalStates}
          previewMode={!isEditMode && page !== "new"}
          setFilterOptionGroups={setFilterOptionGroups}
          forceNextEnabled={getForceNextEnabledValue(view)}
          data={get(rawData, `[${activeTabIndex}][${activeVizIndex}].data`, [])}
          currentChart={get(
            currentChart,
            `[${activeTabIndex}][${activeVizIndex}]`,
            {}
          )}
          currentChartData={get(
            currentChartData,
            `[${activeTabIndex}][${activeVizIndex}]`,
            []
          )}
          totalAvailable={get(
            rawData,
            `[${activeTabIndex}][${activeVizIndex}].count`,
            0
          )}
          filterOptionGroups={get(
            rawData,
            `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
            []
          )}
        />
        <Switch>
          {(loadingData || isSaveLoading || isDataThemeLoading) && (
            <PageLoader />
          )}
          <Route path={`/data-themes/:page/export`}>
            <DataThemesBuilderExport
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              loading={loading}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
              setRawViz={setRawViz}
            />
          </Route>
          <Route path={`/data-themes/:page/customize`}>
            <DataThemesBuilderCustomize
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              loading={loading}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
            />
          </Route>
          <Route path={`/data-themes/:page/lock`}>
            <DataThemesBuilderLock
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              loading={loading}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              setRawViz={setRawViz}
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
            />
          </Route>
          <Route path={`/data-themes/:page/filters`}>
            <DataThemesBuilderFilters
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              loading={loading}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
            />
          </Route>
          <Route path={`/data-themes/:page/mapping`}>
            <DataThemesBuilderMapping
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              loading={loading}
              currentChart={currentChart[activeTabIndex][activeVizIndex]}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={
                currentChartData[activeTabIndex][activeVizIndex]
              }
              dimensions={get(
                currentChart[activeTabIndex][activeVizIndex],
                "dimensions",
                []
              )}
            />
          </Route>
          <Route path={`/data-themes/:page/chart-type`}>
            <DataThemesBuilderChartType
              data={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].data`,
                []
              )}
              loading={loading}
              currentChart={currentChart}
              setCurrentChart={setCurrentChart}
            />
          </Route>
          <Route path={`/data-themes/:page/preview`}>
            <DataThemesBuilderPreview
              loading={loading}
              data={filteredData[activeTabIndex][activeVizIndex]}
              filterOptionGroups={get(
                rawData,
                `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
                []
              )}
            />
          </Route>
          <Route path={`/data-themes/:page/data`}>
            <DataThemesBuilderDataView />
          </Route>
          <Route path={`/data-themes/:page/initial`}>
            <DataThemesBuilderInitialView />
          </Route>
          <Route path={`/data-themes/:page/text`}>
            <DataThemesBuilderTextView />
          </Route>
          <Route path={`/data-themes/:page`}>
            <DataThemesBuilderPreviewThemePage
              loading={loading || isDataThemeLoading}
              currentChart={currentChart}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData}
              rawData={rawData}
              isEditMode={isEditMode || (page === "new" && !view)}
              setRawData={setRawData}
              setCurrentChart={setCurrentChart}
              addVizToLocalStates={addVizToLocalStates}
              setCurrentChartData={setCurrentChartData}
              validMapping={getForceNextEnabledValue("mapping")}
            />
          </Route>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </DndProvider>
      {(page === "new" || isEditMode) && (!view || view === "initial") && (
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
