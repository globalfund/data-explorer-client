import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "app";
import Providers from "app/Providers";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <Providers>
    <App />
  </Providers>,
);

reportWebVitals();
