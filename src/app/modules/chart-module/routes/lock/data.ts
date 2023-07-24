import React from "react";

export interface ChartBuilderLockProps {
  loading: boolean;
  dimensions: any[];
  datasetName: string;
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setRawViz: React.Dispatch<any>;
  setVisualOptions: (value: any) => void;
}
