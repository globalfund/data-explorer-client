import { EditorState } from "draft-js";

export interface ReportRightPanelProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  showHeaderItem: boolean;
  currentView: "initial" | "edit" | "create" | "preview";
  headerDetails: {
    title: string;
    showHeader: boolean;
    description: EditorState;
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    dateColor: string;
  };
  setHeaderDetails: React.Dispatch<
    React.SetStateAction<{
      title: string;
      showHeader: boolean;
      description: EditorState;
      backgroundColor: string;
      titleColor: string;
      descriptionColor: string;
      dateColor: string;
    }>
  >;
}
