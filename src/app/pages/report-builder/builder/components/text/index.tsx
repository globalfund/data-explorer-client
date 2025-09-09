import React from "react";
import Box from "@mui/material/Box";
import { Editor } from "@tiptap/react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import { useStoreActions } from "app/state/store/hooks";
import { RichEditor } from "app/components/rich-text-editor";
import { ReportBuilderPageItemMenu } from "app/pages/report-builder/builder/components/item-menu";

export const ReportBuilderPageText: React.FC<{
  id: string;
  setEditor: (editor: Editor | null) => void;
  extRemoveItem?: (e: React.MouseEvent) => void;
}> = ({ id, setEditor, extRemoveItem }) => {
  const [clicked, setClicked] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const removeItem = useStoreActions(
    (actions) => actions.RBReportItemsState.removeItem,
  );

  const handleMoreVertClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = (e: React.MouseEvent) => {
    if (extRemoveItem) {
      extRemoveItem(e);
    } else {
      removeItem(id);
    }
    handleClose();
  };

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
        <IconButton onClick={handleMoreVertClick}>
          <MoreVert fontSize="small" />
        </IconButton>
        <ReportBuilderPageItemMenu
          anchorEl={anchorEl}
          title="Text Settings"
          deleteItem={handleDeleteItem}
          setOpen={() => setAnchorEl(null)}
        />
      </Box>
    </Box>
  );
};
