import { ChartBlockCyclesProps } from "app/components/chart-block/components/cycles/data";

export interface ChartBlockProps extends ChartBlockCyclesProps {
  text: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  dropdownSelected?: string;
  unitButtons?: React.ReactNode;
  handleDropdownChange?: (value: string) => void;
  dropdownItems?: { value: string; label: string }[];
}
