//cc:application base#;application routes

import React, { Suspense, lazy } from "react";
import { useUrlFilters } from "app/hooks/useUrlFilters";
import { Redirect, Route, Switch } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { useFilterOptions } from "app/hooks/useFilterOptions";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { useGA } from "app/hooks/useGA";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const VizModule = lazy(() => import("app/modules/viz-module"));
const AboutModule = lazy(() => import("app/modules/about-module"));
const GrantsModule = lazy(() => import("app/modules/grants-module"));
const ResultsModule = lazy(() => import("app/modules/results-module"));
const LandingModule = lazy(() => import("app/modules/landing-module"));
const DatasetsModule = lazy(() => import("app/modules/datasets-module"));
const DocumentsModule = lazy(() => import("app/modules/documents-module"));
const GrantDetailModule = lazy(() => import("app/modules/grant-detail-module"));
const CountryDetailModule = lazy(
  () => import("app/modules/country-detail-module")
);
const PartnerDetailModule = lazy(
  () => import("app/modules/partner-detail-module")
);

export function MainRoutes() {
  useFilterOptions({});
  useUrlFilters();
  useGA();

  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  if (isSmallScreen) {
    return (
      <div
        css={`
          width: 100vw;
          height: 100vh;
          display: flex;
          text-align: center;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        `}
      >
        App is not yet optimised for smaller screens.
        <br />
        Please visit the app on a desktop.
      </div>
    );
  }
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
          <CountryDetailModule />
        </Route>

        <Route exact path="/partner/:code/:vizType/:subType?">
          <PartnerDetailModule />
        </Route>

        <Route exact path="/grant/:code/:period/:vizType/:subType?">
          <GrantDetailModule />
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
