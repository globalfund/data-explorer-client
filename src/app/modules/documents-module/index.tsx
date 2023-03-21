/* third-party */
import React from "react";
import { v4 } from "uuid";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { breadCrumbItems } from "app/state/recoil/atoms";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TablePagination from "@material-ui/core/TablePagination";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { appColors } from "app/theme";
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageLoader } from "app/modules/common/page-loader";
import { DocumentsSubModule } from "app/modules/common/documents";
import BreadCrumbs from "app/components/Charts/common/breadcrumbs";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";

export default function DocumentsModule() {
  useTitle("The Data Explorer - Documents");
  const vizWrapperRef = React.useRef(null);
  const datasetMenuItems = useDatasetMenuItems();
  const [search, setSearch] = React.useState("");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);
  const [_, setBreadCrumbList] = useRecoilState(breadCrumbItems);

  // api call & data
  const fetchData = useStoreActions((store) => store.Documents.fetch);
  const data = useStoreState(
    (state) =>
      get(state.Documents.data, "data", []) as ExpandableTableRowProps[]
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const isLoading = useStoreState((state) => state.Documents.loading);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    document.body.style.background = appColors.COMMON.PAGE_BACKGROUND_COLOR_1;
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

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  React.useEffect(() => {
    setBreadCrumbList([
      { name: "Datasets", path: "/", id: v4() },
      {
        name: "Documents",
        path: location.pathname,
        id: v4(),
      },
    ]);
  }, []);

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
      {isLoading && <PageLoader />}
      <div
        css={`
          height: 100%;
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${openToolboxPanel ? `calc(100% - ${pushValue}px)` : "100%"};
        `}
        ref={vizWrapperRef}
      >
        <DocumentsSubModule
          data={data.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
          search={search}
          setSearch={setSearch}
          columns={["Location", "Documents"]}
        />
        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          css={`
            @media (min-width: 768px) {
              .MuiTablePagination-toolbar {
                padding-left: 40px;
              }
              .MuiTablePagination-spacer {
                display: none;
              }
            }
          `}
        />
        {isSmallScreen && (
          <div
            css={`
              width: 100%;
              height: 25px;

              @media (max-width: 767px) {
                height: 150px;
              }
            `}
          />
        )}
      </div>
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
