import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Table } from "app/components/table";
import Close from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useStoreActions } from "app/state/store/hooks";
import { DraggableModal } from "app/components/draggable-modal";
import { SelectDatasetStep } from "app/pages/report-builder/builder/components/chart/steps";
import { CustomiseTableStep } from "app/pages/report-builder/builder/components/table/steps";
import {
  TABLE_VARIATION_8_DATA,
  TABLE_VARIATION_8_COLUMNS,
} from "app/components/table/data";

export const ReportBuilderPageTable: React.FC<{
  id: string;
}> = ({ id }) => {
  const [step, setStep] = React.useState(1);
  const [clicked, setClicked] = React.useState(false);
  const [tableReady, setTableReady] = React.useState(false);

  const removeItem = useStoreActions(
    (actions) => actions.RBReportItemsState.removeItem,
  );

  const title = React.useMemo(() => {
    if (step === 1) {
      return "Select Dataset";
    }
    if (step === 2) {
      return "Customise Table";
    }
    return "Unknown Step";
  }, [step]);

  const content = React.useMemo(() => {
    if (step === 1) {
      return <SelectDatasetStep />;
    }
    if (step === 2) {
      return <CustomiseTableStep />;
    }
    return undefined;
  }, [step]);

  const actions = React.useMemo(() => {
    if (step === 1) {
      return (
        <React.Fragment>
          <Button variant="outlined" onClick={() => setClicked(false)}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={() => setStep(2)}>
            Continue
          </Button>
        </React.Fragment>
      );
    }
    if (step === 2) {
      return (
        <React.Fragment>
          <Button
            variant="outlined"
            onClick={() => setStep(1)}
            startIcon={<ArrowBack sx={{ transform: "scale(0.8)" }} />}
          >
            Go Back to Data
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setClicked(false);
              setTableReady(true);
            }}
            sx={{
              color: "#fff",
              fontWeight: "400",
              bgcolor: "#3154f4",
              "&:hover": {
                bgcolor: "#2548c4",
              },
            }}
          >
            Apply
          </Button>
        </React.Fragment>
      );
    }
    return undefined;
  }, [step]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        "&:hover": {
          ".top-right-actions": {
            display: "flex",
          },
        },
      }}
    >
      {!tableReady && (
        <Box
          sx={{
            gap: "10px",
            width: "100%",
            display: "flex",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
            alignItems: "center",
            bgcolor: "#d6ddfd",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px dashed #3154f4",
            transition: "all 0.3s ease-in-out",
            height: !clicked ? "130px" : "330px",
          }}
          onClick={() => setClicked(true)}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path
              d="M12 3.5V21.5M3 9.5H21M3 15.5H21M5 3.5H19C20.1046 3.5 21 4.39543 21 5.5V19.5C21 20.6046 20.1046 21.5 19 21.5H5C3.89543 21.5 3 20.6046 3 19.5V5.5C3 4.39543 3.89543 3.5 5 3.5Z"
              stroke="#3154F4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography fontSize="16px" color="#3154f4">
            Click to add a table
          </Typography>
        </Box>
      )}
      {tableReady && (
        <Box
          sx={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #3154f4",
          }}
        >
          <Table
            id={id}
            data={TABLE_VARIATION_8_DATA}
            columns={TABLE_VARIATION_8_COLUMNS}
          />
        </Box>
      )}
      <Box className="top-right-actions">
        <IconButton onClick={() => removeItem(id)}>
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <DraggableModal
        width={550}
        title={title}
        open={clicked}
        actions={actions}
        setOpen={setClicked}
      >
        {content}
      </DraggableModal>
    </Box>
  );
};
