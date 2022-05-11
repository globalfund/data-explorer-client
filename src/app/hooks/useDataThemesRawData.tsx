/* third-party */
import React from "react";
import { useSessionStorage } from "react-use";
import { useIndexedDB } from "react-indexed-db";
import { useStoreState } from "app/state/store/hooks";
import axios, { AxiosResponse, AxiosError } from "axios";
/* project */
import { filterDataThemesData } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/utils";

export function useDataThemesRawData() {
  const indexedDB = useIndexedDB("data-themes-raw-data");

  const [loading, setLoading] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(false);
  const [rawData, setRawData] = React.useState({
    id: 0,
    count: 0,
    data: [],
    filterOptions: [],
  });
  const [filteredData, setFilteredData] = React.useState<
    {
      [key: string]: number | string | null;
    }[]
  >([]);
  const [isInSession, setIsInSession] = useSessionStorage<number>(
    "isInSession",
    0
  );

  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );

  async function clearStore() {
    return await indexedDB.clear();
  }

  async function loadDataset(endpoint: string) {
    setLoadingData(true);
    return await axios
      .get(`${process.env.REACT_APP_API}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (response: AxiosResponse) => {
        return await clearStore().then(async () => {
          return await indexedDB.add(response.data).then(
            (event) => {
              setIsInSession(1);
              console.log("ID Generated: ", event);
              setRawData(response.data);
              setLoadingData(false);
              return true;
            },
            (error) => {
              console.log("IndexedDB add error: ", error);
              setLoadingData(false);
              return true;
            }
          );
        });
      })
      .catch((error: AxiosError) => {
        console.log("API call error: " + error.message);
        setLoadingData(false);
        return true;
      });
  }

  React.useEffect(() => {
    if (isInSession === 1) {
      indexedDB.getAll().then(
        (data) => {
          if (data.length > 0) {
            setRawData(data[0]);
          }
          setLoading(false);
        },
        (error) => {
          console.log("IndexedDB getAll error: ", error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    setFilteredData(filterDataThemesData(rawData.data, appliedFilters));
  }, [rawData.data, appliedFilters]);

  return {
    clearStore,
    loadDataset,
    loadingData,
    filteredData,
    data: rawData.data,
    loading: loading || loadingData,
    filterOptionGroups: rawData.filterOptions,
  };
}
