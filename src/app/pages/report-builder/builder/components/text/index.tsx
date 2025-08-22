import React from "react";
import Box from "@mui/material/Box";
import { Editor } from "@tiptap/react";
import Typography from "@mui/material/Typography";
import { RichEditor } from "app/components/rich-text-editor";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { useStoreActions } from "app/state/store/hooks";

export const ReportBuilderPageText: React.FC<{
  id: string;
  setEditor: (editor: Editor | null) => void;
}> = ({ id, setEditor }) => {
  const [clicked, setClicked] = React.useState(false);

  const removeItem = useStoreActions(
    (actions) => actions.RBReportItemsState.removeItem,
  );

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
          onClick={() => setClicked(true)}
        >
          <Typography fontSize="16px" color="#3154f4">
            Click to start writing...
          </Typography>
        </Box>
      )}
      {clicked && <RichEditor setEditor={setEditor} setClicked={setClicked} />}
      <Box className="top-right-actions">
        <IconButton onClick={() => removeItem(id)}>
          <Close fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
