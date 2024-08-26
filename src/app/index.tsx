import React from "react";
import Router from "app/router";
import Providers from "app/Providers";
import { useCMSData } from "./hooks/useCMSData";

export default function App() {
  useCMSData({ loadData: true });
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
