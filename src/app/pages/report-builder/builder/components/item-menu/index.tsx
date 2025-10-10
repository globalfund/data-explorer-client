import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Folder from "app/assets/vectors/Folder2.svg?react";
import CopyIcon from "app/assets/vectors/Duplicate.svg?react";
import DeleteBackspace from "app/assets/vectors/DeleteBackspace.svg?react";
import { menuSx } from "app/pages/report-builder/builder/components/header";
import { useStoreActions } from "app/state/store/hooks";

export const ReportBuilderPageItemMenu: React.FC<{
  itemId: string;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
  deleteItem: (e: React.MouseEvent) => void;
}> = ({ itemId, anchorEl, handleClose, deleteItem }) => {
  const duplicateItem = useStoreActions(
    (actions) => actions.RBReportItemsState.duplicateItem,
  );

  const handleDuplicateItem = () => {
    duplicateItem(itemId);
    handleClose();
  };

  return (
    <Menu
      open={Boolean(anchorEl)}
      keepMounted
      disableScrollLock
      anchorEl={anchorEl}
      onClose={handleClose}
      transformOrigin={{
        vertical: -5,
        horizontal: "right",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      sx={menuSx}
    >
      <MenuItem onClick={handleDuplicateItem}>
        <CopyIcon />
        Duplicate
      </MenuItem>
      <MenuItem>
        <Folder />
        Save as an Asset
      </MenuItem>
      <MenuItem onClick={deleteItem}>
        <DeleteBackspace />
        Delete
      </MenuItem>
    </Menu>
  );
};
