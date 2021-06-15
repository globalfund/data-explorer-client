import { hexToRGBA } from "app/utils/hexToRGBA";

export interface AllocationsProps {
  total: number;
  keys: string[];
  colors: string[];
  values: number[];
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
  const percentages = values.map((value: number) => (value * 100) / total);
  const colors = percentages.map((value: number) =>
    hexToRGBA("#343A40", value / 100)
  );

  return { percentages, colors };
}
