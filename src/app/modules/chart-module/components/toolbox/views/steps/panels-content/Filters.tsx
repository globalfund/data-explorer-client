/* third-party */
import React from "react";
/* project */
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { FilterGroup } from "app/modules/chart-module/routes/filters/components/FilterGroup";
import { ExpandedFilterGroup } from "app/modules/chart-module/routes/filters/components/ExpandedFilterGroup";

interface ChartToolBoxFiltersProps {
  filterOptionGroups: FilterGroupModel[];
  loadDataFromAPI?: (customAppliedFilters?: { [key: string]: any[] }) => void;
}

export function ChartToolBoxFilters(props: ChartToolBoxFiltersProps) {
  const { filterOptionGroups } = props;
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupModel | null>(null);

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        overflow-y: auto;
        flex-direction: column;
        max-height: calc(100vh - 260px);
      `}
    >
      {!expandedGroup && (
        <React.Fragment>
          {filterOptionGroups.map((group: FilterGroupModel) => (
            <FilterGroup
              key={group.name}
              name={group.name}
              options={group.options}
              loadDataFromAPI={props.loadDataFromAPI}
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
          loadDataFromAPI={props.loadDataFromAPI}
        />
      )}
    </div>
  );
}
