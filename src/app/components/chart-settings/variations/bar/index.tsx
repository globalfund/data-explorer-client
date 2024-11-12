import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { activeStyle, inactiveStyle } from "app/components/chart-settings/data";
import {
  xAxisDropdownItems,
  yAxisDropdownItems,
  stacksDropdownItems,
  ChartSettingsBarProps,
} from "app/components/chart-settings/variations/bar/data";

export const ChartSettingsBar: React.FC<ChartSettingsBarProps> = (
  props: ChartSettingsBarProps
) => {
  const {
    stacked,
    xAxis,
    yAxis,
    stacks,
    setStacked,
    setXAxis,
    setYAxis,
    setStacks,
  } = props;

  const onButtonClick = (value: boolean) => () => {
    setStacked(value);
  };

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              "> div": {
                fontSize: "12px",
                padding: "2px 10px",
                borderRadius: "4px",
                border: `1px solid ${colors.secondary[700]}`,
              },
            }}
          >
            <Box
              onClick={onButtonClick(false)}
              sx={!stacked ? activeStyle : inactiveStyle}
            >
              Non-Stacked
            </Box>
            <Box
              onClick={onButtonClick(true)}
              sx={stacked ? activeStyle : inactiveStyle}
            >
              Stacked
            </Box>
          </Box>
        </Box>
        {stacked && (
          <Box>
            <Typography fontSize="12px" fontWeight="700">
              Stacks
            </Typography>
            <Dropdown
              compact
              width={150}
              height={26}
              dropdownSelected={stacks}
              handleDropdownChange={setStacks}
              dropdownItems={stacksDropdownItems}
            />
          </Box>
        )}
      </Box>
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
