/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DocumentsSubModule } from "app/modules/common/documents";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";

interface LocationDetailDocumentsModuleProps {
  code: string;
}

export function LocationDetailDocumentsModule(
  props: LocationDetailDocumentsModuleProps
) {
  useTitle("The Data Explorer - Grant Documents");
  const [search, setSearch] = React.useState("");

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.LocationDetailDocuments.fetch
  );
  const data = useStoreState(
    (state) =>
      get(
        state.LocationDetailDocuments.data,
        "data",
        []
      ) as ExpandableTableRowProps[]
  );
  const isLoading = useStoreState(
    (state) => state.LocationDetailDocuments.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters]);

  useUpdateEffect(() => {
    if (search.length === 0) {
      const filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code],
            }
          : appliedFilters
      );
      fetchData({ filterString });
    }
  }, [search]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        const filterString = getAPIFormattedFilters(
          props.code
            ? {
                ...appliedFilters,
                locations: [...appliedFilters.locations, props.code],
              }
            : appliedFilters
        );
        fetchData({ filterString: `q=${search}&${filterString}` });
      }
    },
    500,
    [search]
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <DocumentsSubModule
      data={data}
      search={search}
      setSearch={setSearch}
      columns={["Location", "Documents"]}
    />
  );
}
