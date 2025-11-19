import React from "react";
import Box from "@mui/material/Box";
import { Editor } from "@tiptap/react";
import Typography from "@mui/material/Typography";
import { RichEditor } from "app/components/rich-text-editor";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

export const ReportBuilderPageText: React.FC<{
  id: string;
  settings?: any;
  focus?: boolean;
  initialKey?: string;
  setEditor: (editor: Editor | null) => void;
}> = ({ id, setEditor, initialKey, settings }) => {
  const isMounted = React.useRef(false);
  const setSelectedController = useStoreActions(
    (actions) => actions.RBReportItemsControllerState.setItem,
  );
  const selectedItem = useStoreState(
    (state) => state.RBReportItemsControllerState.item,
  );

  const triggerTextController = (open: boolean) => {
    setSelectedController({ id, type: "text", open });
  };
  const clicked = selectedItem?.id === id && selectedItem.open;

  console.log(selectedItem, "selectedItem in text component");

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
      {!clicked && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
            flexDirection: "row",
            alignItems: "center",
            bgcolor: "#d6ddfd",
            border: "1px dashed #3154f4",
          }}
          onClick={() => triggerTextController(true)}
        >
          <Typography fontSize="16px" color="#3154f4">
            Click to start writing...
          </Typography>
        </Box>
      )}
      {clicked && (
        <RichEditor
          itemId={id}
          setEditor={setEditor}
          setClicked={triggerTextController}
          visualSettings={settings}
          initialContent={!isMounted.current ? initialKey : undefined}
        />
      )}
    </Box>
  );
};
