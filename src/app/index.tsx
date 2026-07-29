import React from "react";
import Router from "app/router";
import { useCMSData } from "app/hooks/useCMSData";
import { useCMSCollections } from "app/hooks/useCMSCollections";
import { useValidateAuthToken } from "app/hooks/useValidateAuthToken";

export default function App() {
  useValidateAuthToken();
  useCMSData({ loadData: true });
  useCMSCollections({ loadData: true });

  return <Router />;
}
