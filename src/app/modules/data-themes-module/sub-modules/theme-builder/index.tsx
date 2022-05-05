/* third-party */
import React from "react";
import get from "lodash/get";
import { DndProvider } from "react-dnd";
import { useSessionStorage } from "react-use";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import {
  parseDataset,
  getOptionsConfig,
  getDefaultOptionsValues,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { filterDataThemesData } from "./views/filters/utils";
import { NoMatchPage } from "app/modules/common/no-match-page";
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
  const [currentChart, setCurrentChart] = React.useState(null);
  const [currentChartData, setCurrentChartData] = React.useState(null);
  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    {}
  );

  const data = useStoreState(
    (state) =>
      get(state.dataThemes, "rawData.data.data", []) as {
        [key: string]: number | string | null;
      }[]
  );
  const loading = useStoreState((state) => state.dataThemes.rawData.loading);
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );
  const filteredData = useStoreState(
    (state) => state.dataThemes.filteredData.value
  );
  const setFilteredData = useStoreActions(
    (actions) => actions.dataThemes.filteredData.setValue
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
    setFilteredData(filterDataThemesData(data, appliedFilters));
  }, [data, appliedFilters]);

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
          {loading && <PageLoader />}
          <Route path="/data-themes/create/customize">
            <DataThemesBuilderCustomize
              currentChart={currentChart}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData}
              dimensions={get(currentChart, "dimensions", [])}
            />
          </Route>
          <Route path="/data-themes/create/lock"></Route>
          <Route path="/data-themes/create/filters">
            <DataThemesBuilderFilters
              currentChart={currentChart}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData}
              dimensions={get(currentChart, "dimensions", [])}
            />
          </Route>
          <Route path="/data-themes/create/mapping">
            <DataThemesBuilderMapping
              currentChart={currentChart}
              visualOptions={visualOptions}
              setVisualOptions={setVisualOptions}
              currentChartData={currentChartData}
              dimensions={get(currentChart, "dimensions", [])}
            />
          </Route>
          <Route path="/data-themes/create/chart-type">
            <DataThemesBuilderChartType
              setCurrentChart={setCurrentChart}
              setVisualOptions={setVisualOptions}
            />
          </Route>
          <Route path="/data-themes/create/preview">
            <DataThemesBuilderPreview />
          </Route>
          <Route path="/data-themes/create/data">
            <DataThemesBuilderDataView />
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
