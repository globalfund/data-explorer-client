export interface DropdownProps {
  height?: number;
  width?: string | number;
  dropdownSelected: string;
  handleDropdownChange: (value: string) => void;
  dropdownItems: { value: string; label: string; icon?: React.ReactElement }[];
  compact?: boolean;
}
