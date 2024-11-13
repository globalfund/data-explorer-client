import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useCMSData } from "app/hooks/useCMSData";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import TableChartIcon from "@mui/icons-material/TableChart";
import { Dropdown } from "app/components/dropdown";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FilterPanel } from "app/components/filters/panel";
import { getCMSDataField } from "app/utils/getCMSDataField";
import CircularProgress from "@mui/material/CircularProgress";
import { GrantsLayoutProps, DROPDOWN_ITEMS } from "app/pages/grants/data";
import Searchbox from "./component/Searchbox";

export const GrantsLayout: React.FC<GrantsLayoutProps> = (
  props: GrantsLayoutProps
) => {
  const mobile = useMediaQuery("(max-width: 767px)");
  const tablet = useMediaQuery("(max-width: 1024px)");
  const cmsData = useCMSData({ returnData: true });
  const {
    view,
    viewResult,
    pagination,
    handleViewChange,
    search,
    showSearch,
    handleSearch,
    handleSearchIconClick,
    handleFilterButtonClick,
    handleFilterPanelClose,
    filterGroups,
    pageAppliedFilters,
    handleResetFilters,
    anchorEl,
    loading,
    searchInputRef,
  } = props;

  const fullWidthDivider = (
    <Divider
      sx={{
        left: "-50vw",
        width: "200vw",
        position: "relative",
        borderTopColor: "#868E96",
        "@media (max-width: 767px)": {
          display: "none",
        },
      }}
    />
  );

  const filterPopoverContent = React.useMemo(() => {
    return (
      <FilterPanel
        onClose={handleFilterPanelClose}
        filterGroups={filterGroups}
        appliedFilters={pageAppliedFilters}
        handleResetFilters={handleResetFilters}
        appliedFilterBgColors={{
          hover: "#FF9800",
          normal: "rgba(255, 152, 0, 0.2)",
        }}
      />
    );
  }, [
    filterGroups,
    pageAppliedFilters,
    handleResetFilters,
    handleFilterPanelClose,
  ]);

  return (
    <Box padding="50px 0">
      <Typography variant="h1">
        {getCMSDataField(cmsData, "pagesGrants.title", "Grants")}
      </Typography>
      <Box
        height="50px"
        sx={{
          "@media (max-width: 767px)": {
            display: "none",
          },
        }}
      />
      {fullWidthDivider}
      <Box
        gap="16px"
        display="flex"
        padding="20px 0"
        position="relative"
        flexDirection="column"
      >
        <Box
          display="flex"
          paddingBottom="4px"
          alignItems="center"
          justifyContent="space-between"
          gap={"8px"}
          sx={
            mobile && showSearch
              ? {
                  "> button": {
                    display: "none",
                  },
                  "> div > button:nth-of-type(2)": {
                    display: "none",
                  },
                  "> div": {
                    width: "100%",
                    " > input": {
                      width: "100%",
                    },
                  },
                }
              : {}
          }
        >
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleFilterButtonClick}
            sx={
              pageAppliedFilters.length > 0
                ? {
                    "&:after": {
                      top: "-3px",
                      right: "8px",
                      width: "6px",
                      height: "6px",
                      content: "''",
                      borderRadius: "50%",
                      position: "absolute",
                      background: "#FF9800",
                    },
                  }
                : {}
            }
            data-cy="grants-filter-btn"
          >
            Filters
          </Button>
          <Popover
            disableScrollLock
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterPanelClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {filterPopoverContent}
          </Popover>
          {!tablet && (
            <Searchbox
              handleSearch={handleSearch}
              search={search}
              searchInputRef={searchInputRef}
              handleSearchIconClick={handleSearchIconClick}
              showSearch={showSearch}
            />
          )}
          <Box
            gap="8px"
            display="flex"
            flexBasis={tablet ? "100%" : "auto"}
            justifyContent={"flex-end"}
          >
            {tablet && (
              <Box
                flexBasis={"100%"}
                gap="16px"
                justifyContent={"flex-end"}
                display="flex"
              >
                <Searchbox
                  handleSearch={handleSearch}
                  search={search}
                  searchInputRef={searchInputRef}
                  handleSearchIconClick={handleSearchIconClick}
                  showSearch={showSearch}
                />
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: "8px",
                    background: "#000",
                    alignSelf: "center",
                    marginRight: "16px",
                  }}
                />
              </Box>
            )}
            {!tablet ? (
              <Dropdown
                dropdownSelected={view}
                dropdownItems={DROPDOWN_ITEMS}
                handleDropdownChange={handleViewChange}
              />
            ) : (
              <React.Fragment>
                <IconButton
                  onClick={() => handleViewChange("Table View")}
                  sx={{
                    height: "32px",
                    width: "32px",
                    borderRadius: "8px",
                    background: view === "Table View" ? "#000" : "#fff",
                    border:
                      view === "Table View" ? "none" : "0.5px solid #868E96",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ":hover": {
                      background: view === "Table View" ? "#000" : "#fff",
                      border:
                        view === "Table View" ? "none" : "0.5px solid #868E96",
                    },
                  }}
                >
                  <TableChartIcon
                    height={18}
                    width={18}
                    htmlColor={view === "Table View" ? "#fff" : "#000"}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleViewChange("Card View")}
                  sx={{
                    height: "32px",
                    width: "32px",
                    borderRadius: "8px",
                    border:
                      view === "Card View" ? "none" : "0.5px solid #868E96",
                    background: view === "Card View" ? "#000" : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ":hover": {
                      background: view === "Card View" ? "#000" : "#fff",
                      border:
                        view === "Card View" ? "none" : "0.5px solid #868E96",
                    },
                  }}
                >
                  <AppsIcon
                    htmlColor={view === "Card View" ? "#fff" : "#000"}
                    height={14}
                    width={14}
                  />
                </IconButton>
              </React.Fragment>
            )}
          </Box>
        </Box>
        {fullWidthDivider}
        <Box
          height="18px"
          sx={{
            "@media (max-width: 767px)": {
              display: "none",
            },
          }}
        />
        {loading && (
          <Box
            top="0"
            zIndex="1"
            width="100%"
            height="100%"
            display="flex"
            position="absolute"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(255, 255, 255, 0.5)"
          >
            <CircularProgress />
          </Box>
        )}
        {viewResult}
        {pagination}
      </Box>
      <Box>
        <Typography variant="overline">
          Latest Update: <b>{props.latestUpdateDate}</b>
        </Typography>
      </Box>
    </Box>
  );
};
