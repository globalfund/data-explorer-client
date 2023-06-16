import { IHeaderDeatils } from "app/modules/report-module/components/right-panel/data";
import { IFramesArray } from "app/modules/report-module/views/create/data";

export interface SubheaderToolbarProps {
  name: string;
  visualOptions?: any;
  onReportSave?: () => void;
  pageType: "chart" | "report";
  setName: (name: string) => void;
  forceEnablePreviewSave?: boolean;
  rawViz?: any;
  reportName: string;
  headerDetails: IHeaderDeatils;
  appliedHeaderDetails: IHeaderDeatils;
  framesArray: IFramesArray[];
}
