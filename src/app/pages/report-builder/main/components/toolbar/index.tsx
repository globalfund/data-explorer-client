import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Dropdown } from "app/components/dropdown";
import InputAdornment from "@mui/material/InputAdornment";
import WindowOutlined from "@mui/icons-material/WindowOutlined";
import NewFolderIcon from "app/assets/vectors/NewFolder.svg?react";
import SettingsIcon from "app/assets/vectors/Settings_ButtonIcon.svg?react";

export const ReportBuilderToolbar: React.FC<{
  selectedSort: string;
  onNewFolderClick: () => void;
  onNewReportClick: () => void;
  selectedView: "cards" | "list";
  setSelectedSort: (sort: string) => void;
  setSelectedView: (view: "cards" | "list") => void;
}> = ({
  selectedView,
  setSelectedView,
  selectedSort,
  setSelectedSort,
  onNewFolderClick,
  onNewReportClick,
}) => {
  return (
    <Box
      sx={{
        gap: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        button: {
          fontSize: "16px",
          textTransform: "none",
        },
      }}
    >
      <Input
        disableUnderline
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <Search fontSize="small" />
          </InputAdornment>
        }
        sx={{
          flexGrow: 1,
          padding: "5px 8px",
          background: "#f1f3f5",
        }}
      />
      <Box
        sx={{
          button: {
            borderRadius: 0,
            padding: "8px 12px",
          },
        }}
      >
        <Button
          startIcon={<WindowOutlined />}
          onClick={() => setSelectedView("cards")}
          sx={{
            fontWeight: selectedView === "cards" ? "700" : "400",
            background: selectedView === "cards" ? "transparent" : "#f1f3f5",
            borderTop: `1px solid ${selectedView === "cards" ? "#0f62fe" : "#f1f3f5"}`,
          }}
        >
          Cards
        </Button>
        <Button
          startIcon={<Menu />}
          onClick={() => setSelectedView("list")}
          sx={{
            fontWeight: selectedView === "list" ? "700" : "400",
            background: selectedView === "list" ? "transparent" : "#f1f3f5",
            borderTop: `1px solid ${selectedView === "list" ? "#0f62fe" : "#f1f3f5"}`,
          }}
        >
          List
        </Button>
      </Box>
      <Dropdown
        height={45}
        width={170}
        fontSize="16px"
        fixedIcon={<SettingsIcon />}
        dropdownSelected={selectedSort}
        handleDropdownChange={(value) => setSelectedSort(value)}
        dropdownItems={[
          { label: "Date Created", value: "Date Created" },
          { label: "Title", value: "Title" },
        ]}
      />
      <IconButton
        sx={{
          borderRadius: "4px",
          padding: "12px 14px",
          border: "1px solid #dfe3e5",
          "&:hover": {
            background: "#f1f3f5",
            borderColor: "#000000",
          },
        }}
        onClick={onNewFolderClick}
      >
        <NewFolderIcon />
      </IconButton>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{
          fontWeight: "400",
          color: "#ffffff",
          background: "#3154f4",
        }}
        onClick={onNewReportClick}
      >
        New Report
      </Button>
    </Box>
  );
};
