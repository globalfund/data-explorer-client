import React from "react";
import isEqual from "lodash/isEqual";
import { useUnmount, useUpdateEffect } from "react-use";
import { useNavigate, useLocation } from "react-router-dom";
import { useComponentWillMount } from "app/hooks/useCompWillMount";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";

export function useUrlFilters(): null {
  const nav = useNavigate();
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
      const principalRecipients = currentUrlParams.get("principalRecipients");
      const principalRecipientSubTypes = currentUrlParams.get(
        "principalRecipientSubTypes"
      );
      const principalRecipientTypes = currentUrlParams.get(
        "principalRecipientTypes"
      );
      const status = currentUrlParams.get("status");
      const documentTypes = currentUrlParams.get("documentTypes");
      const donors = currentUrlParams.get("donors");
      const donorSubTypes = currentUrlParams.get("donorSubTypes");
      const donorTypes = currentUrlParams.get("donorTypes");
      const replenishmentPeriods = currentUrlParams.get("replenishmentPeriods");
      const cycles = currentUrlParams.get("cycles");
      const trpWindows = currentUrlParams.get("trpWindows");
      const portfolioCategories = currentUrlParams.get("portfolioCategories");

      if (locations) {
        updatedAppliedFilters.locations = locations.split(",");
      }
      if (components) {
        updatedAppliedFilters.components = components.split(",");
      }
      if (principalRecipients) {
        updatedAppliedFilters.principalRecipients =
          principalRecipients.split(",");
      }
      if (principalRecipientSubTypes) {
        updatedAppliedFilters.principalRecipientSubTypes =
          principalRecipientSubTypes.split(",");
      }
      if (principalRecipientTypes) {
        updatedAppliedFilters.principalRecipientTypes =
          principalRecipientTypes.split(",");
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
      if (donorSubTypes) {
        updatedAppliedFilters.donorSubTypes = donorSubTypes.split(",");
      }
      if (donorTypes) {
        updatedAppliedFilters.donorTypes = donorTypes.split(",");
      }
      if (replenishmentPeriods) {
        updatedAppliedFilters.replenishmentPeriods =
          replenishmentPeriods.split(",");
      }
      if (cycles) {
        updatedAppliedFilters.cycles = cycles.split(",");
      }
      if (trpWindows) {
        updatedAppliedFilters.trpWindows = trpWindows.split(",");
      }
      if (portfolioCategories) {
        updatedAppliedFilters.portfolioCategories =
          portfolioCategories.split(",");
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
      currentUrlParams.set(
        "locations",
        data.locations.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("locations");
    }
    if (data.components.length > 0) {
      currentUrlParams.set(
        "components",
        data.components.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("components");
    }
    if (data.principalRecipientTypes.length > 0) {
      currentUrlParams.set(
        "principalRecipientTypes",
        data.principalRecipientTypes.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("principalRecipientTypes");
    }
    if (data.principalRecipientSubTypes.length > 0) {
      currentUrlParams.set(
        "principalRecipientSubTypes",
        data.principalRecipientSubTypes.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("principalRecipientSubTypes");
    }
    if (data.principalRecipients.length > 0) {
      currentUrlParams.set(
        "principalRecipients",
        data.principalRecipients.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("principalRecipients");
    }
    if (data.status.length > 0) {
      currentUrlParams.set(
        "status",
        data.status.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("status");
    }
    if (data.documentTypes.length > 0) {
      currentUrlParams.set(
        "documentTypes",
        data.documentTypes.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("documentTypes");
    }
    if (data.donors.length > 0) {
      currentUrlParams.set(
        "donors",
        data.donors.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("donors");
    }
    if (data.donorSubTypes.length > 0) {
      currentUrlParams.set(
        "donorSubTypes",
        data.donorSubTypes.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("donorSubTypes");
    }
    if (data.donorTypes.length > 0) {
      currentUrlParams.set(
        "donorTypes",
        data.donorTypes.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("donorTypes");
    }
    if (data.replenishmentPeriods.length > 0) {
      currentUrlParams.set(
        "replenishmentPeriods",
        data.replenishmentPeriods.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("replenishmentPeriods");
    }
    console.log(data.cycles);
    if (data.cycles.length > 0) {
      currentUrlParams.set(
        "cycles",
        data.cycles.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("cycles");
    }
    if (data.trpWindows.length > 0) {
      currentUrlParams.set(
        "trpWindows",
        data.trpWindows.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("trpWindows");
    }
    if (data.portfolioCategories.length > 0) {
      currentUrlParams.set(
        "portfolioCategories",
        data.portfolioCategories.join(",").replace(/&/g, "%26")
      );
    } else {
      currentUrlParams.delete("portfolioCategories");
    }

    const queryString = decodeURIComponent(currentUrlParams.toString());
    nav({
      pathname: location.pathname,
      search: queryString,
    });
  }, [data]);

  // run when url search params change
  useUpdateEffect(() => {
    const updatedAppliedFilters = { ...data };
    const currentUrlParams = new URLSearchParams(location.search);
    const locations = currentUrlParams.get("locations");
    const components = currentUrlParams.get("components");
    const principalRecipients = currentUrlParams.get("principalRecipients");
    const principalRecipientSubTypes = currentUrlParams.get(
      "principalRecipientSubTypes"
    );
    const principalRecipientTypes = currentUrlParams.get(
      "principalRecipientTypes"
    );
    const status = currentUrlParams.get("status");
    const documentTypes = currentUrlParams.get("documentTypes");
    const donors = currentUrlParams.get("donors");
    const donorSubTypes = currentUrlParams.get("donorSubTypes");
    const donorTypes = currentUrlParams.get("donorTypes");
    const replenishmentPeriods = currentUrlParams.get("replenishmentPeriods");
    const cycles = currentUrlParams.get("cycles");
    const trpWindows = currentUrlParams.get("trpWindows");
    const portfolioCategories = currentUrlParams.get("portfolioCategories");

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
    if (principalRecipientTypes) {
      updatedAppliedFilters.principalRecipientTypes =
        principalRecipientTypes.split(",");
    } else if (updatedAppliedFilters.principalRecipientTypes.length > 0) {
      updatedAppliedFilters.principalRecipientTypes = [];
    }
    if (principalRecipientSubTypes) {
      updatedAppliedFilters.principalRecipientSubTypes =
        principalRecipientSubTypes.split(",");
    } else if (updatedAppliedFilters.principalRecipientSubTypes.length > 0) {
      updatedAppliedFilters.principalRecipientSubTypes = [];
    }
    if (principalRecipients) {
      updatedAppliedFilters.principalRecipients =
        principalRecipients.split(",");
    } else if (updatedAppliedFilters.principalRecipients.length > 0) {
      updatedAppliedFilters.principalRecipients = [];
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
    if (donorSubTypes) {
      updatedAppliedFilters.donorSubTypes = donorSubTypes.split(",");
    } else if (updatedAppliedFilters.donorSubTypes.length > 0) {
      updatedAppliedFilters.donorSubTypes = [];
    }
    if (donorTypes) {
      updatedAppliedFilters.donorTypes = donorTypes.split(",");
    } else if (updatedAppliedFilters.donorTypes.length > 0) {
      updatedAppliedFilters.donorTypes = [];
    }
    if (replenishmentPeriods) {
      updatedAppliedFilters.replenishmentPeriods =
        replenishmentPeriods.split(",");
    } else if (updatedAppliedFilters.replenishmentPeriods.length > 0) {
      updatedAppliedFilters.replenishmentPeriods = [];
    }
    console.log(cycles);
    if (cycles) {
      updatedAppliedFilters.cycles = cycles.split(",");
    } else if (updatedAppliedFilters.cycles.length > 0) {
      updatedAppliedFilters.cycles = [];
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

    if (!isEqual(data, updatedAppliedFilters)) {
      actions.setAll(updatedAppliedFilters);
    }
  }, [location.search]);

  return null;
}
