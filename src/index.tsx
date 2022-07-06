/// <reference types="styled-components/cssprop" />

import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import "./app/theme/rawgraphs.css";
import "./index.css";
import { App } from "app";

// this import looks unused; it isn't so please do not remove
// eslint-disable-next-line @typescript-eslint/no-unused-vars,import/no-unresolved
import * as _ from "styled-components/cssprop";

import reportWebVitals from "reportWebVitals";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
    clientId={process.env.REACT_APP_AUTH0_CLIENT as string}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

reportWebVitals();

// serviceWorker.register();
