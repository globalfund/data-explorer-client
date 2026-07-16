import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Search from "@mui/icons-material/Search";
import { useCMSData } from "app/hooks/useCMSData";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import { getCMSDataField } from "app/utils/getCMSDataField";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { RBDropdown } from "app/pages/report-builder/components/dropdown";
import SettingsIcon from "app/assets/vectors/Settings_ButtonIcon.svg?react";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

export const ReportBuilderResponsiveTopbar: React.FC<{
  search: string;
  selectedItem: string | null;
  onNewReportClick: () => void;
  setSearch: (search: string) => void;
  setSelectedItem: (item: string) => void;
}> = ({
  search,
  setSearch,
  selectedItem,
  setSelectedItem,
  onNewReportClick,
}) => {
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTabletOrMobile = useMediaQuery("(max-width: 1024px)");

  const handleItemClick = (item: string) => {
    if (item !== selectedItem) {
      setSelectedItem(item);
    }
  };

  const items = [
    {
      value: "allReports",
      label: getCMSDataField(
        cmsData,
        "pagesReportBuilderMain.allReportsSidebarItem",
        "All Reports",
      ),
      icon: <InsertDriveFileOutlinedIcon />,
    },
    {
      value: "allAssets",
      label: getCMSDataField(
        cmsData,
        "pagesReportBuilderMain.allAssetsSidebarItem",
        "All Assets",
      ),
      icon: <FolderCopyOutlinedIcon />,
    },
  ];

  if (!isTabletOrMobile) {
    return null;
  }

  if (isMobile) {
    return (
      <React.Fragment>
        <Input
          value={search}
          disableUnderline
          placeholder={getCMSDataField(
            cmsData,
            "pagesReportBuilderMain.searchPlaceholder",
            "Search",
          )}
          onChange={(e) => setSearch(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          }
          sx={{
            flexGrow: 1,
            width: "100%",
            height: "45px",
            fontSize: "14px",
            padding: "5px 8px",
            borderRadius: "4px",
            background: "#f1f3f5",
            border: "1px solid #98a1aa",
          }}
        />
        <BottomNavigation
          showLabels
          value={selectedItem}
          onChange={(_event, newValue) => {
            setSelectedItem(newValue);
          }}
          sx={{
            left: 0,
            bottom: 0,
            zIndex: 1000,
            width: "100%",
            position: "fixed",
            bgcolor: "#fff",
            borderRadius: "4px 4px 0 0",
            boxShadow: "0 0 9.8px 0 rgba(0, 0, 0, 0.10)",
            ".Mui-selected": {
              fontSize: "12px !important",
              color: "#3154f4 !important",
            },
          }}
        >
          {items.map((item) => (
            <BottomNavigationAction
              key={item.value}
              icon={item.icon}
              value={item.value}
              label={item.label}
              sx={{
                fontSize: "12px",
                color: "#373D43",
              }}
            />
          ))}
        </BottomNavigation>
      </React.Fragment>
    );
  }

  return (
    <Box
      sx={{
        gap: "16px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        button: {
          fontSize: "16px",
          textTransform: "none",
        },
      }}
    >
      <RBDropdown
        height={45}
        width={220}
        fontSize="16px"
        dropdownItems={items}
        fixedIcon={<SettingsIcon />}
        handleDropdownChange={handleItemClick}
        dropdownSelected={selectedItem || "allReports"}
      />
      <Input
        value={search}
        disableUnderline
        placeholder={getCMSDataField(
          cmsData,
          "pagesReportBuilderMain.searchPlaceholder",
          "Search",
        )}
        onChange={(e) => setSearch(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Search fontSize="small" />
          </InputAdornment>
        }
        sx={{
          flexGrow: 1,
          height: "45px",
          fontSize: "14px",
          padding: "5px 8px",
          borderRadius: "4px",
          background: "#f1f3f5",
          border: "1px solid #98a1aa",
        }}
      />
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{
          height: "45px",
          fontWeight: "400",
          color: "#ffffff",
          background: "#3154f4",
        }}
        onClick={onNewReportClick}
      >
        {getCMSDataField(
          cmsData,
          "pagesReportBuilderMain.newReportButton",
          "New Report",
        )}
      </Button>
    </Box>
  );
};
