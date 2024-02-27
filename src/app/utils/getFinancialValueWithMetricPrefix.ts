import get from "lodash/get";

const ranges = [
  {
    divider: 1e9,
    suffix: "Bn",
    abbr_en: "€ bn",
    abbr_fi: "€ mrd.",
    abbr_se: "€ miljarder",
  },
  {
    divider: 1e6,
    suffix: "MM",
    abbr_en: "€ mill.",
    abbr_fi: "€ milj.",
    abbr_se: "€ miljoner",
  },
  {
    divider: 1e3,
    suffix: "k",
    abbr_en: "€ K",
    abbr_fi: "€ tuhatta",
    abbr_se: "€ tusen",
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
    };
  if (rangesCount[1] > rangesCount[2])
    return {
      index: 1,
      abbr: get(ranges[1], `abbr_${lang}`, ranges[1].abbr_en),
    };
  return {
    index: 2,
    abbr: get(ranges[2], `abbr_${lang}`, ranges[2].abbr_en),
  };
}

export function getFinancialValueWithMetricPrefix(
  n: number,
  rangeIndex: number
): string {
  if (rangeIndex) {
    return (n / ranges[rangeIndex].divider).toFixed(0).toString();
  }
  for (const range of ranges) {
    if (n >= range.divider) {
      return (n / range.divider).toString();
    }
  }
  return n.toString();
}
