import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RBEmptyFileIcon from "app/assets/vectors/RBEmptyFile.svg?react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

export const EmptyPreview: React.FC<{
  id: string;
}> = ({ id }) => {
  const navigate = useNavigate();
  const handleBackToEditClick = () => {
    navigate(`/report-builder/reports/${id}/edit`);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        paddingTop: "87.5px",
        textAlign: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "42px",
      }}
    >
      <RBEmptyFileIcon />
      <Box>
        <Typography fontSize="24px" color="#495057">
          Nothing to preview yet
        </Typography>
        <Typography
          fontSize="16px"
          color="#495057"
          lineHeight="100%"
          marginTop={"20px"}
        >
          Add components to your report
          <br />
          then preview the final result.
        </Typography>
      </Box>
      <Button
        onClick={handleBackToEditClick}
        startIcon={<ArrowBack />}
        sx={{
          color: "#fff !important",
          bgcolor: "#3154f4 !important",
          padding: "9.5px 12px !important",
          svg: { path: { fill: "#fff !important" } },
          textTransform: "none !important",
          fontWeight: "400 !important",
        }}
      >
        Back to Edit
      </Button>
    </Box>
  );
};
