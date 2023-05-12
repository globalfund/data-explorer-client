import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

type Alignment = "data" | "charts" | "reports";

interface Props {
  alignment: Alignment;
  setAlignment: React.Dispatch<React.SetStateAction<Alignment>>;
}

export default function ToggleButtons(props: Props) {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Alignment
  ) => {
    if (newAlignment && newAlignment.length > 0) {
      props.setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={props.alignment}
      onChange={handleAlignment}
      css={`
        border: none;

        span {
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          text-transform: capitalize;
        }
      `}
    >
      <ToggleButton value="data" aria-label="data">
        Data
      </ToggleButton>
      <ToggleButton value="charts" aria-label="charts">
        Charts
      </ToggleButton>
      <ToggleButton value="reports" aria-label="reports">
        Reports
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
