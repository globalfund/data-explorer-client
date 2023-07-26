import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import SaveAlt from "@material-ui/icons/SaveAlt";
import { exportPage } from "app/utils/exportPage";
import IconButton from "@material-ui/core/IconButton";
import {
  StyledMenu,
  StyledMenuItem,
} from "app/modules/chart-module/components/exporter";

export function ExportChartButton() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleTypeChange(value: ".svg" | ".png" | ".jpg") {
    if (value === ".png") {
      exportPage("png", "#f2f7fd");
    }
    if (value === ".jpg") {
      exportPage("jpg", "#f2f7fd");
    }
    handleClose();
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Export">
        <IconButton onClick={handleClick}>
          <SaveAlt htmlColor="#262c34" />
        </IconButton>
      </Tooltip>
      <StyledMenu
        keepMounted
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => handleTypeChange(".png")}>
          .png
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleTypeChange(".jpg")}>
          .jpg
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
