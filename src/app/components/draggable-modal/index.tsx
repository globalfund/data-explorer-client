import React from "react";
import Box from "@mui/material/Box";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DragIndicator from "@mui/icons-material/DragIndicator";

const PaperComponent = (props: DialogProps["PaperProps"]) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <Draggable handle="#draggable-dialog-title" nodeRef={nodeRef}>
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
};

export const DraggableModal: React.FC<{
  width: number;
  open: boolean;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ width, open, setOpen, title, children, actions }) => {
  return (
    <Dialog
      open={open}
      hideBackdrop
      disableScrollLock
      disableEscapeKeyDown
      PaperComponent={PaperComponent}
      PaperProps={{
        sx: {
          width,
          padding: 0,
          maxWidth: "600px",
          minHeight: "300px",
          borderRadius: "8px",
          boxShadow: "0 0 10px 0 rgba(152, 161, 170, 0.60)",
        },
      }}
    >
      <DialogTitle
        sx={{
          width: "100%",
          display: "flex",
          padding: "10px",
          fontSize: "16px",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #cfd4da",
        }}
      >
        {title}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DragIndicator
            fontSize="medium"
            htmlColor="#373d43"
            id="draggable-dialog-title"
            sx={{ cursor: "move", transform: "rotate(90deg)" }}
          />
          <IconButton onClick={() => setOpen(false)} sx={{ padding: 0 }}>
            <Close fontSize="medium" htmlColor="#373d43" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: "10px !important" }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions
          sx={{
            padding: "0 10px 10px 10px",
            justifyContent: "space-between",
            button: {
              padding: "4px 12px",
              textTransform: "none",
            },
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};
