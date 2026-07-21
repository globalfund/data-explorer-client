export const reportIssueActivityOptions = [
  "Adding a Component",
  "Editing a Chart",
  "Changing Settings",
  "Just opened the report",
  "Something Else",
];

export interface ReportBuilderReportIssueSubmitPayload {
  activity: string | null;
  details: string;
}

export interface ReportBuilderReportIssueModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
  activityOptions?: string[];
  maxDetailsLength?: number;
  reportId?: string;
  reportName?: string;
  error?: Error | null;
}
