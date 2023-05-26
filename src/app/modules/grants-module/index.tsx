/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { Route, Switch, useLocation } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { useMediaQuery } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  useTitle,
  useDebounce,
  useEffectOnce,
  useUpdateEffect,
} from "react-use";
/* project */
import { appColors } from "app/theme";
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageLoader } from "app/modules/common/page-loader";
import BreadCrumbs from "app/components/Charts/common/breadcrumbs";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { GrantListItemModel } from "app/modules/grants-module/data";

import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { useGetAllAvailableGrants } from "app/hooks/useGetAllAvailableGrants";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";
import GrantsGrid from "app/modules/grants-module/grid";
import GrantsTable from "app/modules/grants-module/table";

interface GrantsModuleProps {
  code?: string;
  search?: string;
  detailFilterType?: string;
  setSearch?: (search: string) => void;
}

export default function GrantsModule(props: GrantsModuleProps) {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });

  useTitle(
    `${get(cmsData, "modulesGrants.titleStart", "")}${
      props.detailFilterType
        ? ` ${props.detailFilterType
            .slice(0, 1)
            .toUpperCase()}${props.detailFilterType.slice(
            1,
            props.detailFilterType.length - 1
          )}`
        : ""
    } ${get(cmsData, "modulesGrants.titleEnd", "")}`
  );
  const [sortBy, setSortBy] = React.useState("grants ASC");

  const vizWrapperRef = React.useRef(null);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);
  const { getAllAvailableGrants, loading } = useGetAllAvailableGrants(
    props.search || search,
    props.code,
    props.detailFilterType
  );

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const setDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.setSteps
  );

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
        search:
          (props.search || search).length > 0
            ? props.search || search
            : undefined,
      }
    );
    fetchData({
      filterString,
    });
    if (resetPage) {
      setPage(1);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (
        dataPathSteps.length === 0 ||
        !find(dataPathSteps, {
          name: "Grant Implementation: Grants",
        })
      ) {
        setDataPathSteps([
          {
            name: "Grant Implementation: Grants",
            path: location.pathname,
            id: "grants",
          },
        ]);
      }
    }, 500);
  }, []);

  useEffectOnce(() => {
    reloadData();
    document.body.style.background = appColors.COMMON.PAGE_BACKGROUND_COLOR_1;
  });

  useUpdateEffect(() => {
    if ((props.search || search).length === 0) reloadData(true);
  }, [props.search, search]);

  React.useEffect(() => {
    setPages(Math.floor(totalDataCount / 10) + 1);
  }, [totalDataCount]);

  useUpdateEffect(() => {
    if (!isLoading) {
      reloadData();
    }
  }, [page, appliedFilters]);

  useUpdateEffect(() => setOpenToolboxPanel(!isMobile), [isMobile]);

  const [,] = useDebounce(
    () => {
      if ((props.search || search).length > 0) {
        reloadData(true);
      }
    },
    500,
    [props.search, search]
  );

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (!props.code && !props.detailFilterType) {
    if (widthThreshold > 420) {
      pushValue = 0;
    } else if (widthThreshold < 0) {
      pushValue = 0;
    } else {
      pushValue = 450 - widthThreshold;
    }
  }

  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  function isToolboxOvervlayVisible() {
    if (isSmallScreen) return 0;
    if (openToolboxPanel && widthThreshold < 0) return 1;
    return 0;
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
      {props.detailFilterType !== "partners" && <BreadCrumbs />}
      {(isLoading || loading) && <PageLoader />}
      {!props.code && (
        <>
          <PageHeader title={get(cmsData, "modulesGrants.titleShort", "")} />
          <ToolBoxPanel
            open={openToolboxPanel}
            vizWrapperRef={vizWrapperRef}
            filterGroups={pathnameToFilterGroups.grants}
            getAllAvailableGrants={getAllAvailableGrants}
            onCloseBtnClick={(value?: boolean) => {
              if (value !== undefined) {
                setOpenToolboxPanel(value);
              } else {
                setOpenToolboxPanel(!openToolboxPanel);
              }
            }}
          />
          <PageTopSpacer />
        </>
      )}
      <Switch>
        <Route exact path="/grants">
          <GrantsGrid
            data={data}
            handleChange={handleChange}
            isToolboxOvervlayVisible={isToolboxOvervlayVisible}
            openToolboxPanel={openToolboxPanel}
            page={page}
            pages={pages}
            pushValue={pushValue}
            search={search}
            setSearch={setSearch}
            setSearchProps={props.setSearch}
            vizWrapperRef={vizWrapperRef}
          />
        </Route>
        <Route path="/grants/table">
          <GrantsTable
            data={data}
            pages={totalDataCount}
            page={page}
            setPage={setPage}
            reloadData={reloadData}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isToolboxOvervlayVisible={isToolboxOvervlayVisible}
            openToolboxPanel={openToolboxPanel}
            pushValue={pushValue}
          />
        </Route>
      </Switch>
    </div>
  );
}
