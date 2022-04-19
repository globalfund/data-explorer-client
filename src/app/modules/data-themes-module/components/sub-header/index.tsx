import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { DataThemesTabs } from "app/modules/data-themes-module/components/tabs";
import { styles } from "app/modules/data-themes-module/components/sub-header/styles";

export function DataThemesPageSubHeader() {
  return (
    <div css={styles.container}>
      <div css={styles.innercontainer}>
        <div css={styles.firstrow}>
          <div>
            <h2>
              New Theme <KeyboardArrowDownIcon htmlColor="#262c34" />
            </h2>
            <h5>Label</h5>
          </div>
          <div css={styles.iconbtns}>
            <IconButton>
              <ShareIcon htmlColor="#262c34" />
            </IconButton>
            <IconButton>
              <PlayCircleFilledIcon htmlColor="#262c34" />
            </IconButton>
            <IconButton>
              <SaveIcon htmlColor="#262c34" />
            </IconButton>
          </div>
        </div>
        <div css={styles.secondrow}>
          <DataThemesTabs />
        </div>
      </div>
    </div>
  );
}
