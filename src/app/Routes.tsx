// cc:application base#;application routes

// base
import React, { Suspense, lazy } from "react";
import { useScrollToTop } from "app/hooks/useScrollToTop";
import { PageLoader } from "app/modules/common/page-loader";
import { RouteWithAppBar } from "app/utils/RouteWithAppBar";
import { Route, Switch, useHistory } from "react-router-dom";
import { NoMatchPage } from "app/modules/common/no-match-page";
import {
  AppState,
  Auth0Provider,
  User,
  WithAuthenticationRequiredOptions,
  withAuthenticationRequired,
} from "@auth0/auth0-react";

const HomeModule = lazy(() => import("app/modules/home-module"));
const PartnersModule = lazy(
  () => import("app/modules/home-module/sub-modules/partners")
);
const ContactModule = lazy(
  () => import("app/modules/home-module/sub-modules/contact")
);
const AboutModule = lazy(
  () => import("app/modules/home-module/sub-modules/about")
);
const WhyDXModule = lazy(
  () => import("app/modules/home-module/sub-modules/why-dx")
);
const ExploreAssetsModule = lazy(
  () => import("app/modules/home-module/sub-modules/explore-assets")
);
const ChartModule = lazy(() => import("app/modules/chart-module"));
const ReportModule = lazy(() => import("app/modules/report-module"));
const DatasetUploadSteps = lazy(
  () => import("app/fragments/datasets-fragment/upload-steps")
);
const EditMetaData = lazy(
  () => import("app/modules/datasets-module/editMetaData")
);
const AuthCallbackModule = lazy(() => import("app/modules/callback-module"));
const OnboardingModule = lazy(() => import("app/modules/onboarding-module"));
const UserProfileModule = lazy(() => import("app/modules/user-profile-module"));

const ProtectedRoute = (props: {
  component: React.ComponentType<any>;
  args?: WithAuthenticationRequiredOptions;
}) => {
  const Component = withAuthenticationRequired(props.component, props.args);

  return <Component />;
};

const Auth0ProviderWithRedirectCallback = (props: {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience: string;
    redirect_uri: string;
  };
  children: React.ReactNode;
}) => {
  const history = useHistory();

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    history.push(
      appState && appState.returnTo
        ? appState.returnTo
        : window.location.pathname
    );
  };

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {props.children}
    </Auth0Provider>
  );
};

export function MainRoutes() {
  useScrollToTop();

  return (
    <Auth0ProviderWithRedirectCallback
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT!}
      authorizationParams={{
        audience: process.env.REACT_APP_AUTH0_AUDIENCE!,
        redirect_uri: `${window.location.origin}/callback`,
      }}
    >
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path="/callback">
            <AuthCallbackModule />
          </Route>
          <RouteWithAppBar exact path="/">
            <HomeModule />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/partners">
            <PartnersModule />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/contact">
            <ContactModule />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/why-dataXplorer">
            <WhyDXModule />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/explore">
            <ExploreAssetsModule />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/report/:page/:view?">
            <ReportModule />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/about">
            <AboutModule />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/chart/:page/:view?">
            <ChartModule />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/dataset/:id/edit">
            <EditMetaData />
          </RouteWithAppBar>
          <RouteWithAppBar exact path="/dataset-upload">
            <DatasetUploadSteps />
          </RouteWithAppBar>
          <RouteWithAppBar path="/onboarding">
            <OnboardingModule />
          </RouteWithAppBar>
          <RouteWithAppBar
            exact
            path="/profile"
            element={<ProtectedRoute component={UserProfileModule} />}
          />
          <RouteWithAppBar path="*">
            <NoMatchPage />
          </RouteWithAppBar>
        </Switch>
      </Suspense>
    </Auth0ProviderWithRedirectCallback>
  );
}
