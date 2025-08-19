export interface DropdownProps {
  height?: number;
  fontSize?: string;
  width?: string | number;
  dropdownSelected: string;
  fixedIcon?: React.ReactElement;
  handleDropdownChange: (value: string) => void;
  dropdownItems: { value: string; label: string; icon?: React.ReactElement }[];
}
