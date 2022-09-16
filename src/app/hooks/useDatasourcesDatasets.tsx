import React from "react";
import get from "lodash/get";
import { useMount, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

export function useDatasourcesDatasets() {
  const availableDatasets = useStoreState((state) =>
    get(state.AvailableDatasources, "data.data", [])
  );
  const fetchAvailableDatasets = useStoreActions(
    (actions) => actions.AvailableDatasources.fetch
  );
  const mappedDatasets = useStoreState((state) =>
    get(state.MappedDatasets, "data.data", [])
  );
  const fetchMappedDatasets = useStoreActions(
    (actions) => actions.MappedDatasets.fetch
  );
  const datasource = useStoreState((state) => state.DataSourceState.value);

  useMount(() => {
    fetchAvailableDatasets({});
    fetchMappedDatasets({
      filterString: `datasource=${datasource}`,
    });
  });

  useUpdateEffect(() => {
    fetchMappedDatasets({
      filterString: `datasource=${datasource}`,
    });
  }, [datasource]);

  return { availableDatasets, mappedDatasets };
}
