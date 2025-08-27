import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import CheckboxIcon from "app/assets/vectors/Checkbox_notchecked.svg?react";
import CheckboxCheckedIcon from "app/assets/vectors/Checkbox_checked.svg?react";
import {
  getAppliedFilters,
  FilterListItemContentProps,
} from "app/components/filters/list/data";

export const FilterListItemContent: React.FC<FilterListItemContentProps> = (
  props: FilterListItemContentProps,
) => {
  const [expanded, setExpanded] = React.useState<string | false>(
    props.forceExpand ? props.name : false,
  );

  const tempAppliedFiltersData = useStoreState(
    (state) => state.TempAppliedFiltersState,
  );
  const tempAppliedFiltersActions = useStoreActions(
    (actions) => actions.TempAppliedFiltersState,
  );

  const id = React.useMemo(() => {
    switch (props.level) {
      case 0:
        if (props.options && props.options.length > 0) {
          if (props.options[0].options && props.options[0].options.length > 0) {
            return `${props.id}Type`;
          }
        }
        return props.id;
      case 1:
        if (props.options && props.options.length > 0) {
          if (props.options[0].options && props.options[0].options.length > 0) {
            return `${props.id}SubType`;
          }
        }
        return props.id;
      case 2:
        return props.id;
      default:
        return "";
    }
  }, [props.id, props.level, props.options]);

  const appliedFilters = React.useMemo(() => {
    return getAppliedFilters(
      props.tempAppliedFiltersData ?? tempAppliedFiltersData,
      props.id,
      props.level,
    );
  }, [
    tempAppliedFiltersData,
    props.tempAppliedFiltersData,
    props.id,
    props.level,
  ]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setPage(1);
    props.setPageSearchValue(1);
    if (props.toggleFilter) {
      props.toggleFilter(e.target.checked, e.target.name, id);
    } else {
      tempAppliedFiltersActions.toggleFilter({
        checked: e.target.checked,
        value: e.target.name,
        type: id,
      });
    }
  };

  const handleChange =
    (panel: string) => (e: React.SyntheticEvent, isExpanded: boolean) => {
      const targetType: string = get(e, "target.type", "");
      if (targetType !== "checkbox") {
        setExpanded(isExpanded ? panel : false);
        props.setCollapseAll(false);
      }
    };
  React.useEffect(() => {
    if (props.forceExpand) {
      setExpanded(props.name);
    }
  }, [props.forceExpand]);

  React.useEffect(() => {
    if (props.collapseAll) {
      setExpanded(false);
    }
  }, [props.collapseAll]);

  return (
    <Box width="100%" position="relative">
      <Box paddingLeft="20px">
        {props.shownOptions.map((option) => (
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
                position: "relative",
                justifyContent: "flex-start",
                "&.Mui-expanded": {
                  minHeight: "20px",
                },
                "> .MuiAccordionSummary-content": {
                  flexGrow: 0,
                },
              }}
              data-cy="filter-list-content-accordion-summary"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name={option.name}
                    icon={<CheckboxIcon />}
                    onChange={onCheckboxChange}
                    checkedIcon={<CheckboxCheckedIcon />}
                    checked={appliedFilters.indexOf(option.name) > -1}
                    data-cy="filter-list-content-checkbox"
                  />
                }
                label={option.name}
                checked={appliedFilters.indexOf(option.name) > -1}
                sx={{
                  marginLeft: "0px",
                  marginRight: "0px",
                  alignItems: "center",
                  "& .MuiFormControlLabel-label": {
                    zIndex: option.options ? -1 : 0,
                    fontSize: "14px",
                    marginLeft: "5px",
                  },
                }}
              />
              {option.options && (
                <Typography
                  top="5px"
                  left="23px"
                  fontSize="14px"
                  fontWeight="400"
                  position="absolute"
                >
                  {option.name}
                </Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <FilterListItemContent
                {...option}
                id={props.id}
                level={props.level + 1}
                forceExpand={false}
                collapseAll={props.collapseAll}
                toggleFilter={props.toggleFilter}
                setCollapseAll={props.setCollapseAll}
                tempAppliedFiltersData={props.tempAppliedFiltersData}
                setPage={props.setPage}
                setPageSearchValue={props.setPageSearchValue}
                shownOptions={option.options ?? []}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
