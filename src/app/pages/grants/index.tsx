import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useTitle } from "react-use";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useDebounce from "react-use/lib/useDebounce";
import { GrantCard } from "app/components/grant-card";
import { GrantsLayout } from "app/pages/grants/layout";
import { DROPDOWN_ITEMS } from "app/pages/grants/data";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { GrantCardProps } from "app/components/grant-card/data";
import { getMonthFromNumber } from "app/utils/getMonthFromNumber";
import { FilterGroupModel } from "app/components/filters/list/data";
import { TABLE_VARIATION_5_COLUMNS } from "app/components/table/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useGetDatasetLatestUpdate } from "app/hooks/useGetDatasetLatestUpdate";

export const Grants: React.FC = () => {
  useTitle("The Data Explorer - Grants");
  const latestUpdateDate = useGetDatasetLatestUpdate({
    dataset: "grants",
  });

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
    let value = "";
    if (appliedFiltersData.locations.length > 0) {
      value += `geographies=${encodeURIComponent(
        appliedFiltersData.locations.join(",")
      )}`;
    }
    if (appliedFiltersData.components.length > 0) {
      value += `${value.length > 0 ? "&" : ""}components=${encodeURIComponent(
        appliedFiltersData.components.join(",")
      )}`;
    }
    if (appliedFiltersData.principalRecipientTypes.length > 0) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        appliedFiltersData.principalRecipientTypes.join(",")
      )}`;
    }
    if (appliedFiltersData.principalRecipientSubTypes.length > 0) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        appliedFiltersData.principalRecipientSubTypes.join(",")
      )}`;
    }
    if (appliedFiltersData.principalRecipients.length > 0) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        appliedFiltersData.principalRecipients.join(",")
      )}`;
    }
    if (appliedFiltersData.status.length > 0) {
      value += `${value.length > 0 ? "&" : ""}status=${encodeURIComponent(
        appliedFiltersData.status.join(",")
      )}`;
    }
    return value;
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

  return (
    <GrantsLayout
      view={view}
      viewResult={viewResult}
      pagination={pagination}
      handleViewChange={handleViewChange}
      search={search}
      showSearch={showSearch}
      handleSearch={handleSearch}
      handleSearchIconClick={handleSearchIconClick}
      handleFilterButtonClick={handleFilterButtonClick}
      handleFilterPanelClose={handleFilterPanelClose}
      filterGroups={filterGroups}
      pageAppliedFilters={pageAppliedFilters}
      handleResetFilters={handleResetFilters}
      anchorEl={anchorEl}
      loading={loading}
      searchInputRef={searchInputRef}
      latestUpdateDate={latestUpdateDate}
    />
  );
};
