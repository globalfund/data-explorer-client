import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { styles } from "app/modules/data-themes-module/components/add-section-button/styles";

export function DataThemesAddSectionButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <div css={styles.container}>
      {open && (
        <div css={styles.innercontainer}>
          <IconButton onClick={() => setOpen(false)}>
            <HighlightOffIcon
              fontSize="large"
              htmlColor="#373D43"
              css={`
                cursor: pointer;
              `}
            />
          </IconButton>
          <div css={styles.contenttypeicons}>
            <IconButton>
              <BarChartIcon htmlColor="#373D43" />
            </IconButton>
            <IconButton>
              <SearchIcon htmlColor="#373D43" />
            </IconButton>
            <IconButton>
              <DashboardIcon htmlColor="#373D43" />
            </IconButton>
          </div>
        </div>
      )}
      {!open && (
        <div css={styles.innercontainer}>
          <IconButton onClick={() => setOpen(true)}>
            <AddCircleOutlineIcon htmlColor="#373D43" fontSize="large" />
          </IconButton>
          Create your story
        </div>
      )}
    </div>
  );
}
