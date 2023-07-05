import filter from "lodash/filter";

export function filterDataThemesData(
  rawData: {
    [key: string]: number | string | null;
  }[],
  appliedFilters: {
    [key: string]: any[];
  }
) {
  const filterKeys = Object.keys(appliedFilters || {});

  if (filterKeys.length === 0) {
    return rawData;
  }

  const filteredData = filter(
    rawData,
    (item: { [key: string]: number | string | null }) => {
      let valid = true;
      filterKeys.forEach((filterKey: string) => {
        if (!valid) {
          return;
        }
        valid = appliedFilters[filterKey].indexOf(item[filterKey]) > -1;
      });
      return valid;
    }
  );

  return filteredData;
}
