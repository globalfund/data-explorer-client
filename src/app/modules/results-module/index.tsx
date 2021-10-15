/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { InformationPanel } from "app/components/InformationPanel";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ResultsInfoContent } from "app/modules/results-module/components/InfoContent";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  ResultListItemModel,
  ResultsInfoContentStatsProps,
} from "app/modules/results-module/data";
import { Grid } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { DataList } from "./datalist";

export default function ResultsModule() {
  useTitle("The Data Explorer - Results");
  const datasetMenuItems = useDatasetMenuItems();
  const [search, setSearch] = React.useState("");
  const [openInfoPanel, setOpenInfoPanel] = React.useState(true);
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(true);

  const selectedYear = useStoreState(
    (state) => state.ToolBoxPanelResultsYearState.value
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

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (widthThreshold > 420) {
    pushValue = 0;
  } else if (widthThreshold < 0) {
    pushValue = 0;
  } else {
    pushValue = 500 - widthThreshold;
  }

  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  if (isSmallScreen) {
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
              menuitems: datasetMenuItems,
            },
            { name: "Results" },
          ]}
          tabs={[
            { url: "/results", name: "Overview" },
            { url: "/results/datapoints/datapoints", name: "Data points" },
          ]}
        />
        <Switch>
          <Route exact path="/results">
            <Grid container spacing={4}>
              <Grid item xs={6} sm={6} md={6}>
                <ResultsInfoContent description="" stats={infoData} />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <div
                  css={`
                    margin-top: 50px;
                    gap: 12px;
                    line-height: 20px;
                    letter-spacing: 0.5px;
                  `}
                >
                  <p>
                    The Global Fund is a partnership designed to accelerate the
                    end of AIDS, tuberculosis and malaria as epidemics. As an
                    international organization, the Global Fund mobilizes and
                    invests more than US$4 billion a year to support programs
                    run by local experts in more than 100 countries. In
                    partnership with governments, civil society, technical
                    agencies, the private sector and people affected by the
                    diseases, we are challenging barriers and embracing
                    innovation.
                  </p>
                  <p>
                    Amounts are in the specified currency. Where noted, the
                    USD-equivalent is presented for amounts in non-USD
                    currencies.
                    <br />
                    <br />
                    Pledges and contributions made in currencies other than USD
                    from 2014 onward were converted to USD using fixed
                    Replenishment exchange rates. Pledges and contributions
                    before 2014 were converted using spot exchange rates.
                    <br />
                    <br />
                    Where pledges have been made that are not specific to
                    individual years, the amount shown as pledged for a period
                    is the sum of contributions received in that period.
                  </p>
                </div>
              </Grid>
            </Grid>
          </Route>
          <Route exact path="/results/datapoints/datapoints">
            <DataList
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
              selectedYear={selectedYear}
              data={data}
              openToolboxPanel={openToolboxPanel}
              pushValue={pushValue}
            />
          </Route>
        </Switch>
      </div>
    );
  }

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
            menuitems: datasetMenuItems,
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
      <DataList
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        selectedYear={selectedYear}
        data={data}
        openToolboxPanel={openToolboxPanel}
        pushValue={pushValue}
      />
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
          opacity: ${openToolboxPanel && widthThreshold < 0 ? 1 : 0};
          visibility: ${openToolboxPanel && widthThreshold < 0
            ? "visible"
            : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
