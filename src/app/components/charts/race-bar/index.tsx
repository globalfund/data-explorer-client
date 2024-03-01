import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RaceBarChartProps } from "app/components/charts/race-bar/data";
import {
  getFinancialValueWithMetricPrefix,
  getRange,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const RaceBarChart: React.FC<RaceBarChartProps> = (
  props: RaceBarChartProps
) => {
  return (
    <Box
      gap="16px"
      width="100%"
      display="flex"
      padding="32px"
      flexDirection="column"
    >
      {props.data.map((item) => {
        const range = getRange([item], ["value"]);
        return (
          <Box
            gap="16px"
            width="100%"
            display="flex"
            key={item.name}
            alignItems="center"
            flexDirection="row"
          >
            <Typography fontSize="14px" color="#333" minWidth="70px">
              {item.name}
            </Typography>
            <Box
              height="9px"
              borderRadius="16px"
              bgcolor={item.color}
              width={`calc(${item.percentage}% - 120px)`}
            />
            <Typography fontSize="14px" color="#333" whiteSpace="nowrap">
              ${getFinancialValueWithMetricPrefix(item.value, range.index, 2)}{" "}
              {range.abbr} - {item.percentage}%
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
