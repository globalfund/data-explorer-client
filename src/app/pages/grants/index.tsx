import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useTitle } from "react-use";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Dropdown } from "app/components/dropdown";
import useDebounce from "react-use/lib/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import { GrantCard } from "app/components/grant-card";
import { DROPDOWN_ITEMS } from "app/pages/grants/data";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import { FilterPanel } from "app/components/filters/panel";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { GrantCardProps } from "app/components/grant-card/data";
import { getMonthFromNumber } from "app/utils/getMonthFromNumber";
import { FilterGroupModel } from "app/components/filters/list/data";
import { TABLE_VARIATION_5_COLUMNS } from "app/components/table/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useCMSData } from "app/hooks/useCMSData";

export const Grants: React.FC = () => {
  const cmsData = useCMSData({ returnData: true });
  useTitle("The Data Explorer - Grants");

  const mobile = useMediaQuery("(max-width: 767px)");

  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [view, setView] = React.useState(DROPDOWN_ITEMS[0].value);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const data = useStoreState(
    (state) => get(state.GrantList, "data.data", []) as GrantCardProps[]
  );
  const count = useStoreState((state) => get(state.GrantList, "data.count", 0));
  const loading = useStoreState((state) => state.GrantList.loading);
  const fetch = useStoreActions((actions) => actions.GrantList.fetch);

  const dataLocationFilterOptions = useStoreState(
    (state) =>
      get(state.LocationFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const dataComponentFilterOptions = useStoreState(
    (state) =>
      get(state.ComponentFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const dataPartnerTypeFilterOptions = useStoreState(
    (state) =>
      get(state.PartnerTypeFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const dataStatusFilterOptions = useStoreState(
    (state) =>
      get(state.StatusFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const pageAppliedFilters = useStoreState((state) => [
    ...state.AppliedFiltersState.components,
    ...state.AppliedFiltersState.locations,
    ...state.AppliedFiltersState.principalRecipientTypes,
    ...state.AppliedFiltersState.principalRecipientSubTypes,
    ...state.AppliedFiltersState.principalRecipients,
    ...state.AppliedFiltersState.status,
  ]);
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );

  const handleFilterButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterPanelClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchIconClick = (value: boolean) => () => {
    if (!value) setSearch("");
    setShowSearch(value);
  };

  const handleViewChange = (value: string) => {
    setView(value);
  };

  const handleResetFilters = () => {
    appliedFiltersActions.setAll({
      ...appliedFiltersData,
      locations: [],
      components: [],
      principalRecipients: [],
      principalRecipientSubTypes: [],
      principalRecipientTypes: [],
      status: [],
    });
  };

  const onScroll = () => {
    setAnchorEl(null);
  };

  const dataTable = React.useMemo(() => {
    return data.map((item) => {
      let datesStr = "";
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      if (startDate) {
        datesStr = `${getMonthFromNumber(
          startDate.getMonth() + 1
        )} ${startDate.getFullYear()} - `;
      }
      if (endDate) {
        datesStr += `${getMonthFromNumber(
          endDate.getMonth() + 1
        )} ${endDate.getFullYear()}`;
      }
      return {
        grantId: item.number,
        startEndDate: datesStr,
        geography: item.location,
        component: item.component,
        principalRecipient: item.principalRecipient,
        status: item.status,
        signed: item.signed,
        disbursed: item.disbursed,
      };
    });
  }, [data]);

  const viewResult = React.useMemo(() => {
    if (view === "Card View") {
      return (
        <React.Fragment>
          <Grid container spacing={2}>
            {data.map((grant) => (
              <Grid
                xs={12}
                sm={6}
                md={6}
                lg={4}
                item
                component={Link}
                key={grant.number}
                to={`/grant/${grant.number}`}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    filter: "invert(100%)",
                    "> div": {
                      background: "#fff",
                    },
                  },
                }}
              >
                <GrantCard {...grant} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <Table
        id="grants-table"
        data={dataTable}
        columns={TABLE_VARIATION_5_COLUMNS}
      />
    );
  }, [view, data, count, page, dataTable]);

  const pagination = React.useMemo(
    () => (
      <Box gap="8px" display="flex" alignItems="center">
        <Typography fontSize="12px">
          {(page - 1) * 9 + 1}-{page * 9} of {count}
        </Typography>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() =>
            setPage((p) => {
              if (p > 1) {
                return p - 1;
              }
              return p;
            })
          }
        >
          <ArrowBack htmlColor="#000" sx={{ fontSize: "16px" }} />
        </IconButton>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() =>
            setPage((p) => {
              if (p < count / 9) {
                return p + 1;
              }
              return p;
            })
          }
        >
          <ArrowForward htmlColor="#000" sx={{ fontSize: "16px" }} />
        </IconButton>
      </Box>
    ),
    [count, page]
  );

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        fetch({
          routeParams: {
            page: `${page}`,
            pageSize: "9",
          },
          filterString: `q=${search}`,
        });
      }
    },
    500,
    [search]
  );

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const filterGroups = React.useMemo(() => {
    return [
      dataLocationFilterOptions,
      dataComponentFilterOptions,
      dataPartnerTypeFilterOptions,
      dataStatusFilterOptions,
    ];
  }, [
    dataLocationFilterOptions,
    dataComponentFilterOptions,
    dataPartnerTypeFilterOptions,
    dataStatusFilterOptions,
  ]);

  const filterString = React.useMemo(() => {
    let filterString = "";
    if (appliedFiltersData.locations.length > 0) {
      filterString += `geographies=${encodeURIComponent(
        appliedFiltersData.locations.join(",")
      )}`;
    }
    if (appliedFiltersData.components.length > 0) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }components=${encodeURIComponent(
        appliedFiltersData.components.join(",")
      )}`;
    }
    if (appliedFiltersData.principalRecipientTypes.length > 0) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        appliedFiltersData.principalRecipientTypes.join(",")
      )}`;
    }
    if (appliedFiltersData.principalRecipientSubTypes.length > 0) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        appliedFiltersData.principalRecipientSubTypes.join(",")
      )}`;
    }
    if (appliedFiltersData.principalRecipients.length > 0) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        appliedFiltersData.principalRecipients.join(",")
      )}`;
    }
    if (appliedFiltersData.status.length > 0) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }status=${encodeURIComponent(appliedFiltersData.status.join(","))}`;
    }
    return filterString;
  }, [appliedFiltersData]);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  React.useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
  }, [searchInputRef, showSearch]);

  React.useEffect(() => {
    fetch({
      routeParams: {
        page: `${page}`,
        pageSize: "9",
      },
      filterString: `q=${search}${
        filterString.length ? `&${filterString}` : ""
      }`,
    });
  }, [page, filterString]);

  useUpdateEffect(() => {
    if (search.length === 0) {
      fetch({
        routeParams: {
          page: `${page}`,
          pageSize: "9",
        },
        filterString: `q=${search}${
          filterString.length ? `&${filterString}` : ""
        }`,
      });
    }
  }, [search]);

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
