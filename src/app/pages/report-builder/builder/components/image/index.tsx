import React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useStoreActions } from "app/state/store/hooks";
import { DraggableModal } from "app/components/draggable-modal";
import { TabPlaceholderIcon } from "app/pages/report-builder/builder/components/image/data";
import {
  TabPanel,
  UploadTab,
  UnsplashTab,
  MyAssetsTab,
} from "app/pages/report-builder/builder/components/image/tabs";

export const ReportBuilderPageImage: React.FC<{
  id: string;
  extRemoveItem?: (e: React.MouseEvent) => void;
}> = ({ id, extRemoveItem }) => {
  const [tab, setTab] = React.useState(0);
  const [clicked, setClicked] = React.useState(false);
  const [imageReady, setImageReady] = React.useState(false);
  const [applyEnabled, setApplyEnabled] = React.useState(false);

  const removeItem = useStoreActions(
    (actions) => actions.RBReportItemsState.removeItem,
  );

  const content = React.useMemo(() => {
    return (
      <React.Fragment>
        <Typography fontSize="16px" color="#525252" mb="5px">
          Choose your method for upload
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          sx={{
            button: {
              flex: 1,
              gap: "8px",
              height: "40px",
              minHeight: "40px",
              maxHeight: "40px",
              fontWeight: "400",
              textTransform: "none",
              justifyContent: "flex-end",
              flexDirection: "row-reverse",
            },
            ".Mui-selected": {
              fontWeight: "700",
            },
            ".MuiTabs-flexContainer": {
              mt: "6px",
              borderBottom: "2px solid #c6c6c6",
            },
            ".MuiTabs-indicator": {
              background: "#3154f4",
            },
          }}
        >
          <Tab label="Unsplash" icon={<TabPlaceholderIcon />} />
          <Tab label="Upload" icon={<TabPlaceholderIcon />} />
          <Tab label="My Assets" icon={<TabPlaceholderIcon />} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <UnsplashTab setApplyEnabled={setApplyEnabled} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <UploadTab setApplyEnabled={setApplyEnabled} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <MyAssetsTab setApplyEnabled={setApplyEnabled} />
        </TabPanel>
      </React.Fragment>
    );
  }, [tab]);

  const actions = React.useMemo(() => {
    return (
      <React.Fragment>
        <Button variant="outlined" onClick={() => setClicked(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!applyEnabled}
          onClick={() => {
            setClicked(false);
            setImageReady(true);
          }}
          sx={{
            color: "#fff",
            fontWeight: "400",
            bgcolor: "#3154f4",
            "&:hover": {
              bgcolor: "#2548c4",
            },
          }}
        >
          Apply
        </Button>
      </React.Fragment>
    );
  }, [applyEnabled]);

  React.useEffect(() => {
    setApplyEnabled(false);
  }, [tab]);

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
      {!imageReady && (
        <Box
          sx={{
            gap: "10px",
            width: "100%",
            height: "130px",
            display: "flex",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
            alignItems: "center",
            bgcolor: "#d6ddfd",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px dashed #3154f4",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={() => setClicked(true)}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path
              d="M21 15.4999L17.914 12.4139C17.5389 12.039 17.0303 11.8284 16.5 11.8284C15.9697 11.8284 15.4611 12.039 15.086 12.4139L6 21.4999M5 3.5H19C20.1046 3.5 21 4.39543 21 5.5V19.5C21 20.6046 20.1046 21.5 19 21.5H5C3.89543 21.5 3 20.6046 3 19.5V5.5C3 4.39543 3.89543 3.5 5 3.5ZM11 9.5C11 10.6046 10.1046 11.5 9 11.5C7.89543 11.5 7 10.6046 7 9.5C7 8.39543 7.89543 7.5 9 7.5C10.1046 7.5 11 8.39543 11 9.5Z"
              stroke="#3154F4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography fontSize="16px" color="#3154f4">
            Click to add an image
          </Typography>
        </Box>
      )}
      {imageReady && (
        <Box sx={{ height: "400px" }}>
          <img
            alt="Uploaded"
            src="/static/images/ImagePlaceholder.png"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      )}
      <Box className="top-right-actions">
        <IconButton
          onClick={extRemoveItem ? extRemoveItem : () => removeItem(id)}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <DraggableModal
        width={550}
        open={clicked}
        actions={actions}
        setOpen={setClicked}
        title="Add an Image"
      >
        {content}
      </DraggableModal>
    </Box>
  );
};
