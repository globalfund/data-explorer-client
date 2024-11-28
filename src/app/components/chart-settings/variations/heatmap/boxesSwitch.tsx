import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as BoxesIcon } from "app/assets/vectors/HeatmapBoxes.svg";
import React from "react";
import { switchButtonStyle } from "../../data";

type BoxType = "percentage" | "numerical";
export default function HeatmapBoxesSwitch(props: {
  boxType: "percentage" | "numerical";
  setBoxType: React.Dispatch<React.SetStateAction<BoxType>>;
}) {
  const onButtonClick = () => {
    props.setBoxType((prev: BoxType) => {
      return prev === "percentage" ? "numerical" : "percentage";
    });
  };
  const paddingWidth = "1px";
  return (
    <Box gap="5px">
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"5px"}
        marginBottom={"10px"}
      >
        <BoxesIcon />
        <Typography fontSize="12px" fontWeight="700">
          Boxes
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          width: "164px",
          height: "24px",
          justifyContent: "center",
          background: "#F1F3F5",
          border: `1px solid #DFE3E5`,
          borderRadius: "4px",
          ">div:nth-child(1), >div:nth-child(2) ": {
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            whiteSpace: "nowrap",
            cursor: "pointer",
            borderRadius: "4px",
            width: "82px",
            color: "#868E96",
          },
        }}
      >
        <Box onClick={() => onButtonClick()}>Percentage</Box>
        <Box onClick={() => onButtonClick()}>Numerical</Box>
        <Box
          sx={switchButtonStyle(paddingWidth, props.boxType === "percentage")}
        >
          {props.boxType === "percentage" ? "Numerical" : "Percentage"}
        </Box>
      </Box>
    </Box>
  );
}
