import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import MinimizeIcon from "app/assets/vectors/Minimize.svg?react";
import MaximizeIcon from "app/assets/vectors/Maximize.svg?react";
import LetterTextIcon from "app/assets/vectors/Letter_Text.svg?react";
import TypeIcon from "app/assets/vectors/Type.svg?react";
import PaintBucketIcon from "app/assets/vectors/Paint_Bucket.svg?react";
import LayoutTemplateIcon from "app/assets/vectors/Layout_Template.svg?react";
import MoreVert from "@mui/icons-material/MoreVert";
import { RTEToolbar } from "./font-tab";
import { useStoreState } from "app/state/store/hooks";

type TextControllerTab = "font" | "style" | "layout";
export default function TextController() {
  const [value, setValue] = React.useState<TextControllerTab>("font");
  const [isExpanded, setIsExpanded] = React.useState(true);
  const activeRTE = useStoreState((state) => state.RBReportRTEState.activeRTE);

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: TextControllerTab,
  ) => {
    setValue(newValue);
  };

  const renderTabPanel = () => {
    switch (value) {
      case "font":
        return <Box>{activeRTE && <RTEToolbar editor={activeRTE} />}</Box>;
      case "style":
        return <Box>Style Settings</Box>;
      case "layout":
        return <Box>Layout Settings</Box>;
      default:
        return null;
    }
  };

  return (
    <Box id="rte-toolbar">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "50px",
          padding: "8px",
          borderBottom: "1px solid #CFD4DA",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <IconButton onClick={handleExpandToggle}>
            {isExpanded ? <MinimizeIcon /> : <MaximizeIcon />}
          </IconButton>
          <LetterTextIcon />
          <Typography fontSize="16px" color="#3154f4">
            Text
          </Typography>
        </Box>
        <IconButton>
          <MoreVert htmlColor="#252C34" />
        </IconButton>
      </Box>
      <Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            sx={{ gap: "8px", display: "flex" }}
          >
            <Tab
              value="font"
              aria-label="Text"
              sx={{ borderBottom: "2px solid #98A1AA" }}
              icon={<TypeIcon />}
            />
            <Tab
              value="style"
              aria-label="Style"
              icon={<PaintBucketIcon />}
              sx={{ borderBottom: "2px solid #98A1AA", marginLeft: "8px" }}
            />
            <Tab
              value="layout"
              aria-label="Layout"
              icon={<LayoutTemplateIcon />}
              sx={{ borderBottom: "2px solid #98A1AA", marginLeft: "8px" }}
            />
          </Tabs>
        </Box>
        {renderTabPanel()}
      </Box>
    </Box>
  );
}
