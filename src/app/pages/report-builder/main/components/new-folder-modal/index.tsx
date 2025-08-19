import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export const ReportBuilderNewFolderModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          top: "50%",
          left: "50%",
          width: "500px",
          position: "absolute",
          background: "#ffffff",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: "10px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #cfd4da",
          }}
        >
          <Typography variant="h6" fontSize="16px">
            Create Folder
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Typography variant="body2" marginBottom="5px" color="#525252">
            Folder Name
          </Typography>
          <Box
            sx={{
              width: "100%",
              input: {
                width: "100%",
                padding: "11px 16px",
                background: "#f1f3f5",
                border: "2px solid #f1f3f5",
                borderBottomColor: "#868e96",
                "&:focus, &:active": {
                  borderColor: "#3154f4",
                },
              },
            }}
          >
            <input type="text" placeholder="Folder name" />
          </Box>
          <Box
            sx={{
              gap: "10px",
              width: "100%",
              display: "flex",
              marginTop: "20px",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outlined">Create Folder</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
