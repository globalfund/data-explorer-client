import { DropdownProps } from "app/components/dropdown/data";

export interface ChartSettingsTreemapProps {
  nested: boolean;
  trees: string;
  nestedContent: string;
  setNested: (value: boolean) => void;
  setTrees: (value: string) => void;
  setNestedContent: (value: string) => void;
}

export const treesDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Component", label: "Component" },
  { value: "Implementation Period", label: "Implementation Period" },
  { value: "Years", label: "Years" },
  { value: "Principal Recipient", label: "Principal Recipient" },
  { value: "Principal Recipient Type", label: "Principal Recipient Type" },
  { value: "Investment Landscape", label: "Investment Landscape 1" },
  { value: "Investment Landscape 2", label: "Investment Landscape 2" },
  { value: "Cost Category", label: "Cost Category" },
  { value: "Module", label: "Module" },
  { value: "Intervention", label: "Intervention" },
  { value: "Geography", label: "Geography" },
];
