import { DropdownProps } from "app/components/dropdown/data";

export interface ChartSettingsFinancialMetricsProps {
  barList?: {
    value: string;
    label: string;
    icon?: React.ReactElement;
  }[];

  barOption: string;
  setBarOption: (value: string) => void;
}

export const barDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Component", label: "Component" },
  { value: "Geography", label: "Geography" },
  { value: "PrincipalRecipientType", label: "Principal Recipient Type" },
  { value: "PrincipalRecipient", label: "PrincipalRecipient" },
];
