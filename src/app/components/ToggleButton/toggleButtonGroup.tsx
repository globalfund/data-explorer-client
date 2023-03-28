import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import React from "react";

interface Props {
  alignment: "data" | "charts" | "reports" | "";
  setAlignment: React.Dispatch<
    React.SetStateAction<"data" | "charts" | "reports" | "">
  >;
}
export default function ToggleButtons(props: Props) {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "data" | "charts" | "reports" | ""
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
      <ToggleButton value="data" aria-label="left aligned">
        <p>Datasets</p>
      </ToggleButton>
      <ToggleButton value="charts" aria-label="centered">
        <p>Charts</p>
      </ToggleButton>
      <ToggleButton value="reports" aria-label="right aligned">
        <p>Reports</p>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
