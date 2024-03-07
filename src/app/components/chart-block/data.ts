export interface ChartBlockProps {
  text: string;
  title: string;
  subtitle: string;
  cycles?: string[];
  selectedCycle?: string;
  children: React.ReactNode;
  dropdownSelected?: string;
  unitButtons?: React.ReactNode;
  handleCycleChange?: (cycle: string) => void;
  handleDropdownChange?: (value: string) => void;
  dropdownItems?: { value: string; label: string }[];
}
