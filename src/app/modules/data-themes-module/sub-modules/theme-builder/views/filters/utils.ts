import filter from "lodash/filter";
import { mergeObjects } from "app/hooks/useDataThemesRawData";

export function filterDataThemesData(
  rawData: {
    [key: string]: number | string | null;
  }[],
  appliedFilters: {
    [key: string]: any[];
  },
  currentUrlParams: URLSearchParams
) {
  let currentUrlParamsObj: { [key: string]: string[] } = {};
  currentUrlParams.forEach((value: string, key: string) => {
    currentUrlParamsObj = {
      ...currentUrlParamsObj,
      [key]: value.split(","),
    };
  });
  let localAppliedFilters = mergeObjects(appliedFilters, currentUrlParamsObj);
  const filterKeys = Object.keys(
    mergeObjects(localAppliedFilters || {}, currentUrlParamsObj)
  );

  if (filterKeys.length === 0) {
    return rawData;
  }

  const filteredData = filter(
    rawData,
    (item: { [key: string]: number | string | null }) => {
      let valid = true;
      filterKeys.forEach((filterKey: string) => {
        if (!valid || item[filterKey] === undefined) {
          return;
        }
        valid =
          localAppliedFilters[filterKey].indexOf(item[filterKey]) > -1 ||
          localAppliedFilters[filterKey].indexOf(item[filterKey]?.toString()) >
            -1;
      });
      return valid;
    }
  );

  return filteredData;
}
