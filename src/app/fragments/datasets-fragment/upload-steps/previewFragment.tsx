import React from "react";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import DataParserToolBox from "../component/dataParserToolBox";
import { DatasetDataTable } from "app/fragments/datasets-fragment/component/data-table";

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
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(true);
  const [snackbarState, setSnackbarState] = React.useState<ISnackbarState>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const onCloseBtnClick = () => {
    setOpenToolboxPanel(!openToolboxPanel);
  };

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
          font-size: 48px;
          margin-top: 5.5rem;
        `}
      >
        Preview
      </h1>
      <Box height={27} />
      <div
        css={`
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${openToolboxPanel ? `calc(100% - 217px)` : "100%"};
        `}
      >
        <DatasetDataTable data={props.data} stats={props.stats} />
      </div>
      <DataParserToolBox
        onCloseBtnClick={onCloseBtnClick}
        open={openToolboxPanel}
        handleNext={props.handleNext}
      />
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
