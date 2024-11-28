import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { ReactComponent as ColumnsIcon } from "app/assets/vectors/TableToolbarColumns.svg";
import { rowsDropdownItems } from "app/components/chart-settings/variations/table/data";
import { ChartSettingsSortByOrder } from "app/components/chart-settings/sort-by/sortByOrder";
import { ChartSettingsHeatmapProps } from "./data";

export const ChartSettingsHeatmap: React.FC<ChartSettingsHeatmapProps> = (
  props: ChartSettingsHeatmapProps
) => {
  const { rows, setRows, ...sortByProps } = props;

  return (
    <Box
      sx={{
        gap: "15px",
        display: "flex",
        flexDirection: "column",
        "> div": {
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
        },
      }}
    >
      <Box>
        <Typography
          gap="5px"
          display="flex"
          fontSize="12px"
          fontWeight="700"
          marginBottom="10px"
          alignItems="center"
        >
          <ColumnsIcon style={{ transform: "rotate(-90deg)" }} />
          Rows
        </Typography>
        <Dropdown
          compact
          width={150}
          height={26}
          dropdownSelected={rows as string}
          handleDropdownChange={setRows}
          dropdownItems={rowsDropdownItems}
        />
      </Box>
      <ChartSettingsSortByOrder {...sortByProps} secondary />
    </Box>
  );
};
