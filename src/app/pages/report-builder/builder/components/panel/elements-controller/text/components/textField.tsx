import Box from "@mui/material/Box";
import Input from "@mui/material/TextField";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import React from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
interface Props {
  type:
    | "letterSpacing"
    | "lineHeight"
    | "borderWidth"
    | "borderRadius"
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingBottom"
    | "width"
    | "height";
  onChange?: (value: string) => void;
  value?: string;
  width?: string;
}
export default function TextField(props: Readonly<Props>) {
  const selectedController = useStoreState(
    (state) => state.RBReportItemsControllerState.item,
  );
  const editItem = useStoreActions(
    (actions) => actions.RBReportItemsState.editItem,
  );
  const items = useStoreState((state) => state.RBReportItemsState.items);
  const item = items.find((i) => i.id === selectedController?.id);

  const inputFunction = React.useMemo(
    () => ({
      letterSpacing: {
        value: props.value || "0px",
        action: (e: InputEvent) => {
          props.onChange?.(e.target.value);
        },
      },
      lineHeight: {
        value: props.value || "0px",
        action: (e: InputEvent) => {
          props.onChange?.(e.target.value);
        },
      },
      borderWidth: {
        value: item?.settings?.borderWidth || "0px",
        action: (e: InputEvent) => {
          editItem({
            id: selectedController?.id || "",
            type: "text",
            settings: {
              ...item?.settings,
              borderWidth: e.target.value,
              borderStyle: "solid",
            },
          });
        },
      },
      borderRadius: {
        value: item?.settings?.borderRadius || "0px",
        action: (e: InputEvent) => {
          editItem({
            id: selectedController?.id || "",
            type: "text",
            settings: {
              ...item?.settings,
              borderRadius: e.target.value,
            },
          });
        },
      },
      paddingLeft: {
        value: item?.settings?.paddingLeft || "0px",
        action: (e: InputEvent) => {
          editItem({
            id: selectedController?.id || "",
            type: "text",
            settings: {
              ...item?.settings,
              paddingLeft: e.target.value,
            },
          });
        },
      },
      paddingRight: {
        value: item?.settings?.paddingRight || "0px",
        action: (e: InputEvent) => {
          editItem({
            id: selectedController?.id || "",
            type: "text",
            settings: {
              ...item?.settings,
              paddingRight: e.target.value,
            },
          });
        },
      },
      paddingTop: {
        value: item?.settings?.paddingTop || "0px",
        action: (e: InputEvent) => {
          editItem({
            id: selectedController?.id || "",
            type: "text",
            settings: {
              ...item?.settings,
              paddingTop: e.target.value,
            },
          });
        },
      },
      paddingBottom: {
        value: item?.settings?.paddingBottom || "0px",
        action: (e: InputEvent) => {
          editItem({
            id: selectedController?.id || "",
            type: "text",
            settings: {
              ...item?.settings,
              paddingBottom: e.target.value,
            },
          });
        },
      },
      width: {
        value: item?.settings?.width || "0px",
        action: (e: InputEvent) => {
          editItem({
            id: selectedController?.id || "",
            type: "text",
            settings: {
              ...item?.settings,
              width: e.target.value,
            },
          });
        },
      },
      height: {
        value: item?.settings?.height || "0px",
        action: (e: InputEvent) => {
          editItem({
            id: selectedController?.id || "",
            type: "text",
            settings: {
              ...item?.settings,
              height: e.target.value,
            },
          });
        },
      },
    }),
    [
      editItem,
      item?.settings,
      selectedController?.id,
      props.value,
      props.onChange,
    ],
  );
  const handleChange = (type: keyof typeof inputFunction, e: InputEvent) => {
    inputFunction[type].action(e);
  };
  return (
    <Box
      sx={{
        width: props.width ?? "138px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        border: "0.5px solid #98A1AA",
        backgroundColor: "#FFF",
        borderRadius: "4px",
        padding: "0 16px",
      }}
    >
      <Input
        variant="standard"
        value={inputFunction[props.type].value}
        slotProps={{
          input: { disableUnderline: true },
        }}
        onChange={(e) => handleChange(props.type, e)}
      />
    </Box>
  );
}
