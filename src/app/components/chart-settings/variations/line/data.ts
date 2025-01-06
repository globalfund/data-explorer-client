import { DropdownProps } from "app/components/dropdown/data";

export interface ChartSettingsLineProps {
  xAxis: string;
  yAxis: string;
  setXAxis: (value: string) => void;
  setYAxis: (value: string) => void;
}

export const lineXAxisDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Component", label: "Component" },
  { value: "Geography", label: "Geography" },
  { value: "PrincipalRecipient", label: "Principal Recipient" },
  { value: "PrincipalRecipientType", label: "PrincipalRecipient Type" },
];

export const lineYAxisDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Amount (USD)", label: "Amount (USD)" },
];
