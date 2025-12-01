import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import React from "react";

interface Props {
  id: string;
}
export default function KPIBox({ id }: Readonly<Props>) {
  const items = useStoreState((state) => state.RBReportItemsState.items);
  const selectedItemController = useStoreState(
    (state) => state.RBReportItemsControllerState.item,
  );
  const setSelectedController = useStoreActions(
    (actions) => actions.RBReportItemsControllerState.setItem,
  );
  const selectedItem = items.find((i) => i.id === id);
  const isActive = selectedItemController?.id === id;
  const [clicked, setClicked] = React.useState(false);
  const border = `${selectedItem?.settings?.borderWidth || "0.5px"} solid ${
    selectedItem?.settings?.borderColor || "#000000"
  }`;
  const settings = selectedItem?.settings || {};
  return (
    <Box
      onClick={() => {
        setClicked(true);
        setSelectedController({
          id,
          type: "kpi_box",
          open: true,
        });
      }}
    >
      {!clicked && (
        <Box
          sx={{
            gap: "10px",
            width: "100%",
            height: "220px",
            display: "flex",
            cursor: "pointer",
            borderRadius: "4px",
            alignItems: "center",
            bgcolor: "#d6ddfd",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px dashed #3154f4",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.33317 28H22.6665M5.33317 4H26.6665C28.1393 4 29.3332 5.19391 29.3332 6.66667V20C29.3332 21.4728 28.1393 22.6667 26.6665 22.6667H5.33317C3.86041 22.6667 2.6665 21.4728 2.6665 20V6.66667C2.6665 5.19391 3.86041 4 5.33317 4Z"
              stroke="#3154F4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Typography fontSize="16px" color="#3154f4">
            Click to edit big number chart
          </Typography>
        </Box>
      )}
      {clicked && (
        <Box
          sx={{
            height: "141px",
            padding: "10px",
            border: isActive ? "0.5px solid #3154F4" : border,
            borderRadius: "4px",
            display: "flex",
            gap: "8px",
            ...settings,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                height: "25px",
                paddingBottom: "8px",
                borderBottom: "1px solid #98A1AA",
              }}
            >
              <Typography
                display={
                  selectedItem?.extra?.kpi_box?.field?.topLabel?.enabled
                    ? "block"
                    : "none"
                }
                fontSize={
                  selectedItem?.extra?.kpi_box?.field?.topLabel?.fontSize ??
                  "14px"
                }
                color={
                  selectedItem?.extra?.kpi_box?.field?.topLabel?.color ??
                  "#70777E"
                }
                bgcolor={
                  selectedItem?.extra?.kpi_box?.field?.topLabel?.bgColor ??
                  "transparent"
                }
                fontFamily={
                  selectedItem?.extra?.kpi_box?.field?.topLabel?.fontFamily ??
                  "Inter"
                }
                fontWeight={
                  selectedItem?.extra?.kpi_box?.field?.topLabel?.fontWeight ??
                  400
                }
              >
                {selectedItem?.extra?.kpi_box?.field?.topLabel?.value ??
                  "Top Label"}
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: "162px",
                display: "flex",
                gap: "15px",
                alignItems: "flex-end",
                borderBottom: "1px solid #98A1AA",
              }}
            >
              <Typography
                display={
                  selectedItem?.extra?.kpi_box?.field?.bigNumberText?.enabled
                    ? "block"
                    : "none"
                }
                fontSize={
                  selectedItem?.extra?.kpi_box?.field?.bigNumberText
                    ?.fontSize ?? "44px"
                }
                color={
                  selectedItem?.extra?.kpi_box?.field?.bigNumberText?.color ??
                  "#373D43"
                }
                fontWeight={
                  selectedItem?.extra?.kpi_box?.field?.bigNumberText
                    ?.fontWeight ?? 700
                }
                fontFamily={
                  selectedItem?.extra?.kpi_box?.field?.bigNumberText
                    ?.fontFamily ?? "Inter"
                }
                bgcolor={
                  selectedItem?.extra?.kpi_box?.field?.bigNumberText?.bgColor ??
                  "transparent"
                }
                height={"53px"}
                // py={"9px"}
                lineHeight={"normal"}
              >
                {selectedItem?.extra?.kpi_box?.field?.bigNumberText?.value ??
                  "BN"}
              </Typography>
              <Typography
                display={
                  selectedItem?.extra?.kpi_box?.field?.optionalText?.enabled
                    ? "block"
                    : "none"
                }
                fontSize={
                  selectedItem?.extra?.kpi_box?.field?.optionalText?.fontSize ??
                  "14px"
                }
                color={
                  selectedItem?.extra?.kpi_box?.field?.optionalText?.color ??
                  "#70777E"
                }
                fontWeight={
                  selectedItem?.extra?.kpi_box?.field?.optionalText
                    ?.fontWeight ?? 400
                }
                fontFamily={
                  selectedItem?.extra?.kpi_box?.field?.optionalText
                    ?.fontFamily ?? "Inter"
                }
                bgcolor={
                  selectedItem?.extra?.kpi_box?.field?.optionalText?.bgColor ??
                  "transparent"
                }
                height={"35px"}
                py={"9px"}
                lineHeight={"normal"}
              >
                {selectedItem?.extra?.kpi_box?.field?.optionalText?.value ??
                  "Optional Text"}
              </Typography>
            </Box>
            <Box sx={{ height: "27px" }}>
              <Typography
                display={
                  selectedItem?.extra?.kpi_box?.field?.bottomLabel?.enabled
                    ? "block"
                    : "none"
                }
                fontSize={
                  selectedItem?.extra?.kpi_box?.field?.bottomLabel?.fontSize ??
                  "14px"
                }
                color={
                  selectedItem?.extra?.kpi_box?.field?.bottomLabel?.color ??
                  "#70777E"
                }
                bgcolor={
                  selectedItem?.extra?.kpi_box?.field?.bottomLabel?.bgColor ??
                  "transparent"
                }
                fontWeight={
                  selectedItem?.extra?.kpi_box?.field?.bottomLabel
                    ?.fontWeight ?? 400
                }
                fontFamily={
                  selectedItem?.extra?.kpi_box?.field?.bottomLabel
                    ?.fontFamily ?? "Inter"
                }
              >
                {selectedItem?.extra?.kpi_box?.field?.bottomLabel?.value ??
                  "Bottom Label"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
