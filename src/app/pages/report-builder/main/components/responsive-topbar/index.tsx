import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useCMSData } from "app/hooks/useCMSData";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import { getCMSDataField } from "app/utils/getCMSDataField";
import { RBDropdown } from "app/pages/report-builder/components/dropdown";
import {
  ReportBuilderMobileBottomBar,
  ReportBuilderMobileSection,
} from "app/pages/report-builder/main/components/mobile-bottom-bar";
import PlusIcon from "app/assets/vectors/report-builder-responsive/plus.svg?react";
import SearchIcon from "app/assets/vectors/report-builder-responsive/search.svg?react";

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
              <SearchIcon width={16} height={16} />
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
        <ReportBuilderMobileBottomBar
          value={(selectedItem || "allReports") as ReportBuilderMobileSection}
          onChange={setSelectedItem}
        />
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
        width={223}
        fontSize="16px"
        dropdownItems={[
          {
            value: selectedItem || "allReports",
            label: getCMSDataField(
              cmsData,
              "pagesReportBuilderMain.workspaceTitle",
              "Jane's Workspace",
            ),
          },
        ]}
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
            <SearchIcon width={16} height={16} />
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
      {selectedItem !== "templatesAndLayouts" && (
        <Button
          variant="contained"
          startIcon={<PlusIcon width={16} height={16} />}
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
      )}
    </Box>
  );
};
