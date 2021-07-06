import React from "react";
import isEqual from "lodash/isEqual";
import { useUnmount, useUpdateEffect } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import { useComponentWillMount } from "app/hooks/useCompWillMount";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";

export function useUrlFilters(): null {
  const history = useHistory();
  const location = useLocation();

  const data = useStoreState((state) => state.AppliedFiltersState);
  const actions = useStoreActions((store) => store.AppliedFiltersState);

  // run before app is mounted in order to update the stored applied filters
  useComponentWillMount({
    action: () => {
      const updatedAppliedFilters = { ...data };
      const currentUrlParams = new URLSearchParams(location.search);
      const locations = currentUrlParams.get("locations");
      const components = currentUrlParams.get("components");
      const partnerTypes = currentUrlParams.get("partnerTypes");
      const partnerSubTypes = currentUrlParams.get("partnerSubTypes");
      const partners = currentUrlParams.get("partners");
      const status = currentUrlParams.get("status");

      if (locations) {
        updatedAppliedFilters.locations = locations.split(",");
      }
      if (components) {
        updatedAppliedFilters.components = components.split(",");
      }
      if (partnerTypes) {
        updatedAppliedFilters.partnerTypes = partnerTypes.split(",");
      }
      if (partnerSubTypes) {
        updatedAppliedFilters.partnerSubTypes = partnerSubTypes.split(",");
      }
      if (partners) {
        updatedAppliedFilters.partners = partners.split(",");
      }
      if (status) {
        updatedAppliedFilters.status = status.split(",");
      }

      actions.setAll(updatedAppliedFilters);
    },
  });

  // clear stored applied filters
  useUnmount(() => actions.setAll(defaultAppliedFilters));

  // run when stored applied filters change
  useUpdateEffect(() => {
    const currentUrlParams = new URLSearchParams(location.search);

    if (data.locations.length > 0) {
      currentUrlParams.set("locations", data.locations.join(","));
    } else {
      currentUrlParams.delete("locations");
    }
    if (data.components.length > 0) {
      currentUrlParams.set("components", data.components.join(","));
    } else {
      currentUrlParams.delete("components");
    }
    if (data.partnerTypes.length > 0) {
      currentUrlParams.set("partnerTypes", data.partnerTypes.join(","));
    } else {
      currentUrlParams.delete("partnerTypes");
    }
    if (data.partnerSubTypes.length > 0) {
      currentUrlParams.set("partnerSubTypes", data.partnerSubTypes.join(","));
    } else {
      currentUrlParams.delete("partnerSubTypes");
    }
    if (data.partners.length > 0) {
      currentUrlParams.set("partners", data.partners.join(","));
    } else {
      currentUrlParams.delete("partners");
    }
    if (data.status.length > 0) {
      currentUrlParams.set("status", data.status.join(","));
    } else {
      currentUrlParams.delete("status");
    }

    const queryString = decodeURIComponent(currentUrlParams.toString());
    history.push({
      pathname: history.location.pathname,
      search: queryString,
    });
  }, [data]);

  // run when url search params change
  useUpdateEffect(() => {
    const updatedAppliedFilters = { ...data };
    const currentUrlParams = new URLSearchParams(location.search);
    const locations = currentUrlParams.get("locations");
    const components = currentUrlParams.get("components");
    const partnerTypes = currentUrlParams.get("partnerTypes");
    const partnerSubTypes = currentUrlParams.get("partnerSubTypes");
    const partners = currentUrlParams.get("partners");
    const status = currentUrlParams.get("status");

    if (locations) {
      updatedAppliedFilters.locations = locations.split(",");
    } else if (updatedAppliedFilters.locations.length > 0) {
      updatedAppliedFilters.locations = [];
    }
    if (components) {
      updatedAppliedFilters.components = components.split(",");
    } else if (updatedAppliedFilters.components.length > 0) {
      updatedAppliedFilters.components = [];
    }
    if (partnerTypes) {
      updatedAppliedFilters.partnerTypes = partnerTypes.split(",");
    } else if (updatedAppliedFilters.partnerTypes.length > 0) {
      updatedAppliedFilters.partnerTypes = [];
    }
    if (partnerSubTypes) {
      updatedAppliedFilters.partnerSubTypes = partnerSubTypes.split(",");
    } else if (updatedAppliedFilters.partnerSubTypes.length > 0) {
      updatedAppliedFilters.partnerSubTypes = [];
    }
    if (partners) {
      updatedAppliedFilters.partners = partners.split(",");
    } else if (updatedAppliedFilters.partners.length > 0) {
      updatedAppliedFilters.partners = [];
    }
    if (status) {
      updatedAppliedFilters.status = status.split(",");
    } else if (updatedAppliedFilters.status.length > 0) {
      updatedAppliedFilters.status = [];
    }

    if (!isEqual(data, updatedAppliedFilters)) {
      actions.setAll(updatedAppliedFilters);
    }
  }, [location.search]);

  return null;
}
