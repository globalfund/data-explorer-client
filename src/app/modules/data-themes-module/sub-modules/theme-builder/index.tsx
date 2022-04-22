/* third-party */
import React from "react";
import { Switch, Route } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { DataThemesBuilderDataView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data";
import { DataThemesBuilderPreview } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview";
import { DataThemesBuilderInitialView } from "app/modules/data-themes-module/sub-modules/theme-builder/views/initial";

export function DataThemesBuilder() {
  const loading = useStoreState((state) => state.dataThemes.rawData.loading);

  return (
    <Switch>
      {loading && <PageLoader />}
      <Route path="/data-themes/create/customize"></Route>
      <Route path="/data-themes/create/lock"></Route>
      <Route path="/data-themes/create/filters"></Route>
      <Route path="/data-themes/create/mapping"></Route>
      <Route path="/data-themes/create/chart-type"></Route>
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
  );
}
