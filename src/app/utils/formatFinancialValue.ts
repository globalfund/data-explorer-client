export function formatFinancialValue(
  value: number | bigint,
  noCurrency?: boolean
): string {
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}${!noCurrency ? " USD" : ""}`;
}
