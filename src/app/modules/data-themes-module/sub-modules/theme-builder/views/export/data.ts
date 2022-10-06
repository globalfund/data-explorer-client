import React from "react";

export interface DataThemesBuilderExportProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  currentChart: any;
  dimensions: any[];
  visualOptions: any;
  currentChartData: any;
  setRawViz: React.Dispatch<any>;
  setVisualOptions: (value: any) => void;
}
