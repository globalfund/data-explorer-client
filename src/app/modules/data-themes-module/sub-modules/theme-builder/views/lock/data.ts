import React from "react";

export interface DataThemesBuilderLockProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  currentChart: any;
  dimensions: any[];
  visualOptions: any;
  currentChartData: any;
  setRawViz: React.Dispatch<any>;
  setVisualOptions: (value: any) => void;
}
