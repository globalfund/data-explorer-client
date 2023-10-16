import React from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar } from "app/components/AppBar";
import useSessionStorage from "react-use/lib/useSessionStorage";

interface RouteWithAppBarProps {
  path?: string;
  exact?: boolean;
  element?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
}

export function RouteWithAppBar(props: RouteWithAppBarProps) {
  const [token, setToken] = useSessionStorage("authToken", "");
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated && !token) {
      getAccessTokenSilently().then((token) => {
        setToken(token);
      });
    }
  }, [isAuthenticated]);

  return (
    <Route exact={props.exact} path={props.path}>
      <AppBar />
      {props.element ?? props.children}
    </Route>
  );
}
