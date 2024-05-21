export interface ChartBlockProps {
  text: string;
  title: string;
  empty?: boolean;
  subtitle: string;
  cycles?: string[];
  loading?: boolean;
  noSplitText?: boolean;
  selectedCycle?: string;
  children: React.ReactNode;
  noBottomToolbar?: boolean;
  dropdownSelected?: string;
  unitButtons?: React.ReactNode;
  handleCycleChange?: (cycle: string) => void;
  handleDropdownChange?: (value: string) => void;
  dropdownItems?: { value: string; label: string }[];
}
