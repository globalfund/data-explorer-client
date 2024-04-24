import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ReactComponent as CheckboxIcon } from "app/assets/vectors/Checkbox_notchecked.svg";
import { ReactComponent as CheckboxCheckedIcon } from "app/assets/vectors/Checkbox_checked.svg";
import {
  SearchInput,
  FilterListProps,
  FilterListItemContentProps,
} from "app/components/filters/list/data";

const FilterListItemContent: React.FC<FilterListItemContentProps> = (
  props: FilterListItemContentProps
) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box width="100%" position="relative">
      {props.withSearch && (
        <React.Fragment>
          <SearchIcon
            fontSize="small"
            sx={{
              top: "4px",
              left: "5px",
              position: "absolute",
              transform: "scale(0.8)",
            }}
          />
          <SearchInput
            type="text"
            placeholder="Search"
            style={{ marginBottom: "10px" }}
          />
        </React.Fragment>
      )}
      <Box paddingLeft="20px">
        {props.options?.map((option) => (
          <Accordion
            key={option.name}
            expanded={expanded === option.name}
            onChange={handleChange(option.name)}
            sx={{
              borderStyle: "none",
              paddingBottom: "0px !important",
            }}
          >
            <AccordionSummary
              expandIcon={
                get(option, "options.length", 0) > 0 ? (
                  <ExpandMoreIcon />
                ) : undefined
              }
              sx={{
                minHeight: "20px",
                maxHeight: "20px",
                justifyContent: "flex-start",
                "&.Mui-expanded": {
                  minHeight: "20px",
                  maxHeight: "20px",
                },
                "> .MuiAccordionSummary-content": {
                  flexGrow: 0,
                },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name={option.name}
                    icon={<CheckboxIcon />}
                    checkedIcon={<CheckboxCheckedIcon />}
                  />
                }
                label={option.name}
                sx={{
                  marginLeft: "0px",
                  marginRight: "0px",
                  alignItems: "center",
                  "& .MuiFormControlLabel-label": {
                    fontSize: "12px",
                    marginLeft: "5px",
                  },
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <FilterListItemContent {...option} level={props.level + 1} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export const FilterList: React.FC<FilterListProps> = (
  props: FilterListProps
) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      {props.groups.map((group) => (
        <Accordion
          key={group.name}
          expanded={expanded === group.name}
          onChange={handleChange(group.name)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontSize="12px" fontWeight="700">
              {group.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FilterListItemContent {...group} withSearch level={0} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
