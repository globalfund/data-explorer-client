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
import { Pagination } from "@material-ui/lab";
import { useMediaQuery } from "@material-ui/core";

interface LocationDetailDocumentsModuleProps {
  code: string;
  mcName: string;
  isMultiCountry: boolean;
}

export function LocationDetailDocumentsModule(
  props: LocationDetailDocumentsModuleProps
) {
  useTitle("Dataxplorer - Location Documents");
  const [search, setSearch] = React.useState("");
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const [page, setPage] = React.useState(1);

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
    let filterString = "";
    if (props.isMultiCountry) {
      filterString = getAPIFormattedFilters(appliedFilters);
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
          : appliedFilters
      );
    }
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

  if (isSmallScreen) {
    return (
      <>
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
              : data.slice((page - 1) * 9, page * 9)
          }
          search={search}
          setSearch={setSearch}
          columns={["Location", "Documents"]}
        />
        <div>
          <Pagination
            css={`
              display: flex;
              justify-content: center;
            `}
            color="primary"
            count={Math.ceil(data.length / 9)}
            boundaryCount={Math.ceil(data.length / 18)}
            page={page}
            onChange={(event, val) => setPage(val)}
          />
        </div>
      </>
    );
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
