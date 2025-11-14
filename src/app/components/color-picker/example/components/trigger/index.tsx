import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

interface ITrigger {
  color: string;
  onChange: (color: string) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}
export default function Trigger(props: Readonly<ITrigger>) {
  return (
    <Box
      sx={{
        width: "134px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderRadius: "4px",
        border: "0.5px solid #98A1AA",
        padding: "5px",
      }}
    >
      <Button
        onClick={props.onClick}
        sx={{
          height: "30px",
          width: "30px",
          minWidth: "30px",
          border: "0.75px solid #252C34",
          backgroundColor: props.color,
          borderRadius: "4px",
          padding: "0px",
        }}
      />
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontSize: "14px", color: "#70777E" }}>#</Typography>
        <TextField
          variant="standard"
          onChange={(e) => props.onChange(e.target.value)}
          value={props.color.replace("#", "")}
          sx={{
            borderColor: " #98A1AA",
            width: "51px",
            height: "16px",
            color: "#70777E",
          }}
        />
      </Box>
    </Box>
  );
}
