import React from "react";
import Box from "@mui/material/Box";
import { Popper } from "@mui/material";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import DialogContent from "@mui/material/DialogContent";
import Draggable, { ControlPosition } from "react-draggable";
import DragIndicator from "@mui/icons-material/DragIndicator";

const PaperComponent = React.forwardRef<HTMLDivElement, PaperProps>(
  (props, ref) => {
    const { id, ...restProps } = props;
    const nodeRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => nodeRef.current as HTMLDivElement, []);

    const [position, setPosition] = React.useState<ControlPosition | undefined>(
      undefined,
    );

    const handleDrag = (_: any, data: { x: number; y: number }) => {
      setPosition({ x: data.x, y: data.y });
    };

    React.useEffect(() => {
      setTimeout(() => {
        const popper = document.getElementById(`draggable-popper-paper-${id}`);
        if (popper) {
          const rect = popper.getBoundingClientRect();
          setPosition({ x: rect.left, y: rect.top });
        }
      }, 100);
    }, []);

    return (
      <Draggable
        nodeRef={nodeRef}
        handle={`#${id}`}
        position={position}
        onDrag={handleDrag}
      >
        <Paper
          {...restProps}
          id={`draggable-popper-paper-${id}`}
          ref={nodeRef}
          sx={{
            ...restProps.sx,
            transform: `translate(${position?.x || 0}px, ${position?.y || 0}px)${position ? " !important" : ""}`,
          }}
        />
      </Draggable>
    );
  },
);

PaperComponent.displayName = "PaperComponent";

export const DraggablePopper: React.FC<{
  id: string;
  width: number;
  open: boolean;
  title: string;
  resizable?: boolean;
  children: React.ReactNode;
  anchorEl: null | HTMLElement;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, anchorEl, width, open, setOpen, title, children, resizable }) => {
  return (
    <Popper
      id="draggable-popper"
      open={open}
      anchorEl={anchorEl}
      sx={{ zIndex: 1400 }}
      placement="bottom-start"
      slots={{ root: PaperComponent }}
      slotProps={{
        root: {
          id,
          style: {
            width,
            padding: 0,
            minWidth: "200px",
            maxWidth: "800px",
            minHeight: "200px",
            maxHeight: "800px",
            borderRadius: "8px",
            position: "absolute",
            resize: resizable ? "both" : "none",
            overflow: resizable ? "auto" : "hidden",
            boxShadow: "0 0 10px 0 rgba(152, 161, 170, 0.60)",
          },
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
            id={id}
            fontSize="medium"
            htmlColor="#373d43"
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
    </Popper>
  );
};
