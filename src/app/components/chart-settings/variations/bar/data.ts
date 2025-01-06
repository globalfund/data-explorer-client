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
  stacksDropdownItems: {
    value: string;
    label: string;
    icon?: React.ReactElement;
  }[];
}

export const xAxisDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Component", label: "Component" },
  { value: "Geography", label: "Geography" },
  { value: "PrincipalRecipient", label: "Principal Recipient" },
  { value: "PrincipalRecipientType", label: "PrincipalRecipient Type" },
];

export const yAxisDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Amount (USD)", label: "Amount (USD)" },
];

export const stacksDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Component", label: "Component" },
  { value: "Donor", label: "Donor" },
  { value: "Replenishment Period", label: "Replenishment Period" },
  { value: "Geography", label: "Geography" },
  { value: "Years", label: "Years" },
];
