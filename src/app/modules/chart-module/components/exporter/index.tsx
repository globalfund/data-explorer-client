import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { styles } from "app/modules/chart-module/components/exporter/styles";

const StyledMenu = withStyles({
  paper: {
    width: "100px",
    marginTop: "8px",
    borderRadius: "18px",
    backgroundColor: "#DFE3E6",
  },
  list: {
    padding: 0,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    autoFocus={false}
    {...props}
  />
));

const StyledMenuItem = withStyles(() => ({
  root: {
    width: "100%",
    height: "37px",
    color: "#373D43",
    fontSize: "14px",
    padding: "6px 12px",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#262C34",
    },
    "&:not(:last-child)": {
      borderBottom: "1px solid #C0C7D2",
    },
  },
  selected: {
    backgroundColor: "#262C34 !important",
  },
}))(MenuItem);

function downloadBlob(url: string, filename: string) {
  // Create a new anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  a.click();
  return a;
}

export function ChartExporter(props: { rawViz: any }) {
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
    <div css={styles.container}>
      <div css={styles.inputContainer(open)}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleInputBlur}
        />
        <button onClick={handleClick}>
          {type}
          <TriangleXSIcon />
        </button>
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
      </div>
    </div>
  );
}
