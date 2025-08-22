import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { BarChart } from "app/components/charts/bar";
import { DraggableModal } from "app/components/draggable-modal";
import { STORY_DATA_VARIANT_1 } from "app/components/charts/bar/data";
import {
  SelectDatasetStep,
  CustomiseChartStep,
} from "app/pages/report-builder/builder/components/chart/steps";

export const ReportBuilderPageChart: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [clicked, setClicked] = React.useState(false);
  const [chartReady, setChartReady] = React.useState(false);

  const title = React.useMemo(() => {
    if (step === 1) {
      return "Select Dataset";
    }
    if (step === 2) {
      return "Customise Chart";
    }
    return "Unknown Step";
  }, [step]);

  const content = React.useMemo(() => {
    if (step === 1) {
      return <SelectDatasetStep />;
    }
    if (step === 2) {
      return <CustomiseChartStep />;
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
              setChartReady(true);
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
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!chartReady && (
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
              strokeWidth="2"
              stroke="#3154f4"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 17.5V9.5M18 17.5V5.5M3 3.5V19.5C3 20.0304 3.21071 20.5391 3.58579 20.9142C3.96086 21.2893 4.46957 21.5 5 21.5H21M8 17.5V14.5"
            />
          </svg>
          <Typography fontSize="16px" color="#3154f4">
            Click to add a chart
          </Typography>
        </Box>
      )}
      {chartReady && (
        <Box
          sx={{
            borderRadius: "4px",
            border: "1px solid #3154f4",
          }}
        >
          <BarChart data={STORY_DATA_VARIANT_1} valueLabels={{ value: "" }} />
        </Box>
      )}
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
