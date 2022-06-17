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
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export function useDataThemesRawData(props: {
  setVisualOptions: (value: any) => void;
  visualOptions: any;
  updateLocalStates: any;
}) {
  const { visualOptions, setVisualOptions } = props;

  const { page } = useParams<{ page: string }>();

  const indexedDB = useIndexedDB("data-themes-raw-data");

  const [loading, setLoading] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(page !== "new");
  const [rawData, setRawData] = React.useState<
    {
      id: number;
      count: number;
      data: { [key: string]: string | number | null }[];
      filterOptionGroups: FilterGroupModel[];
    }[][]
  >([
    [
      {
        id: 0,
        count: 0,
        data: [],
        filterOptionGroups: [],
      },
    ],
  ]);
  const [filteredData, setFilteredData] = React.useState<
    {
      [key: string]: number | string | null;
    }[]
  >([]);
  const [isInSession, setIsInSession] = useSessionStorage<number>(
    "isInSession",
    0
  );

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const tabIds = useStoreState((state) => state.dataThemes.ids.value);
  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );

  const setAppliedFilters = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters.setValue
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

  const addTabId = useStoreActions((state) => state.dataThemes.ids.addTab);
  const addTabActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.addTab
  );
  const addTabChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.addTab
  );
  const addTabLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.addTab
  );
  const addTabMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.addTab
  );
  const addTabStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.addTab
  );
  const addTabAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.addTab
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
          const tmpRawData = [...rawData];
          tmpRawData[activeTabIndex][activeVizIndex] = response.data;
          return await indexedDB.add(tmpRawData).then(
            (event) => {
              setIsInSession(1);
              // console.log("ID Generated: ", event);
              setRawData(tmpRawData);
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
            setRawData(data);
          } else {
            setRawData([
              [
                {
                  id: 0,
                  count: 0,
                  data: [],
                  filterOptionGroups: [],
                },
              ],
            ]);
          }
          setLoading(false);
        },
        (error) => {
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    setFilteredData(
      filterDataThemesData(
        rawData[activeTabIndex][activeVizIndex].data,
        appliedFilters[activeTabIndex][activeVizIndex]
      )
    );
  }, [rawData, appliedFilters, activeTabIndex]);

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
            let tmpVisualOptions: any = [...visualOptions];
            if (tabs.length > 0 && tabs[0].content.length > 0) {
              let dataToIndex: any[][] = [];
              let incr: number = 0;
              for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                // prepare the tabbed state
                if (tabIndex !== 0 && tabIds.length < tabs.length) {
                  addTabId();
                  addTabActivePanel();
                  addTabChartType();
                  addTabLiveData();
                  addTabMapping();
                  addTabStepSelections();
                  addTabAppliedFilters();
                  props.updateLocalStates(false);

                  tmpVisualOptions.push([{}]);
                }

                // add an empty list for
                dataToIndex.push([]);
                for (
                  let vizIndex = 0;
                  vizIndex < tabs[tabIndex].content.length;
                  vizIndex++
                ) {
                  // prepare the data to index index
                  dataToIndex[tabIndex].push({
                    id: incr++,
                    data: tabs[tabIndex].content[vizIndex].data,
                    count: tabs[tabIndex].content[vizIndex].data.length,
                    filterOptionGroups:
                      tabs[tabIndex].content[vizIndex].filterOptionGroups,
                  });
                }
              }
              indexedDB.add(dataToIndex).then(
                (event) => {
                  setIsInSession(1);
                  setRawData(dataToIndex);
                  for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                    for (
                      let vizIndex = 0;
                      vizIndex < tabs[tabIndex].content.length;
                      vizIndex++
                    ) {
                      setAppliedFilters({
                        tab: tabIndex,
                        viz: vizIndex,
                        key:
                          tabs[tabIndex].content[vizIndex].appliedFilters.key ||
                          "",
                        value:
                          tabs[tabIndex].content[vizIndex].appliedFilters
                            .value || {},
                      });

                      tmpVisualOptions[tabIndex][vizIndex] =
                        tabs[tabIndex].content[vizIndex].vizOptions;
                      setVisualOptions(tmpVisualOptions);
                      setMapping({
                        tab: tabIndex,
                        viz: vizIndex,
                        mapping: tabs[tabIndex].content[vizIndex].mapping || {},
                      });
                      setIsLiveData({
                        tab: tabIndex,
                        viz: vizIndex,
                        value:
                          tabs[tabIndex].content[vizIndex].liveData || false,
                      });
                      setSelectedChartType({
                        tab: tabIndex,
                        viz: vizIndex,
                        value:
                          tabs[tabIndex].content[vizIndex].vizType ||
                          "barchart",
                      });
                      stepSelectionsActions.setStep1({
                        tab: tabIndex,
                        viz: vizIndex,
                        dataset: tabs[tabIndex].content[vizIndex].datasetId,
                      });
                    }
                  }
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
    loading: loading || loadingData,
    rawData,
    setIsInSession,
    setRawData,
  };
}
