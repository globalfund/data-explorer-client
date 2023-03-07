import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import useTitle from "react-use/lib/useTitle";
import useDebounce from "react-use/lib/useDebounce";
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

interface AllocationsTableProps {
  code?: string;
  toolboxOpen: boolean;
  setOpenToolboxPanel: (value: boolean) => void;
}

export function AllocationsTableModule(props: AllocationsTableProps) {
  useTitle(`The Data Explorer -${props.code ? " Location" : ""} Allocations`);

  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  const fetchData = useStoreActions((store) => store.AllocationsTable.fetch);
  const loading = useStoreState((state) => state.AllocationsTable.loading);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const data = useStoreState(
    (state) => get(state.AllocationsTable.data, "data", []) as SimpleTableRow[]
  );

  function reloadData() {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters,
      { search, sortBy }
    );
    fetchData({ filterString });
  }

  React.useEffect(() => reloadData(), [props.code, sortBy, appliedFilters]);

  const [,] = useDebounce(() => reloadData(), 500, [search]);

  if (loading) {
    return <PageLoader />;
  }

  const columns =
    data.length > 0
      ? filter(Object.keys(data[0]), (key) => key !== "children").map(
          (key) => ({
            name: key === "name" ? "Component/Location" : `${key} (USD)`,
            key,
          })
        )
      : [];

  return (
    <>
      <SimpleTable
        title="Allocations"
        search={search}
        sortBy={sortBy}
        rows={data}
        onSearchChange={setSearch}
        onSortByChange={setSortBy}
        formatNumbers
        columns={columns}
        forceExpand={Boolean(props.code)}
      />
    </>
  );
}
