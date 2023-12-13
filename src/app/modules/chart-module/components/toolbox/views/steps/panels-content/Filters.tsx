/* third-party */
import React from "react";
/* project */
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { FilterGroup } from "app/modules/chart-module/routes/filters/components/FilterGroup";
import { ExpandedFilterGroup } from "app/modules/chart-module/routes/filters/components/ExpandedFilterGroup";
import ToolboxSubHeader from "app/modules/chart-module/components/toolbox/views/steps/sub-header";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface ChartToolBoxFiltersProps {
  filterOptionGroups: FilterGroupModel[];
  loadDataFromAPI?: (customAppliedFilters?: { [key: string]: any[] }) => void;
}

export function ChartToolBoxFilters(props: Readonly<ChartToolBoxFiltersProps>) {
  const { filterOptionGroups } = props;
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupModel | null>(null);

  const allAppliedFilters = useStoreState(
    (state) => state.charts.appliedFilters.value
  );
  const resetAppliedFilters = useStoreActions(
    (state) => state.charts.appliedFilters.reset
  );

  const handleResetFilters = () => {
    resetAppliedFilters();
  };

  React.useEffect(() => {
    if (props.loadDataFromAPI) {
      props.loadDataFromAPI(allAppliedFilters);
    }
  }, [allAppliedFilters]);
  return (
    <div>
      <ToolboxSubHeader
        name="Filters"
        level={4}
        showResetButton
        resetFilters={handleResetFilters}
      />

      <div
        css={`
          width: 90%;
          margin: auto;
          padding-bottom: 15px;
          display: flex;
          overflow-y: auto;
          flex-direction: column;
          max-height: calc(100vh - 260px);
          &::-webkit-scrollbar {
            width: 4px;
            background: #495057;
          }
          &::-webkit-scrollbar-track {
            background: #f1f3f5;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: #495057;
          }
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
    </div>
  );
}
