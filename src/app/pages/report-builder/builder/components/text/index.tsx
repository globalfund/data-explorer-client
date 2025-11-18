import React from "react";
import Box from "@mui/material/Box";
import { Editor } from "@tiptap/react";
import Close from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import MoreVert from "@mui/icons-material/MoreVert";
import { useStoreActions } from "app/state/store/hooks";
import { RichEditor } from "app/components/rich-text-editor";
// import SettingsIcon from "app/assets/vectors/Settings_ButtonIcon.svg?react";
// import { ReportBuilderPageItemMenu } from "app/pages/report-builder/builder/components/item-menu";
// import { ReportBuilderPageTextSettings } from "app/pages/report-builder/builder/components/text/settings";
import { RBReportItem } from "app/state/api/action-reducers/report-builder/sync";

export const ReportBuilderPageText: React.FC<{
  id: string;
  settings?: any;
  focus?: boolean;
  item: RBReportItem;
  initialKey?: string;
  setEditor: (editor: Editor | null) => void;
  extRemoveItem?: (e: React.MouseEvent) => void;
}> = ({ id, setEditor, extRemoveItem, focus, initialKey, settings }) => {
  const isMounted = React.useRef(false);
  const [value, setValue] = React.useState("");
  const [clicked, setClicked] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [anchorElSettings, setAnchorElSettings] =
  React.useState<null | HTMLElement>(null);

  const removeItem = useStoreActions(
    (actions) => actions.RBReportItemsState.removeItem,
  );
  // const editItem = useStoreActions(
  //   (actions) => actions.RBReportItemsState.editItem,
  // );

  // const setVisualSettings = (newSettings: any) => {
  //   editItem({
  //     ...item,
  //     settings: {
  //       ...item.settings,
  //       ...newSettings,
  //     },
  //   });
  // };

  // const handleMoreVertClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleDeleteItem = (e: React.MouseEvent) => {
    if (extRemoveItem) {
      extRemoveItem(e);
    } else {
      removeItem(id);
    }
    // handleClose();
  };

  // const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElSettings(event.currentTarget);
  // };

  // const handleSettingsClose = () => {
  //   setAnchorElSettings(null);
  // };

  React.useEffect(() => {
    if (focus) {
      setClicked(true);
    }
  }, [focus]);

  React.useEffect(() => {
    if (clicked) {
      isMounted.current = true;
    }
  }, [clicked]);

  const showActionButtons = React.useMemo(() => {
    return value.length > 0;
  }, [value]);

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
      {clicked && (
        <RichEditor
          itemId={id}
          setValue={setValue}
          setEditor={setEditor}
          setClicked={setClicked}
          visualSettings={settings}
          initialContent={!isMounted.current ? initialKey : undefined}
        />
      )}
      <Box className="top-right-actions">
        {/* {showActionButtons && (
          <React.Fragment>
            <IconButton onClick={handleSettingsClick}>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={handleMoreVertClick}>
              <MoreVert fontSize="small" />
            </IconButton>
            <ReportBuilderPageItemMenu
              itemId={id}
              anchorEl={anchorEl}
              deleteItem={handleDeleteItem}
              handleClose={() => setAnchorEl(null)}
            />
            <ReportBuilderPageTextSettings
              anchorEl={anchorElSettings}
              textCompSettings={settings}
              handleClose={handleSettingsClose}
              setVisualSettings={setVisualSettings}
            />
          </React.Fragment>
        )} */}
        {!showActionButtons && (
          <IconButton onClick={handleDeleteItem}>
            <Close fontSize="small" htmlColor="#ea1541" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
