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
  DataThemeRenderedTabItem,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";

export function DataThemesBuilder() {
  const history = useHistory();
  const { page, view } = useParams<{ page: string; view?: string }>();

  const [tabsFromAPI, setTabsFromAPI] = React.useState<
    DataThemeRenderedTabItem[][]
  >([[]]);
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
    dataTypes,
    sampleData,
    isEditMode,
    loadDataset,
    loadDataFromAPI,
  } = useDataThemesRawData({
    visualOptions,
    setVisualOptions,
    setTabsFromAPI,
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
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
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
  const setTabTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setTabTitle
  );

  const config = get(routeToConfig, `["${view}"]`, routeToConfig.preview);

  const content = React.useMemo(
    () =>
      get(
        tabsFromAPI,
        `[${activeTabIndex}][${activeVizIndex}].renderedContent`,
        ""
      ),
    [tabsFromAPI, activeTabIndex, activeVizIndex]
  );

  const dataTypes2 = React.useMemo(
    () =>
      get(
        tabsFromAPI,
        `[${activeTabIndex}][${activeVizIndex}].dataTypes`,
        dataTypes
      ),
    [tabsFromAPI, activeTabIndex, activeVizIndex, dataTypes]
  );

  const dimensions = React.useMemo(
    () =>
      get(
        tabsFromAPI,
        `[${activeTabIndex}][${activeVizIndex}].dimensions`,
        get(
          charts,
          `${selectedChartType[activeTabIndex][activeVizIndex]}.dimensions`,
          []
        )
      ),
    [tabsFromAPI, activeTabIndex, activeVizIndex, selectedChartType]
  );

  const mappedData = React.useMemo(
    () =>
      get(tabsFromAPI, `[${activeTabIndex}][${activeVizIndex}].mappedData`, ""),
    [activeTabIndex, activeVizIndex]
  );

  const filterOptionGroups = React.useMemo(
    () =>
      get(
        tabsFromAPI,
        `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
        []
      ),
    [tabsFromAPI, activeTabIndex, activeVizIndex]
  );

  const renderedCharts = React.useMemo(() => {
    return tabsFromAPI.map((item) => {
      return item.map(
        (itemitem) => itemitem.renderedContent || get(itemitem, "content", "")
      );
    });
  }, [tabsFromAPI]);

  function setVisualOptionsOnChange() {
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
  }

  function addVizToLocalStates() {
    let tmpVisualOptions: any = [...visualOptions];
    tmpVisualOptions[activeTabIndex].push({});
    setVisualOptions(tmpVisualOptions);
  }

  function deleteTab(tabIndex: number) {
    let tmpVisualOptions: any = [...visualOptions];
    if (tmpVisualOptions[tabIndex]) {
      tmpVisualOptions.splice(tabIndex, 1);
      setVisualOptions(tmpVisualOptions);
      setTabDeleted(true);
    }
  }

  async function clear() {
    sessionStorage.setItem("visualOptions", JSON.stringify([[{}]]));
    resetActiveTabIndex();
    resetActiveVizIndex();
    resetActivePanels();
    resetThemeIds();
    resetMapping();
    resetSelectedChartType();
    resetTitles();
    resetTextContent();
    stepSelectionsActions.reset();
    resetAppliedFilters();
  }

  function clearDataThemeBuilder() {
    clear().then(() => {
      console.log(
        "End of reset.",
        "--resetActiveTabIndex",
        activeTabIndex,
        "--themeIds",
        themeIds,
        "--visualOptions",
        visualOptions
      );
    });
  }

  function setFilterOptionGroups(key: string, value: boolean) {
    // const fOptionGroupsIndex = findIndex(
    //   rawData[activeTabIndex][activeVizIndex].filterOptionGroups,
    //   { name: key }
    // );
    // if (fOptionGroupsIndex > -1) {
    //   const updRawData = [...rawData];
    //   updRawData[activeTabIndex][activeVizIndex].filterOptionGroups[
    //     fOptionGroupsIndex
    //   ].enabled = value;
    //   setRawData(updRawData);
    // }
  }

  function getForceNextEnabledValue(param?: string) {
    switch (param) {
      case "initial":
        return false;
      case "data":
        return (
          stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset !==
          null
        );
      case "preview-data":
        return (
          stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset !==
          null
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
            dimensions
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
    if (page !== "new") {
      loadDataTheme({ getId: page });
    } else {
      clearDataTheme();
    }
  }, [page]);

  React.useEffect(() => {
    if (loadedDataTheme && loadedDataTheme.id !== "") {
      if (loadedDataTheme.title.length > 0) {
        setTitle({ title: loadedDataTheme.title });
      }
      if (loadedDataTheme.subTitle.length > 0) {
        setSubTitle({ subTitle: loadedDataTheme.subTitle });
      }
      if (loadedDataTheme.tabs.length > 0) {
        loadedDataTheme.tabs.forEach((tab, tabIndex) => {
          setTabTitle({
            tabIndex: tabIndex,
            tabTitle: loadedDataTheme.tabs[tabIndex].title,
          });
        });
      }
    }
  }, [loadedDataTheme]);

  useUpdateEffect(() => {
    clearOrderData();
    setVizDeleted(false);
    setTabDeleted(false);
    setVizDuplicated(false);
  }, [activeTabIndex]);

  return (
    <React.Fragment>
      <DataThemesAlertDialog />
      <DndProvider backend={HTML5Backend}>
        <DataThemesPageSubHeader
          deleteTab={deleteTab}
          isEditMode={isEditMode}
          visualOptions={visualOptions}
          previewMode={!view && page !== "new"}
          updateLocalStates={updateLocalStates}
          loading={loading || isDataThemeLoading}
          validMapping={getForceNextEnabledValue("mapping")}
          tabsDisabled={config.tabsDisabled && page !== "new" && !isEditMode}
        />
        <DataThemesToolBox
          rawViz={rawViz}
          data={sampleData}
          dataTypes={dataTypes2}
          isEditMode={isEditMode}
          mappedData={mappedData}
          tabIndex={activeTabIndex}
          vizIndex={activeVizIndex}
          loadDataset={loadDataset}
          textView={config.textView}
          dataSteps={config.dataSteps}
          guideView={config.guideView}
          openPanel={config.openPanel}
          visualOptions={visualOptions}
          exportView={config.exportView}
          filtersView={config.filtersView}
          loadDataFromAPI={loadDataFromAPI}
          setVisualOptions={setVisualOptions}
          loading={loading || isDataThemeLoading}
          filterOptionGroups={filterOptionGroups}
          addVizToLocalStates={addVizToLocalStates}
          previewMode={!isEditMode && page !== "new"}
          setFilterOptionGroups={setFilterOptionGroups}
          forceNextEnabled={getForceNextEnabledValue(view)}
        />
        <Switch>
          {(isSaveLoading || isDataThemeLoading) && <PageLoader />}
          <Route path={`/data-themes/:page/export`}>
            <DataThemesBuilderExport
              loading={loading}
              setRawViz={setRawViz}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              renderedChart={content}
            />
          </Route>
          <Route path={`/data-themes/:page/customize`}>
            <DataThemesBuilderCustomize
              loading={loading}
              dimensions={dimensions}
              mappedData={mappedData}
              renderedChart={content}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
            />
          </Route>
          <Route path={`/data-themes/:page/lock`}>
            <DataThemesBuilderLock
              loading={loading}
              setRawViz={setRawViz}
              renderedChart={content}
              dimensions={dimensions}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
            />
          </Route>
          <Route path={`/data-themes/:page/filters`}>
            <DataThemesBuilderFilters
              loading={loading}
              renderedChart={content}
              dimensions={dimensions}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
            />
          </Route>
          <Route path={`/data-themes/:page/mapping`}>
            <DataThemesBuilderMapping
              loading={loading}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              dataTypes={dataTypes2}
              dimensions={dimensions}
              renderedChart={content}
            />
          </Route>
          <Route path={`/data-themes/:page/chart-type`}>
            <DataThemesBuilderChartType loading={loading} />
          </Route>
          <Route path={`/data-themes/:page/preview-data`}>
            <DataThemesBuilderPreview
              loading={loading}
              data={sampleData}
              loadDataset={loadDataset}
              filterOptionGroups={filterOptionGroups}
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
          <Route path={`/data-themes/:page/preview`}>
            <DataThemesBuilderPreviewThemePage
              loading={loading || isDataThemeLoading}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              isEditMode={isEditMode || (page === "new" && !view)}
              addVizToLocalStates={addVizToLocalStates}
              validMapping={getForceNextEnabledValue("mapping")}
              renderedCharts={renderedCharts}
            />
          </Route>
          <Route path={`/data-themes/:page`}>
            <DataThemesBuilderPreviewThemePage
              loading={loading || isDataThemeLoading}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              isEditMode={isEditMode || (page === "new" && !view)}
              addVizToLocalStates={addVizToLocalStates}
              validMapping={getForceNextEnabledValue("mapping")}
              renderedCharts={renderedCharts}
            />
          </Route>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </DndProvider>
      {(page === "new" || isEditMode) &&
        (view === "preview" || view === "initial") && (
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
