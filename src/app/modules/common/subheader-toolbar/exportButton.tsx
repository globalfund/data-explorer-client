import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { exportPage } from "app/utils/exportPage";
import Cloud from "@material-ui/icons/CloudDownload";
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
    if (value === ".svg") {
      exportPage("svg", "#f2f7fd");
    }
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
      <Tooltip title="Download">
        <IconButton onClick={handleClick}>
          <Cloud htmlColor="#495057" />
        </IconButton>
      </Tooltip>
      <StyledMenu
        keepMounted
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => handleTypeChange(".svg")}>
          .svg
        </StyledMenuItem>
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
