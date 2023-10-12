/* third-party */
import React from "react";
import get from "lodash/get";
import { DndProvider } from "react-dnd";
import { useSessionStorage } from "react-use";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import {
  getOptionsConfig,
  getDefaultOptionsValues,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { useChartsRawData } from "app/hooks/useChartsRawData";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { SubheaderToolbar } from "app/modules/common/subheader-toolbar";
import { ChartBuilderLock } from "app/modules/chart-module/routes/lock";
import { ChartModuleDataView } from "app/modules/chart-module/routes/data";
import { ChartBuilderExport } from "app/modules/chart-module/routes/export";
import { ChartBuilderMapping } from "app/modules/chart-module/routes/mapping";
import { ChartBuilderPreview } from "app/modules/chart-module/routes/preview";
import { ChartBuilderFilters } from "app/modules/chart-module/routes/filters";
import { ChartModuleToolBox } from "app/modules/chart-module/components/toolbox";
import { ChartBuilderCustomize } from "app/modules/chart-module/routes/customize";
import { ChartBuilderChartType } from "app/modules/chart-module/routes/chart-type";
import { ChartBuilderPreviewTheme } from "app/modules/chart-module/routes/preview-theme";
import { getRequiredFieldsAndErrors } from "app/modules/chart-module/routes/mapping/utils";
import {
  charts,
  ChartAPIModel,
  routeToConfig,
  emptyChartAPI,
  defaultChartOptions,
} from "app/modules/chart-module/data";
import { IHeaderDetails } from "app/modules/report-module/components/right-panel/data";

export default function ChartModule() {
  const { page, view } = useParams<{ page: string; view?: string }>();
  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    {}
  );
  const [rawViz, setRawViz] = React.useState<any>(null);
  const [chartName, setChartName] = React.useState("My First Chart");
  const [datasetName, setDatasetName] = React.useState<string>("");
  const [toolboxOpen, setToolboxOpen] = React.useState(true);

  const {
    loading,
    dataTypes,
    dataStats,
    sampleData,
    isEditMode,
    loadDataset,
    loadDataFromAPI,
  } = useChartsRawData({
    visualOptions,
    setVisualOptions,
  });

  const chartType = useStoreState((state) => state.charts.chartType.value);
  const chartFromAPI = useStoreState(
    (state) => state.charts.chartFromAPI.value
  );
  const mapping = useStoreState((state) => state.charts.mapping.value);
  const isSaveLoading = useStoreState(
    (state) => state.charts.ChartCreate.loading
  );
  const isChartLoading = useStoreState(
    (state) => state.charts.ChartGet.loading
  );

  const loadChart = useStoreActions((actions) => actions.charts.ChartGet.fetch);
  const loadedChart = useStoreState(
    (state) =>
      (state.charts.ChartGet.crudData ?? emptyChartAPI) as ChartAPIModel
  );
  const clearChart = useStoreActions(
    (actions) => actions.charts.ChartGet.clear
  );
  const resetAppliedFilters = useStoreActions(
    (actions) => actions.charts.appliedFilters.reset
  );
  const resetMapping = useStoreActions(
    (actions) => actions.charts.mapping.reset
  );
  const resetChartType = useStoreActions(
    (actions) => actions.charts.chartType.reset
  );
  const resetChartFromAPI = useStoreActions(
    (actions) => actions.charts.chartFromAPI.reset
  );
  const resetDataset = useStoreActions(
    (actions) => actions.charts.dataset.reset
  );
  const resetActivePanels = useStoreActions(
    (actions) => actions.charts.activePanels.reset
  );

  const resetEnabledFilterOptionGroups = useStoreActions(
    (actions) => actions.charts.enabledFilterOptionGroups.clear
  );

  const dataset = useStoreState((state) => state.charts.dataset.value);

  const config = get(routeToConfig, `["${view}"]`, routeToConfig.preview);

  const content = React.useMemo(
    () => get(chartFromAPI, "renderedContent", ""),
    [chartFromAPI]
  );

  const dataTypes2 = React.useMemo(
    () => get(chartFromAPI, "dataTypes", dataTypes),
    [chartFromAPI, dataTypes]
  );

  const dimensions = React.useMemo(
    () =>
      get(
        chartFromAPI,
        "dimensions",
        get(charts, `[${chartType}].dimensions`, [])
      ),
    [chartFromAPI, chartType]
  );

  const mappedData = React.useMemo(
    () => get(chartFromAPI, "mappedData", ""),
    [chartFromAPI]
  );

  const filterOptionGroups = React.useMemo(
    () => get(chartFromAPI, "filterOptionGroups", []),
    [chartFromAPI]
  );

  const renderedChart = React.useMemo(() => {
    return chartFromAPI
      ? chartFromAPI.renderedContent
      : get(chartFromAPI, "content", "");
  }, [chartFromAPI]);

  const renderedChartMappedData = React.useMemo(() => {
    return get(chartFromAPI, "mappedData", []);
  }, [chartFromAPI]);

  const renderedChartSsr = React.useMemo(() => {
    return get(chartFromAPI, "ssr", false);
  }, [chartFromAPI]);

  const activeRenderedChartSsr = React.useMemo(
    () => Boolean(renderedChartSsr),
    [renderedChartSsr]
  );

  function setVisualOptionsOnChange() {
    const options = {
      ...getOptionsConfig(
        get(charts, chartType ?? "echartsBarchart", charts.echartsBarchart)
          .visualOptions
      ),
      ...get(defaultChartOptions, chartType ?? "echartsBarchart", {}),
    };
    const defaultOptionsValues = getDefaultOptionsValues(options);

    let tmpVisualOptions: any = { ...(visualOptions || defaultOptionsValues) };
    tmpVisualOptions = {
      ...defaultOptionsValues,
      ...tmpVisualOptions,
      width:
        !visualOptions.width ||
        visualOptions.width === defaultOptionsValues.width
          ? defaultOptionsValues.width
          : visualOptions.width,
    };
    setVisualOptions(tmpVisualOptions);
  }

  function addVizToLocalStates() {
    setVisualOptions({});
  }

  async function clear() {
    sessionStorage.setItem("visualOptions", JSON.stringify({}));
    resetActivePanels();
    resetDataset();
    resetMapping();
    resetChartType();
    resetAppliedFilters();
    resetEnabledFilterOptionGroups();
    resetChartFromAPI();
  }

  function clearChartBuilder() {
    clear().then(() => {
      console.log("End of reset.", "--visualOptions", visualOptions);
    });
  }

  function getForceNextEnabledValue(param?: string) {
    switch (param) {
      case "initial":
        return false;
      case "data":
        return dataset !== null;
      case "preview-data":
        return dataset !== null;
      case "chart-type":
        return chartType !== null;
      case "export":
      case "lock":
      case "customize":
      case "mapping":
        const { updRequiredFields, updErrors, updMinValuesFields } =
          getRequiredFieldsAndErrors(mapping, dimensions);
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

  function getForceEnabledPreviewValue(param?: string) {
    if (param === "preview") {
      return true;
    }
    if (param === "mapping") {
      const { updRequiredFields, updErrors, updMinValuesFields } =
        getRequiredFieldsAndErrors(mapping, dimensions);
      return (
        updRequiredFields.length === 0 &&
        updErrors.length === 0 &&
        updMinValuesFields.length === 0
      );
    }
    return false;
  }

  React.useEffect(() => {
    document.body.style.background = "white";
    if (page === "new" && dataset) {
      loadDataset(dataset);
    }
    return () => {
      document.body.style.background =
        "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #f2f7fd 100%)";
      clearChart();
      clearChartBuilder();
    };
  }, []);

  React.useEffect(() => {
    if (!view && toolboxOpen) {
      setToolboxOpen(false);
    } else if (view && !toolboxOpen) {
      setToolboxOpen(true);
    }
  }, [view]);

  React.useEffect(() => {
    if (!loading && chartType) {
      setVisualOptionsOnChange();
    }
  }, [chartType, loading]);

  React.useEffect(() => {
    if (page !== "new") {
      loadChart({ getId: page });
    } else {
      clearChart();
    }
  }, [page]);

  React.useEffect(() => {
    if (loadedChart && loadedChart.id !== "") {
      if (loadedChart.name.length > 0) {
        setChartName(loadedChart.name);
      }
    }
  }, [loadedChart]);

  return (
    <DndProvider backend={HTML5Backend}>
      <SubheaderToolbar
        pageType="chart"
        visualOptions={visualOptions}
        name={chartName}
        setName={setChartName}
        rawViz={rawViz}
        forceEnablePreviewSave={getForceEnabledPreviewValue(view)}
        appliedHeaderDetails={{} as IHeaderDetails}
        framesArray={[]}
        headerDetails={{} as IHeaderDetails}
        reportName=""
      />
      <ChartModuleToolBox
        openToolbox={toolboxOpen}
        onClose={() => setToolboxOpen(false)}
        onOpen={() => setToolboxOpen(true)}
        rawViz={rawViz}
        data={sampleData}
        chartName={chartName}
        dataTypes={dataTypes2}
        isEditMode={isEditMode}
        mappedData={mappedData}
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
        loading={loading || isChartLoading}
        filterOptionGroups={filterOptionGroups}
        addVizToLocalStates={addVizToLocalStates}
        previewMode={!isEditMode && page !== "new"}
        forceNextEnabled={getForceNextEnabledValue(view)}
        dimensions={dimensions}
        setDatasetName={setDatasetName}
      />
      <div
        css={`
          height: 55px;
        `}
      />
      <div
        css={`
          width: ${toolboxOpen
            ? "calc(100vw - ((100vw - 1280px) / 2) - 400px - 50px)"
            : "100%"};
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        `}
      >
        <Switch>
          {(isSaveLoading || isChartLoading) && <PageLoader />}
          <Route path="/chart/:page/export">
            <ChartBuilderExport
              loading={loading}
              setRawViz={setRawViz}
              renderedChart={content}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              renderedChartSsr={activeRenderedChartSsr}
              renderedChartMappedData={renderedChartMappedData}
            />
          </Route>
          <Route path="/chart/:page/customize">
            <ChartBuilderCustomize
              loading={loading}
              dimensions={dimensions}
              mappedData={mappedData}
              renderedChart={content}
              datasetName={datasetName as string}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              renderedChartSsr={activeRenderedChartSsr}
              renderedChartMappedData={renderedChartMappedData}
            />
          </Route>
          <Route path="/chart/:page/lock">
            <ChartBuilderLock
              loading={loading}
              setRawViz={setRawViz}
              datasetName={datasetName as string}
              renderedChart={content}
              dimensions={dimensions}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              renderedChartSsr={activeRenderedChartSsr}
              renderedChartMappedData={renderedChartMappedData}
            />
          </Route>
          <Route path="/chart/:page/filters">
            <ChartBuilderFilters
              loading={loading}
              renderedChart={content}
              datasetName={datasetName as string}
              dimensions={dimensions}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              renderedChartSsr={activeRenderedChartSsr}
              renderedChartMappedData={renderedChartMappedData}
            />
          </Route>
          <Route path="/chart/:page/mapping">
            <ChartBuilderMapping
              datasetName={datasetName as string}
              loading={isChartLoading}
              loadedChart={loadedChart}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              dataTypes={dataTypes2}
              dimensions={dimensions}
              renderedChart={content}
              renderedChartSsr={activeRenderedChartSsr}
              renderedChartMappedData={renderedChartMappedData}
            />
          </Route>
          <Route path="/chart/:page/chart-type">
            <ChartBuilderChartType
              loading={loading}
              datasetName={datasetName as string}
            />
          </Route>
          <Route path="/chart/:page/preview-data">
            <ChartBuilderPreview
              loading={loading}
              data={sampleData}
              loadDataset={loadDataset}
              datasetName={datasetName}
              stats={dataStats}
              filterOptionGroups={filterOptionGroups}
            />
          </Route>
          <Route path="/chart/:page/data">
            <ChartModuleDataView datasetName={datasetName} />
          </Route>
          <Route path="/chart/:page/preview">
            <ChartBuilderPreviewTheme
              loading={loading || isChartLoading}
              visualOptions={visualOptions}
              renderedChart={renderedChart}
              setVisualOptions={setVisualOptions}
              renderedChartSsr={renderedChartSsr}
              renderedChartMappedData={renderedChartMappedData}
              editable={isEditMode || (page === "new" && !view)}
            />
          </Route>
          <Route path="/chart/:page">
            <ChartBuilderPreviewTheme
              loading={loading || isChartLoading}
              visualOptions={visualOptions}
              renderedChart={renderedChart}
              setVisualOptions={setVisualOptions}
              renderedChartSsr={renderedChartSsr}
              renderedChartMappedData={renderedChartMappedData}
              editable={isEditMode || (page === "new" && !view)}
            />
          </Route>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </div>
    </DndProvider>
  );
}
