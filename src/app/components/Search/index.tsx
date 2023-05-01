/* third-party */
import React from "react";
import isEqual from "lodash/isEqual";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useDebounce, useUpdateEffect, useSessionStorage } from "react-use";
/* project */
import { categories } from "app/components/Search/data";
import { SearchLayout } from "app/components/Search/layout";
import { ReportModel } from "app/modules/report-module/data";
import { ChartAPIModel, DatasetAPIModel } from "app/modules/chart-module/data";
import { SearchResultsTabModel } from "app/components/Search/components/results/data";

export function Search(props: { hocClose?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [data, setData] = React.useState<SearchResultsTabModel[]>([]);
  const [category, setCategory] = React.useState(categories[0].label);
  const [storedValue, setStoredValue] = useSessionStorage(
    "stored-search-string",
    ""
  );
  const [value, setValue] = React.useState(storedValue);

  // api call & data
  const charts = useStoreState(
    (state) => (state.search.charts.crudData || []) as ChartAPIModel[]
  );
  const reports = useStoreState(
    (state) => (state.search.reports.crudData || []) as ReportModel[]
  );
  const datasets = useStoreState(
    (state) => (state.search.datasets.crudData || []) as DatasetAPIModel[]
  );

  const loadCharts = useStoreActions((store) => store.search.charts.fetch);
  const loadReports = useStoreActions((store) => store.search.reports.fetch);
  const loadDatasets = useStoreActions((store) => store.search.datasets.fetch);

  const clearCharts = useStoreActions((store) => store.search.charts.clear);
  const clearReports = useStoreActions((store) => store.search.reports.clear);
  const clearDatasets = useStoreActions((store) => store.search.datasets.clear);

  const isLoading = useStoreState(
    (state) =>
      state.search.charts.loading ||
      state.search.reports.loading ||
      state.search.datasets.loading
  );

  useUpdateEffect(() => {
    const searchResults: SearchResultsTabModel[] = [
      {
        name: categories[1].label,
        results: datasets.map((dataset) => ({
          value: dataset.id,
          label: dataset.name,
          type: categories[1].label,
          link: "/",
          // link: `/dataset/${dataset.id}`,
        })),
      },
      {
        name: categories[2].label,
        results: charts.map((chart) => ({
          value: chart.id,
          label: chart.name,
          type: categories[2].label,
          link: `/chart/${chart.id}`,
        })),
      },
      {
        name: categories[3].label,
        results: reports.map((report) => ({
          value: report.id,
          label: report.name,
          type: categories[3].label,
          link: `/report/${report.id}`,
        })),
      },
    ];
    if (!isEqual(data, searchResults)) {
      setData(searchResults);
    }
  }, [charts, reports, datasets, category]);

  useUpdateEffect(() => {
    setStoredValue(value);
  }, [value]);

  const [,] = useDebounce(
    () => {
      if (value.length > 0) {
        loadCharts({
          storeInCrudData: true,
          filterString: `filter={"where":{"name":{"like":"${value}.*","options":"i"}}}`,
        });
        loadReports({
          storeInCrudData: true,
          filterString: `filter={"where":{"name":{"like":"${value}.*","options":"i"}}}`,
        });
        loadDatasets({
          storeInCrudData: true,
          filterString: `filter={"where":{"name":{"like":"${value}.*","options":"i"}}}`,
        });
      } else {
        clearCharts();
        clearReports();
        clearDatasets();
      }
    },
    500,
    [value]
  );

  function onClose() {
    setOpen(false);
    if (props.hocClose) {
      props.hocClose();
    }
  }

  return (
    <div
      onClick={(e: any) => {
        e.stopPropagation();
        e.preventDefault();
        if (!open) {
          setOpen(true);
        }
      }}
      css={`
        width: 80%;

        @media (max-width: 767px) {
          width: 100%;
        }
      `}
    >
      <SearchLayout
        value={value}
        results={data}
        onClose={onClose}
        loading={isLoading}
        setValue={setValue}
        category={category}
        setCategory={setCategory}
        forceFocus={isMobile && open}
        setStoredValue={setStoredValue}
      />
    </div>
  );
}
