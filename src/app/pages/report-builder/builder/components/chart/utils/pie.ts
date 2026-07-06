type ChartDataItem = {
  name: string;
  value: number;
  [key: string]: any;
};

type LimitDataOptions = {
  groupAsOther?: boolean;
  otherLabel?: string;
  otherPosition?: "first" | "last";
};

export function limitChartDataItems(
  data: ChartDataItem[],
  limit: number,
  options: LimitDataOptions = {},
): ChartDataItem[] {
  const {
    groupAsOther = true,
    otherLabel = "Other",
    otherPosition = "last",
  } = options;

  if (!limit || limit < 1) return [];

  if (data.length <= limit) {
    return data.map((item) => ({ ...item }));
  }

  const ranked = data.sort(
    (a, b) => Number(b.value ?? 0) - Number(a.value ?? 0),
  );

  const keptItems = ranked.slice(0, limit);
  const otherItems = ranked.slice(limit);

  if (!groupAsOther || otherItems.length === 0) {
    return keptItems;
  }

  const otherValue = otherItems.reduce((sum, item) => {
    return sum + Number(item.value ?? 0);
  }, 0);

  const otherItem: ChartDataItem = {
    name: otherLabel,
    value: otherValue,
  };

  return otherPosition === "first"
    ? [otherItem, ...keptItems]
    : [...keptItems, otherItem];
}
