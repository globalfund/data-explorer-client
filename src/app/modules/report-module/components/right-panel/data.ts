export interface ReportRightPanelProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentView: "initial" | "create" | "preview";
  setCurrentView: (view: "initial" | "create" | "preview") => void;
}
