import { DropdownProps } from "app/components/dropdown/data";

export interface ChartSettingsTreemapProps {
  nested: boolean;
  trees: string;
  nestedContent: string;
  setNested: React.Dispatch<React.SetStateAction<boolean>>;
  setTrees: (value: string) => void;
  setNestedContent: (value: string) => void;
}

export const treesDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Component", label: "Component" },
  { value: "Geography", label: "Geography" },
  { value: "PrincipalRecipient", label: "Principal Recipient" },
  { value: "PrincipalRecipientType", label: "PrincipalRecipient Type" },
];
