export interface DropdownProps {
  width?: string | number;
  dropdownSelected: string;
  handleDropdownChange: (value: string) => void;
  dropdownItems: { value: string; label: string }[];
}
