import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

export const ReportBuilderNewReportModal: React.FC<{
  open: boolean;
  nameValue: string;
  onClose: () => void;
  descriptionValue: string;
  setNameValue: (value: string) => void;
  setDescriptionValue: (value: string) => void;
}> = ({
  open,
  onClose,
  nameValue,
  setNameValue,
  descriptionValue,
  setDescriptionValue,
}) => {
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 100) {
      setNameValue(e.target.value);
    }
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 250) {
      setDescriptionValue(e.target.value);
    }
  };

  return (
    <Modal disableScrollLock open={open} onClose={onClose}>
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
            Create a New Report
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" marginBottom="5px" color="#525252">
              Report Name
            </Typography>
            <Typography variant="body2" marginBottom="5px" color="#525252">
              {nameValue.length}/100
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              marginBottom: "20px",
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
            <input
              type="text"
              value={nameValue}
              onChange={onNameChange}
              placeholder="Report name"
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" marginBottom="5px" color="#525252">
              Report Description
            </Typography>
            <Typography variant="body2" marginBottom="5px" color="#525252">
              {descriptionValue.length}/250
            </Typography>
          </Box>
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
            <input
              type="text"
              value={descriptionValue}
              onChange={onDescriptionChange}
              placeholder="Report description"
            />
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
            <Button
              component={Link}
              variant="contained"
              LinkComponent={Link}
              to={"/report-builder/new"}
              disabled={!nameValue || !descriptionValue}
              sx={{
                fontWeight: "400",
                color: "#ffffff",
                textTransform: "none",
                background: "#3154f4",
              }}
            >
              Create Report
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
