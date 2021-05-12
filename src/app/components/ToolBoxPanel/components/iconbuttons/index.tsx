import React from "react";
import { LinkIcon } from "app/assets/icons/Link";
import IconButton from "@material-ui/core/IconButton";
import { CloudDownloadIcon } from "app/assets/icons/CloudDownload";

export function ToolBoxPanelIconButtons() {
  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        border-bottom: 1px solid #dfe3e6;
      `}
    >
      <IconButton>
        <LinkIcon />
      </IconButton>
      <IconButton>
        <CloudDownloadIcon />
      </IconButton>
    </div>
  );
}
