export interface SubheaderToolbarProps {
  name: string;
  visualOptions?: any;
  onReportSave?: () => void;
  pageType: "chart" | "report";
  setName: (name: string) => void;
  forceEnablePreviewSave?: boolean;
  rawViz?: any;
}
