type ChartSeries = {
  name: string;
  values: number[];
};

type ChartData = {
  xAxisValues: string[];
  series: ChartSeries[];
};

type GroupOptions = {
  otherLabel?: string;
  groupAsOther?: boolean;
  sortByTotal?: boolean;
  otherPosition?: "first" | "last";
};

export function limitXAxisValues(
  data: ChartData,
  limit: number,
  options: GroupOptions = {},
): ChartData {
  const {
    otherLabel = "Other",
    groupAsOther = true,
    sortByTotal = true,
    otherPosition = "last",
  } = options;

  if (!limit || limit < 1) return data;

  const xAxisCount = data.xAxisValues.length;

  if (xAxisCount <= limit) {
    return {
      xAxisValues: [...data.xAxisValues],
      series: data.series.map((series) => ({
        ...series,
        values: [...series.values],
      })),
    };
  }

  const totalsByXAxis = data.xAxisValues.map((label, index) => {
    const total = data.series.reduce((sum, series) => {
      return sum + Number(series.values[index] ?? 0);
    }, 0);

    return {
      label,
      index,
      total,
    };
  });

  const ranked = [...totalsByXAxis].sort((a, b) => b.total - a.total);

  const keptItems = ranked.slice(0, limit);
  const otherItems = ranked.slice(limit);

  const keptIndices = sortByTotal
    ? keptItems.map((item) => item.index)
    : keptItems.map((item) => item.index).sort((a, b) => a - b);

  const otherIndices = otherItems.map((item) => item.index);

  const limitedXAxisValues = keptIndices.map(
    (index) => data.xAxisValues[index],
  );

  if (groupAsOther && otherIndices.length > 0) {
    if (otherPosition === "first") {
      limitedXAxisValues.unshift(otherLabel);
    } else {
      limitedXAxisValues.push(otherLabel);
    }
  }

  const limitedSeries = data.series.map((series) => {
    const keptValues = keptIndices.map((index) =>
      Number(series.values[index] ?? 0),
    );

    if (!groupAsOther || otherIndices.length === 0) {
      return {
        name: series.name,
        values: keptValues,
      };
    }

    const otherValue = otherIndices.reduce((sum, index) => {
      return sum + Number(series.values[index] ?? 0);
    }, 0);

    return {
      name: series.name,
      values:
        otherPosition === "first"
          ? [otherValue, ...keptValues]
          : [...keptValues, otherValue],
    };
  });

  return {
    xAxisValues: limitedXAxisValues,
    series: limitedSeries,
  };
}
