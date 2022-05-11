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
  // const totalDataCount = useStoreState((state) =>
  //   get(state.GrantsList.data, "count", 0)
  // );
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  async function getAllAvailableGrants() {
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
      }
    );
    return await axios
      .get(
        `${process.env.REACT_APP_API}/grants?${
          `${filterString}&pageSize=1000` ?? `pageSize=1000`
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        const data = get(response.data, "data", []);
        return data;
      })
      .catch(async (error) => {
        console.log("getAllAvailableGrants error: " + error);
        return [];
      });
  }

  return { getAllAvailableGrants };
}
