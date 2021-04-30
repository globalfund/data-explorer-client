/* eslint-disable no-plusplus */

const ranges = [
  { divider: 1e9, suffix: "Bn", abbr: "billion" },
  { divider: 1e6, suffix: "MM", abbr: "million" },
  { divider: 1e3, suffix: "k", abbr: "thousand" },
];

export function getVizValueRange(
  data: any,
  chartType: string
): {
  index: number;
  abbr: string;
} {
  const rangesCount = [0, 0, 0];

  if (chartType === "pledgesContributionsBar") {
    data.forEach((item: any) => {
      if (item.Pledge >= ranges[0].divider) {
        rangesCount[0]++;
      } else if (item.Pledge >= ranges[1].divider) {
        rangesCount[1]++;
      } else if (item.Pledge >= ranges[2].divider) {
        rangesCount[2]++;
      }
      if (item.Contribution >= ranges[0].divider) {
        rangesCount[0]++;
      } else if (item.Contribution >= ranges[1].divider) {
        rangesCount[1]++;
      } else if (item.Contribution >= ranges[2].divider) {
        rangesCount[2]++;
      }
    });
  } else if (chartType === "locationAllocationBar") {
    data.forEach((item: any) => {
      if (item.Allocation >= ranges[0].divider) {
        rangesCount[0]++;
      } else if (item.Allocation >= ranges[1].divider) {
        rangesCount[1]++;
      } else if (item.Allocation >= ranges[2].divider) {
        rangesCount[2]++;
      }
      if (item["Program Split Amount"] >= ranges[0].divider) {
        rangesCount[0]++;
      } else if (item["Program Split Amount"] >= ranges[1].divider) {
        rangesCount[1]++;
      } else if (item["Program Split Amount"] >= ranges[2].divider) {
        rangesCount[2]++;
      }
    });
  } else if (chartType === "budgetBarChart") {
    let value = 0;
    data.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (
          key !== "year" &&
          key !== "amount" &&
          key !== "filterStr" &&
          !key.includes("Color") &&
          !key.includes("Children")
        ) {
          value += item[key];
        }
      });
    });
    if (value >= ranges[0].divider) {
      rangesCount[0]++;
    } else if (value >= ranges[1].divider) {
      rangesCount[1]++;
    } else if (value >= ranges[2].divider) {
      rangesCount[2]++;
    }
  } else {
    data.forEach((item1: any) => {
      item1.data.forEach((item: any) => {
        if (item.y >= ranges[0].divider) {
          rangesCount[0]++;
        } else if (item.y >= ranges[1].divider) {
          rangesCount[1]++;
        } else if (item.y >= ranges[2].divider) {
          rangesCount[2]++;
        }
      });
    });
  }

  if (rangesCount[0] > rangesCount[1])
    return {
      index: 0,
      abbr: ranges[0].abbr,
    };
  if (rangesCount[1] > rangesCount[2])
    return {
      index: 1,
      abbr: ranges[1].abbr,
    };
  return {
    index: 2,
    abbr: ranges[2].abbr,
  };
}
