import React from "react";
import { AppBar } from "app/components/AppBar";
import { Redirect, Route } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { PrivateAppBar } from "app/components/PrivateAppBar";

interface PrivateRouteProps {
  path?: string;
  exact?: boolean;
  render?: () => JSX.Element | null;
  children: React.ReactNode | React.ReactNode[];
}

export function PrivateRoute(props: PrivateRouteProps) {
  // const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <Route
        path={props.path}
        exact={props.exact}
        render={({ location }) => {
          return (
            <React.Fragment>
              <PrivateAppBar />
              {props.children}
            </React.Fragment>
          );
          // if (isAuthenticated) {
          //   if (props.render) {
          //     return props.render();
          //   }
          //   return (
          //     <React.Fragment>
          //       <AppBar />
          //       {props.children}
          //     </React.Fragment>
          //   );
          // }
          // return (
          //   <Redirect
          //     to={{
          //       pathname: '/',
          //       state: { from: location },
          //     }}
          //   />
          // );
        }}
      />
    </>
  );
}
