import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Dropdown } from "app/components/dropdown";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FilterPanel } from "app/components/filters/panel";
import CircularProgress from "@mui/material/CircularProgress";
import { GrantsLayoutProps, DROPDOWN_ITEMS } from "app/pages/grants/data";
import { get } from "lodash";
import { useCMSData } from "app/hooks/useCMSData";

export const GrantsLayout: React.FC<GrantsLayoutProps> = (
  props: GrantsLayoutProps
) => {
  const mobile = useMediaQuery("(max-width: 767px)");
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

  return (
    <Box padding="50px 0">
      <Typography variant="h1">
        {get(cmsData, "pagesGrants.title", "Grants")}
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
            <FilterPanel
              filterGroups={filterGroups}
              onClose={handleFilterPanelClose}
              appliedFilters={pageAppliedFilters}
              handleResetFilters={handleResetFilters}
              appliedFilterBgColors={{
                hover: "#FF9800",
                normal: "rgba(255, 152, 0, 0.2)",
              }}
            />
          </Popover>
          <Box
            gap="8px"
            display="flex"
            sx={{
              input: {
                color: "#000",
                width: "200px",
                height: "32px",
                outline: "none",
                padding: "0 8px",
                fontSize: "12px",
                borderStyle: "none",
                borderRadius: "8px",
                background: "#F1F3F4",
                "::placeholder": {
                  color: "#CFD4DA",
                },
              },
            }}
          >
            <React.Fragment>
              {showSearch && (
                <input
                  type="text"
                  value={search}
                  ref={searchInputRef}
                  onChange={handleSearch}
                  placeholder="e.g. Kenya"
                />
              )}
              <IconButton
                sx={{
                  height: "30px",
                  display: "flex",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  background: showSearch ? "#000" : "transparent",
                  border: `1px solid ${showSearch ? "#000" : "#DFE3E5"}`,
                  svg: {
                    color: showSearch ? "#fff" : "#000",
                  },
                  ":hover": {
                    background: "#000",
                    borderColor: "#000",
                    svg: {
                      color: "#fff",
                    },
                  },
                }}
                onClick={handleSearchIconClick(!showSearch)}
              >
                {showSearch ? (
                  <CloseIcon htmlColor="#000" fontSize="small" />
                ) : (
                  <SearchIcon htmlColor="#000" fontSize="small" />
                )}
              </IconButton>
            </React.Fragment>
            <Dropdown
              dropdownSelected={view}
              dropdownItems={DROPDOWN_ITEMS}
              handleDropdownChange={handleViewChange}
            />
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
    </Box>
  );
};
