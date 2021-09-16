/* third-party */
import React from "react";
import get from "lodash/get";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  useTitle,
  useDebounce,
  useEffectOnce,
  useUpdateEffect,
} from "react-use";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageLoader } from "app/modules/common/page-loader";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { GrantListItemModel } from "app/modules/grants-module/data";
import { Search } from "app/modules/grants-module/components/Search";
import { GrantsList } from "app/modules/grants-module/components/List";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";

interface GrantsModuleProps {
  code?: string;
  detailFilterType?: string;
}

export default function GrantsModule(props: GrantsModuleProps) {
  useTitle(
    `The Data Explorer -${
      props.detailFilterType
        ? ` ${props.detailFilterType.slice(
            1,
            props.detailFilterType.length - 2
          )}`
        : ""
    } Grants`
  );
  const location = useLocation();
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(true);

  // api call & data
  const fetchData = useStoreActions((store) => store.GrantsList.fetch);
  const data = useStoreState(
    (state) => get(state.GrantsList.data, "data", []) as GrantListItemModel[]
  );
  const totalDataCount = useStoreState((state) =>
    get(state.GrantsList.data, "count", 0)
  );
  const isLoading = useStoreState((state) => state.GrantsList.loading);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const reloadData = (resetPage?: boolean) => {
    const filterString = getAPIFormattedFilters(
      props.code && props.detailFilterType
        ? {
            ...appliedFilters,
            [props.detailFilterType]: [
              ...get(appliedFilters, props.detailFilterType, []),
              props.code,
            ],
          }
        : appliedFilters,
      {
        page: resetPage ? 1 : page,
        search: search.length > 0 ? search : undefined,
      }
    );
    fetchData({
      filterString,
    });
    if (resetPage) {
      setPage(1);
    }
  };

  useEffectOnce(() => {
    reloadData();
    document.body.style.background = "#fff";
  });

  useUpdateEffect(() => {
    if (search.length === 0) reloadData(true);
  }, [search]);

  React.useEffect(() => {
    setPages(Math.floor(totalDataCount / 10) + 1);
  }, [totalDataCount]);

  useUpdateEffect(() => {
    if (!isLoading) {
      reloadData();
    }
  }, [page, appliedFilters]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        reloadData(true);
      }
    },
    500,
    [search]
  );

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (!props.code && !props.detailFilterType) {
    if (widthThreshold > 500) {
      pushValue = 0;
    } else if (widthThreshold < 0) {
      pushValue = 0;
    } else {
      pushValue = 500 - widthThreshold;
    }
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
      {isLoading && <PageLoader />}
      {!props.code && (
        <>
          <PageHeader
            title="Grants"
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
                  <Link
                    to={`/viz/pledges-contributions/geomap${location.search}`}
                  >
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
              {
                name: "Grants",
              },
            ]}
          />
          <ToolBoxPanel
            open={openToolboxPanel}
            filterGroups={pathnameToFilterGroups.grants}
            onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
          />
          <div css="width: 100%;height: 25px;" />
        </>
      )}
      <div
        css={`
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${openToolboxPanel ? `calc(100% - ${pushValue}px)` : "100%"};
        `}
      >
        <Search value={search} setValue={setSearch} />
        <div css="width: 100%;height: 25px;" />
        {data.length === 0 ? <NoDataLabel /> : <GrantsList listitems={data} />}
        <div css="width: 100%;height: 25px;" />
        {data.length > 0 && (
          <Pagination
            page={page}
            size="large"
            count={pages}
            onChange={handleChange}
            css={`
              > ul {
                justify-content: center;
              }
            `}
          />
        )}
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
