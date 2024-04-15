export interface DatasetChartBlockProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  dropdownSelected?: string;
  disableCollapse?: boolean;
  handleDropdownChange?: (value: string) => void;
  dropdownItems: { value: string; label: string; icon?: React.ReactElement }[];
}
