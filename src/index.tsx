/// <reference types="styled-components/cssprop" />

import React from "react";
import ReactDOM from "react-dom";
import "./app/theme/rawgraphs.css";
import "./index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { App } from "app";

// this import looks unused; it isn't so please do not remove
// eslint-disable-next-line @typescript-eslint/no-unused-vars,import/no-unresolved
import * as _ from "styled-components/cssprop";

import reportWebVitals from "reportWebVitals";

import * as serviceWorker from "./serviceWorker";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>,
  document.getElementById("root")
);

reportWebVitals();

// serviceWorker.register();
