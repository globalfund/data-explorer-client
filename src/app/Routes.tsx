//cc:application base#;application routes

import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageLoader } from 'app/modules/common/page-loader';

import { NoMatchPage } from 'app/modules/common/no-match-page';
const AboutModule = lazy(() => import('app/modules/about-module'));
const LandingModule = lazy(() => import('app/modules/landing-module'));

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

        <Route exact path="/notFound">
          <NoMatchPage />
        </Route>
      </Switch>
    </Suspense>
  );
}
