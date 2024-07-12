import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  GeoCategoryProps,
  GeoSubCategoryProps,
} from "app/pages/geography/data";

const GeoCategory: React.FC<GeoCategoryProps> = (props: GeoCategoryProps) => {
  return (
    <Box marginBottom="48px">
      <Typography
        variant="h6"
        lineHeight={1}
        marginBottom="16px"
        sx={
          props.search
            ? {
                opacity: props.highlighted ? 1 : 0.2,
              }
            : {}
        }
      >
        {props.name}
      </Typography>
      <Grid container spacing={2}>
        {props.items.map((item) => (
          <Grid
            item
            key={item.name}
            sm={props.items.length > 1 ? 6 : 12}
            md={props.items.length > 1 ? 4 : 12}
            lg={props.items.length > 1 ? 2 : 12}
          >
            <GeoSubCategory {...item} search={props.search} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const GeoSubCategory: React.FC<GeoSubCategoryProps> = (
  props: GeoSubCategoryProps
) => {
  return (
    <Box>
      <Typography
        lineHeight={1}
        fontWeight="700"
        marginBottom="16px"
        variant="subtitle2"
        sx={
          props.search
            ? {
                opacity: props.highlighted ? 1 : 0.2,
              }
            : {}
        }
      >
        {props.name}
      </Typography>
      <Box>
        {props.items.map((item) => (
          <Link
            key={item.name}
            component={NavLink}
            to={`/location/${item.value.replace(/\//g, "|")}`}
            sx={{
              color: "#000",
              display: "block",
              fontSize: "12px",
              fontWeight: "400",
              textDecoration: "none",
              ...(props.search
                ? {
                    opacity: item.highlighted ? 1 : 0.2,
                    pointerEvents: item.highlighted ? "all" : "none",
                  }
                : {}),
              "&:hover": {
                fontWeight: "700",
              },
            }}
          >
            {item.name}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export const Geography: React.FC = () => {
  const [search, setSearch] = React.useState("");

  const dataList = useStoreState(
    (state) => get(state.GeographyList, "data.data", []) as GeoCategoryProps[]
  );
  const loading = useStoreState((state) => state.GeographyList.loading);
  const fetchList = useStoreActions((actions) => actions.GeographyList.fetch);

  const [filteredData, setFilteredData] = React.useState(dataList);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  React.useEffect(() => {
    const updatedData = [...dataList];
    if (search.length > 0) {
      for (let i = 0; i < updatedData.length; i++) {
        for (let j = 0; j < updatedData[i].items.length; j++) {
          for (let k = 0; k < updatedData[i].items[j].items.length; k++) {
            const highlighted = updatedData[i].items[j].items[k].name
              .toLowerCase()
              .includes(search.toLowerCase());
            updatedData[i].items[j].items[k].highlighted = highlighted;
          }
          updatedData[i].items[j].highlighted = updatedData[i].items[
            j
          ].items.some((item) => item.highlighted);
        }
        updatedData[i].highlighted = updatedData[i].items.some(
          (item) => item.highlighted
        );
      }
    }
    setFilteredData(updatedData);
  }, [search, dataList]);

  React.useEffect(() => {
    fetchList({});
  }, []);

  return (
    <Box padding="50px 0">
      <Typography variant="h1">Geography</Typography>
      <Box height="56px" />
      <Box padding="32px">
        <Box
          gap="8px"
          width="100%"
          display="flex"
          position="relative"
          flexDirection="row"
          justifyContent="flex-end"
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
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="e.g. Kenya"
          />
          {search.length > 0 && (
            <IconButton
              disableRipple
              onClick={clearSearch}
              sx={{
                padding: 0,
                top: "6px",
                right: "48px",
                position: "absolute",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
          <Box
            sx={{
              width: "32px",
              height: "32px",
              display: "flex",
              background: "#000",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon htmlColor="#fff" fontSize="small" />
          </Box>
        </Box>
        <Box height="48px" />
        <Box position="relative">
          {loading && (
            <Box
              top="0"
              left="0"
              width="100%"
              height="100%"
              display="flex"
              position="absolute"
              alignItems="flex-start"
              justifyContent="center"
              bgcolor="rgba(255, 255, 255, 0.5)"
            >
              <CircularProgress />
            </Box>
          )}
          {filteredData.map((item) => (
            <GeoCategory key={item.name} search={search.length > 0} {...item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
