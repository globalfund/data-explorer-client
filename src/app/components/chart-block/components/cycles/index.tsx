import React from "react";
import find from "lodash/find";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Button from "@mui/material/Button";
import { ChartBlockCyclesProps } from "app/components/chart-block/components/cycles/data";

export const ChartBlockCycles: React.FC<ChartBlockCyclesProps> = (
  props: ChartBlockCyclesProps
) => {
  const handleCycleClick = (cycle: { name: string; value: string }) => () => {
    props.handleCycleChange(cycle);
  };

  return (
    <Box
      zIndex="1"
      gap="10px"
      display="flex"
      flexDirection="row"
      position="relative"
      sx={{
        "& > button": {
          height: "32px",
          fontSize: "14px",
          fontWeight: "400",
          padding: "7px 12px",
          borderRadius: "4px",
          textTransform: "none",
          border: "1px solid #DFE3E5",
          color: appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR,
          "&:hover": {
            borderColor:
              appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
            color: appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR,
            background:
              appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
          },
        },
      }}
    >
      {props.cycles.length > 0 && props.showCycleAll && (
        <Button
          onClick={handleCycleClick({ name: "All", value: "All" })}
          style={
            props.selectedCycles.length === 0
              ? {
                  fontWeight: "700",
                  borderColor:
                    appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
                  color: appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR,
                  background:
                    appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
                }
              : {}
          }
        >
          All
        </Button>
      )}
      {props.cycles.map((cycle) => (
        <Button
          key={cycle.name}
          disabled={cycle.disabled}
          onClick={handleCycleClick(cycle)}
          style={
            find(props.selectedCycles, { value: cycle.value })
              ? {
                  fontWeight: "700",
                  borderColor:
                    appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
                  color: appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR,
                  background:
                    appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
                }
              : {}
          }
        >
          {cycle.name.replace(/ /g, "")}
        </Button>
      ))}
    </Box>
  );
};
