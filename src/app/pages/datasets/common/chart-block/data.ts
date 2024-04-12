export interface DatasetChartBlockProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  dropdownSelected?: string;
  handleDropdownChange?: (value: string) => void;
  dropdownItems?: { value: string; label: string }[];
}
