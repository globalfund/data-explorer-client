/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { appColors } from "app/theme";
import uniqueId from "lodash/uniqueId";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { DataList } from "app/modules/results-module/datalist";
import BreadCrumbs from "app/components/Charts/common/breadcrumbs";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { ResultListItemModel } from "app/modules/results-module/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";

export default function ResultsModule() {
  useTitle("The Data Explorer - Results");
  const location = useLocation();
  const vizWrapperRef = React.useRef(null);
  const [search, setSearch] = React.useState("");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);

  const selectedYear = useStoreState(
    (state) => state.ToolBoxPanelResultsYearState.value
  );

  // api call & data
  const fetchData = useStoreActions((store) => store.ResultsList.fetch);
  const data = useStoreState(
    (state) => get(state.ResultsList.data, "data", []) as ResultListItemModel[]
  );
  const fetchInfoData = useStoreActions((store) => store.ResultsStats.fetch);
  const fetchYearOptionsData = useStoreActions(
    (store) => store.ResultsYears.fetch
  );
  const isLoading = useStoreState((state) => state.ResultsList.loading);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    document.body.style.background = appColors.COMMON.PAGE_BACKGROUND_COLOR_1;
    fetchYearOptionsData({});
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, {
        name: "Annual Results",
      })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: "Annual Results",
          path: `${location.pathname}${location.search}`,
        },
      ]);
    }
  }, []);

  React.useEffect(() => {
    if (!openToolboxPanel) {
      setOpenToolboxPanel(true);
    }
  }, [location.pathname]);

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

  useUpdateEffect(() => setOpenToolboxPanel(!isMobile), [isMobile]);

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
    pushValue = 450 - widthThreshold;
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
      <BreadCrumbs />
      <PageHeader title="Results" />
      <ToolBoxPanel
        open={openToolboxPanel}
        vizWrapperRef={vizWrapperRef}
        filterGroups={pathnameToFilterGroups.results}
        onCloseBtnClick={(value?: boolean) => {
          if (value !== undefined) {
            setOpenToolboxPanel(value);
          } else {
            setOpenToolboxPanel(!openToolboxPanel);
          }
        }}
      />
      <PageTopSpacer />
      <div
        ref={vizWrapperRef}
        css={`
          width: 100%;
        `}
      >
        <DataList
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          selectedYear={selectedYear}
          data={data}
          openToolboxPanel={openToolboxPanel}
          pushValue={pushValue}
        />
      </div>
      <div
        css={`
          width: 100%;
          height: 25px;

          @media (max-width: 767px) {
            height: 70px;
          }
        `}
      />
      <div
        css={`
          left: 0;
          top: 45px;
          z-index: 15;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${isToolboxOvervlayVisible()};
          visibility: ${isToolboxOvervlayVisible() === 1
            ? "visible"
            : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
