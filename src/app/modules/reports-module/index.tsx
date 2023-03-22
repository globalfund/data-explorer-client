import React from "react";
import { Route, Switch } from "react-router-dom";
import ReportsOverview from "./sub-module/overview";

export default function ReportsModulee() {
  return (
    <Switch>
      <Route exact path={`/reports/:page/overview`}>
        <ReportsOverview />
      </Route>
    </Switch>
  );
}
