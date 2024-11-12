import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import {
  xAxisDropdownItems,
  yAxisDropdownItems,
  ChartSettingsLineProps,
} from "app/components/chart-settings/variations/line/data";

export const ChartSettingsLine: React.FC<ChartSettingsLineProps> = (
  props: ChartSettingsLineProps
) => {
  const { xAxis, yAxis, setXAxis, setYAxis } = props;

  return (
    <Box
      sx={{
        gap: "15px",
        display: "flex",
        flexDirection: "column",
        "> div": {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        },
      }}
    >
      <Box
        sx={{
          gap: "30px",
          display: "flex",
          flexDirection: "row",
          "> div": {
            gap: "5px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          },
        }}
      >
        <Box>
          <Typography fontSize="12px" fontWeight="700">
            X Axis
          </Typography>
          <Dropdown
            compact
            width={150}
            height={26}
            dropdownSelected={xAxis}
            handleDropdownChange={setXAxis}
            dropdownItems={xAxisDropdownItems}
          />
        </Box>
        <Box>
          <Typography fontSize="12px" fontWeight="700">
            Y Axis
          </Typography>
          <Dropdown
            compact
            width={150}
            height={26}
            dropdownSelected={yAxis}
            handleDropdownChange={setYAxis}
            dropdownItems={yAxisDropdownItems}
          />
        </Box>
      </Box>
    </Box>
  );
};
