import { AppBar } from "app/components/AppBar";
import React from "react";
import { Route } from "react-router-dom";

interface RouteWithAppBarProps {
  path?: string;
  exact?: boolean;

  children: React.ReactNode | React.ReactNode[];
}

export function RouteWithAppBar(props: RouteWithAppBarProps) {
  return (
    <Route exact={props.exact} path={props.path}>
      <AppBar />
      {props.children}
    </Route>
  );
}
