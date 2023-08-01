import React from "react";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { DatasetDataTable } from "app/fragments/datasets-fragment/component/data-table";
import { buttonFlexcss } from "app/fragments/datasets-fragment/component/dataParserToolBox/style";

interface Props {
  data: any[];
  stats: any[];
  dataTotalCount: number;
  handleNext: () => void;
}

export interface ISnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

export const CssSnackbar = withStyles({
  root: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "bold",
      letterSpacing: "0.5px",
    },
  },
})(Snackbar);

export default function PreviewFragment(props: Props) {
  const [snackbarState, setSnackbarState] = React.useState<ISnackbarState>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  React.useEffect(() => {
    if (props.dataTotalCount > 0) {
      setSnackbarState({ ...snackbarState, open: true });
      setTimeout(() => {
        setSnackbarState({ ...snackbarState, open: false });
      }, 10000);
    }
  }, [props.dataTotalCount]);

  return (
    <div>
      <h1
        css={`
          color: #231d2c;
          font-weight: 500;
          font-family: "Inter", sans-serif;
          font-size: 48px;
          margin-top: 5.5rem;
        `}
      >
        Data Preview
      </h1>
      <Box height={27} />
      <div
        css={`
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: 100%;
        `}
      >
        <DatasetDataTable data={props.data} stats={props.stats} />
        <div css={buttonFlexcss}>
          <button type="button" onClick={props.handleNext}>
            Apply
          </button>
        </div>
      </div>

      <CssSnackbar
        anchorOrigin={{
          vertical: snackbarState.vertical,
          horizontal: snackbarState.horizontal,
        }}
        open={snackbarState.open}
        onClose={() => setSnackbarState({ ...snackbarState, open: false })}
        message={`${props.dataTotalCount} rows have been successfully parsed!`}
        key={snackbarState.vertical + snackbarState.horizontal}
      />
    </div>
  );
}
