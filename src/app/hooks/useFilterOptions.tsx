import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useLocation } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface FilterGroupOptionModel {}

interface UseFilterOptionsProps {
  loadFilterOptions?: boolean;
  returnFilterOptions?: boolean;
}

export interface UseFilterOptionsReturn {
  Locations: FilterGroupOptionModel[];
  Components: FilterGroupOptionModel[];
  "Partner Types": FilterGroupOptionModel[];
  "Grant Status": FilterGroupOptionModel[];
  "Replenishment Periods": FilterGroupOptionModel[];
  "Document Types": FilterGroupOptionModel[];
  Donors: FilterGroupOptionModel[];
  "Eligibility Status": FilterGroupOptionModel[];
  "Disease Burden": FilterGroupOptionModel[];
  "Eligibility Years": FilterGroupOptionModel[];
  "TRP Window": FilterGroupOptionModel[];
  "Portfolio Categorization": FilterGroupOptionModel[];
}

export function useFilterOptions(
  props: UseFilterOptionsProps
): null | UseFilterOptionsReturn {
  const location = useLocation();
  const getLocations = useStoreActions(
    (store) => store.LocationFilterOptions.fetch
  );
  const locations = useStoreState((state) =>
    get(state.LocationFilterOptions.data, "options", [])
  );

  const getComponents = useStoreActions(
    (store) => store.ComponentFilterOptions.fetch
  );
  const components = useStoreState((state) =>
    get(state.ComponentFilterOptions.data, "options", [])
  );

  const getPartnerTypes = useStoreActions(
    (store) => store.PartnerTypeFilterOptions.fetch
  );
  const partnerTypes = useStoreState((state) =>
    get(state.PartnerTypeFilterOptions.data, "options", [])
  );

  const getStatus = useStoreActions((store) => store.StatusFilterOptions.fetch);
  const status = useStoreState((state) =>
    get(state.StatusFilterOptions.data, "options", [])
  );

  const getReplenishmentPeriods = useStoreActions(
    (store) => store.ReplenishmentPeriodFilterOptions.fetch
  );
  const replenishmentPeriods = useStoreState((state) =>
    get(state.ReplenishmentPeriodFilterOptions.data, "options", [])
  );

  const getDonors = useStoreActions((store) => store.DonorFilterOptions.fetch);
  const donors = useStoreState((state) =>
    get(state.DonorFilterOptions.data, "options", [])
  );

  const documentTypes = [
    {
      label: "Application",
      value: "Application",
    },
    {
      label: "Country Profiles",
      value: "Country Profiles",
    },
  ];

  const getGrantCycles = useStoreActions(
    (store) => store.LocationAccessToFunding.GrantCycles.fetch
  );

  const getEligibilityStatusCodelist = useStoreActions(
    (store) => store.EligibilityStatusCodelist.fetch
  );
  const eligibilityStatusCodelist = useStoreState((state) =>
    get(state.EligibilityStatusCodelist, "data.data", [])
  );

  const getEligibilityDiseaseBurdenCodelist = useStoreActions(
    (store) => store.EligibilityDiseaseBurdenCodelist.fetch
  );
  const EligibilityDiseaseBurdenCodelist = useStoreState((state) =>
    get(state.EligibilityDiseaseBurdenCodelist, "data.data", [])
  );

  const getEligibilityYearOptions = useStoreActions(
    (store) => store.EligibilityYears.fetch
  );
  const EligibilityYearOptions = useStoreState((state) =>
    get(state.EligibilityYears, "data.data", [])
  );

  const getFundingRequestsTRPWindowCodelist = useStoreActions(
    (store) => store.FundingRequestsTRPWindowCodelist.fetch
  );
  const FundingRequestsTRPWindowCodelist = useStoreState((state) =>
    get(state.FundingRequestsTRPWindowCodelist, "data.data", [])
  );

  const getFundingRequestsPortfolioCategoryCodelist = useStoreActions(
    (store) => store.FundingRequestsPortfolioCategoryCodelist.fetch
  );
  const FundingRequestsPortfolioCategoryCodelist = useStoreState((state) =>
    get(state.FundingRequestsPortfolioCategoryCodelist, "data.data", [])
  );

  React.useEffect(() => {
    if (props.loadFilterOptions) {
      if (locations.length === 0) {
        getLocations({});
      }
      if (components.length === 0) {
        getComponents({});
      }
      if (partnerTypes.length === 0) {
        getPartnerTypes({});
      }
      if (status.length === 0) {
        getStatus({});
      }
      if (replenishmentPeriods.length === 0) {
        getReplenishmentPeriods({});
      }
      if (donors.length === 0) {
        getDonors({});
      }
      getGrantCycles({});
      getEligibilityStatusCodelist({});
      getEligibilityYearOptions({});
      getEligibilityDiseaseBurdenCodelist({});
      getFundingRequestsTRPWindowCodelist({});
      getFundingRequestsPortfolioCategoryCodelist({});
    }
  }, []);

  if (props.returnFilterOptions) {
    return {
      Locations: locations,
      Components: components,
      "Partner Types": partnerTypes,
      "Grant Status": status,
      "Replenishment Periods": replenishmentPeriods,
      "Document Types": documentTypes,
      Donors: donors,
      "Eligibility Status": eligibilityStatusCodelist,
      "Disease Burden": EligibilityDiseaseBurdenCodelist,
      "Eligibility Years": EligibilityYearOptions.map((item: string) => ({
        label: item,
        value: item,
      })),
      "TRP Window": FundingRequestsTRPWindowCodelist,
      "Portfolio Categorization": FundingRequestsPortfolioCategoryCodelist,
    };
  }

  return null;
}
