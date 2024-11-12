import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { activeStyle, inactiveStyle } from "app/components/chart-settings/data";
import {
  treesDropdownItems,
  ChartSettingsTreemapProps,
} from "app/components/chart-settings/variations/treemap/data";

export const ChartSettingsTreemap: React.FC<ChartSettingsTreemapProps> = (
  props: ChartSettingsTreemapProps
) => {
  const {
    nested,
    trees,
    nestedContent,
    setNested,
    setTrees,
    setNestedContent,
  } = props;

  const onButtonClick = (value: boolean) => () => {
    setNested(value);
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
              sx={!nested ? activeStyle : inactiveStyle}
            >
              Non-Nested
            </Box>
            <Box
              onClick={onButtonClick(true)}
              sx={nested ? activeStyle : inactiveStyle}
            >
              Nested
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography fontSize="12px" fontWeight="700">
            Trees
          </Typography>
          <Dropdown
            compact
            width={150}
            height={26}
            dropdownSelected={trees}
            handleDropdownChange={setTrees}
            dropdownItems={treesDropdownItems}
          />
        </Box>
        {nested && (
          <Box>
            <Typography fontSize="12px" fontWeight="700">
              Nested Content
            </Typography>
            <Dropdown
              compact
              width={150}
              height={26}
              dropdownSelected={nestedContent}
              dropdownItems={treesDropdownItems}
              handleDropdownChange={setNestedContent}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
