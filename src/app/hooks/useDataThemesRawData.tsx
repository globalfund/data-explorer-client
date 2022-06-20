/* third-party */
import React from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";
import { useSessionStorage } from "react-use";
import { useIndexedDB } from "react-indexed-db";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  parseDataset,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { filterDataThemesData } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/utils";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { charts } from "app/modules/data-themes-module/sub-modules/theme-builder/data";

export function useDataThemesRawData(props: {
  setVisualOptions: (value: any) => void;
  visualOptions: any;
  setCurrentChart: (value: any) => void;
  currentChart: any;
  setCurrentChartData: (value: any) => void;
  currentChartData: any;
  updateLocalStates: any;
}) {
  const {
    visualOptions, setVisualOptions,
    currentChart, setCurrentChart,
    currentChartData, setCurrentChartData,
  } = props;

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
  const addVizId = useStoreActions((state) => state.dataThemes.ids.addViz);
  const addVizActivePanel = useStoreActions((state) => state.dataThemes.activePanels.addViz);
  const addVizChartType = useStoreActions((state) => state.dataThemes.sync.chartType.addViz);
  const addVizLiveData = useStoreActions((state) => state.dataThemes.sync.liveData.addViz);
  const addVizMapping = useStoreActions((state) => state.dataThemes.sync.mapping.addViz);
  const addVizStepSelections = useStoreActions((state) => state.dataThemes.sync.stepSelections.addViz);
  const addVizAppliedFilters = useStoreActions((state) => state.dataThemes.appliedFilters.addViz);

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
    if (!loading) {
      setFilteredData(
        filterDataThemesData(
          rawData[activeTabIndex][activeVizIndex].data,
          appliedFilters[activeTabIndex][activeVizIndex]
        )
      );
    }
  }, [rawData, appliedFilters, activeTabIndex, loading]);

  React.useEffect(() => {
    setIsEditMode(page !== "new");
  }, [page]);

  React.useEffect(() => {
    if (isEditMode) {
      setLoading(true);
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
            let tmpCurrentChart: any = [...currentChart];
            let tmpCurrentChartData: any = [...currentChartData];

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
                  tmpVisualOptions.push([{}]);
                  tmpCurrentChart.push([{}]);
                  tmpCurrentChartData.push([{}]);
                }
                
                for (let vizIndex = 1; vizIndex < tabs[tabIndex].content.length; vizIndex++) {
                  addVizId({tabIndex: tabIndex});
                  addVizActivePanel({tabIndex: tabIndex});
                  addVizChartType({tabIndex: tabIndex});
                  addVizLiveData({tabIndex: tabIndex});
                  addVizMapping({tabIndex: tabIndex});
                  addVizStepSelections({tabIndex: tabIndex});
                  addVizAppliedFilters({tabIndex: tabIndex});
                  tmpVisualOptions[tabIndex].push({});
                  tmpCurrentChart[tabIndex].push({});
                  tmpCurrentChartData[tabIndex].push({});
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

                      const selectedChartTypeValue = tabs[tabIndex].content[vizIndex].vizType || "barchart";
                      setSelectedChartType({
                        tab: tabIndex,
                        viz: vizIndex,
                        value: selectedChartTypeValue,
                      });

                      tmpCurrentChart[tabIndex][vizIndex] = get(charts, selectedChartTypeValue, null)
                      setCurrentChart(tmpCurrentChart);

                      // Before, this was done through a hook on the appliedFilters.
                      let tmpFilteredData = filterDataThemesData(
                        dataToIndex[tabIndex][vizIndex].data,
                        tabs[tabIndex].content[vizIndex].appliedFilters.value || {}
                      )

                      tmpCurrentChartData[tabIndex][vizIndex] = parseDataset(
                        tmpFilteredData,
                        null,
                        {
                          locale: navigator.language || "en-US",
                          decimal: ".",
                          group: ",",
                        }
                      );
                      setCurrentChartData(tmpCurrentChartData);
                      stepSelectionsActions.setStep1({
                        tab: tabIndex,
                        viz: vizIndex,
                        dataset: tabs[tabIndex].content[vizIndex].datasetId,
                      });
                    }
                  }
                  setLoading(false);
                },
                (error) => {
                  console.log("IndexedDB add error: ", error);
                  setLoading(false);
                }
              );
            }
          });
        })
        .catch((error) => {
          console.log("API call error: " + error.message);
          setLoading(false);
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
