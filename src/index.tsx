/// <reference types="styled-components/cssprop" />

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "app";

// this import looks unused; it isn't so please do not remove
// eslint-disable-next-line @typescript-eslint/no-unused-vars,import/no-unresolved
import * as _ from "styled-components/cssprop";

import reportWebVitals from "reportWebVitals";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();

// serviceWorker.register();
