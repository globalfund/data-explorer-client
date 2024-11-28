import { ItemInterface } from "react-sortablejs";
import { DropdownProps } from "app/components/dropdown/data";
import { ChartSettingsSortByOrderProps } from "app/components/chart-settings/sort-by/data";

export interface ChartSettingsHeatmapProps
  extends ChartSettingsSortByOrderProps {
  rows: string;
  setRows: (value: string) => void;
  heatmapBoxes?: "percentage" | "numerical";
  setHeatmapBoxes?: React.Dispatch<
    React.SetStateAction<"percentage" | "numerical">
  >;
}

export interface ChartSettingsHeatmapColumnsProps {
  columns: ItemInterface[];
  setColumns: (value: ItemInterface[]) => void;
}

export const rowsDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Amount (USD)", label: "Amount (USD)" },
  { value: "Replenishment Period", label: "Replenishment Period" },
  { value: "Years", label: "Years" },
  { value: "Geography", label: "Geography" },
  { value: "Component", label: "Component" },
  { value: "Donor", label: "Donor" },
];

export const columnsDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Donor", label: "Donor" },
  { value: "Replenishment Period", label: "Replenishment Period" },
  { value: "Geography", label: "Geography" },
  { value: "Component", label: "Component" },
  { value: "Years", label: "Years" },
];
