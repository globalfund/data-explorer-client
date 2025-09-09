import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Folder from "app/assets/vectors/Folder.svg?react";
import { DraggableMenu } from "app/components/draggable-menu";
import Highlighter from "app/assets/vectors/Highlighter.svg?react";
import DeleteBackspace from "app/assets/vectors/DeleteBackspace.svg?react";
import OptionPlaceholder from "app/assets/vectors/OptionPlaceholder.svg?react";

export const ReportBuilderPageItemMenu: React.FC<{
  title: string;
  setOpen: () => void;
  anchorEl: null | HTMLElement;
  deleteItem: (e: React.MouseEvent) => void;
}> = ({ anchorEl, title, setOpen, deleteItem }) => {
  return (
    <DraggableMenu
      width={300}
      title={title}
      setOpen={setOpen}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      transformOrigin={{ vertical: -5, horizontal: "right" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Box
        sx={{
          "& .MuiMenuItem-root": {
            gap: "8px",
            display: "flex",
            padding: "12px 4px",
            alignItems: "center",
          },
        }}
      >
        <MenuItem>
          <OptionPlaceholder />
          Edit Padding & Margins
        </MenuItem>
        <MenuItem>
          <Highlighter />
          Background color
        </MenuItem>
        <MenuItem>
          <OptionPlaceholder />
          Borders
        </MenuItem>
        <MenuItem>
          <OptionPlaceholder />
          Corner radius
        </MenuItem>
        <Divider />
        <MenuItem>
          <Folder />
          Save as an Asset
        </MenuItem>
        <MenuItem onClick={deleteItem}>
          <DeleteBackspace />
          Delete this component
        </MenuItem>
      </Box>
    </DraggableMenu>
  );
};
