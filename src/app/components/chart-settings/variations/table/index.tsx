import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { ChartSettingsSortBy } from "app/components/chart-settings/sort-by";
import { ReactComponent as ColumnsIcon } from "app/assets/vectors/TableToolbarColumns.svg";

import {
  rowsDropdownItems,
  ChartSettingsTableProps,
} from "app/components/chart-settings/variations/table/data";

export const ChartSettingsTable: React.FC<ChartSettingsTableProps> = (
  props: ChartSettingsTableProps
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
          dropdownSelected={rows}
          handleDropdownChange={setRows}
          dropdownItems={rowsDropdownItems}
        />
      </Box>
      <ChartSettingsSortBy {...sortByProps} secondary />
    </Box>
  );
};
