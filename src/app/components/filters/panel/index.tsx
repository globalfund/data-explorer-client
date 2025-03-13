import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Close from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import { FilterList } from "app/components/filters/list";
import { FiltersApplied } from "app/components/filters/applied";
import { FilterPanelProps } from "app/components/filters/panel/data";
import { ReactComponent as CollapseIcon } from "app/assets/vectors/Collapse_ButtonIcon.svg";
import { ReactComponent as SearchIcon } from "app/assets/vectors/Search_grants.svg";
import { FilterGroupModel, FilterModel, SearchInput } from "../list/data";
import { appColors } from "app/theme";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import findIndex from "lodash/findIndex";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import isEqual from "lodash/isEqual";

export const FilterPanel: React.FC<FilterPanelProps> = (
  props: FilterPanelProps
) => {
  const [collapseAll, setCollapseAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const handleCollapseAll = () => {
    setCollapseAll(!collapseAll);
  };
  const fetch = useStoreActions((actions) => actions.GrantList.fetch);
  const [shownOptions, setShownOptions] = React.useState<FilterModel[]>([]);
  const [tabValue, setTabValue] = React.useState(props.filterGroups[0].id);
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const tempAppliedFiltersData = useStoreState(
    (state) => state.TempAppliedFiltersState
  );
  const tempAppliedFiltersActions = useStoreActions(
    (actions) => actions.TempAppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );
  const appliedFiltersStringAction = useStoreActions(
    (action) => action.AppliedFilterStringState
  );
  const appliedFiltersContent = React.useMemo(() => {
    if (props.appliedFilters.length === 0) {
      return <Typography fontSize="12px">No filters applied.</Typography>;
    }
    return (
      <FiltersApplied
        items={props.appliedFilters}
        removeFilter={props.removeFilter}
        filterGroups={props.filterGroups}
        appliedFilterBgColors={props.appliedFilterBgColors}
      />
    );
  }, [props.appliedFilters]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const filterGroupOptions = props.filterGroups.find(
      (group) => group.id === newValue
    )?.options;
    setTabValue(newValue);
    filterOptions(searchValue, filterGroupOptions ?? []);
  };

  const filterGroupOptions = props.filterGroups.find(
    (group) => group.id === tabValue
  )?.options;

  console.log(props.filterString, "props.filterString");
  const handleApplyFilters = () => {
    if (isEqual(appliedFiltersData, tempAppliedFiltersData)) return;
    fetch({
      routeParams: {
        page: `${props.page}`,
        pageSize: "9",
      },
      filterString: `q=${props.search}${
        props.filterString.length ? `&${props.filterString}` : ""
      }`,
    });
    appliedFiltersActions.setAll({ ...tempAppliedFiltersData });
    appliedFiltersStringAction.setState(props.filterString);
    tempAppliedFiltersActions.clearAll();
  };

  const handleCancelFilters = () => {
    tempAppliedFiltersActions.setAll({ ...appliedFiltersData });
  };

  const filterOptions = (
    searchValue: string,
    filterGroupOptions?: FilterModel[]
  ) => {
    if (searchValue.length === 0) {
      setShownOptions(filterGroupOptions ?? []);
    } else {
      const options: FilterModel[] = [];
      (filterGroupOptions ?? []).forEach((option: FilterModel) => {
        if (option.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
          options.push(option);
        } else if (option.options) {
          option.options.forEach((subOption: FilterModel) => {
            if (
              subOption.name.toLowerCase().indexOf(searchValue.toLowerCase()) >
              -1
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
                    .indexOf(searchValue.toLowerCase()) > -1
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
  };

  const handleSearchFiltersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(e.target.value);
    filterOptions(e.target.value, filterGroupOptions);
  };

  const FilterGroupsTabs = React.useMemo(() => {
    return (
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        aria-label="secondary tabs example"
        sx={{
          minHeight: "32px",
        }}
        TabIndicatorProps={{
          sx: {
            backgroundColor: "#252C34",
            height: "3px",
          },
        }}
      >
        {props.filterGroups.map((group) => (
          <Tab
            key={group.id}
            value={group.id}
            label={group.name}
            disableTouchRipple
            sx={{
              borderBottom:
                tabValue === group.id ? "none" : "1px solid #ADB5BD",
              transition: "border-bottom 0.3s",
              color: "#373D43",
              fontFamily: "Inter",
              textTransform: "none",
              marginRight: "15px",
              minHeight: "32px",
            }}
          />
        ))}
      </Tabs>
    );
  }, [tabValue, searchValue]);

  React.useEffect(() => {
    filterOptions(searchValue, filterGroupOptions);
  }, [props.filterGroups]);
  return (
    <Box
      gap="7px"
      display="flex"
      bgcolor="#FFFFFF"
      padding="7px 12px"
      borderRadius="4px"
      flexDirection="column"
      border="1px solid #70777E"
      data-cy="filter-panel"
      sx={{
        "@media (min-width: 1280px)": {
          width: "1200px",
        },
        "@media (max-width: 1279px)": {
          width: "calc(100vw - 40px)",
        },
      }}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        onClick={props.onClose}
        justifyContent="space-between"
      >
        <Box
          gap="8px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          margin="-4px 0 0 -4px"
        >
          <Add fontSize="small" />
          <Typography fontSize="14px">Filters</Typography>
        </Box>
        <IconButton
          sx={{
            padding: 0,
          }}
          onClick={props.onClose}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box
        gap="5px"
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {appliedFiltersContent}
        <Box
          gap="10px"
          display="flex"
          minWidth="192px"
          flexDirection="row"
          sx={{
            "& > button": {
              fontSize: "12px",
              lineHeight: "1.5",
              padding: "2px 12px",
              svg: {
                width: "14px",
                height: "14px",
              },
            },
          }}
        >
          <Box
            display="flex"
            gap="4px"
            padding={"0px 8px"}
            height={"100%"}
            width={"219px"}
            alignItems={"center"}
            sx={{
              background: appColors.SEARCH.INPUT_BACKGROUND_COLOR,
              borderRadius: "5px",
            }}
          >
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search"
              style={{ height: "24px", padding: 0 }}
              onChange={handleSearchFiltersChange}
              data-cy="filter-panel-search-input"
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleCollapseAll}
            startIcon={<CollapseIcon fontSize="small" />}
          >
            Collapse All
          </Button>
        </Box>
      </Box>
      <Box>
        {/* tabs */}
        {FilterGroupsTabs}
      </Box>
      <Box
        padding="20px"
        maxHeight="450px"
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#F5F6F7",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#70777E",
            borderRadius: "3px",
          },
          "@media (max-width: 767px)": {
            padding: "20px 0",
          },
        }}
      >
        {!props.toggleFilter && (
          <Typography fontSize="12px">Filter the data page-wide.</Typography>
        )}
        <FilterList
          collapseAll={collapseAll}
          groups={props.filterGroups}
          group={
            props.filterGroups.find((group) => group.id === tabValue) ||
            ({} as FilterGroupModel)
          }
          setCollapseAll={setCollapseAll}
          toggleFilter={props.toggleFilter}
          appliedFiltersData={props.appliedFiltersData}
          setPage={props.setPage}
          setPageSearchValue={props.setPageSearchValue}
          shownOptions={shownOptions ?? []}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            onClick={props.handleResetFilters}
            variant="outlined"
            sx={{
              fontSize: "12px",
              maxHeight: "26px",
              lineHeight: "1.5",
              padding: "2px 12px",
              justifySelf: "flex-end",
              display: "flex",
            }}
            startIcon={
              <svg
                width="6"
                height="9"
                viewBox="0 0 6 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.516113 1.54983L1.31594 0.75L5.31509 4.74915L1.31594 8.7483L0.516113 7.94847L3.71543 4.74915L0.516113 1.54983Z"
                  fill="#373D43"
                />
              </svg>
            }
          >
            Reset Changes
          </Button>
          <Button
            onClick={handleCancelFilters}
            variant="outlined"
            sx={{
              fontSize: "12px",
              maxHeight: "26px",
              lineHeight: "1.5",
              padding: "2px 12px",
              justifySelf: "flex-end",
              display: "flex",
            }}
            endIcon={
              <svg
                width="8"
                height="9"
                viewBox="0 0 8 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.79541 7.52918L6.85389 1.4707M0.79541 1.4707L6.85389 7.52918"
                  stroke="#373D43"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          >
            Cancel
          </Button>
          <Button
            onClick={handleApplyFilters}
            variant="outlined"
            sx={{
              fontSize: "12px",
              maxHeight: "26px",
              lineHeight: "1.5",
              padding: "2px 12px",
              justifySelf: "flex-end",
              display: "flex",
            }}
            endIcon={
              <svg
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.40747 4.00483L3.42696 6.02432L8.4757 0.975586"
                  stroke="#373D43"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
