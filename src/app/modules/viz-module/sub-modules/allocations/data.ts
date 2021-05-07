import { hexToRGBA } from "app/utils/hexToRGBA";

export interface AllocationsProps {
  total: number;
  keys: string[];
  colors: string[];
  values: number[];
}

export const allocationmockdata: AllocationsProps = {
  total: 10000000,
  values: [7000000, 2000000, 1000000],
  keys: ["Malaria", "Tuberculosis", "HIV"],
  colors: ["#868E96", "#ADB5BD", "#DFE3E6"],
};

export function getKeysPercentages(
  total: number,
  values: number[]
): { percentages: number[]; colors: string[] } {
  const percentages = values.map((value: number) => (value * 100) / total);
  const colors = percentages.map((value: number) =>
    hexToRGBA("#343A40", value / 100)
  );

  return { percentages, colors };
}
