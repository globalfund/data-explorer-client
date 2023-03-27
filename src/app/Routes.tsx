// cc:application base#;application routes

// base
import React, { Suspense, lazy } from "react";
// import axios, { AxiosResponse } from "axios";
import { Route, Switch } from "react-router-dom";

import { useScrollToTop } from "app/hooks/useScrollToTop";
import { PageLoader } from "app/modules/common/page-loader";
import ChartDetailModule from "./modules/chart-detail-module";
import { RouteWithAppBar } from "./utils/RouteWithAppBar";
import { PrivateRoute } from "./utils/PrivateRoute";
import UserProfileModule from "./modules/user-profile-module";

const HomeModule = lazy(() => import("app/modules/home-module"));
const AboutModule = lazy(() => import("app/modules/about-module"));
const DatasetsModule = lazy(() => import("app/modules/datasets-module"));
const ChartsModule = lazy(() => import("app/modules/charts-module"));

const DatasetUploadSteps = lazy(
  () => import("app/fragments/datasets-fragment/upload-steps")
);
const EditMetaData = lazy(
  () => import("app/modules/datasets-module/editMetaData")
);
const ReportsModule = lazy(() => import("app/modules/reports-module"));
const DataSetDetailModule = lazy(
  () => import("app/modules/dataset-detail-module")
);
const DataThemesModule = lazy(() => import("app/modules/data-themes-module"));
const DatasetUploadModule = lazy(
  () => import("app/modules/dataset-upload-module")
);
const DatasetListModule = lazy(
  () => import("app/modules/datasets-module/list")
);
const OnboardingModule = lazy(() => import("app/modules/onboarding-module"));

export function MainRoutes() {
  useScrollToTop();

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={`/onboarding/:page`}>
          <OnboardingModule />
        </Route>
        <RouteWithAppBar exact path="/">
          <HomeModule />
        </RouteWithAppBar>

        <RouteWithAppBar path="/data-themes">
          <DataThemesModule />
        </RouteWithAppBar>

        <RouteWithAppBar path={`/reports/:page/overview`}>
          <ReportsModule />
        </RouteWithAppBar>

        {/* <RouteWithAppBar path="/datasets">
          <DatasetListModule />
        </Route> */}

        <RouteWithAppBar exact path="/about">
          <AboutModule />
        </RouteWithAppBar>
        <PrivateRoute exact path="/user-management/:page">
          <UserProfileModule />
        </PrivateRoute>

        <RouteWithAppBar exact path="/chart/:page">
          <ChartDetailModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/datasets">
          <DatasetsModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/charts">
          <ChartsModule />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/dataset/:id/edit">
          <EditMetaData />
        </RouteWithAppBar>
        <RouteWithAppBar exact path="/dataset-upload">
          <DatasetUploadSteps />
        </RouteWithAppBar>

        {/* <V1RouteRedirections /> */}
      </Switch>
    </Suspense>
  );
}
