export function formatFinancialValue(
  value: number | bigint,
  noCurrency?: boolean
): string {
  return `${!noCurrency ? "US$ " : ""}${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
