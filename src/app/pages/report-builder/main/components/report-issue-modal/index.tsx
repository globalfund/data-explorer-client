import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "app/assets/vectors/ReportIssueClose.svg?react";
import WarningIcon from "app/assets/vectors/ReportIssueWarning.svg?react";
import TextareaResizeIcon from "app/assets/vectors/ReportIssueTextareaResize.svg?react";
import {
  reportIssueActivityOptions,
  ReportBuilderReportIssueModalProps,
} from "app/pages/report-builder/main/components/report-issue-modal/data";
import { format } from "date-fns";
import { useSendErrorReport } from "app/hooks/queries/report-builder";

export const ReportBuilderReportIssueModal: React.FC<
  ReportBuilderReportIssueModalProps
> = ({
  open,
  onClose,
  onSubmitted,
  reportId,
  reportName,
  error,
  activityOptions = reportIssueActivityOptions,
  maxDetailsLength = 250,
}) => {
  const [selectedActivity, setSelectedActivity] = React.useState<string | null>(
    null,
  );
  const [details, setDetails] = React.useState("");

  const handleActivityClick = (activity: string) => {
    setSelectedActivity((currentActivity) =>
      currentActivity === activity ? null : activity,
    );
  };

  const sendErrorReport = useSendErrorReport();

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxDetailsLength) {
      setDetails(e.target.value);
    }
  };

  const handleSubmit = () => {
    const payload = {
      action: selectedActivity,
      details,
      reportId,
      reportName,
      errorMessage: error?.message || null,
    };
    sendErrorReport.mutate(payload);
    onSubmitted?.();
  };

  React.useEffect(() => {
    if (!open) {
      setSelectedActivity(null);
      setDetails("");
    }
  }, [open]);

  return (
    <Modal
      disableScrollLock
      open={open}
      onClose={onClose}
      aria-labelledby="report-builder-report-issue-modal-title"
      aria-describedby="report-builder-report-issue-modal-description"
    >
      <Box
        sx={{
          top: "50%",
          left: "50%",
          width: "520px",
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 32px)",
          position: "absolute",
          overflow: "auto",
          outline: "none",
          bgcolor: "#ffffff",
          border: "0.5px solid #98a1aa",
          borderRadius: "4px",
          boxShadow: "0px 0px 5px rgba(152, 161, 170, 0.6)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            gap: "10px",
            width: "100%",
            display: "flex",
            padding: "10px",
            alignItems: "center",
            borderBottom: "0.5px solid #cfd4da",
          }}
        >
          <Box sx={{ flexShrink: 0, width: "37px", height: "37px" }}>
            <WarningIcon />
          </Box>
          <Box
            sx={{
              gap: "4px",
              flex: "1 1 0",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                gap: "12px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                id="report-builder-report-issue-modal-title"
                component="h2"
                fontSize="16px"
                fontWeight={700}
                lineHeight="normal"
                color="#000000"
              >
                Report a save issue
              </Typography>
              <IconButton
                aria-label="Close"
                onClick={onClose}
                sx={{
                  width: "24px",
                  height: "24px",
                  padding: "4px",
                  mr: "-4px",
                  "--stroke-0": "#373d43",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography
              id="report-builder-report-issue-modal-description"
              fontSize="14px"
              lineHeight="normal"
              color="#000000"
            >
              Your progress may not have been saved
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            gap: "29px",
            width: "100%",
            display: "flex",
            padding: "19px 16px 16px",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              padding: "12px 16px",
              borderRadius: "5px",
              bgcolor: "#fff6d8",
            }}
          >
            <Typography fontSize="14px" lineHeight="normal" color="#684e00">
              <Box component="span" fontWeight={700}>
                Error captured automatically:{" "}
              </Box>
              {`Failed to save "${reportName}" at ${format(new Date(), "HH:mm")} · ${error} · Report ID: ${reportId}`}
            </Typography>
          </Box>
          <Box>
            <Typography
              fontSize="14px"
              lineHeight="normal"
              color="#000000"
              marginBottom="16px"
            >
              What were you doing when this happened? (optional)
            </Typography>
            <Box
              sx={{
                gap: "12px",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {activityOptions.map((activity) => {
                const selected = activity === selectedActivity;
                return (
                  <Box
                    key={activity}
                    component="button"
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleActivityClick(activity)}
                    sx={{
                      height: "35px",
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "8px 10px",
                      borderRadius: "4px",
                      bgcolor: selected ? "#f5f7ff" : "#ffffff",
                      border: `0.5px solid ${selected ? "#3154f4" : "#98a1aa"}`,
                      color: "#161616",
                      cursor: "pointer",
                      font: "inherit",
                      fontSize: "14px",
                      lineHeight: "normal",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        borderColor: "#3154f4",
                      },
                      "&:focus-visible": {
                        outline: "2px solid #3154f4",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    {activity}
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontSize="14px"
                lineHeight="normal"
                color="#373d43"
                marginBottom="8px"
              >
                Anything else to add? (optional)
              </Typography>
              <Typography fontSize="12px" lineHeight="normal" color="#525252">
                {details.length}/{maxDetailsLength}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "relative",
                textarea: {
                  width: "100%",
                  height: "160px",
                  display: "block",
                  resize: "none",
                  padding: "16px",
                  fontSize: "14px",
                  lineHeight: "normal",
                  borderRadius: "4px",
                  color: "#161616",
                  bgcolor: "#ffffff",
                  border: "0.5px solid #98a1aa",
                  fontFamily: "inherit",
                  "&::placeholder": {
                    color: "#98a1aa",
                    opacity: 1,
                  },
                  "&:focus, &:active": {
                    outline: "none",
                    borderColor: "#3154f4",
                  },
                },
              }}
            >
              <textarea
                value={details}
                onChange={handleDetailsChange}
                placeholder={"e.g. Happened right after I added a chart..."}
              />
              <Box
                aria-hidden
                sx={{
                  right: "3px",
                  bottom: "3px",
                  width: "8px",
                  height: "8px",
                  position: "absolute",
                  pointerEvents: "none",
                  "--stroke-0": "#373d43",
                }}
              >
                <TextareaResizeIcon />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              gap: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                height: "35px",
                color: "#000000",
                fontSize: "14px",
                fontWeight: 400,
                padding: "9px 12px",
                borderRadius: "4px",
                textTransform: "none",
                bgcolor: "#ffffff",
                border: "0.5px solid #dfe3e5",
                "&:hover": {
                  bgcolor: "#f8f9fa",
                  border: "0.5px solid #98a1aa",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                height: "35px",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 400,
                padding: "9px 12px",
                borderRadius: "4px",
                boxShadow: "none",
                textTransform: "none",
                bgcolor: "#3154f4",
                "&:hover": {
                  bgcolor: "#2545d8",
                  boxShadow: "none",
                },
              }}
            >
              {sendErrorReport.isPending ? "Reporting..." : "Send Report"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
