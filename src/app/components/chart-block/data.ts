export interface ChartBlockProps {
  title: string;
  text?: string;
  empty?: boolean;
  subtitle: string;
  loading?: boolean;
  noSplitText?: boolean;
  children: React.ReactNode;
  noBottomToolbar?: boolean;
  dropdownSelected?: string;
  unitButtons?: React.ReactNode;
  cycles?: { name: string; value: string }[];
  handleDropdownChange?: (value: string) => void;
  selectedCycle?: { name: string; value: string };
  dropdownItems?: { value: string; label: string }[];
  handleCycleChange?: (cycle: { name: string; value: string }) => void;
}
