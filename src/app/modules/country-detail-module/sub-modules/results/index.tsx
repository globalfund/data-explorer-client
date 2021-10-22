/* third-party */
import React from "react";
import get from "lodash/get";
import { useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DataList } from "app/modules/results-module/datalist";
import { ResultListItemModel } from "app/modules/results-module/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

interface Props {
  code: string;
  detailFilterType: string;
}

export function LocationResults(props: Props) {
  const [search, setSearch] = React.useState("");

  // api call & data
  const fetchData = useStoreActions((store) => store.ResultsList.fetch);
  const data = useStoreState(
    (state) => get(state.ResultsList.data, "data", []) as ResultListItemModel[]
  );
  const fetchYearOptionsData = useStoreActions(
    (store) => store.ResultsYears.fetch
  );
  const selectedYear = useStoreState(
    (state) => state.ToolBoxPanelResultsYearState.value
  );
  const isLoading = useStoreState((state) => state.ResultsList.loading);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    document.body.style.background = "#fff";
    fetchYearOptionsData({});
  }, []);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code && props.detailFilterType
        ? {
            ...appliedFilters,
            [props.detailFilterType]: [
              ...get(appliedFilters, props.detailFilterType, []),
              props.code,
            ],
          }
        : appliedFilters,
      { search }
    );
    if (search.length === 0) {
      fetchData({
        filterString: `${filterString}${
          filterString.length > 0 ? "&" : ""
        }periods=${selectedYear}`,
      });
    }
  }, [appliedFilters, selectedYear]);

  useUpdateEffect(() => {
    if (search.length === 0) {
      const filterString = getAPIFormattedFilters(
        props.code && props.detailFilterType
          ? {
              ...appliedFilters,
              [props.detailFilterType]: [
                ...get(appliedFilters, props.detailFilterType, []),
                props.code,
              ],
            }
          : appliedFilters,
        { search }
      );
      fetchData({
        filterString: `${filterString}${
          filterString.length > 0 ? "&" : ""
        }periods=${selectedYear}`,
      });
    }
  }, [search]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        const filterString = getAPIFormattedFilters(
          props.code && props.detailFilterType
            ? {
                ...appliedFilters,
                [props.detailFilterType]: [
                  ...get(appliedFilters, props.detailFilterType, []),
                  props.code,
                ],
              }
            : appliedFilters,
          { search }
        );
        fetchData({
          filterString: `${filterString}${
            filterString.length > 0 ? "&" : ""
          }periods=${selectedYear}`,
        });
      }
    },
    500,
    [search]
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <DataList
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
      selectedYear={selectedYear}
      data={data}
      openToolboxPanel={false}
      pushValue={0}
    />
  );
}
