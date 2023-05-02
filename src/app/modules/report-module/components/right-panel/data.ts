import { EditorState } from "draft-js";

export interface IHeaderDeatils {
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
  pickedCharts: string[];
  setPickedCharts: React.Dispatch<React.SetStateAction<string[]>>;
  showHeaderItem: boolean;
  currentView: "initial" | "edit" | "create" | "preview";
  appliedHeaderDetails: IHeaderDeatils;
  setAppliedHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDeatils>>;
  headerDetails: IHeaderDeatils;
  setHeaderDetails: React.Dispatch<React.SetStateAction<IHeaderDeatils>>;
}
