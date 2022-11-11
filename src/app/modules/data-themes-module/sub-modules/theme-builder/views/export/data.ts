import React from "react";

export interface DataThemesBuilderExportProps {
  loading: boolean;
  renderedChart: string;
  visualOptions: any;
  setRawViz: React.Dispatch<any>;
  setVisualOptions: (value: any) => void;
}
