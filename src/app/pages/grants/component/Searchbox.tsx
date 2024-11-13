import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

interface SearchboxProps {
  search: string;
  searchInputRef: any;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchIconClick: (showSearch: boolean) => () => void;
  showSearch: boolean;
}
export default function Searchbox(props: SearchboxProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        height: "40px",
        borderRadius: "4px",
        border: "1px solid #DFE3E5",
        input: {
          background: "#F8F8F8",
          width: "410px",
          color: "#000",
          outline: "none",
          padding: "0 8px",
          fontSize: "12px",
          height: "100%",
          border: "none",
          "::placeholder": {
            color: "#CFD4DA",
          },
        },
        "@media (max-width: 1024px)": {
          width: props.showSearch ? "70%" : "32px",
          height: "32px",
          border: props.showSearch ? "1px solid #DFE3E5" : "none",
          borderRadius: "8px",
          input: {
            width: "100%",
            borderRadius: "8px",
            display: props.showSearch ? "block" : "none",
          },
        },
      }}
    >
      <input
        type="text"
        value={props.search}
        ref={props.searchInputRef}
        onChange={props.handleSearch}
        placeholder="e.g. Kenya"
        data-cy="grants-search-input"
      />

      <IconButton
        sx={{
          height: "100%",
          width: "40px",
          display: "flex",
          padding: "8px 12px",
          borderRadius: "4px",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          borderColor: "#000",
          svg: {
            color: "#fff",
          },
          ":hover": {
            background: "#000",
            borderColor: "#000",
            svg: {
              color: "#fff",
            },
          },
          "@media (max-width: 1024px)": {
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: props.showSearch ? "#000" : "transparent",
            border: "0.5px solid #868E96",
            borderColor: props.showSearch ? "#000" : "#868E96",
            svg: {
              color: props.showSearch ? "#fff" : "#000",
            },
            ":hover": {
              background: "#000",
              borderColor: "#000",
              svg: {
                color: "#fff",
              },
            },
          },
        }}
        data-cy="grants-search-btn"
        onClick={props.handleSearchIconClick(!props.showSearch)}
      >
        <SearchIcon htmlColor="#000" fontSize="small" />
      </IconButton>
    </Box>
  );
}
