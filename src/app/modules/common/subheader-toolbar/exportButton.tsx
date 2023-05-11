import { IconButton, Tooltip } from "@material-ui/core";
import { SaveAlt } from "@material-ui/icons";
import { type } from "os";
import React from "react";
import { styles } from "app/modules/chart-module/components/exporter/styles";
import {
  StyledMenu,
  StyledMenuItem,
} from "app/modules/chart-module/components/exporter";

function downloadBlob(url: string, filename: string) {
  // Create a new anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  a.click();
  return a;
}

export function ExportChartButton(props: { rawViz: any }) {
  const [name, setName] = React.useState("Viz");
  const [type, setType] = React.useState<".svg" | ".png" | ".jpg">(".svg");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const downloadSvg = React.useCallback(() => {
    const svgString = new XMLSerializer().serializeToString(props.rawViz);
    const DOMURL = window.URL || window.webkitURL || window;
    const svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = DOMURL.createObjectURL(svg);
    downloadBlob(url, `${name}${type}`);
    DOMURL.revokeObjectURL(url);
  }, [props.rawViz, type]);

  const downloadImage = React.useCallback(
    (format: "image/png" | "image/jpeg") => {
      const svgString = new XMLSerializer().serializeToString(props.rawViz);
      const DOMURL = window.URL || window.webkitURL || window;
      const svg = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = DOMURL.createObjectURL(svg);
      const canvas = document.createElement("canvas");
      canvas.height = props.rawViz.clientHeight;
      canvas.width = props.rawViz.clientWidth;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = function () {
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
        const dataUrl = canvas.toDataURL(format);
        downloadBlob(dataUrl, `${name}${type}`);
        DOMURL.revokeObjectURL(url);
      };
      img.src = url;
    },
    [props.rawViz, type]
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      setName("Viz");
    }
  }

  function handleTypeChange(value: ".svg" | ".png" | ".jpg") {
    setType(value);
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
        <StyledMenuItem
          selected={type === ".svg"}
          onClick={() => handleTypeChange(".svg")}
        >
          .svg
        </StyledMenuItem>
        <StyledMenuItem
          selected={type === ".png"}
          onClick={() => handleTypeChange(".png")}
        >
          .png
        </StyledMenuItem>
        <StyledMenuItem
          selected={type === ".jpg"}
          onClick={() => handleTypeChange(".jpg")}
        >
          .jpg
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
