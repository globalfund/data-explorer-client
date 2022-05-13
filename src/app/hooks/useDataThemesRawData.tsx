/* third-party */
import React from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";
import { useSessionStorage } from "react-use";
import { useIndexedDB } from "react-indexed-db";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { filterDataThemesData } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/utils";

export function useDataThemesRawData(props: {
  setVisualOptions: (value: any) => void;
}) {
  const { page } = useParams<{ page: string }>();

  const indexedDB = useIndexedDB("data-themes-raw-data");

  const [loading, setLoading] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(page !== "new");
  const [rawData, setRawData] = React.useState({
    id: 0,
    count: 0,
    data: [],
    filterOptionGroups: [],
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
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );

  const setAppliedFilters = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters.setAll
  );
  const setMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.setValue
  );
  const setIsLiveData = useStoreActions(
    (actions) => actions.dataThemes.sync.liveData.setValue
  );
  const setSelectedChartType = useStoreActions(
    (actions) => actions.dataThemes.sync.chartType.setValue
  );
  const stepSelectionsActions = useStoreActions(
    (actions) => actions.dataThemes.sync.stepSelections
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
              // console.log("ID Generated: ", event);
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

  React.useEffect(() => {
    setIsEditMode(page !== "new");
  }, [page]);

  React.useEffect(() => {
    if (isEditMode) {
      axios
        .get(
          `${process.env.REACT_APP_API}/data-themes/${page}?filter={"fields":{"id":false,"title":false,"subTitle":false,"public":false,"tabs":true,"createdDate":false}}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          clearStore().then(async () => {
            const tabs = get(response.data, "tabs", []);
            if (tabs.length > 0 && tabs[0].visualisations.length > 0) {
              const dataToIndex = {
                id: 0,
                data: tabs[0].visualisations[0].data,
                count: tabs[0].visualisations[0].data.length,
                filterOptionGroups:
                  tabs[0].visualisations[0].filterOptionGroups,
              };
              indexedDB.add(dataToIndex).then(
                (event) => {
                  setIsInSession(1);
                  // console.log("ID Generated: ", event);
                  setRawData(dataToIndex);
                  setAppliedFilters(tabs[0].visualisations[0].appliedFilters);
                  props.setVisualOptions(tabs[0].visualisations[0].vizOptions);
                  setMapping(tabs[0].visualisations[0].mapping);
                  setIsLiveData(tabs[0].visualisations[0].liveData);
                  setSelectedChartType(tabs[0].visualisations[0].vizType);
                  stepSelectionsActions.setStep1({
                    ...stepSelectionsData.step1,
                    dataset: tabs[0].visualisations[0].datasetId,
                  });
                },
                (error) => {
                  console.log("IndexedDB add error: ", error);
                }
              );
            }
          });
        })
        .catch((error) => {
          console.log("API call error: " + error.message);
        });
    }
  }, [isEditMode]);

  return {
    clearStore,
    loadDataset,
    loadingData,
    filteredData,
    data: rawData.data,
    loading: loading || loadingData,
    filterOptionGroups: rawData.filterOptionGroups,
  };
}
