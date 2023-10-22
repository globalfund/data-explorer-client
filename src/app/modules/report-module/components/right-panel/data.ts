import { EditorState } from "draft-js";
import { IFramesArray } from "../../views/create/data";

export interface IHeaderDetails {
  title: string;
  showHeader: boolean;
  description: EditorState;
  backgroundColor: string;
  titleColor: string;
  descriptionColor: string;
  dateColor: string;
}
export interface ReportRightPanelProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;

  showHeaderItem: boolean;
  currentView: "initial" | "edit" | "create" | "preview" | "ai-template";
  appliedHeaderDetails: IHeaderDetails;
  setAppliedHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDetails>>;
  headerDetails: IHeaderDetails;
  setHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDetails>>;
  framesArray: IFramesArray[];
  reportName: string;
  handlePersistReportState: () => void;
}
