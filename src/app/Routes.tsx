// cc:application base#;application routes
// base
import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { useScrollToTop } from "app/hooks/useScrollToTop";
import { PageLoader } from "app/modules/common/page-loader";
import ChartDetailModule from "./modules/chart-detail-module";

const HomeModule = lazy(() => import("app/modules/home-module"));
const AboutModule = lazy(() => import("app/modules/about-module"));
const DatasetUploadSteps = lazy(
  () => import("app/fragments/datasets-fragment/upload-steps")
);
const EditMetaData = lazy(
  () => import("app/modules/datasets-module/editMetaData")
);
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

export function MainRoutes() {
  useScrollToTop();

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path="/">
          <HomeModule />
        </Route>
        <Route path="/data-themes">
          <DataThemesModule />
        </Route>
        <Route path="/datasets">
          <DatasetListModule />
        </Route>
        <Route exact path="/about">
          <AboutModule />
        </Route>
        <Route exact path="/chart/:page">
          <ChartDetailModule />
        </Route>
        <Route exact path="/dataset/:id/edit">
          <EditMetaData />
        </Route>
        <Route exact path="/dataset-upload">
          <DatasetUploadSteps />
        </Route>
      </Switch>
    </Suspense>
  );
}
