import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import isEqual from "lodash/isEqual";
import { useUnmount, useUpdateEffect } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import { useComponentWillMount } from "app/hooks/useCompWillMount";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

export function useDataThemesUrlFilters(): null {
  const history = useHistory();
  const location = useLocation();

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const data = useStoreState((state) =>
    get(
      state.dataThemes.appliedFilters,
      `value[${activeTabIndex}][${activeVizIndex}]`,
      {}
    )
  );
  const actions = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters
  );

  function onChange() {
    let updatedAppliedFilters = { ...data };
    const currentUrlParams = new URLSearchParams(location.search);

    currentUrlParams.forEach((value: string, key: string) => {
      const params = value.split(",");
      if (updatedAppliedFilters[key]) {
        updatedAppliedFilters[key] = uniq([
          ...updatedAppliedFilters[key],
          ...params,
        ]);
      } else {
        updatedAppliedFilters = {
          ...updatedAppliedFilters,
          [key]: params,
        };
      }
    });

    if (!isEqual(data, updatedAppliedFilters)) {
      actions.setAll({
        tab: activeTabIndex,
        viz: activeVizIndex,
        value: updatedAppliedFilters,
      });
    }
  }

  // run before app is mounted in order to update the stored applied filters
  useComponentWillMount({
    action: onChange,
  });

  // run when stored applied filters change
  useUpdateEffect(() => {
    const currentUrlParams = new URLSearchParams(location.search);
    const dataKeys = Object.keys(data);

    if (dataKeys.length === 0) {
      currentUrlParams.forEach((value: string, key: string) => {
        currentUrlParams.delete(key);
      });
    } else {
      dataKeys.forEach((key: string) => {
        if (data[key].length > 0) {
          currentUrlParams.set(key, data[key].join(","));
        } else {
          currentUrlParams.delete(key);
        }
      });
    }

    const queryString = decodeURIComponent(currentUrlParams.toString());
    history.push({
      pathname: history.location.pathname,
      search: queryString,
    });
  }, [data]);

  // run when url search params change
  useUpdateEffect(onChange, [location.search]);

  // clear stored applied filters
  useUnmount(() =>
    actions.setAll({ tab: activeTabIndex, viz: activeVizIndex, value: {} })
  );

  return null;
}
