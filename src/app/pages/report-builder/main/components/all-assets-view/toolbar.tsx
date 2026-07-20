import React from "react";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCMSData } from "app/hooks/useCMSData";
import ChartIcon from "app/assets/vectors/RBChart.svg?react";
import ColumnIcon from "app/assets/vectors/RBColumn.svg?react";
import LetterTextIcon from "app/assets/vectors/Letter_Text.svg?react";
import GridIcon from "app/assets/vectors/RBGrid.svg?react";
import ImageIcon from "app/assets/vectors/RBImage.svg?react";
import { getCMSDataField } from "app/utils/getCMSDataField";

export type AssetViewType =
  | "all"
  | "chart"
  | "column"
  | "text"
  | "grid"
  | "image";

export const ReportBuilderAssetsToolbar: React.FC<{
  selectedView: AssetViewType;
  setSelectedView: (view: AssetViewType) => void;
}> = ({ selectedView, setSelectedView }) => {
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 600px)");
  const items = [
    {
      name: getCMSDataField(
        cmsData,
        "componentsRBAllAssetsToolbar.allAssetsFilter",
        "All",
      ),
      icon: null,
      value: "all",
    },
    {
      name: getCMSDataField(
        cmsData,
        "componentsRBAllAssetsToolbar.textAssetFilter",
        "Text",
      ),
      icon: <LetterTextIcon />,
      value: "text",
    },
    {
      name: getCMSDataField(
        cmsData,
        "componentsRBAllAssetsToolbar.chartAssetFilter",
        "Chart",
      ),
      icon: <ChartIcon />,
      value: "chart",
    },
    {
      name: getCMSDataField(
        cmsData,
        "componentsRBAllAssetsToolbar.imageAssetFilter",
        "Image",
      ),
      icon: <ImageIcon />,
      value: "image",
    },
    {
      name: getCMSDataField(
        cmsData,
        "componentsRBAllAssetsToolbar.columnAssetFilter",
        "Column",
      ),
      icon: <ColumnIcon />,
      value: "column",
    },

    {
      name: getCMSDataField(
        cmsData,
        "componentsRBAllAssetsToolbar.gridAssetFilter",
        "Grid",
      ),
      icon: <GridIcon />,
      value: "grid",
    },
  ];

  if (isMobile) {
    return (
      <Select
        fullWidth
        variant="standard"
        value={selectedView}
        onChange={(event) =>
          setSelectedView(event.target.value as AssetViewType)
        }
        disableUnderline
        sx={{
          height: "40px",
          fontSize: "16px",
          padding: "0 16px",
          borderBottom: "2px solid #3154f4",
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return (
    <Box
      sx={{
        gap: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          gap: "1px",
          display: "flex",
          button: {
            borderRadius: 0,
            fontWeight: "400",
            padding: "8px 16px",
            fontSize: "16px",
            textTransform: "none",
            width: "fit-content",
            minWidth: "94px",
          },
          "@media (max-width: 768px)": {
            width: "100%",
            overflowX: "auto",
          },
        }}
      >
        {items.map((item) => (
          <Button
            key={item.value}
            endIcon={item.icon}
            onClick={() => setSelectedView(item.value as AssetViewType)}
            sx={{
              borderBottom: `2px solid ${selectedView === item.value ? "#0f62fe" : "#cfd4da"}`,
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
