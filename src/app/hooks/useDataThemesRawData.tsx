/* third-party */
import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useParams } from "react-router-dom";
import { useMount, useUpdateEffect } from "react-use";
import axios, { AxiosError, AxiosResponse } from "axios";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { DataThemeRenderedTabItem } from "app/modules/data-themes-module/sub-modules/theme-builder/data";

function checkIfIsEditMode(view?: string): boolean {
  if (view) return true;
  return false;
}

function checkMappingAndDatasetIdNotEmpty(
  tabmappings: [
    [
      {
        [key: string]: any;
      }
    ]
  ],
  tabdatasetIds: [
    [
      {
        dataset: string | null;
      }
    ]
  ],
  activeTabIndex: number,
  vizIsTextContent: boolean[][]
): boolean {
  let mappingsCheck = true;
  // tabmappings.forEach((tabmapping) => {
  tabmappings[activeTabIndex].forEach((contentmapping, index) => {
    if (!vizIsTextContent[activeTabIndex][index]) {
      mappingsCheck = mappingsCheck && !isEmpty(contentmapping);
    }
  });
  // });
  let datasetIdsCheck = true;
  // tabdatasetIds.forEach((tabdatasetId) => {
  tabdatasetIds[activeTabIndex].forEach((contentdatasetId, index) => {
    if (!vizIsTextContent[activeTabIndex][index]) {
      datasetIdsCheck = datasetIdsCheck && !isEmpty(contentdatasetId);
    }
  });
  // });

  return mappingsCheck && datasetIdsCheck;
}

