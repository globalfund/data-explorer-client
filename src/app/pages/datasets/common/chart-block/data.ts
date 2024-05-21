export interface DatasetChartBlockProps {
  title: string;
  empty?: boolean;
  subtitle: string;
  loading?: boolean;
  children: React.ReactNode;
  dropdownSelected?: string;
  disableCollapse?: boolean;
  handleDropdownChange?: (value: string) => void;
  dropdownItems: { value: string; label: string; icon?: React.ReactElement }[];
}
