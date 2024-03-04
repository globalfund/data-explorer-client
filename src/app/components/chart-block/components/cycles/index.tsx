import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Button from "@mui/material/Button";
import { ChartBlockCyclesProps } from "app/components/chart-block/components/cycles/data";

export const ChartBlockCycles: React.FC<ChartBlockCyclesProps> = (
  props: ChartBlockCyclesProps
) => {
  const handleCycleClick =
    (cycle: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      props.handleCycleChange(cycle);
    };

  return (
    <Box
      gap="16px"
      width="100%"
      display="flex"
      flexDirection="row"
      sx={{
        "& > button": {
          height: "32px",
          fontSize: "14px",
          fontWeight: "400",
          padding: "7px 24px",
          borderRadius: "8px",
          textTransform: "none",
          color: appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR,
          background: appColors.CHART_BLOCK_CYCLES.BUTTON_BACKGROUND_COLOR,
          "&:hover": {
            color: appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR,
            background:
              appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
          },
        },
      }}
    >
      {props.cycles.map((cycle: string) => (
        <Button
          key={cycle}
          onClick={handleCycleClick(cycle)}
          style={
            cycle === props.selectedCycle
              ? {
                  fontWeight: "700",
                  color: appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR,
                  background:
                    appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
                }
              : {}
          }
        >
          {cycle}
        </Button>
      ))}
    </Box>
  );
};
