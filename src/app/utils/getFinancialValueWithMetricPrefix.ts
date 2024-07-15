import get from "lodash/get";

const ranges = [
  {
    divider: 1e9,
    suffix: "Bn",
    abbr_en: " bln",
    full: "billion",
  },
  {
    divider: 1e6,
    suffix: "MM",
    abbr_en: " mln",
    full: "million",
  },
  {
    divider: 1e3,
    suffix: "k",
    abbr_en: " K",
    full: "thousand",
  },
  {
    divider: 1,
    suffix: "",
    abbr_en: "",
    full: "",
  },
];

export function getRange(
  data: any,
  fields: string[],
  lang = "en",
  fieldPrefix?: string
) {
  const rangesCount = [0, 0, 0];

  data.forEach((item: any) => {
    let v = 0;
    fields.forEach((field: string) => {
      v += get(item, `${fieldPrefix ? `${fieldPrefix}.` : ""}${field}`, 0);
    });
    if (v >= ranges[0].divider) {
      rangesCount[0]++;
    } else if (v >= ranges[1].divider) {
      rangesCount[1]++;
    } else if (v >= ranges[2].divider) {
      rangesCount[2]++;
    }
  });

  if (rangesCount[0] > rangesCount[1])
    return {
      index: 0,
      abbr: get(ranges[0], `abbr_${lang}`, ranges[0].abbr_en),
      full: get(ranges[0], `full_${lang}`, ranges[0].full),
    };
  if (rangesCount[1] > rangesCount[2])
    return {
      index: 1,
      abbr: get(ranges[1], `abbr_${lang}`, ranges[1].abbr_en),
      full: get(ranges[1], `full_${lang}`, ranges[1].full),
    };
  if (rangesCount[2] > 0) {
    return {
      index: 2,
      abbr: get(ranges[2], `abbr_${lang}`, ranges[2].abbr_en),
      full: get(ranges[2], `full_${lang}`, ranges[2].full),
    };
  }
  return {
    index: 3,
    abbr: get(ranges[3], `abbr_${lang}`, ranges[3].abbr_en),
    full: get(ranges[3], `full_${lang}`, ranges[3].full),
  };
}

export function getFinancialValueWithMetricPrefix(
  n: number,
  rangeIndex: number,
  toFixed = 0
): string {
  if (rangeIndex > -1) {
    return (n / ranges[rangeIndex].divider).toFixed(toFixed).toString();
  }
  for (const range of ranges) {
    if (n >= range.divider) {
      return (n / range.divider).toString();
    }
  }
  return n.toString();
}
