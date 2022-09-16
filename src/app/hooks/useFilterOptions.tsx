import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useLocation } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { FilterGroupOptionModel } from "app/components/ToolBoxPanel/components/filters/data";

interface UseFilterOptionsProps {
  returnFilterOptions?: boolean;
}

export interface UseFilterOptionsReturn {
  Locations: FilterGroupOptionModel[];
  Components: FilterGroupOptionModel[];
  "Partner Types": FilterGroupOptionModel[];
  "Grant Status": FilterGroupOptionModel[];
  "Replenishment Periods": FilterGroupOptionModel[];
  Donors: FilterGroupOptionModel[];
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

  const donorsMapView = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );

  const datasource = useStoreState((state) => state.DataSourceState.value);

  React.useEffect(() => {
    if (locations.length === 0) {
      getLocations({ filterString: `datasource=${datasource}` });
    }
    if (components.length === 0) {
      getComponents({ filterString: `datasource=${datasource}` });
    }
    if (partnerTypes.length === 0) {
      getPartnerTypes({ filterString: `datasource=${datasource}` });
    }
    if (status.length === 0) {
      getStatus({ filterString: `datasource=${datasource}` });
    }
    if (replenishmentPeriods.length === 0) {
      getReplenishmentPeriods({ filterString: `datasource=${datasource}` });
    }
    if (donors.length === 0) {
      getDonors({ filterString: `datasource=${datasource}` });
    }
  }, []);

  if (props.returnFilterOptions) {
    return {
      Locations: locations,
      Components: components,
      "Partner Types": partnerTypes,
      "Grant Status": status,
      "Replenishment Periods": replenishmentPeriods,
      Donors:
        location.pathname === "/viz/pledges-contributions/map"
          ? get(find(donors, { label: donorsMapView }), "subOptions", donors)
          : donors,
    };
  }

  return null;
}
