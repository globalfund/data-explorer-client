import { DropdownProps } from "app/components/dropdown/data";
import { ItemInterface } from "react-sortablejs";

export interface ChartSettingsSankeyProps {
  nodes: ItemInterface[];
  setNodes: (value: ItemInterface[]) => void;
}
export const nodesDropdownItems: DropdownProps["dropdownItems"] = [
  { value: "Components", label: "Components" },
  { value: "Geography", label: "Geography" },
  { value: "Principal Recipient Types", label: "Principal Recipient Types" },
  { value: "Principal Recipients", label: "Principal Recipients" },
  { value: "Modules & Interventions", label: "Modules & Interventions" },
  { value: "Investment Landscape 1", label: "Investment Landscape 1" },
  { value: "Investment Landscape 2", label: "Investment Landscape 2" },
  { value: "Cost Categories", label: "Cost Categories" },
  { value: "Grant Status", label: "Grant Status" },
  { value: "Implementation Cycles", label: "Implementation Cycles" },
];
