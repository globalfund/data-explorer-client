export interface DropdownProps {
  dropdownSelected: string;
  handleDropdownChange: (value: string) => void;
  dropdownItems: { value: string; label: string }[];
}
