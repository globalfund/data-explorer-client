/* third-party */
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import QueueIcon from "@material-ui/icons/Queue";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Popover, { PopoverOrigin } from "@material-ui/core/Popover";

interface Props {
  onEdit: () => void;
  deleteItem: () => void;
  handleClose: () => void;
  duplicateItem: () => void;
  anchorOrigin: PopoverOrigin;
  anchorEl: HTMLElement | null;
  transformOrigin: PopoverOrigin;
}

export function DataThemesUtilsPopover(props: Props) {
  const open = Boolean(props.anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={props.anchorOrigin}
      transformOrigin={props.transformOrigin}
      css={`
        .MuiPaper-root {
          box-shadow: none;
          border-radius: 13px;
        }
      `}
    >
      <div
        css={`
          gap: 16px;
          width: 175px;
          height: 57px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #f1f3f5;
          justify-content: center;

          > button {
            border-radius: 50%;
            border: 1px solid #000;
          }
        `}
      >
        <IconButton size="small" onClick={props.duplicateItem}>
          <QueueIcon htmlColor="#262c34" />
        </IconButton>
        <IconButton size="small" onClick={props.onEdit}>
          <EditIcon htmlColor="#262c34" />
        </IconButton>
        <IconButton size="small" onClick={props.deleteItem}>
          <DeleteIcon htmlColor="#262c34" />
        </IconButton>
      </div>
    </Popover>
  );
}
