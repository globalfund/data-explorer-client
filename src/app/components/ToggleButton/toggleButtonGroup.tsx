import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import React from "react";

interface Props {
  alignment: "left" | "center" | "right";
  setAlignment: React.Dispatch<
    React.SetStateAction<"left" | "center" | "right">
  >;
}
export default function ToggleButtons(props: Props) {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "left" | "center" | "right"
  ) => {
    props.setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={props.alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        <p>Datasets</p>
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <p>Charts</p>
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <p>Reports</p>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
