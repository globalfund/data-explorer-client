import { Box, TextField, Typography } from "@mui/material";
import Direction from "app/assets/vectors/RBAlignBottom.svg?react";

import React from "react";

export default function LayoutTab() {
  return (
    <Box sx={{ padding: "8px" }}>
      <Typography fontWeight={700} marginBottom={"16px"}>
        Padding
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "8px",
          ".MuiInputBase-root": {
            "&:before": {
              borderBottom: "none",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginBottom: "8px",
                svg: {
                  transform: "rotate(270deg)",
                },
              }}
            >
              <Direction />
              <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
                Left
              </Typography>
            </Box>
            <Box
              sx={{
                width: "134px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                border: "0.5px solid #98A1AA",
                backgroundColor: "#FFF",
                borderRadius: "4px",
                padding: "0 16px",
              }}
            >
              <TextField variant="standard" value={"0px"} />
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginBottom: "8px",
                svg: {
                  transform: "rotate(180deg)",
                },
              }}
            >
              <Direction />
              <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
                Top
              </Typography>
            </Box>
            <Box
              sx={{
                width: "134px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                border: "0.5px solid #98A1AA",
                backgroundColor: "#FFF",
                borderRadius: "4px",
                padding: "0 16px",
              }}
            >
              <TextField variant="standard" value={"0px"} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginBottom: "8px",
                svg: {
                  transform: "rotate(270deg)",
                },
              }}
            >
              <Direction />
              <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
                Right
              </Typography>
            </Box>
            <Box
              sx={{
                width: "134px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                border: "0.5px solid #98A1AA",
                backgroundColor: "#FFF",
                borderRadius: "4px",
                padding: "0 16px",
              }}
            >
              <TextField variant="standard" value={"0px"} />
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              <Direction />
              <Typography sx={{ color: "#373D43", fontSize: "14px" }}>
                Bottom
              </Typography>
            </Box>
            <Box
              sx={{
                width: "134px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                border: "0.5px solid #98A1AA",
                backgroundColor: "#FFF",
                borderRadius: "4px",
                padding: "0 16px",
              }}
            >
              <TextField variant="standard" value={"0px"} />
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography fontWeight={700} marginBottom={"8px"}>
            Size
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{ color: "#373D43", fontSize: "14px" }}
                marginBottom={"8px"}
              >
                Width
              </Typography>
              <Box
                sx={{
                  width: "134px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  border: "0.5px solid #98A1AA",
                  backgroundColor: "#FFF",
                  borderRadius: "4px",
                  padding: "0 16px",
                }}
              >
                <TextField variant="standard" value={"0px"} />
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{ color: "#373D43", fontSize: "14px" }}
                marginBottom={"8px"}
              >
                Height
              </Typography>
              <Box
                sx={{
                  width: "134px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  border: "0.5px solid #98A1AA",
                  backgroundColor: "#FFF",
                  borderRadius: "4px",
                  padding: "0 16px",
                }}
              >
                <TextField variant="standard" value={"0px"} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
