import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FullscreenIcon from "app/assets/vectors/TableToolbarFullscreen.svg?react";

export const CustomiseTableStep: React.FC = () => {
  const [tableName, setTableName] = React.useState("");
  const [showTableName, setShowTableName] = React.useState(false);

  return (
    <Box
      sx={{
        gap: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ".MuiFormControlLabel-root": { ml: 0 },
      }}
    >
      <Button
        variant="text"
        startIcon={<FullscreenIcon />}
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          width: "fit-content",
          textTransform: "none",
        }}
      >
        See the Datasources
      </Button>
      <FormControlLabel
        sx={{ mt: "-8px" }}
        label="Show Table Name"
        control={
          <Checkbox
            checked={showTableName}
            onChange={(e) => setShowTableName(e.target.checked)}
          />
        }
      />
      <InputLabel>Table Name</InputLabel>
      <Input
        disabled={!showTableName}
        placeholder="Table Name here"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        sx={{
          input: { padding: "8px 8px 8px 16px", bgcolor: "#f5f5f5" },
        }}
      />
      <Divider />
      <InputLabel>Select Columns to display</InputLabel>
      <FormGroup>
        {Array.from({ length: 6 }).map((_, i) => (
          <FormControlLabel
            key={i}
            control={<Checkbox />}
            label={`Column ${i + 1}`}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
