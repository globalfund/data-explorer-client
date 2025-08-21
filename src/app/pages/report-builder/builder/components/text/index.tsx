import React from "react";
import Box from "@mui/material/Box";
import { Editor } from "@tiptap/react";
import Typography from "@mui/material/Typography";
import { RichEditor } from "app/components/rich-text-editor";

export const ReportBuilderPageText: React.FC<{
  setEditor: (editor: Editor) => void;
}> = ({ setEditor }) => {
  const [clicked, setClicked] = React.useState(false);

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
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
      {clicked && <RichEditor setEditor={setEditor} />}
    </Box>
  );
};
