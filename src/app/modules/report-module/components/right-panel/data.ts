export interface ReportRightPanelProps {
  currentView: "initial" | "create" | "preview";
  setCurrentView: (view: "initial" | "create" | "preview") => void;
}
