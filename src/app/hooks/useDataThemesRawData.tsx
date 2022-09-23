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
import { convertFromRaw, EditorState } from "draft-js";
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
    visualOptions,
    setVisualOptions,
    currentChart,
    setCurrentChart,
    currentChartData,
    setCurrentChartData,
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
    }[][][]
  >([[[]]]);
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
  const setAllAppliedFilters = useStoreActions(
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
  const addTabTitles = useStoreActions(
    (state) => state.dataThemes.titles.addTab
  );
  const addTabTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.addTab
  );
  const addVizId = useStoreActions((state) => state.dataThemes.ids.addViz);
  const addVizActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.addViz
  );
  const addVizChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.addViz
  );
  const addVizLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.addViz
  );
  const addVizMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.addViz
  );
  const addVizStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.addViz
  );
  const addVizAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.addViz
  );
  const addVizTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.addViz
  );
  const setTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.setValue
  );
  const setTabTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setTabTitle
  );

  async function clearStore() {
    return await indexedDB.clear();
  }

  async function loadDataset(endpoint: string, rows: number) {
    setLoadingData(true);
    return await axios
      .get(`${process.env.REACT_APP_API}/${endpoint}?rows=${rows}`, {
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
      let tmpFilteredData: {
        [key: string]: number | string | null;
      }[][][] = [];
      rawData.forEach((tab) => {
        const tabData: {
          [key: string]: string | number | null;
        }[][] = [];
        tab.forEach((viz) => {
          tabData.push(viz.data);
        });
        tmpFilteredData.push(tabData);
      });
      tmpFilteredData[activeTabIndex][activeVizIndex] = filterDataThemesData(
        rawData[activeTabIndex][activeVizIndex].data,
        appliedFilters[activeTabIndex][activeVizIndex]
      );
      console.log("tmpFilteredData", tmpFilteredData);
      setFilteredData(tmpFilteredData);
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
            let tmpFilteredData: any = [...filteredData];

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
                  addTabTitles();
                  addTabTextContent();
                  tmpVisualOptions.push([{}]);
                  tmpCurrentChart.push([{}]);
                  tmpCurrentChartData.push([{}]);
                  tmpFilteredData.push([[]]);
                }

                // set the tab title
                setTabTitle({
                  tabIndex: tabIndex,
                  tabTitle: tabs[tabIndex].title,
                });

                for (
                  let vizIndex = 1;
                  vizIndex < tabs[tabIndex].content.length;
                  vizIndex++
                ) {
                  addVizId({ tabIndex: tabIndex });
                  addVizActivePanel({ tabIndex: tabIndex });
                  addVizChartType({ tabIndex: tabIndex });
                  addVizLiveData({ tabIndex: tabIndex });
                  addVizMapping({ tabIndex: tabIndex });
                  addVizStepSelections({ tabIndex: tabIndex });
                  addVizAppliedFilters({ tabIndex: tabIndex });
                  addVizTextContent({ tabIndex: tabIndex });
                  tmpVisualOptions[tabIndex].push({});
                  tmpCurrentChart[tabIndex].push({});
                  tmpCurrentChartData[tabIndex].push({});
                  tmpFilteredData[tabIndex].push([]);
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
                    data: tabs[tabIndex].content[vizIndex].content
                      ? []
                      : tabs[tabIndex].content[vizIndex].data,
                    count: tabs[tabIndex].content[vizIndex].content
                      ? 0
                      : tabs[tabIndex].content[vizIndex].data.length,
                    filterOptionGroups: tabs[tabIndex].content[vizIndex].content
                      ? []
                      : tabs[tabIndex].content[vizIndex].filterOptionGroups,
                  });
                }
              }
              indexedDB.add(dataToIndex).then(
                (event) => {
                  setIsInSession(1);
                  setRawData(dataToIndex);
                  let tabIndex: number = 0;
                  for (tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                    let vizIndex: number = 0;
                    for (
                      vizIndex = 0;
                      vizIndex < tabs[tabIndex].content.length;
                      vizIndex++
                    ) {
                      if ("content" in tabs[tabIndex].content[vizIndex]) {
                        const rawContent =
                          tabs[tabIndex].content[vizIndex].content;
                        const contentState = convertFromRaw(
                          JSON.parse(rawContent)
                        );
                        const editorState =
                          EditorState.createWithContent(contentState);
                        setTextContent({
                          tab: tabIndex,
                          viz: vizIndex,
                          value: editorState,
                        });
                      } else {
                        setAllAppliedFilters({
                          tab: tabIndex,
                          viz: vizIndex,
                          value:
                            tabs[tabIndex].content[vizIndex].appliedFilters,
                        });

                        tmpVisualOptions[tabIndex][vizIndex] =
                          tabs[tabIndex].content[vizIndex].vizOptions;
                        setVisualOptions(tmpVisualOptions);
                        setMapping({
                          tab: tabIndex,
                          viz: vizIndex,
                          mapping:
                            tabs[tabIndex].content[vizIndex].mapping || {},
                        });
                        setIsLiveData({
                          tab: tabIndex,
                          viz: vizIndex,
                          value:
                            tabs[tabIndex].content[vizIndex].liveData || false,
                        });

                        const selectedChartTypeValue =
                          tabs[tabIndex].content[vizIndex].vizType ||
                          "barchart";
                        setSelectedChartType({
                          tab: tabIndex,
                          viz: vizIndex,
                          value: selectedChartTypeValue,
                        });

                        tmpCurrentChart[tabIndex][vizIndex] = get(
                          charts,
                          selectedChartTypeValue,
                          null
                        );
                        setCurrentChart(tmpCurrentChart);

                        // Before, this was done through a hook on the appliedFilters.
                        tmpFilteredData[tabIndex][vizIndex] =
                          filterDataThemesData(
                            dataToIndex[tabIndex][vizIndex].data,
                            tabs[tabIndex].content[vizIndex].appliedFilters
                          );
                        setFilteredData(tmpFilteredData);

                        tmpCurrentChartData[tabIndex][vizIndex] = parseDataset(
                          tmpFilteredData[tabIndex][vizIndex],
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
                          dataPoints:
                            tabs[tabIndex].content[vizIndex].data.length,
                        });
                      }
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
    setLoading,
    rawData: [...rawData],
    setIsInSession,
    setRawData,
    setFilteredData,
  };
}
