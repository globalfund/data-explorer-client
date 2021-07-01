/* third-party */
import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
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

interface GrantsModuleProps {
  code?: string;
}

export default function GrantsModule(props: GrantsModuleProps) {
  useTitle(`The Data Explorer -${props.code ? " Location" : ""} Grants`);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);

  // api call & data
  const fetchData = useStoreActions((store) => store.GrantsList.fetch);
  const data = useStoreState(
    (state) => get(state.GrantsList.data, "data", []) as GrantListItemModel[]
  );
  const totalDataCount = useStoreState((state) =>
    get(state.GrantsList.data, "count", 0)
  );
  const isLoading = useStoreState((state) => state.GrantsList.loading);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const reloadData = (resetPage?: boolean) => {
    let filterString = `page=${resetPage ? 1 : page}`;
    if (search.length > 0) {
      filterString = `${filterString}&q=${search}`;
    }
    if (props.code) {
      filterString += `&locations=${props.code}`;
    }
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
  }, [page]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        reloadData(true);
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
                  <Link to="/viz/investments/disbursements">
                    <b>Finance</b>-Investments/Disbursements
                  </Link>,
                  <Link to="/viz/investments/time-cycle">
                    <b>Finance</b>-Investments/Time-Cycle
                  </Link>,
                  <Link to="/viz/budgets/flow">
                    <b>Finance</b>-Budgets Flow
                  </Link>,
                  <Link to="/viz/budgets/time-cycle">
                    <b>Finance</b>-Budgets Time Cycle
                  </Link>,
                  <Link to="/viz/allocations">
                    <b>Finance</b>-Allocations
                  </Link>,
                  <Link to="/viz/eligibility">
                    <b>Finance</b>-Eligibility
                  </Link>,
                  <Link to="/viz/pledges-contributions/time-cycle">
                    <b>Finance</b>-Pledges & Contributions Time Cycle
                  </Link>,
                  <Link to="/grants">
                    <b>Grants</b>
                  </Link>,
                  <Link to="/results">
                    <b>Results</b>
                  </Link>,
                  <Link to="/documents">
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
            onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
          />
          <div css="width: 100%;height: 25px;" />
        </>
      )}
      <div
        css={`
          width: 100%;
        `}
      >
        <Search value={search} setValue={setSearch} />
        <div css="width: 100%;height: 25px;" />
        <GrantsList listitems={data} />
        <div css="width: 100%;height: 25px;" />
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
      </div>
      <div css="width: 100%;height: 25px;" />
      <div
        css={`
          left: 0;
          top: 48px;
          z-index: 10;
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
