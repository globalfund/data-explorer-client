import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

interface Props {
  alignment: "data" | "charts" | "report";
  setAlignment: React.Dispatch<
    React.SetStateAction<"data" | "charts" | "report">
  >;
}
export default function ToggleButtons(props: Props) {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "data" | "charts" | "report"
  ) => {
    props.setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={props.alignment}
      onChange={handleAlignment}
      css={`
        button {
          font-weight: 500;
          text-transform: none;
        }
      `}
    >
      <ToggleButton value="data">Data</ToggleButton>
      <ToggleButton value="charts">Charts</ToggleButton>
      <ToggleButton value="report">Reports</ToggleButton>
    </ToggleButtonGroup>
  );
}
