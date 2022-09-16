/* third-party */
import React from "react";
import get from "lodash/get";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { DataList } from "app/modules/results-module/datalist";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { ResultListItemModel } from "app/modules/results-module/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";

interface ResultsModuleProps {
  hideHeader?: boolean;
}

export default function ResultsModule(props: ResultsModuleProps) {
  useTitle("Dataxplorer - Results");

  const location = useLocation();
  const vizWrapperRef = React.useRef(null);
  const datasetMenuItems = useDatasetMenuItems();
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
  const datasource = useStoreState((state) => state.DataSourceState.value);

  React.useEffect(() => {
    document.body.style.background = "#fff";
    fetchYearOptionsData({});
  }, []);

  React.useEffect(() => {
    if (!openToolboxPanel) {
      setOpenToolboxPanel(true);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters, {
      search,
      datasource,
    });
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
      const filterString = getAPIFormattedFilters(appliedFilters, {
        datasource,
      });
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
        const filterString = getAPIFormattedFilters(appliedFilters, {
          search,
          datasource,
        });
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
    pushValue = 400 - widthThreshold;
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
      {!props.hideHeader && (
        <React.Fragment>
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
        </React.Fragment>
      )}
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
          hideHeader={props.hideHeader}
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
      {!props.hideHeader && (
        <div
          css={`
            left: 0;
            top: 48px;
            z-index: 15;
            width: 100%;
            height: 100%;
            position: fixed;
            background: rgba(35, 35, 35, 0.5);
            opacity: ${isToolboxOvervlayVisible()};
            visibility: ${isToolboxOvervlayVisible() ? "visible" : "hidden"};
            transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
              opacity 225ms cubic-bezier(0, 0, 0.2, 1);
          `}
        />
      )}
    </div>
  );
}
