import { Box, Snackbar, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import DataParserToolBox from "../component/dataParserToolBox";
import { useChartsRawData } from "app/hooks/useChartsRawData";
import { DatasetDataTable } from "../component/data-table";

interface Props {
  handleNext: () => void;
  datasetId: string;
}

interface ISnackbarState {
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
  const [openToolboxPanel, setOpenToolboxPanel] = useState(true);
  const onCloseBtnClick = () => {
    setOpenToolboxPanel(!openToolboxPanel);
  };

  const { loadDataset, sampleData } = useChartsRawData({
    visualOptions: () => {},
    setVisualOptions: () => {},
    setChartFromAPI: () => {},
    chartFromAPI: null,
  });

  React.useEffect(() => {
    loadDataset(`data-themes/sample-data/${props.datasetId}`);
  }, [props.datasetId]);

  const [snackbarState, setSnackbarState] = React.useState<ISnackbarState>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  React.useEffect(() => {
    setSnackbarState({ ...snackbarState, open: true });
    setTimeout(() => {
      setSnackbarState({ ...snackbarState, open: false });
    }, 5000);
  }, []);

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
        <DatasetDataTable data={sampleData} />
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
        message={`${sampleData.length} rows have been successfully parsed!`}
        key={snackbarState.vertical + snackbarState.horizontal}
      />
    </div>
  );
}
