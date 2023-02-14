/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle, useDebounce } from "react-use";
import Pagination from "@material-ui/lab/Pagination";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DocumentsSubModule } from "app/modules/common/documents";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";

interface LocationDetailDocumentsModuleProps {
  code: string;
  mcName: string;
  isMultiCountry: boolean;
}

export function LocationDetailDocumentsModule(
  props: LocationDetailDocumentsModuleProps
) {
  useTitle("The Data Explorer - Location Documents");
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

  function reloadData() {
    let filterString = "";
    if (props.isMultiCountry) {
      filterString = getAPIFormattedFilters(appliedFilters, { search });
      filterString = `${filterString}${
        filterString.length > 0 ? "&" : ""
      }multicountries=${props.code}`;
    } else {
      filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code],
            }
          : appliedFilters,
        { search }
      );
    }
    fetchData({ filterString });
  }

  React.useEffect(() => reloadData(), [props.code, appliedFilters]);

  const [,] = useDebounce(() => reloadData(), 500, [search]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <DocumentsSubModule
      forceExpand
      data={
        props.isMultiCountry
          ? [
              {
                ...get(data, "[0]", {}),
                name: props.mcName,
              },
            ]
          : data
      }
      search={search}
      setSearch={setSearch}
      columns={["Location", "Documents"]}
    />
  );
}
