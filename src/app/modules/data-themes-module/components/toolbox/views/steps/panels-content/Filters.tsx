/* third-party */
import React from "react";
import get from "lodash/get";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { FilterGroup } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/components/FilterGroup";
import { ExpandedFilterGroup } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/components/ExpandedFilterGroup";

interface DataThemesToolBoxFiltersProps {}

export function DataThemesToolBoxFilters(props: DataThemesToolBoxFiltersProps) {
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupModel | null>(null);

  const filterOptionGroups = useStoreState(
    (state) =>
      get(
        state.dataThemes,
        "rawData.data.filterOptions",
        []
      ) as FilterGroupModel[]
  );

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        overflow-y: auto;
        flex-direction: column;
        max-height: calc(100vh - 460px);
      `}
    >
      {!expandedGroup && (
        <React.Fragment>
          {filterOptionGroups.map((group: FilterGroupModel) => (
            <FilterGroup
              key={group.name}
              name={group.name}
              options={group.options}
              expandGroup={() => setExpandedGroup(group)}
            />
          ))}
        </React.Fragment>
      )}
      {expandedGroup && (
        <ExpandedFilterGroup
          name={expandedGroup.name}
          options={expandedGroup.options}
          goBack={() => setExpandedGroup(null)}
        />
      )}
    </div>
  );
}
