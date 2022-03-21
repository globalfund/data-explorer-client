import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import { useCMSData } from "app/hooks/useCMSData";
import { useHistory, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { styles } from "app/components/PageHeader/components/filterbar/styles";
import { Chip } from "app/components/PageHeader/components/filterbar/common/Chip";
import { getFilterGroupsChips } from "app/components/PageHeader/components/filterbar/utils";
import {
  FilterGroupProps,
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";
import {
  useFilterOptions,
  UseFilterOptionsReturn,
} from "app/hooks/useFilterOptions";
import {
  ChipModel,
  FILTER_TYPES,
  AppliedFiltersModel,
} from "app/components/PageHeader/components/filterbar/data";

export function MobileFilterBar() {
  const history = useHistory();
  const params = useParams<{
    code?: string;
  }>();
  const cmsData = useCMSData({ returnData: true });
  const filterOptions = useFilterOptions({
    returnFilterOptions: true,
  }) as UseFilterOptionsReturn;
  const appliedFilters: AppliedFiltersModel = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );

  const [chips, setChips] = React.useState<ChipModel[]>(
    getFilterGroupsChips(appliedFilters, filterOptions, cmsData)
  );

  React.useEffect(() => {
    const newChips = getFilterGroupsChips(
      appliedFilters,
      filterOptions,
      cmsData
    );
    setChips(
      filter(newChips, (chip: ChipModel) => {
        const activeFilterGroups = get(
          pathnameToFilterGroups,
          params.code
            ? history.location.pathname.replace(params.code, "<code>")
            : history.location.pathname,
          filtergroups
        );
        return find(
          activeFilterGroups,
          (filterGroup: FilterGroupProps) => filterGroup.name === chip.label
        );
      }) as ChipModel[]
    );
  }, [
    appliedFilters,
    history.location.pathname,
    filterOptions.Locations,
    filterOptions.Components,
    filterOptions["Grant Status"],
    filterOptions["Partner Types"],
    filterOptions["Replenishment Periods"],
    filterOptions.Donors,
  ]);

  function onDelete(chip: ChipModel) {
    switch (chip.type) {
      case FILTER_TYPES.LOCATIONS:
        appliedFiltersActions.setLocations([]);
        break;
      case FILTER_TYPES.COMPONENTS:
        appliedFiltersActions.setComponents([]);
        break;
      case FILTER_TYPES.GRANT_STATUS:
        appliedFiltersActions.setStatus([]);
        break;
      case FILTER_TYPES.PARTNER_TYPES:
        appliedFiltersActions.setPartners([]);
        appliedFiltersActions.setPartnerTypes([]);
        appliedFiltersActions.setPartnerSubTypes([]);
        break;
      case FILTER_TYPES.REPLENISHMENT_PERIODS:
        appliedFiltersActions.setReplenishmentPeriods([]);
        break;
      case FILTER_TYPES.DONORS:
        appliedFiltersActions.setDonors([]);
        appliedFiltersActions.setDonorCategories([]);
        break;
      default:
        break;
    }
  }

  return (
    <div css={styles.container}>
      <div css={styles.label}>Your selections</div>
      <div css={styles.chipsContainer}>
        {chips.map((chip: any) => {
          return <Chip {...chip} key={chip.type} onDelete={onDelete} />;
        })}
      </div>
    </div>
  );
}
