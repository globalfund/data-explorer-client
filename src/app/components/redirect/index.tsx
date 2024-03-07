import React from "react";
import { useParams } from "react-router";
import { Navigate, Params } from "react-router-dom";

const updateTo = (to: string, params: Readonly<Params<string>>) => {
  const entries = Object.entries(params);
  let path = `${to}`;

  entries.forEach(([key, value]) => {
    path = path.replace(`:${key}`, `${value}`);
  });

  return path;
};

export interface RedirectProps {
  to: string;
  state?: any;
}

export const Redirect: React.FC<RedirectProps> = ({ to, ...rest }) => {
  const params = useParams();
  return <Navigate to={updateTo(to, params)} {...rest} replace />;
};
