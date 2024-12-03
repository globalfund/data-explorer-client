import { DropdownProps } from "app/components/dropdown/data";

export interface ChartSettingsBarProps {
  stacked: boolean;
  xAxis: string;
  yAxis: string;
  stacks: string;
  setStacked: React.Dispatch<React.SetStateAction<boolean>>;
  setXAxis: (value: string) => void;
  setYAxis: (value: string) => void;
  setStacks: (value: string) => void;
}

export const xAxisDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Amount (USD)", label: "Amount (USD)" },
  { value: "Replenishment Period", label: "Replenishment Period" },
  { value: "Years", label: "Years" },
  { value: "Geography", label: "Geography" },
  { value: "Component", label: "Component" },
  { value: "Donor", label: "Donor" },
];

export const yAxisDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Donor", label: "Donor" },
  { value: "Replenishment Period", label: "Replenishment Period" },
  { value: "Geography", label: "Geography" },
  { value: "Component", label: "Component" },
  { value: "Years", label: "Years" },
];

export const stacksDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Component", label: "Component" },
  { value: "Donor", label: "Donor" },
  { value: "Replenishment Period", label: "Replenishment Period" },
  { value: "Geography", label: "Geography" },
  { value: "Years", label: "Years" },
];
