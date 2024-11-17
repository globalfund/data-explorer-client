import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { switchButtonStyle } from "app/components/chart-settings/data";
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

  const onButtonClick = () => {
    setStacked((prev) => {
      return !prev;
    });
  };
  const paddingWidth = "1px";

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
              position: "relative",
              display: "flex",
              flexDirection: "row",
              width: "164px",
              height: "24px",
              justifyContent: "center",
              background: "#F1F3F5",
              border: `1px solid #DFE3E5`,
              borderRadius: "4px",
              ">div:nth-child(1), >div:nth-child(2) ": {
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                whiteSpace: "nowrap",
                cursor: "pointer",
                borderRadius: "4px",
                width: "82px",
                color: "#868E96",
              },
            }}
          >
            <Box onClick={() => onButtonClick()}>Non-Stacked</Box>
            <Box onClick={() => onButtonClick()}>Stacked</Box>
            <Box sx={switchButtonStyle(paddingWidth, stacked)}>
              {stacked ? "Stacked" : "Non-Stacked"}
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
        <Box sx={{ height: "100%" }}>
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
