/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { Switch, Route } from "react-router-dom";
/* project */
import { NoMatchPage } from "app/modules/common/no-match-page";
import { DataThemesListView } from "app/modules/data-themes-module/sub-modules/list";
import { DataThemesBuilder } from "app/modules/data-themes-module/sub-modules/theme-builder";

export default function DataThemes() {
  useTitle("The Data Explorer - Data Themes");

  return (
    <Switch>
      <Route path={`/data-themes/:page/:view?`}>
        <div
          css={`
            padding-top: 144px;
          `}
        >
          <DataThemesBuilder />
        </div>
      </Route>
      <Route exact path={`/data-themes`}>
        <DataThemesListView />
      </Route>
      <Route path="*">
        <NoMatchPage />
      </Route>
    </Switch>
  );
}