import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import AppsIcon from "@mui/icons-material/Apps";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { GrantCard } from "app/components/grant-card";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import { FilterPanel } from "app/components/filters/panel";
import TableChartIcon from "@mui/icons-material/TableChart";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { GrantCardProps } from "app/components/grant-card/data";
import { TableContainer } from "app/components/table-container";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  TABLE_VARIATION_5_DATA,
  TABLE_VARIATION_5_COLUMNS,
} from "app/components/table/data";

export const Grants: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [view, setView] = React.useState<"list" | "table">("list");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const data = useStoreState(
    (state) => get(state.GrantList, "data.data", []) as GrantCardProps[]
  );
  const count = useStoreState((state) => get(state.GrantList, "data.count", 0));
  const loading = useStoreState((state) => state.GrantList.loading);
  const fetch = useStoreActions((actions) => actions.GrantList.fetch);

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

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearch("");
    }
  };

  const viewResult = React.useMemo(() => {
    if (view === "list") {
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
          <Box gap="8px" padding="0 32px" display="flex" alignItems="center">
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
        </React.Fragment>
      );
    }
    return (
      <Box padding="32px">
        <TableContainer
          id="grants-table"
          data={TABLE_VARIATION_5_DATA}
          columns={TABLE_VARIATION_5_COLUMNS}
        />
      </Box>
    );
  }, [view, data, count, page]);

  React.useEffect(() => {
    fetch({
      routeParams: {
        page: `${page}`,
        pageSize: "9",
      },
    });
  }, [page]);

  return (
    <Box padding="60px 0">
      <Typography variant="h1">Grants</Typography>
      <Box height="56px" />
      <Box gap="16px" padding="32px" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleFilterButtonClick}
          >
            Filters
          </Button>
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterPanelClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <FilterPanel
              onClose={handleFilterPanelClose}
              appliedFilters={[
                "Africa",
                "Asia",
                "Americas",
                "Europe",
                "Oceania",
              ]}
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
            {view === "list" && (
              <React.Fragment>
                {showSearch && (
                  <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="e.g. Kenya"
                  />
                )}
                <IconButton
                  sx={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    borderRadius: "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${showSearch ? "#000" : "#868E96"}`,
                    background: showSearch ? "#000" : "transparent",
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
                  onClick={handleSearchIconClick}
                >
                  {showSearch ? (
                    <CloseIcon htmlColor="#000" fontSize="small" />
                  ) : (
                    <SearchIcon htmlColor="#000" fontSize="small" />
                  )}
                </IconButton>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: "10px",
                    margin: "0 8px",
                    alignSelf: "center",
                    borderColor: "#000",
                  }}
                />
              </React.Fragment>
            )}
            <IconButton
              sx={{
                width: "32px",
                height: "32px",
                display: "flex",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${view === "table" ? "#000" : "#868E96"}`,
                background: view === "table" ? "#000" : "transparent",
                svg: {
                  color: view === "table" ? "#fff" : "#000",
                },
                ":hover": {
                  background: "#000",
                  borderColor: "#000",
                  svg: {
                    color: "#fff",
                  },
                },
              }}
              onClick={() => setView("table")}
            >
              <TableChartIcon htmlColor="#000" fontSize="small" />
            </IconButton>
            <IconButton
              sx={{
                width: "32px",
                height: "32px",
                display: "flex",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${view === "list" ? "#000" : "#868E96"}`,
                background: view === "list" ? "#000" : "transparent",
                svg: {
                  color: view === "list" ? "#fff" : "#000",
                },
                ":hover": {
                  background: "#000",
                  borderColor: "#000",
                  svg: {
                    color: "#fff",
                  },
                },
              }}
              onClick={() => setView("list")}
            >
              <AppsIcon htmlColor="#000" fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {viewResult}
      </Box>
    </Box>
  );
};
