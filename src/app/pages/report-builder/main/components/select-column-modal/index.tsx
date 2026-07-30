import React from "react";
import { styled, TooltipProps } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useCMSData } from "app/hooks/useCMSData";
import { getCMSDataField } from "app/utils/getCMSDataField";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import SelectField from "app/pages/report-builder/builder/components/panel/elements-controller/components/selectfield";

export const ReportBuilderSelectColumnModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSelect: (columns: number) => void;
}> = ({ open, onClose, onSelect }) => {
  const [columns, setColumns] = React.useState(2);
  const cmsData = useCMSData({ returnData: true });

  const handleColumnsChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue >= 1 && parsedValue <= 10) {
      setColumns(parsedValue);
    }
  };

  const DarkTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip describeChild {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: "343px",
    },
  }));

  return (
    <Modal disableScrollLock open={open} onClose={onClose}>
      <Box
        sx={{
          top: "50%",
          left: "50%",
          width: "500px",
          position: "absolute",
          background: "#ffffff",
          transform: "translate(-50%, -50%)",
          "@media (max-width: 600px)": {
            width: "90%",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: "10px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #cfd4da",
          }}
        >
          <Typography variant="h6" fontSize="16px">
            {getCMSDataField(
              cmsData,
              "componentsRBSelectColumnModal.selectColumnStructureTitle",
              "Select Column Structure",
            )}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              marginBottom: "20px",
              display: "flex",
              gap: "24px",
            }}
          >
            <SelectField
              label={getCMSDataField(
                cmsData,
                "componentsRBSelectColumnModal.numberOfColumnsLabel",
                "Number of Columns",
              )}
              value={String(columns)}
              onChange={handleColumnsChange}
              options={Array.from({ length: 10 }, (_, i) => ({
                label: String(i + 1),
                value: String(i + 1),
              }))}
              width={"100%"}
            />
          </Box>
          <Box
            sx={{
              gap: "10px",
              width: "100%",
              display: "flex",
              marginTop: "20px",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" onClick={onClose}>
              {getCMSDataField(
                cmsData,
                "componentsRBSelectColumnModal.cancelButton",
                "Cancel",
              )}
            </Button>
            <DarkTooltip
              placement="bottom-end"
              title={
                <Box>
                  <Typography fontSize="14px" fontWeight="700" color="#ffffff">
                    Column structure selection required.
                  </Typography>
                  <Typography fontSize="14px" fontWeight="400" color="#ffffff">
                    Please select a column structure to continue.
                  </Typography>
                </Box>
              }
              arrow
            >
              <Button
                variant="contained"
                sx={{
                  fontWeight: "400",
                  color: "#ffffff",
                  textTransform: "none",
                  background: "#3154f4",
                }}
                onClick={() => {
                  onSelect(columns);
                  onClose();
                }}
              >
                {getCMSDataField(
                  cmsData,
                  "componentsRBSelectColumnModal.applyButton",
                  "Apply",
                )}
              </Button>
            </DarkTooltip>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
