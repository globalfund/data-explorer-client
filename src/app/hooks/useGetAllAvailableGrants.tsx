import React from "react";
import axios from "axios";
import get from "lodash/get";
import { useStoreState } from "app/state/store/hooks";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

export function useGetAllAvailableGrants(
  search: string,
  code?: string,
  detailFilterType?: string
) {
  const [loading, setLoading] = React.useState(false);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const datasource = useStoreState((state) => state.DataSourceState.value);

  async function getAllAvailableGrants() {
    setLoading(true);
    const filterString = getAPIFormattedFilters(
      code && detailFilterType
        ? {
            ...appliedFilters,
            [detailFilterType]: [
              ...get(appliedFilters, detailFilterType, []),
              code,
            ],
          }
        : appliedFilters,
      {
        search: search.length > 0 ? search : undefined,
        datasource,
      }
    );
    return await axios
      .get(
        `${process.env.REACT_APP_API}/grants?${
          `${filterString}&pageSize=0` ?? `pageSize=0`
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        const data = get(response.data, "data", []);
        setLoading(false);
        return data;
      })
      .catch(async (error) => {
        console.log("getAllAvailableGrants error: " + error);
        return [];
      });
  }

  return { getAllAvailableGrants, loading };
}
