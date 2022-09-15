/* third-party */
import React from "react";
import get from "lodash/get";
import { Pagination } from "@material-ui/lab";
import { useMediaQuery } from "@material-ui/core";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageLoader } from "app/modules/common/page-loader";
import { DocumentsSubModule } from "app/modules/common/documents";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";

interface DocumentsModuleProps {
  hideHeader?: boolean;
}

export default function DocumentsModule(props: DocumentsModuleProps) {
  useTitle("Dataxplorer - Documents");
  const vizWrapperRef = React.useRef(null);
  const datasetMenuItems = useDatasetMenuItems();
  const [search, setSearch] = React.useState("");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);

  // api call & data
  const fetchData = useStoreActions((store) => store.Documents.fetch);
  const data = useStoreState(
    (state) =>
      get(state.Documents.data, "data", []) as ExpandableTableRowProps[]
  );
  const [page, setPage] = React.useState(1);
  const isLoading = useStoreState((state) => state.Documents.loading);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters, { search });
    if (search.length === 0) {
      fetchData({ filterString });
    }
  }, [appliedFilters]);

  useUpdateEffect(() => {
    if (search.length === 0) {
      const filterString = getAPIFormattedFilters(appliedFilters);
      fetchData({ filterString });
    }
  }, [search]);

  useUpdateEffect(() => setOpenToolboxPanel(!isMobile), [isMobile]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        const filterString = getAPIFormattedFilters(appliedFilters, { search });
        fetchData({ filterString });
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
            title="Documents"
            breadcrumbs={[
              { name: "Home", link: "/" },
              {
                name: "Datasets",
                menuitems: datasetMenuItems,
              },
              { name: "Documents" },
            ]}
          />
          <ToolBoxPanel
            open={openToolboxPanel}
            vizWrapperRef={vizWrapperRef}
            filterGroups={pathnameToFilterGroups.documents}
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
      {isLoading && <PageLoader />}
      <div
        css={`
          height: 100%;
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          ${!props.hideHeader
            ? `width: ${
                openToolboxPanel ? `calc(100% - ${pushValue}px)` : "100%"
              };`
            : "width: 100%"}
        `}
        ref={vizWrapperRef}
      >
        {isSmallScreen ? (
          <>
            <DocumentsSubModule
              data={data.slice((page - 1) * 9, page * 9)}
              search={search}
              setSearch={setSearch}
              columns={["Location", "Documents"]}
            />
            <div>
              <Pagination
                css={`
                  display: flex;
                  justify-content: center;
                `}
                count={Math.ceil(data.length / 9)}
                boundaryCount={Math.ceil(data.length / 18)}
                page={page}
                onChange={(event, val) => setPage(val)}
              />
            </div>
            <div
              css={`
                width: 100%;
                height: 25px;

                @media (max-width: 767px) {
                  height: 150px;
                }
              `}
            />
          </>
        ) : (
          <DocumentsSubModule
            data={data}
            search={search}
            setSearch={setSearch}
            columns={["Location", "Documents"]}
          />
        )}
      </div>
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
