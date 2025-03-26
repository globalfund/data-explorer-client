import React from "react";
import Box from "@mui/material/Box";

import { FilterListProps } from "app/components/filters/list/data";
import { FilterListItemContent } from "app/components/filters/list/listitem";

export const FilterList: React.FC<FilterListProps> = (
  props: FilterListProps,
) => {
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
    </Box>
  );
};
