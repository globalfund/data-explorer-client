export interface ChartBlockProps {
  id: string;
  title: string;
  text?: string;
  empty?: boolean;
  subtitle: string;
  loading?: boolean;
  noSplitText?: boolean;
  showCycleAll?: boolean;
  children: React.ReactNode;
  noBottomToolbar?: boolean;
  dropdownSelected?: string;
  unitButtons?: React.ReactNode;
  handleDropdownChange?: (value: string) => void;
  selectedCycles?: { name: string; value: string }[];
  dropdownItems?: { value: string; label: string }[];
  cycles?: { name: string; value: string; disabled?: boolean }[];
  handleCycleChange?: (cycle: { name: string; value: string }) => void;
}
