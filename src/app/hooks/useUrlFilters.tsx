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
      const documentTypes = currentUrlParams.get("documentTypes");
      const donors = currentUrlParams.get("donors");
      const donorSubCategories = currentUrlParams.get("donorSubCategories");
      const donorCategories = currentUrlParams.get("donorCategories");
      const replenishmentPeriods = currentUrlParams.get("replenishmentPeriods");
      const trpWindows = currentUrlParams.get("trpWindows");
      const portfolioCategories = currentUrlParams.get("portfolioCategories");
      const periods = currentUrlParams.get("periods");
      const modulesInterventions = currentUrlParams.get("modulesInterventions");
      const investmentLandscapes = currentUrlParams.get("investmentLandscapes");

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
      if (documentTypes) {
        updatedAppliedFilters.documentTypes = documentTypes.split(",");
      }
      if (donors) {
        updatedAppliedFilters.donors = donors.split(",");
      }
      if (donorSubCategories) {
        updatedAppliedFilters.donorSubCategories =
          donorSubCategories.split(",");
      }
      if (donorCategories) {
        updatedAppliedFilters.donorCategories = donorCategories.split(",");
      }
      if (replenishmentPeriods) {
        updatedAppliedFilters.replenishmentPeriods =
          replenishmentPeriods.split(",");
      }
      if (trpWindows) {
        updatedAppliedFilters.trpWindows = trpWindows.split(",");
      }
      if (portfolioCategories) {
        updatedAppliedFilters.portfolioCategories =
          portfolioCategories.split(",");
      }
      if (periods) {
        updatedAppliedFilters.periods = periods.split(",");
      }
      if (modulesInterventions) {
        updatedAppliedFilters.modulesInterventions =
          modulesInterventions.split(",");
      }
      if (investmentLandscapes) {
        updatedAppliedFilters.investmentLandscapes =
          investmentLandscapes.split(",");
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
    if (data.documentTypes.length > 0) {
      currentUrlParams.set("documentTypes", data.documentTypes.join(","));
    } else {
      currentUrlParams.delete("documentTypes");
    }
    if (data.donors.length > 0) {
      currentUrlParams.set("donors", data.donors.join(","));
    } else {
      currentUrlParams.delete("donors");
    }
    if (data.donorSubCategories.length > 0) {
      currentUrlParams.set(
        "donorSubCategories",
        data.donorSubCategories.join(",")
      );
    } else {
      currentUrlParams.delete("donorSubCategories");
    }
    if (data.donorCategories.length > 0) {
      currentUrlParams.set("donorCategories", data.donorCategories.join(","));
    } else {
      currentUrlParams.delete("donorCategories");
    }
    if (data.replenishmentPeriods.length > 0) {
      currentUrlParams.set(
        "replenishmentPeriods",
        data.replenishmentPeriods.join(",")
      );
    } else {
      currentUrlParams.delete("replenishmentPeriods");
    }
    if (data.trpWindows.length > 0) {
      currentUrlParams.set("trpWindows", data.trpWindows.join(","));
    } else {
      currentUrlParams.delete("trpWindows");
    }
    if (data.portfolioCategories.length > 0) {
      currentUrlParams.set(
        "portfolioCategories",
        data.portfolioCategories.join(",")
      );
    } else {
      currentUrlParams.delete("portfolioCategories");
    }
    if (data.periods.length > 0) {
      currentUrlParams.set("periods", data.periods.join(","));
    } else {
      currentUrlParams.delete("periods");
    }
    if (data.modulesInterventions.length > 0) {
      currentUrlParams.set(
        "modulesInterventions",
        data.modulesInterventions.join(",")
      );
    } else {
      currentUrlParams.delete("modulesInterventions");
    }
    if (data.investmentLandscapes.length > 0) {
      currentUrlParams.set(
        "investmentLandscapes",
        data.investmentLandscapes.join(",")
      );
    } else {
      currentUrlParams.delete("investmentLandscapes");
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
    const documentTypes = currentUrlParams.get("documentTypes");
    const donors = currentUrlParams.get("donors");
    const donorSubCategories = currentUrlParams.get("donorSubCategories");
    const donorCategories = currentUrlParams.get("donorCategories");
    const replenishmentPeriods = currentUrlParams.get("replenishmentPeriods");
    const trpWindows = currentUrlParams.get("trpWindows");
    const portfolioCategories = currentUrlParams.get("portfolioCategories");
    const periods = currentUrlParams.get("periods");
    const modulesInterventions = currentUrlParams.get("modulesInterventions");
    const investmentLandscapes = currentUrlParams.get("investmentLandscapes");

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
    if (documentTypes) {
      updatedAppliedFilters.documentTypes = documentTypes.split(",");
    } else if (updatedAppliedFilters.documentTypes.length > 0) {
      updatedAppliedFilters.documentTypes = [];
    }
    if (donors) {
      updatedAppliedFilters.donors = donors.split(",");
    } else if (updatedAppliedFilters.donors.length > 0) {
      updatedAppliedFilters.donors = [];
    }
    if (donorSubCategories) {
      updatedAppliedFilters.donorSubCategories = donorSubCategories.split(",");
    } else if (updatedAppliedFilters.donorSubCategories.length > 0) {
      updatedAppliedFilters.donorSubCategories = [];
    }
    if (donorCategories) {
      updatedAppliedFilters.donorCategories = donorCategories.split(",");
    } else if (updatedAppliedFilters.donorCategories.length > 0) {
      updatedAppliedFilters.donorCategories = [];
    }
    if (replenishmentPeriods) {
      updatedAppliedFilters.replenishmentPeriods =
        replenishmentPeriods.split(",");
    } else if (updatedAppliedFilters.replenishmentPeriods.length > 0) {
      updatedAppliedFilters.replenishmentPeriods = [];
    }
    if (trpWindows) {
      updatedAppliedFilters.trpWindows = trpWindows.split(",");
    } else if (updatedAppliedFilters.trpWindows.length > 0) {
      updatedAppliedFilters.trpWindows = [];
    }
    if (portfolioCategories) {
      updatedAppliedFilters.portfolioCategories =
        portfolioCategories.split(",");
    } else if (updatedAppliedFilters.portfolioCategories.length > 0) {
      updatedAppliedFilters.portfolioCategories = [];
    }
    if (periods) {
      updatedAppliedFilters.periods = periods.split(",");
    } else if (updatedAppliedFilters.periods.length > 0) {
      updatedAppliedFilters.periods = [];
    }
    if (modulesInterventions) {
      updatedAppliedFilters.modulesInterventions =
        modulesInterventions.split(",");
    }
    if (investmentLandscapes) {
      updatedAppliedFilters.investmentLandscapes =
        investmentLandscapes.split(",");
    }

    if (!isEqual(data, updatedAppliedFilters)) {
      actions.setAll(updatedAppliedFilters);
    }
  }, [location.search]);

  return null;
}
