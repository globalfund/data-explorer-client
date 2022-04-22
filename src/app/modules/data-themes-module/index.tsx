/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { Switch, Route } from "react-router-dom";
/* project */
import { NoMatchPage } from "app/modules/common/no-match-page";
import { DataThemesBuilder } from "app/modules/data-themes-module/sub-modules/theme-builder";

export default function DataThemes() {
  useTitle("The Data Explorer - Data Themes");

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  return (
    <Switch>
      <Route path="/data-themes/create/:view?">
        <DataThemesBuilder />
      </Route>
      <Route path="*">
        <NoMatchPage />
      </Route>
    </Switch>
  );
}
