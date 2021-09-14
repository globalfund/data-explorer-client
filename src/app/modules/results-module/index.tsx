/* third-party */
import React from "react";
import get from "lodash/get";
import { Link, useLocation } from "react-router-dom";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageLoader } from "app/modules/common/page-loader";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { InformationPanel } from "app/components/InformationPanel";
import { Search } from "app/modules/grants-module/components/Search";
import { ResultsList } from "app/modules/results-module/components/List";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ResultsInfoContent } from "app/modules/results-module/components/InfoContent";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";
import {
  ResultListItemModel,
  ResultsInfoContentStatsProps,
} from "app/modules/results-module/data";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { Dropdown } from "app/components/Dropdown";

export default function ResultsModule() {
  useTitle("The Data Explorer - Results");
  const location = useLocation();
  const [search, setSearch] = React.useState("");
  const [openInfoPanel, setOpenInfoPanel] = React.useState(true);
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);

  const dataYearOptions = useStoreState(
    (state) => get(state.ResultsYears.data, "data", []) as string[]
  );

  const [selectedYear, setSelectedYear] = React.useState<string>(
    get(dataYearOptions, "[0]", "2019")
  );

  // api call & data
  const fetchData = useStoreActions((store) => store.ResultsList.fetch);
  const data = useStoreState(
    (state) => get(state.ResultsList.data, "data", []) as ResultListItemModel[]
  );
  const fetchInfoData = useStoreActions((store) => store.ResultsStats.fetch);
  const infoData = useStoreState(
    (state) =>
      get(state.ResultsStats.data, "data", []) as ResultsInfoContentStatsProps[]
  );
  const fetchYearOptionsData = useStoreActions(
    (store) => store.ResultsYears.fetch
  );
  const isLoading = useStoreState((state) => state.ResultsList.loading);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    document.body.style.background = "#fff";
    fetchYearOptionsData({});
  }, []);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters, { search });
    if (search.length === 0) {
      fetchData({
        filterString: `${filterString}${
          filterString.length > 0 ? "&" : ""
        }periods=${selectedYear}`,
      });
    }
    fetchInfoData({
      filterString: `${filterString}${
        filterString.length > 0 ? "&" : ""
      }periods=${selectedYear}`,
    });
  }, [appliedFilters, selectedYear]);

  useUpdateEffect(() => {
    if (search.length === 0) {
      const filterString = getAPIFormattedFilters(appliedFilters);
      fetchData({
        filterString: `${filterString}${
          filterString.length > 0 ? "&" : ""
        }periods=${selectedYear}`,
      });
    }
  }, [search]);

  useUpdateEffect(() => setSelectedYear(get(dataYearOptions, "[0]", "2020")), [
    dataYearOptions,
  ]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        const filterString = getAPIFormattedFilters(appliedFilters, { search });
        fetchData({
          filterString: `${filterString}${
            filterString.length > 0 ? "&" : ""
          }periods=${selectedYear}`,
        });
      }
    },
    500,
    [search]
  );

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <PageHeader
        title="Results"
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
            menuitems: [
              <Link
                to="/datasets"
                css={`
                  display: flex;
                  align-items: center;

                  > svg {
                    margin-right: 16px;
                    transform: rotate(-180deg) scale(0.5);

                    > path {
                      fill: #13183f;
                    }
                  }
                `}
              >
                <ArrowForwardIcon />
                <b>Datasets</b>
              </Link>,
              <Link to={`/viz/investments/disbursements${location.search}`}>
                <b>Finance</b>-Investments/Disbursements
              </Link>,
              <Link to={`/viz/investments/time-cycle${location.search}`}>
                <b>Finance</b>-Investments/Time-Cycle
              </Link>,
              <Link to={`/viz/investments/geomap${location.search}`}>
                <b>Finance</b>-Investments/GeoMap
              </Link>,
              <Link to={`/viz/budgets/flow${location.search}`}>
                <b>Finance</b>-Budgets Flow
              </Link>,
              <Link to={`/viz/budgets/time-cycle${location.search}`}>
                <b>Finance</b>-Budgets Time Cycle
              </Link>,
              <Link to={`/viz/allocations${location.search}`}>
                <b>Finance</b>-Allocations
              </Link>,
              <Link to={`/viz/eligibility${location.search}`}>
                <b>Finance</b>-Eligibility
              </Link>,
              <Link
                to={`/viz/pledges-contributions/time-cycle${location.search}`}
              >
                <b>Finance</b>-Pledges & Contributions Time Cycle
              </Link>,
              <Link to={`/viz/pledges-contributions/geomap${location.search}`}>
                <b>Finance</b>-Pledges & Contributions GeoMap
              </Link>,
              <Link to={`/grants${location.search}`}>
                <b>Grants</b>
              </Link>,
              <Link to={`/results${location.search}`}>
                <b>Results</b>
              </Link>,
              <Link to={`/documents${location.search}`}>
                <b>Documents</b>
              </Link>,
            ],
          },
          { name: "Results" },
        ]}
      />
      <InformationPanel
        open={openInfoPanel}
        onButtonClick={() => setOpenInfoPanel(!openInfoPanel)}
      >
        <ResultsInfoContent description="" stats={infoData} />
      </InformationPanel>
      <ToolBoxPanel
        open={openToolboxPanel}
        filterGroups={pathnameToFilterGroups.results}
        onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
      />
      {isLoading && <PageLoader />}
      <div css="width: 100%;height: 25px;" />
      <div
        css={`
          width: 100%;
        `}
      >
        <Search value={search} setValue={setSearch} />
        <div css="width: 100%;height: 25px;" />
        <div
          css={`
            gap: 6px;
            display: flex;
            font-weight: bold;
            align-items: center;
          `}
        >
          <div
            css={`
              margin-right: 10px;
            `}
          >
            Year
          </div>
          <Dropdown
            value={selectedYear}
            options={dataYearOptions}
            handleChange={setSelectedYear}
          />
        </div>
        <div css="width: 100%;height: 25px;" />
        {data.length === 0 ? <NoDataLabel /> : <ResultsList listitems={data} />}
      </div>
      <div css="width: 100%;height: 25px;" />
      <div
        css={`
          left: 0;
          top: 48px;
          z-index: 15;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${openToolboxPanel ? 1 : 0};
          visibility: ${openToolboxPanel ? "visible" : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
