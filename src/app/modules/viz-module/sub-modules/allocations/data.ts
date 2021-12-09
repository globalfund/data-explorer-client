import max from "lodash/max";
import { hexToRGBA } from "app/utils/hexToRGBA";

export interface AllocationsProps {
  total: number;
  keys: string[];
  colors: string[];
  values: number[];
}

export interface AllocationsTreemapDataItem {
  name: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: AllocationsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      value: number;
    }[];
    value: number;
  };
}

export interface AllocationsRadialMobileTooltipProps {
  label: string;
  value: number;
  close: () => void;
  drilldown: () => void;
}

export const allocationmockdata: AllocationsProps = {
  total: 37633989374.46,
  values: [19273674061.22, 11694379284.57, 6665936028.67],
  keys: ["HIV", "Malaria", "Tuberculosis"],
  colors: ["#DFE3E6", "#868E96", "#ADB5BD"],
};

export function getKeysPercentages(
  total: number,
  values: number[]
): { percentages: number[]; colors: string[] } {
  const maxVal = max(values);
  const percentages = values.map((value: number) => (value * 100) / total);
  const colorpercentages = values.map(
    (value: number) => (value * 100) / (maxVal || total)
  );
  const colors = colorpercentages.map((value: number) =>
    hexToRGBA("#1B2127", value / 100)
  );

  return { percentages, colors };
}
