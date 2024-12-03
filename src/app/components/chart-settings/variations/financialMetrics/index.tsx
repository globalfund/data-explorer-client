import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import {
  barDropdownItems,
  ChartSettingsFinancialMetricsProps,
} from "app/components/chart-settings/variations/financialMetrics/data";

export const ChartSettingsFinancialmetrics: React.FC<
  ChartSettingsFinancialMetricsProps
> = (props: ChartSettingsFinancialMetricsProps) => {
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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          "> div": {
            gap: "5px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "calc(50% - 5px)",
          },
        }}
      >
        <Box gap="5px">
          <Typography fontSize="12px" fontWeight="700">
            Bars
          </Typography>
          <Dropdown
            compact
            width={150}
            height={26}
            dropdownSelected={props.barOption}
            handleDropdownChange={props.setBarOption}
            dropdownItems={barDropdownItems}
          />
        </Box>
      </Box>
    </Box>
  );
};
