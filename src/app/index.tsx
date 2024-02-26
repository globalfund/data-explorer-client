import React from "react";
import Router from "app/router";
import Providers from "app/Providers";

export default function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
