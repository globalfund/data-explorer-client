/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { Switch, Route } from "react-router-dom";
/* project */
import { DataThemesBuilder } from "app/modules/data-themes-module/sub-modules/theme-builder";

export default function DataThemes() {
  useTitle("The Data Explorer - Data Themes");

  return (
    <Switch>
      <Route path="/data-themes/builder">
        <DataThemesBuilder />
      </Route>
    </Switch>
  );
}
