import React from "react";

export interface DataThemesBuilderLockProps {
  loading: boolean;
  dimensions: any[];
  visualOptions: any;
  renderedChart: string;
  setRawViz: React.Dispatch<any>;
  setVisualOptions: (value: any) => void;
}
