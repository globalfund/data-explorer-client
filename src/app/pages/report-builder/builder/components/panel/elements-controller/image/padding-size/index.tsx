import { Box, Divider, Typography } from "@mui/material";
import Direction from "app/assets/vectors/RBAlignBottom.svg?react";
import Button from "@mui/material/Button";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import React from "react";
import { alignHOptions, alignVOptions, sizingModes } from "../data";
import StyledMenu from "../../common/menu-popup";
import CustomTextField from "../../common/textField";

export function PaddingSize() {
  const [selectedSizingMode, setSelectedSizingMode] = React.useState(
    sizingModes[0].value,
  );
  const [alignHorizontal, setAlignHorizontal] = React.useState("left");
  const [alignVertical, setAlignVertical] = React.useState("top");
  const [alignHorizontalAnchorEl, setAlignHorizontalAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isAlignHorizontalMenuActive = Boolean(alignHorizontalAnchorEl);

  const [alignVerticalAnchorEl, setAlignVerticalAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isAlignVerticalMenuActive = Boolean(alignVerticalAnchorEl);

  const [sizingModeAnchorEl, setSizingModeAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isSizingModeMenuActive = Boolean(sizingModeAnchorEl);

  const handleSelectSizingMode = (value: string) => {
    setSelectedSizingMode(value);
  };
  const handleSelectAlignHorizontal = (value: string) => {
    setAlignHorizontal(value);
  };

  const handleSelectAlignVertical = (value: string) => {
    setAlignVertical(value);
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    menuType: string,
  ) => {
    switch (menuType) {
      case "sizingMode":
        setSizingModeAnchorEl(event.currentTarget);
        break;
      case "alignHorizontal":
        setAlignHorizontalAnchorEl(event.currentTarget);
        break;
      case "alignVertical":
        setAlignVerticalAnchorEl(event.currentTarget);
        break;
    }
  };

  const handleCloseMenu = (menuType: string) => {
    switch (menuType) {
      case "sizingMode":
        setSizingModeAnchorEl(null);
        break;
      case "alignHorizontal":
        setAlignHorizontalAnchorEl(null);
        break;
      case "alignVertical":
        setAlignVerticalAnchorEl(null);
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px 8px",
      }}
    >
      <Box>
        <Typography
          sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
        >
          Sizing Mode
        </Typography>
        {/* Font family */}
        <Button
          variant="text"
          onClick={(event) => handleOpenMenu(event, "sizingMode")}
          endIcon={
            isSizingModeMenuActive ? <KeyboardArrowUp /> : <KeyboardArrowDown />
          }
          sx={{
            fontWeight: "400",
            textTransform: "none",
            color: "#000",
            bgcolor: "#fff",
            width: "100%",
            height: "40px",
            justifyContent: "space-between",
            borderRadius: "4px",
            border: "0.5px solid #98A1AA",
          }}
        >
          {sizingModes.find((mode) => mode.value === selectedSizingMode)?.label}
        </Button>

        <StyledMenu
          open={isSizingModeMenuActive}
          anchorEl={sizingModeAnchorEl}
          onClose={() => handleCloseMenu("sizingMode")}
          options={sizingModes}
          activeValue={selectedSizingMode}
          onSelect={handleSelectSizingMode}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Box>
          <Typography
            sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
          >
            Align Horizontal
          </Typography>
          {/* Font family */}
          <Button
            variant="text"
            onClick={(event) => handleOpenMenu(event, "alignHorizontal")}
            endIcon={
              isAlignHorizontalMenuActive ? (
                <KeyboardArrowUp />
              ) : (
                <KeyboardArrowDown />
              )
            }
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "#fff",
              width: "134px",
              height: "40px",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {
              alignHOptions.find((option) => option.value === alignHorizontal)
                ?.label
            }
          </Button>

          <StyledMenu
            open={isAlignHorizontalMenuActive}
            anchorEl={alignHorizontalAnchorEl}
            onClose={() => handleCloseMenu("alignHorizontal")}
            options={alignHOptions}
            activeValue={alignHorizontal}
            onSelect={handleSelectAlignHorizontal}
          />
        </Box>
        <Box>
          <Typography
            sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
          >
            Align Vertical
          </Typography>
          {/* Font family */}
          <Button
            variant="text"
            onClick={(event) => handleOpenMenu(event, "alignVertical")}
            endIcon={
              isAlignVerticalMenuActive ? (
                <KeyboardArrowUp />
              ) : (
                <KeyboardArrowDown />
              )
            }
            sx={{
              fontWeight: "400",
              textTransform: "none",
              color: "#000",
              bgcolor: "#fff",
              width: "134px",
              height: "40px",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "0.5px solid #98A1AA",
            }}
          >
            {
              alignVOptions.find((option) => option.value === alignVertical)
                ?.label
            }
          </Button>

          <StyledMenu
            open={isAlignVerticalMenuActive}
            anchorEl={alignVerticalAnchorEl}
            onClose={() => handleCloseMenu("alignVertical")}
            options={alignVOptions}
            activeValue={alignVertical}
            onSelect={handleSelectAlignVertical}
          />
        </Box>
      </Box>
      <Divider sx={{ borderColor: "#CFD4DA" }} />
      <Typography fontWeight={700}>Padding</Typography>
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
            <CustomTextField type="imagePaddingLeft" />
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
            <CustomTextField type="imagePaddingTop" />
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
            <CustomTextField type="imagePaddingRight" />
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
            <CustomTextField type="imagePaddingBottom" />
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
              <CustomTextField type="imageWidth" />
            </Box>

            <Box>
              <Typography
                sx={{ color: "#373D43", fontSize: "14px" }}
                marginBottom={"8px"}
              >
                Height
              </Typography>
              <CustomTextField type="imageHeight" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
