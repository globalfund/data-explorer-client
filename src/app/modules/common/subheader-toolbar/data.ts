import { IFramesArray } from "app/modules/report-module/views/create/data";
import { IHeaderDetails } from "app/modules/report-module/components/right-panel/data";

export interface SubheaderToolbarProps {
  name: string;
  visualOptions?: any;
  onReportSave?: () => void;
  pageType: "chart" | "report";
  setName: (name: string) => void;
  forceEnablePreviewSave?: boolean;
  rawViz?: any;
  reportName: string;
  headerDetails: IHeaderDetails;
  appliedHeaderDetails: IHeaderDetails;
  framesArray: IFramesArray[];
  setStopInitializeFramesWidth?: (value: boolean) => void;
}
