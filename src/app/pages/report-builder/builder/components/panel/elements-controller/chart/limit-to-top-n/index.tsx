import React from "react";
import { ChartType } from "app/state/api/action-reducers/report-builder/sync";
import Checkfield from "../../components/checkfield";
import { useStoreState } from "app/state/store/hooks";
import useGetReportItemState from "app/pages/report-builder/hooks/useGetReportItemState";
import { Typography } from "@mui/material";
import TextField from "../../components/textfield";
import SelectField from "../../components/selectfield";
import { Box } from "@mui/system";
import ControlAccordion from "../../components/accordion";

const LimitToTopN = () => {
  const supportedLimitToTopCharts: ChartType[] = [
    "bar",
    "heatmap",
    "pie",
    "scatter",
    "treemap",
  ];

  const selectedController = useStoreState(
    (state) => state.RBReportItemsControllerState.item,
  );

  const { selectedItem, editItem } = useGetReportItemState<"chart">({
    id: selectedController?.id || "",
    parent: selectedController?.parent ?? undefined,
  });

  const updateOptions = (options: any) => {
    if (!selectedItem) return;
    editItem({
      ...selectedItem,
      id: selectedController?.id || "",
      type: "chart",
      open: selectedItem.open || false,
      options: {
        ...selectedItem?.options,
        ...options,
      },
    });
  };
  return (
    <>
      {supportedLimitToTopCharts.includes(
        selectedItem?.data?.chartType as ChartType,
      ) ? (
        <ControlAccordion title="Limit the Top N">
          <Box
            sx={{
              gap: "8px",
              p: "8px",
              display: "flex",
              flexDirection: "column",
              ".MuiButton-root": {
                minHeight: "35px",
                py: "7px",
              },
              width: "100%",
            }}
          >
            {selectedItem?.data?.chartType === "heatmap" ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                <Box>
                  <Checkfield
                    checked={selectedItem?.options?.limitRowsToTop}
                    onChange={(event) =>
                      updateOptions({
                        limitRowsToTop: event.target.checked,
                        limitRowsToTopValue:
                          selectedItem?.options?.limitRowsToTopValue || 6,
                      })
                    }
                    label="Rows to"
                  />
                  <TextField
                    value={selectedItem?.options?.limitRowsToTopValue}
                    type="number"
                    disabled={!selectedItem?.options?.limitRowsToTop}
                    onChange={(value) =>
                      updateOptions({ limitRowsToTopValue: value })
                    }
                    sx={{
                      height: "35px",
                      px: "5px",
                      opacity: selectedItem?.options?.limitRowsToTop ? 1 : 0.6,
                      input: {
                        p: 0,
                        fontSize: "14px",
                      },
                      marginTop: "5px",
                    }}
                  />
                </Box>
                <SelectField
                  label="Rank By"
                  options={[
                    {
                      label: "Sum",
                      value: "sum",
                    },
                    {
                      label: "Average",
                      value: "average",
                    },
                  ]}
                  value={selectedItem?.options?.rankRowsBy || "sum"}
                  onChange={(value) => updateOptions({ rankRowsBy: value })}
                  disabled={!selectedItem?.options?.limitRowsToTop}
                />
                <Box>
                  <Checkfield
                    checked={selectedItem?.options?.limitColumnsToTop}
                    onChange={(event) =>
                      updateOptions({
                        limitColumnsToTop: event.target.checked,
                        limitColumnsToTopValue:
                          selectedItem?.options?.limitColumnsToTopValue || 6,
                      })
                    }
                    label="Columns to"
                  />
                  <TextField
                    value={selectedItem?.options?.limitColumnsToTopValue}
                    type="number"
                    disabled={!selectedItem?.options?.limitColumnsToTop}
                    onChange={(value) =>
                      updateOptions({ limitColumnsToTopValue: value })
                    }
                    sx={{
                      height: "35px",
                      px: "5px",
                      opacity: selectedItem?.options?.limitColumnsToTop
                        ? 1
                        : 0.6,
                      input: {
                        p: 0,
                        fontSize: "14px",
                      },
                      marginTop: "5px",
                    }}
                  />
                </Box>
                <SelectField
                  label="Rank By"
                  options={[
                    {
                      label: "Sum",
                      value: "sum",
                    },
                    {
                      label: "Average",
                      value: "average",
                    },
                  ]}
                  value={selectedItem?.options?.rankColumnsBy || "sum"}
                  onChange={(value) => updateOptions({ rankColumnsBy: value })}
                  disabled={!selectedItem?.options?.limitColumnsToTop}
                />
              </Box>
            ) : (
              <Checkfield
                checked={selectedItem?.options?.limitToTop}
                onChange={(event) =>
                  updateOptions({
                    limitToTop: event.target.checked,
                    limitToTopValue:
                      selectedItem?.options?.limitToTopValue || 6,
                  })
                }
                label={
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Typography fontSize="14px" color="#000">
                      {selectedItem?.data?.chartType === "scatter"
                        ? "Label only top"
                        : "Limit to Top"}
                    </Typography>
                    <TextField
                      value={selectedItem?.options?.limitToTopValue}
                      type="number"
                      disabled={!selectedItem?.options?.limitToTop}
                      onChange={(value) =>
                        updateOptions({ limitToTopValue: value })
                      }
                      width="45px"
                      sx={{
                        height: "35px",
                        px: "5px",
                        opacity: selectedItem?.options?.limitToTop ? 1 : 0.6,
                        input: {
                          p: 0,
                          fontSize: "14px",
                        },
                      }}
                    />
                    {selectedItem?.data?.chartType === "scatter" ? (
                      <Typography fontSize="14px" color="#000">
                        points
                      </Typography>
                    ) : null}
                  </Box>
                }
              />
            )}

            {selectedItem?.data?.chartType === "scatter" ? null : (
              <Checkfield
                checked={selectedItem?.options?.groupRemainderAsOther}
                disabled={
                  selectedItem?.data?.chartType === "heatmap"
                    ? !selectedItem?.options?.limitRowsToTop &&
                      !selectedItem?.options?.limitColumnsToTop
                    : !selectedItem?.options?.limitToTop
                }
                onChange={(event) =>
                  updateOptions({ groupRemainderAsOther: event.target.checked })
                }
                label="Group remainder as 'Other'"
              />
            )}

            {selectedItem?.data?.chartType === "bar" ? (
              <SelectField
                label='"Other" bar position'
                options={[
                  {
                    label: "First",
                    value: "first",
                  },
                  {
                    label: "Last",
                    value: "last",
                  },
                ]}
                value={selectedItem?.options?.otherBarPosition || "last"}
                onChange={(value) => updateOptions({ otherBarPosition: value })}
                disabled={!selectedItem?.options?.groupRemainderAsOther}
              />
            ) : null}
            {selectedItem?.data?.chartType === "pie" ? (
              <SelectField
                label='"Other" slice position'
                options={[
                  {
                    label: "First (before biggest)",
                    value: "first",
                  },
                  {
                    label: "Last (after smallest)",
                    value: "last",
                  },
                ]}
                value={selectedItem?.options?.otherSlicePosition || "last"}
                onChange={(value) =>
                  updateOptions({ otherSlicePosition: value })
                }
                disabled={!selectedItem?.options?.groupRemainderAsOther}
              />
            ) : null}
          </Box>
        </ControlAccordion>
      ) : null}
    </>
  );
};

export default LimitToTopN;
