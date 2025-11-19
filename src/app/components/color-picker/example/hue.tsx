import React, { memo } from "react";
import { useHue } from "../hooks/useHue";
import { IHueProps } from "../types";
import Box from "@mui/material/Box";

const Hue = ({ color, disabled, onChange, onChangeComplete }: IHueProps) => {
  const { ref, hsl, position, getInteractiveProps, interactiveRef } = useHue({
    color,
    disabled,
    onChange,
    onChangeComplete,
  });

  return (
    <Box
      ref={interactiveRef}
      {...getInteractiveProps()}
      className="rcp-interactive"
    >
      <Box
        ref={ref}
        className="rcp-hue-track"
        sx={{
          background: `linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)`,
        }}
      >
        <Box
          className="rcp-hue-cursor"
          sx={{
            position: "absolute",
            left: position.x,
            backgroundColor: `hsl(${hsl})`,
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(Hue);
