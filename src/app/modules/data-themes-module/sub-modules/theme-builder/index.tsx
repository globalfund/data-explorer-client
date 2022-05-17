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

  const [currentChart, setCurrentChart] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(page !== "new");
  const [currentChartData, setCurrentChartData] = React.useState(null);
  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    {}
  );

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
  const setAppliedFilters = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters.setAll
  );
  const setMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.setValue
  );
  const setIsLiveData = useStoreActions(
    (actions) => actions.dataThemes.sync.liveData.setValue
  );
  const setSelectedChartType = useStoreActions(
    (actions) => actions.dataThemes.sync.chartType.setValue
  );
  const stepSelectionsActions = useStoreActions(
    (actions) => actions.dataThemes.sync.stepSelections
  );

  function setVisualOptionsOnChange() {
    setCurrentChart(get(charts, selectedChartType || "barchart", null));
    const options = {
      ...getOptionsConfig(
        get(charts, selectedChartType || "barchart", charts.barchart)
          .visualOptions
      ),
      ...get(defaultChartOptions, selectedChartType || "barchart", {}),
    };
    const defaultOptionsValues = getDefaultOptionsValues(options);
    setVisualOptions({
      ...defaultOptionsValues,
      ...visualOptions,
      width:
        !visualOptions.width ||
        visualOptions.width === defaultOptionsValues.width
          ? defaultOptionsValues.width
          : visualOptions.width,
    });
  }

  function clearDataThemeBuilder() {
    setCurrentChart(null);
    setCurrentChartData(null);
    setVisualOptions({});
    setMapping({});
    setIsLiveData(false);
    setSelectedChartType(null);
    stepSelectionsActions.setStep1({ dataset: null });
    setAppliedFilters({});
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
    setCurrentChartData(
      parseDataset(filteredData, null, {
        locale: navigator.language || "en-US",
        decimal: ".",
        group: ",",
      })
    );
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
            <DataThemesBuilderCustomize
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData}
              filterOptionGroups={filterOptionGroups}
              dimensions={get(currentChart, "dimensions", [])}
            />
          </Route>
          <Route path={`/data-themes/:page/lock`}></Route>
          <Route path={`/data-themes/:page/filters`}>
            <DataThemesBuilderFilters
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData}
              filterOptionGroups={filterOptionGroups}
              dimensions={get(currentChart, "dimensions", [])}
            />
          </Route>
          <Route path={`/data-themes/:page/mapping`}>
            <DataThemesBuilderMapping
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              currentChart={currentChart}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData}
              filterOptionGroups={filterOptionGroups}
              dimensions={get(currentChart, "dimensions", [])}
            />
          </Route>
          <Route path={`/data-themes/:page/chart-type`}>
            <DataThemesBuilderChartType
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              visualOptions={visualOptions}
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
                  currentChart={currentChart}
                  visualOptions={visualOptions}
                  setVisualOptions={setVisualOptions}
                  currentChartData={currentChartData}
                  filterOptionGroups={filterOptionGroups}
                  dimensions={get(currentChart, "dimensions", [])}
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
