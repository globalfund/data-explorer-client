import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import findIndex from "lodash/findIndex";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ReactComponent as CheckboxIcon } from "app/assets/vectors/Checkbox_notchecked.svg";
import { ReactComponent as CheckboxCheckedIcon } from "app/assets/vectors/Checkbox_checked.svg";
import {
  SearchInput,
  FilterModel,
  getAppliedFilters,
  FilterListItemContentProps,
} from "app/components/filters/list/data";

export const FilterListItemContent: React.FC<FilterListItemContentProps> = (
  props: FilterListItemContentProps
) => {
  const [value, setValue] = React.useState("");
  const [shownOptions, setShownOptions] = React.useState<FilterModel[]>([]);
  const [expanded, setExpanded] = React.useState<string | false>(
    Boolean(props.forceExpand) ? props.name : false
  );

  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
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
      props.appliedFiltersData ?? appliedFiltersData,
      props.id,
      props.level
    );
  }, [appliedFiltersData, props.appliedFiltersData, props.id, props.level]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.toggleFilter) {
      props.toggleFilter(e.target.checked, e.target.name, id);
    } else {
      appliedFiltersActions.toggleFilter({
        checked: e.target.checked,
        value: e.target.name,
        type: id,
      });
    }
  };

  const handleChange =
    (panel: string) => (e: React.SyntheticEvent, isExpanded: boolean) => {
      const targetType = get(e, "target.type", "");
      // @ts-ignore
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
    if (value.length === 0) {
      setShownOptions(props.options ?? []);
    } else {
      const options: FilterModel[] = [];
      (props.options ?? []).forEach((option: FilterModel) => {
        if (option.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          options.push(option);
        } else if (option.options) {
          option.options.forEach((subOption: FilterModel) => {
            if (
              subOption.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            ) {
              const fParentIndex = findIndex(options, { name: option.name });
              if (fParentIndex > -1) {
                options[fParentIndex].options?.push(subOption);
              } else {
                options.push({
                  ...option,
                  options: [subOption],
                });
              }
            } else if (subOption.options) {
              subOption.options.forEach((subSubOption: FilterModel) => {
                if (
                  (subSubOption.name || "")
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) > -1
                ) {
                  const fGrandParentIndex = findIndex(options, {
                    name: option.name,
                  });
                  if (fGrandParentIndex > -1) {
                    const fParentIndex = findIndex(
                      options[fGrandParentIndex]?.options,
                      { name: subOption.name }
                    );
                    if (fParentIndex > -1) {
                      // @ts-ignore
                      options[fGrandParentIndex]?.options[
                        fParentIndex
                      ]?.options.push(subSubOption);
                    } else {
                      // @ts-ignore
                      options[fGrandParentIndex]?.options.push({
                        ...subOption,
                        options: [subSubOption],
                      });
                    }
                  } else {
                    options.push({
                      ...option,
                      options: [
                        {
                          ...subOption,
                          options: [subSubOption],
                        },
                      ],
                    });
                  }
                }
              });
            }
          });
        }
      });
      setShownOptions(options);
    }
  }, [value, props.options]);

  React.useEffect(() => {
    if (props.collapseAll) {
      setExpanded(false);
    }
  }, [props.collapseAll]);

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
            value={value}
            placeholder="Search"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setValue(e.target.value)}
          />
        </React.Fragment>
      )}
      <Box paddingLeft="20px">
        {shownOptions.map((option) => (
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
                    fontSize: "12px",
                    marginLeft: "5px",
                  },
                }}
              />
              {option.options && (
                <Typography
                  top="5px"
                  left="23px"
                  fontSize="12px"
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
                forceExpand={value.length > 0}
                collapseAll={props.collapseAll}
                toggleFilter={props.toggleFilter}
                setCollapseAll={props.setCollapseAll}
                appliedFiltersData={props.appliedFiltersData}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
