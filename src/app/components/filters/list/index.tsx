import React from "react";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FilterListProps } from "app/components/filters/list/data";
import { FilterListItemContent } from "app/components/filters/list/listitem";

export const FilterList: React.FC<FilterListProps> = (
  props: FilterListProps
) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      props.setCollapseAll(false);
    };

  React.useEffect(() => {
    if (props.collapseAll) {
      setExpanded(false);
    }
  }, [props.collapseAll]);

  return (
    <Box>
      <FilterListItemContent
        {...props.group}
        level={0}
        withSearch
        collapseAll={props.collapseAll}
        toggleFilter={props.toggleFilter}
        setCollapseAll={props.setCollapseAll}
        appliedFiltersData={props.appliedFiltersData}
        setPage={props.setPage}
        setPageSearchValue={props.setPageSearchValue}
        shownOptions={props.shownOptions}
      />
      {/* {props.groups.map((group) => (
        <Accordion
          key={group.name}
          expanded={expanded === group.name}
          onChange={handleChange(group.name)}
          data-cy="filter-list-accordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            data-cy="filter-list-accordion-summary"
          >
            <Typography fontSize="12px" fontWeight="700">
              {group.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FilterListItemContent
              {...group}
              level={0}
              withSearch
              collapseAll={props.collapseAll}
              toggleFilter={props.toggleFilter}
              setCollapseAll={props.setCollapseAll}
              appliedFiltersData={props.appliedFiltersData}
              setPage={props.setPage}
              setPageSearchValue={props.setPageSearchValue}
            />
          </AccordionDetails>
        </Accordion>
      ))} */}
    </Box>
  );
};
