/* third-party */
import React from "react";
import MuiButton from "@material-ui/core/Button";
import { useStoreState } from "app/state/store/hooks";
import { withStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
/* project */
import { styles } from "app/modules/data-themes-module/components/toolbox/styles";

const Button = withStyles(() => ({
  root: {
    width: "100%",
    height: "48px",
    borderRadius: "0px",
    backgroundColor: "#262C34",
    fontFamily: "GothamNarrow-Bold, sans-serif",
    "&:first-child": {
      borderRight: "1px solid #f1f3f5",
    },
    "&:hover": {
      backgroundColor: "#495057",
    },
  },
  label: {
    color: "#fff",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "GothamNarrow-Bold, sans-serif",
  },
  disabled: {
    backgroundColor: "#ADB5BD",
  },
}))(MuiButton);

export function DataThemesToolBoxText() {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  return (
    <div>
      <section
        css={`
          display: flex;
          justify-content: center;
        `}
      >
        <div css={styles.textcontent}>
          {/* No options available in the control panel now. Options will automatically appear, don't worry. */}
          Use our rich text editor to write your story! Select part of the text
          to make use of the toolbar.
        </div>
      </section>
      <div
        css={`
          bottom: 0;
          width: 100%;
          display: flex;
          position: absolute;
          flex-direction: row;
        `}
      >
        <Button
          onClick={() => history.push(`/data-themes/${page}/preview`)}
          disabled={
            // if text content is empty, disabled. Otherwise enabled
            false
          }
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
