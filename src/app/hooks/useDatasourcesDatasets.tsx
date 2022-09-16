import React from "react";
import get from "lodash/get";
import { useMount, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

export function useDatasourcesDatasets(load?: boolean) {
  const availableDatasets = useStoreState((state) =>
    get(state.AvailableDatasources, "data.data", [])
  );
  const fetchAvailableDatasets = useStoreActions(
    (actions) => actions.AvailableDatasources.fetch
  );
  const mappedDatasets = useStoreState((state) =>
    get(state.MappedDatasets, "data.data", [])
  );
  const mappedDatasetsLoading = useStoreState(
    (state) => state.MappedDatasets.loading
  );
  const fetchMappedDatasets = useStoreActions(
    (actions) => actions.MappedDatasets.fetch
  );
  const datasource = useStoreState((state) => state.DataSourceState.value);

  useMount(() => {
    if (load) {
      fetchAvailableDatasets({});
      fetchMappedDatasets({
        filterString: `datasource=${datasource}`,
      });
    }
  });

  useUpdateEffect(() => {
    if (load) {
      fetchMappedDatasets({
        filterString: `datasource=${datasource}`,
      });
    }
  }, [datasource]);

  return { availableDatasets, mappedDatasets, mappedDatasetsLoading };
}
