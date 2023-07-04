// cc:application base#;application routes

// base
import React, { Suspense, lazy } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  RouteComponentProps,
} from "react-router-dom";
// project
import { useGA } from "app/hooks/useGA";
import { useCMSData } from "app/hooks/useCMSData";
import { useUrlFilters } from "app/hooks/useUrlFilters";
import { V1RouteRedirections } from "app/utils/v1Routes";
import { useScrollToTop } from "app/hooks/useScrollToTop";
import { PageLoader } from "app/modules/common/page-loader";
import { useFilterOptions } from "app/hooks/useFilterOptions";
import { useClearDataPathStepsOnDatasetChange } from "app/hooks/useClearDataPathStepsOnDatasetChange";

// modules
const VizModule = lazy(() => import("app/modules/viz-module"));
const AboutModule = lazy(() => import("app/modules/about-module"));
const GrantsModule = lazy(() => import("app/modules/grants-module"));
const ResultsModule = lazy(() => import("app/modules/results-module"));
const SitemapModule = lazy(() => import("app/modules/sitemap-module/index"));
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

function GrantPeriodRedirect(props: RouteComponentProps<any>) {
  const history = useHistory();
  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API}/grant/periods/?grantNumber=${props.match.params.code}`
      )
      .then((response: AxiosResponse) => {
        if (response.data.data && response.data.data.length > 0) {
          let param = "overview";
          if (props.match.params.vizType) {
            if (props.match.params.subType) {
              param = `${props.match.params.vizType}/${props.match.params.subType}`;
            } else {
              param = props.match.params.vizType;
            }
          }
          history.replace(
            `/grant/${props.match.params.code}/${response.data.data[0].number}/${param}`
          );
        } else {
          history.replace(`/grant/${props.match.params.code}/1/overview`);
        }
      })
      .catch(() => {
        history.replace(`/grant/${props.match.params.code}/1/overview`);
      });
  }, []);
  return <PageLoader />;
}

export function MainRoutes() {
  useClearDataPathStepsOnDatasetChange();
  useFilterOptions({
    loadFilterOptions: true,
  });
  useScrollToTop();
  useUrlFilters();
  useGA();

  useCMSData({
    loadData: true,
  });

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

        <Route exact path="/grants/:subType?">
          <GrantsModule />
        </Route>

        <Route exact path="/results">
          <ResultsModule />
        </Route>

        <Route exact path="/documents">
          <DocumentsModule />
        </Route>

        <Route exact path="/get-sitemap">
          <SitemapModule />
        </Route>
        <Route exact path="/viz/:vizType/:subType?">
          <VizModule />
        </Route>

        <Route
          exact
          path="/location/:code"
          render={(props: RouteComponentProps<any>) => (
            <Redirect to={`/location/${props.match.params.code}/overview`} />
          )}
        />

        <Route exact path="/location/:code/:vizType/:subType?">
          <CountryDetailModule />
        </Route>

        <Route
          exact
          path="/partner/:code"
          render={(props: RouteComponentProps<any>) => (
            <Redirect
              to={`/partner/${props.match.params.code}/signed/treemap`}
            />
          )}
        />

        <Route exact path="/partner/:code/:vizType/:subType?">
          <PartnerDetailModule />
        </Route>

        <Route
          exact
          path="/grant/:code"
          render={(props: RouteComponentProps<any>) => (
            <GrantPeriodRedirect {...props} />
          )}
        />

        <Route
          exact
          path="/grant/:code/period/:vizType/:subType?"
          render={(props: RouteComponentProps<any>) => (
            <GrantPeriodRedirect {...props} />
          )}
        />

        <Route
          exact
          path="/grant/:code/:period"
          render={(props: RouteComponentProps<any>) => (
            <Redirect
              to={`/grant/${props.match.params.code}/${props.match.params.period}/overview`}
            />
          )}
        />

        <Route exact path="/grant/:code/:period/:vizType/:subType?">
          <GrantDetailModule />
        </Route>

        <Route exact path="/viz">
          <Redirect to="/datasets" />
        </Route>

        <V1RouteRedirections />
      </Switch>
    </Suspense>
  );
}
