//cc:application base#;application routes

import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { CountryDetail } from "./modules/country-detail-module";

const VizModule = lazy(() => import("app/modules/viz-module"));
const AboutModule = lazy(() => import("app/modules/about-module"));
const GrantsModule = lazy(() => import("app/modules/grants-module"));
const ResultsModule = lazy(() => import("app/modules/results-module"));
const LandingModule = lazy(() => import("app/modules/landing-module"));
const DatasetsModule = lazy(() => import("app/modules/datasets-module"));
const DocumentsModule = lazy(() => import("app/modules/documents-module"));

export function MainRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path="/">
          <LandingModule />
        </Route>

        <Route exact path="/about">
          <AboutModule />
        </Route>

        <Route exact path="/datasets">
          <DatasetsModule />
        </Route>

        <Route exact path="/grants">
          <GrantsModule />
        </Route>

        <Route exact path="/results">
          <ResultsModule />
        </Route>

        <Route exact path="/documents">
          <DocumentsModule />
        </Route>

        <Route exact path="/viz/:vizType/:subType?">
          <VizModule />
        </Route>

        <Route exact path="/location/:code/:vizType/:subType?">
          <CountryDetail />
        </Route>

        <Route exact path="/viz">
          <Redirect to="/datasets" />
        </Route>

        <Route exact path="/notFound">
          <NoMatchPage />
        </Route>
      </Switch>
    </Suspense>
  );
}
