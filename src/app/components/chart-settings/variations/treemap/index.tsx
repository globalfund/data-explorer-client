import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import {
  treesDropdownItems,
  ChartSettingsTreemapProps,
} from "app/components/chart-settings/variations/treemap/data";
import { switchButtonStyle } from "app/components/chart-settings/data";

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

  const onButtonClick = () => {
    setNested((prev) => {
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
            Structure
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
            <Box onClick={() => onButtonClick()}>Non-Nested</Box>
            <Box onClick={() => onButtonClick()}>Nested</Box>
            <Box sx={switchButtonStyle(paddingWidth, nested)}>
              {nested ? "Nested" : "Non-Nested"}
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