export function useDataThemesRawData(props: {
  visualOptions: any;
  setVisualOptions: (value: any) => void;
  tabsFromAPI: DataThemeRenderedTabItem[][];
  setTabsFromAPI: (value: DataThemeRenderedTabItem[][]) => void;
}) {
  const { visualOptions, tabsFromAPI, setVisualOptions, setTabsFromAPI } =
    props;

  const { page, view } = useParams<{ page: string; view?: string }>();

  const [dataTypes, setDataTypes] = React.useState([]);
  const [sampleData, setSampleData] = React.useState([]);
  const [loading, setLoading] = React.useState(page !== "new");
  const [isEditMode, setIsEditMode] = React.useState(checkIfIsEditMode(view));

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );
  const tabIds = useStoreState((state) => state.dataThemes.ids.value);
  const tabTitles = useStoreState((state) => state.dataThemes.titles.tabTitles);
  const setAllAppliedFilters = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters.setAll
  );
  const setEnabledFilterOptionGroups = useStoreActions(
    (actions) => actions.dataThemes.sync.enabledFilterOptionGroups.setValue
  );
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );
  const textContent = useStoreState(
    (state) => state.dataThemes.textContent.value
  );
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.setValue
  );
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
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
  const addTabMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.addTab
  );
  const addTabStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.addTab
  );
  const addTabAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.addTab
  );
  const addTabEnabledFilterOptionGroups = useStoreActions(
    (state) => state.dataThemes.sync.enabledFilterOptionGroups.addTab
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
  const addVizMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.addViz
  );
  const addVizStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.addViz
  );
  const addVizAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.addViz
  );
  const addVizEnabledFilterOptionGroups = useStoreActions(
    (state) => state.dataThemes.sync.enabledFilterOptionGroups.addViz
  );
  const addVizTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.addViz
  );
  const setTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.setValue
  );

  async function loadDataset(endpoint: string) {
    const extraLoader = document.getElementById("extra-loader");
    if (extraLoader) {
      extraLoader.style.display = "block";
    }
    setLoading(true);
    return axios
      .get(`${process.env.REACT_APP_API}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse) => {
        setSampleData(response.data.sample);
        setDataTypes(response.data.dataTypes);
        setEnabledFilterOptionGroups({
          tab: activeTabIndex,
          viz: activeVizIndex,
          value: response.data.filterOptionGroups,
        });
        if (extraLoader) {
          extraLoader.style.display = "none";
        }
        setLoading(false);
        return response.data.sample;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setSampleData([]);
        if (extraLoader) {
          extraLoader.style.display = "none";
        }
        setLoading(false);
        return [];
      });
  }

  function loadDataFromAPI(
    customAppliedFilters?: [
      [
        {
          [key: string]: any[];
        }
      ]
    ]
  ) {
    const body = {
      previewAppliedFilters: customAppliedFilters
        ? customAppliedFilters
        : appliedFilters,
    };
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API}/data-themes/${page}/render`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const tabs = response.data || [];
        let tmpVisualOptions: any = [...visualOptions];

        setTabsFromAPI(tabs);

        if (tabs.length > 0 && tabs[0].length > 0) {
          for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
            // prepare the tabbed state
            if (tabIndex !== 0 && tabIds.length < tabs.length) {
              addTabId({ addPlaceholder: true });
              addTabActivePanel();
              addTabChartType();
              addTabMapping();
              addTabStepSelections();
              addTabAppliedFilters();
              addTabEnabledFilterOptionGroups();
              addTabTitles();
              addTabTextContent({ addPlaceholder: true });
              tmpVisualOptions.push([{}]);
            }

            for (
              let vizIndex = 1;
              vizIndex < tabs[tabIndex].length;
              vizIndex++
            ) {
              addVizId({ tabIndex: tabIndex });
              addVizActivePanel({ tabIndex: tabIndex });
              addVizChartType({ tabIndex: tabIndex });
              addVizMapping({ tabIndex: tabIndex });
              addVizStepSelections({ tabIndex: tabIndex });
              addVizAppliedFilters({ tabIndex: tabIndex });
              addVizEnabledFilterOptionGroups({ tabIndex: tabIndex });
              addVizTextContent({ tabIndex: tabIndex });
              tmpVisualOptions[tabIndex].push({});
            }
          }
          let tabIndex: number = 0;
          for (tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
            let vizIndex: number = 0;
            for (vizIndex = 0; vizIndex < tabs[tabIndex].length; vizIndex++) {
              if ("content" in tabs[tabIndex][vizIndex]) {
                const rawContent = tabs[tabIndex][vizIndex].content;
                const contentState = convertFromRaw(JSON.parse(rawContent));
                const editorState = EditorState.createWithContent(contentState);
                setTextContent({
                  tab: tabIndex,
                  viz: vizIndex,
                  value: editorState,
                });
              } else {
                setAllAppliedFilters({
                  tab: tabIndex,
                  viz: vizIndex,
                  value: tabs[tabIndex][vizIndex].appliedFilters,
                });

                setEnabledFilterOptionGroups({
                  tab: tabIndex,
                  viz: vizIndex,
                  value: tabs[tabIndex][vizIndex].enabledFilterOptionGroups,
                });

                tmpVisualOptions[tabIndex][vizIndex] =
                  tabs[tabIndex][vizIndex].vizOptions;
                setVisualOptions(tmpVisualOptions);
                setMapping({
                  tab: tabIndex,
                  viz: vizIndex,
                  mapping: tabs[tabIndex][vizIndex].mapping || {},
                });

                const selectedChartTypeValue =
                  tabs[tabIndex][vizIndex].vizType || "barchart";
                setSelectedChartType({
                  tab: tabIndex,
                  viz: vizIndex,
                  value: selectedChartTypeValue,
                });

                stepSelectionsActions.setStep1({
                  tab: tabIndex,
                  viz: vizIndex,
                  dataset: tabs[tabIndex][vizIndex].datasetId,
                });
              }
            }
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("API call error: " + error.message);
        setLoading(false);
      });
  }

  useMount(() => {
    if (isEditMode && page !== "new") {
      loadDataFromAPI();
    }
  });

  React.useEffect(() => {
    const newValue = checkIfIsEditMode(view);
    if (newValue !== isEditMode) {
      setIsEditMode(newValue);
    }
  }, [view]);

  React.useEffect(() => {
    if (page !== "new" && !isEditMode) {
      loadDataFromAPI();
    }
  }, [page, isEditMode]);

  useUpdateEffect(() => {
    if (
      !loading &&
      (page === "new" || isEditMode) &&
      checkMappingAndDatasetIdNotEmpty(
        mapping,
        stepSelectionsData.step1,
        activeTabIndex,
        vizIsTextContent
      )
    ) {
      const extraLoader = document.getElementById("extra-loader");
      if (extraLoader) {
        extraLoader.style.display = "block";
      }
      const tabs: any[] = [];
      tabIds.forEach((content, tabIndex) => {
        // Add an empty tab for each tab in the list
        tabs.push({ title: tabTitles[tabIndex], content: [] });
        content.forEach((index, vizIndex) => {
          // add a viz object for every viz in the current tab.
          let vizObject: any = {};
          if (vizIsTextContent[tabIndex][vizIndex]) {
            const contentState =
              textContent[tabIndex][vizIndex].getCurrentContent();
            const rawContent = JSON.stringify(convertToRaw(contentState));
            vizObject = {
              content: rawContent,
            };
          } else {
            vizObject = {
              mapping: mapping[tabIndex][vizIndex],
              vizType: selectedChartType[tabIndex][vizIndex],
              datasetId: stepSelectionsData.step1[tabIndex][vizIndex].dataset,
              vizOptions: visualOptions[tabIndex][vizIndex],
              appliedFilters: appliedFilters[tabIndex][vizIndex],
            };
          }
          tabs[tabIndex].content.push(vizObject);
        });
      });
      const body = { tabs };
      axios
        .post(`${process.env.REACT_APP_API}/data-themes/${page}/render`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const tabs = response.data || [];
          setTabsFromAPI(tabs);
          setLoading(false);
          if (extraLoader) {
            extraLoader.style.display = "none";
          }
        })
        .catch((error) => {
          console.log("API call error: " + error.message);
          setLoading(false);
          if (extraLoader) {
            extraLoader.style.display = "none";
          }
        });
    }
  }, [
    page,
    isEditMode,
    tabIds,
    mapping,
    selectedChartType,
    stepSelectionsData,
    get(tabsFromAPI, `[${activeTabIndex}][${activeVizIndex}].ssr`, false)
      ? visualOptions
      : undefined,
    appliedFilters,
  ]);

  useUpdateEffect(() => {
    if (vizIsTextContent[activeTabIndex][activeVizIndex]) {
      const newTabsFromAPI = [...tabsFromAPI];
      if (!newTabsFromAPI[activeTabIndex]) {
        newTabsFromAPI.push([
          // @ts-ignore
          [
            {
              content: textContent[activeTabIndex][activeVizIndex],
            },
          ],
        ]);
      } else if (!newTabsFromAPI[activeTabIndex][activeVizIndex]) {
        // @ts-ignore
        newTabsFromAPI[activeTabIndex].push([
          {
            content: textContent[activeTabIndex][activeVizIndex],
          },
        ]);
      } else {
        newTabsFromAPI[activeTabIndex][activeVizIndex] = {
          // @ts-ignore
          content: textContent[activeTabIndex][activeVizIndex],
        };
      }
      setTabsFromAPI(newTabsFromAPI);
    }
  }, [textContent, activeTabIndex, activeVizIndex]);

  return {
    loading,
    dataTypes,
    sampleData,
    isEditMode,
    loadDataset,
    loadDataFromAPI,
  };
}
