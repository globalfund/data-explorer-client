import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useTitle } from "react-use";
import { useLocation } from "react-router-dom";
import { DatasetPage } from "app/pages/datasets/common/page";
import { FilterGroupModel } from "app/components/filters/list/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { FullWidthDivider } from "app/pages/datasets/access-to-funding/data";
import { AccessToFundingBlock1 } from "app/pages/datasets/access-to-funding/blocks/block-1";
import { AccessToFundingBlock2 } from "app/pages/datasets/access-to-funding/blocks/block-2";
import { AccessToFundingBlock3 } from "app/pages/datasets/access-to-funding/blocks/block-3";
import { AccessToFundingBlock4 } from "app/pages/datasets/access-to-funding/blocks/block-4";
import { AccessToFundingBlock5 } from "app/pages/datasets/access-to-funding/blocks/block-5";
import { AccessToFundingBlock6 } from "app/pages/datasets/access-to-funding/blocks/block-6";

export const AccessToFundingPage: React.FC = () => {
  useTitle("The Data Explorer - Access to Funding");
  const location = useLocation();

  const dataLocationFilterOptions = useStoreState(
    (state) =>
      get(state.LocationFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const dataComponentFilterOptions = useStoreState(
    (state) =>
      get(state.ComponentFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const pageAppliedFilters = useStoreState((state) => [
    ...state.AppliedFiltersState.components,
    ...state.AppliedFiltersState.locations,
    ...state.AppliedFiltersState.cycles,
  ]);
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );

  const handleResetFilters = () => {
    appliedFiltersActions.setAll({
      ...appliedFiltersData,
      cycles: [],
      locations: [],
      components: [],
    });
  };

  const filterGroups = React.useMemo(() => {
    return [
      // dataCycleFilterOptions,
      dataLocationFilterOptions,
      dataComponentFilterOptions,
    ];
  }, [
    dataLocationFilterOptions,
    dataComponentFilterOptions,
    // dataCycleFilterOptions,
  ]);

  const filterString = React.useMemo(() => {
    let value = "";
    if (
      appliedFiltersData.locations.length > 0 &&
      location.search.includes("locations=")
    ) {
      value += `geographies=${encodeURIComponent(
        appliedFiltersData.locations.join(",")
      )}`;
    }
    if (
      appliedFiltersData.components.length > 0 &&
      location.search.includes("components=")
    ) {
      value += `${value.length > 0 ? "&" : ""}components=${encodeURIComponent(
        appliedFiltersData.components.join(",")
      )}`;
    }
    return value;
  }, [appliedFiltersData, location.search]);

  return (
    <DatasetPage
      title="Access to Funding"
      subtitle=""
      filterGroups={filterGroups}
      appliedFilters={pageAppliedFilters}
      handleResetFilters={handleResetFilters}
    >
      <Box width="100%" marginTop="50px">
        {/* Eligible Countries by Numbers */}
        <AccessToFundingBlock1 filterString={filterString} />
        <FullWidthDivider />
        {/* Eligibility */}
        <AccessToFundingBlock2
          filterString={filterString}
          filterGroups={filterGroups}
        />
        <FullWidthDivider />
        {/* Allocation */}
        <AccessToFundingBlock3
          filterString={filterString}
          filterGroups={filterGroups}
        />
        <FullWidthDivider />
        {/* Cumulative Allocation by Cycles */}
        <AccessToFundingBlock4 filterString={filterString} />
        <FullWidthDivider />
        {/* Funding Requests */}
        <AccessToFundingBlock5
          filterString={filterString}
          filterGroups={filterGroups}
        />
        <FullWidthDivider />
        {/* Documents */}
        <AccessToFundingBlock6 filterString={filterString} />
      </Box>
    </DatasetPage>
  );
};
