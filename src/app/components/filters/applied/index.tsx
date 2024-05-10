import React from "react";
import Box from "@mui/material/Box";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FiltersAppliedProps } from "app/components/filters/applied/data";

export const FiltersApplied: React.FC<FiltersAppliedProps> = (
  props: FiltersAppliedProps
) => {
  return (
    <Box gap="5px" display="flex" flexDirection="row" flexWrap="wrap">
      {props.items.map((item) => (
        <Box
          gap="5px"
          key={item}
          display="flex"
          fontSize="12px"
          padding="2px 4px"
          bgcolor="#F5F6F7"
          borderRadius="23px"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            background: props.appliedFilterBgColors.normal,
            border: `1px solid ${props.appliedFilterBgColors.hover}`,
            "&:hover": {
              color: "#ffffff",
              background: props.appliedFilterBgColors.hover,
              button: {
                background: "#ffffff",
                svg: {
                  color: props.appliedFilterBgColors.hover,
                },
              },
            },
          }}
        >
          {item}
          <IconButton
            sx={{ padding: 0, borderRadius: "50%", background: "#373D43" }}
          >
            <Close
              htmlColor="#ffffff"
              sx={{
                width: "12px",
                height: "12px",
              }}
            />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};