import Mapping from "../mapping";
import Filtering from "../filtering";
import ControlAccordion from "../../components/accordion";
import { Box } from "@mui/system";
import LimitToTopN from "../limit-to-top-n";

const DataSettings = () => {
  return (
    <Box
      sx={{
        maxHeight: "450px",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ControlAccordion title="Mapping">
        <Mapping />
      </ControlAccordion>
      <ControlAccordion title="Filter">
        <Filtering />
      </ControlAccordion>
      <ControlAccordion title="Sort">
        <Box sx={{ padding: "8px" }}>No sort applied.</Box>
      </ControlAccordion>
      <LimitToTopN />
    </Box>
  );
};

export default DataSettings;
