import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Draggable from "react-draggable";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import DialogContent from "@mui/material/DialogContent";
import DragIndicator from "@mui/icons-material/DragIndicator";

const PaperComponent = React.forwardRef<HTMLDivElement, PaperProps>(
  (props, ref) => {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => nodeRef.current as HTMLDivElement, []);

    return (
      <Draggable handle="#draggable-menu-title" nodeRef={nodeRef}>
        <Paper {...props} ref={nodeRef} />
      </Draggable>
    );
  },
);

PaperComponent.displayName = "PaperComponent";

export const DraggableMenu: React.FC<{
  width: number;
  open: boolean;
  title: string;
  children: React.ReactNode;
  anchorEl: null | HTMLElement;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ anchorEl, width, open, setOpen, title, children }) => {
  return (
    <Menu
      open={open}
      disableScrollLock
      anchorEl={anchorEl}
      onClose={() => setOpen(false)}
      transformOrigin={{
        vertical: -5,
        horizontal: "left",
      }}
      slots={{ paper: PaperComponent }}
      slotProps={{
        paper: {
          sx: {
            width,
            padding: 0,
            maxWidth: "600px",
            minHeight: "300px",
            borderRadius: "8px",
            position: "absolute",
            boxShadow: "0 0 10px 0 rgba(152, 161, 170, 0.60)",
          },
        },
      }}
      sx={{
        zIndex: 1400,
        "& .MuiMenu-list": {
          padding: 0,
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
            id="draggable-menu-title"
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
    </Menu>
  );
};
