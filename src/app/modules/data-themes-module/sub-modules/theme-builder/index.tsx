/* third-party */
import React from "react";
import get from "lodash/get";
import { useStoreState } from "app/state/store/hooks";
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
import { DataThemesAddSectionButton } from "app/modules/data-themes-module/components/add-section-button";
import { DataThemesBuilderDataView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data";
import { DataThemesBuilderMapping } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping";
import { DataThemesBuilderPreview } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview";
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
  const [visualOptions, setVisualOptions] = React.useState(() => {
    const options = {
      ...getOptionsConfig(charts.barchart.visualOptions),
      ...defaultChartOptions.barchart,
    };
    return getDefaultOptionsValues(options);
  });

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

  React.useEffect(() => {
    if (selectedChartType) {
      setCurrentChart(get(charts, selectedChartType, null));
      const options = {
        ...getOptionsConfig(
          get(charts, selectedChartType, charts.barchart).visualOptions
        ),
        ...get(defaultChartOptions, selectedChartType, {}),
      };
      setVisualOptions(getDefaultOptionsValues(options));
    }
  }, []);

  React.useEffect(() => {
    setCurrentChartData(
      parseDataset(data, null, {
        locale: navigator.language || "en-US",
        decimal: ".",
        group: ",",
      })
    );
  }, [data]);

  return (
    <React.Fragment>
      <Switch>
        {loading && <PageLoader />}
        <Route path="/data-themes/create/customize"></Route>
        <Route path="/data-themes/create/lock"></Route>
        <Route path="/data-themes/create/filters"></Route>
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
      <DataThemesAddSectionButton
        showCreateYourStoryText={
          history.location.pathname === "/data-themes/create"
        }
      />
    </React.Fragment>
  );
}
