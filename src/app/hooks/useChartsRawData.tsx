/* third-party */
import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useParams } from "react-router-dom";
import { useMount, useUpdateEffect } from "react-use";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { ChartRenderedItem } from "app/modules/chart-module/data";

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

export function useChartsRawData(props: {
  visualOptions: any;
  setVisualOptions: (value: any) => void;
  chartFromAPI: ChartRenderedItem | null;
  setChartFromAPI: (value: ChartRenderedItem) => void;
  inChartWrapper?: boolean;
}) {
  const { visualOptions, chartFromAPI, setVisualOptions, setChartFromAPI } =
    props;

  const { page, view } = useParams<{ page: string; view?: string }>();

  const [dataTypes, setDataTypes] = React.useState([]);
  const [dataStats, setDataStats] = React.useState([]);
  const [sampleData, setSampleData] = React.useState([]);
  const [loading, setLoading] = React.useState(page !== "new");
  const [dataTotalCount, setDataTotalCount] = React.useState(0);
  const [isEditMode, setIsEditMode] = React.useState(checkIfIsEditMode(view));

  const appliedFilters = useStoreState(
    (state) => state.charts.appliedFilters.value
  );
  const setAllAppliedFilters = useStoreActions(
    (actions) => actions.charts.appliedFilters.setAll
  );
  const setEnabledFilterOptionGroups = useStoreActions(
    (actions) => actions.charts.enabledFilterOptionGroups.setValue
  );
  const mapping = useStoreState((state) => state.charts.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.charts.mapping.setValue
  );
  const selectedChartType = useStoreState(
    (state) => state.charts.chartType.value
  );
  const dataset = useStoreState((state) => state.charts.dataset.value);
  const setDataset = useStoreActions(
    (actions) => actions.charts.dataset.setValue
  );
  const setSelectedChartType = useStoreActions(
    (actions) => actions.charts.chartType.setValue
  );

  async function loadDataset(endpoint: string) {
    const extraLoader = document.getElementById("extra-loader");
    if (extraLoader) {
      extraLoader.style.display = "block";
    }
    setLoading(true);
    return await axios
      .get(`${process.env.REACT_APP_API}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse) => {
        setDataStats(response.data.stats);
        setSampleData(response.data.sample);
        setDataTypes(response.data.dataTypes);
        setDataTotalCount(response.data.count);
        setEnabledFilterOptionGroups(response.data.filterOptionGroups);
        if (extraLoader) {
          extraLoader.style.display = "none";
        }
        setLoading(false);
        return response.data.sample;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setDataStats([]);
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
    ],
    chartId?: string
  ) {
    const body = {
      previewAppliedFilters: customAppliedFilters
        ? customAppliedFilters
        : appliedFilters,
    };
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/chart/${chartId || page}/render`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const chart = response.data || {};

        if (!isEmpty(chart)) {
          setAllAppliedFilters(chart.appliedFilters);
          setEnabledFilterOptionGroups(chart.enabledFilterOptionGroups);
          setVisualOptions(chart.vizOptions);
          setMapping(chart.mapping);
          setSelectedChartType(chart.vizType);
          setDataset(chart.datasetId);
          setChartFromAPI(chart);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log("API call error: " + error.message);
        setLoading(false);
      });
  }

  useMount(() => {
    if (isEditMode && page !== "new" && !props.inChartWrapper) {
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
    if (!props.inChartWrapper && page !== "new" && !isEditMode) {
      loadDataFromAPI();
    }
  }, [page, isEditMode]);

  useUpdateEffect(() => {
    if (
      !loading &&
      !props.inChartWrapper &&
      (page === "new" || isEditMode) &&
      checkMappingAndDatasetIdNotEmpty([[mapping]], [[{ dataset }]], 0, [
        [false],
      ])
    ) {
      const extraLoader = document.getElementById("extra-loader");
      if (extraLoader) {
        extraLoader.style.display = "block";
      }
      const body = {
        rows: [
          [
            {
              mapping,
              vizType: selectedChartType,
              datasetId: dataset,
              vizOptions: visualOptions,
              appliedFilters,
            },
          ],
        ],
      };
      axios
        .post(`${process.env.REACT_APP_API}/chart/${page}/render`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const chart = response.data || {};
          setChartFromAPI(chart);
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
    mapping,
    selectedChartType,
    get(chartFromAPI, "ssr", false) ? visualOptions : undefined,
    appliedFilters,
  ]);

  return {
    loading,
    dataTypes,
    dataStats,
    sampleData,
    isEditMode,
    dataTotalCount,
    loadDataset,
    loadDataFromAPI,
  };
}
