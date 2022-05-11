/* third-party */
import React from "react";
import get from "lodash/get";
import { DndProvider } from "react-dnd";
import { useSessionStorage } from "react-use";
import { useStoreState } from "app/state/store/hooks";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useHistory } from "react-router-dom";
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
import { DataThemesAddSectionButton } from "app/modules/data-themes-module/components/add-section-button";
import { DataThemesBuilderDataView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data";
import { DataThemesBuilderMapping } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping";
import { DataThemesBuilderPreview } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview";
import { DataThemesBuilderFilters } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters";
import { DataThemesBuilderCustomize } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize";
import { DataThemesBuilderInitialView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/initial";
import { DataThemesBuilderChartType } from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type";
import {
  charts,
  defaultChartOptions,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";

export function DataThemesBuilder() {
  const history = useHistory();

  const {
    data,
    loading,
    loadingData,
    loadDataset,
    filteredData,
    filterOptionGroups,
  } = useDataThemesRawData();

  const [currentChart, setCurrentChart] = React.useState(null);
  const [currentChartData, setCurrentChartData] = React.useState(null);
  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    {}
  );

  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
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

  return (
    <React.Fragment>
      <DndProvider backend={HTML5Backend}>
        <Switch>
          {loadingData && <PageLoader />}
          <Route path="/data-themes/create/customize">
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
          <Route path="/data-themes/create/lock"></Route>
          <Route path="/data-themes/create/filters">
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
          <Route path="/data-themes/create/mapping">
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
          <Route path="/data-themes/create/chart-type">
            <DataThemesBuilderChartType
              data={data}
              loading={loading}
              loadDataset={loadDataset}
              setCurrentChart={setCurrentChart}
              setVisualOptions={setVisualOptions}
              filterOptionGroups={filterOptionGroups}
            />
          </Route>
          <Route path="/data-themes/create/preview">
            <DataThemesBuilderPreview
              loading={loading}
              data={filteredData}
              loadDataset={loadDataset}
              filterOptionGroups={filterOptionGroups}
            />
          </Route>
          <Route path="/data-themes/create/data">
            <DataThemesBuilderDataView
              data={data}
              loadDataset={loadDataset}
              filterOptionGroups={filterOptionGroups}
            />
          </Route>
          <Route path="/data-themes/create">
            <DataThemesBuilderInitialView />
          </Route>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </DndProvider>
      <DataThemesAddSectionButton
        showCreateYourStoryText={
          history.location.pathname === "/data-themes/create"
        }
      />
    </React.Fragment>
  );
}
