import { formatFinancialValue } from "app/utils/formatFinancialValue";

const ranges = [
  { divider: 1e9, suffix: "Bn", abbr: "billion" },
  { divider: 1e6, suffix: "MM", abbr: "million" },
  { divider: 1e3, suffix: "k", abbr: "thousand" },
];

export function getFinancialValueWithMetricPrefix(
  n: number,
  rangeIndex: number
): string {
  if (rangeIndex) {
    return (n / ranges[rangeIndex].divider).toString();
  }
  for (let i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      return (n / ranges[i].divider).toString();
    }
  }
  return n.toString();
}

export function formatLargeAmountsWithPrefix(n: number | bigint): string {
  if (!n) return "";
  if (Math.abs(Number(n)) >= 1.0e9) {
    return `$${(Math.abs(Number(n)) / 1.0e9).toFixed(2)} bln`;
  }
  if (Math.abs(Number(n)) >= 1.0e6) {
    return `$${(Math.abs(Number(n)) / 1.0e6).toFixed(2)} mln`;
  }
  return `$${formatFinancialValue(n).replace(" USD", "")}`;
}
