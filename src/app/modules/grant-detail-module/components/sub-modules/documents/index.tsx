/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DocumentsSubModule } from "app/modules/common/documents";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";
import { useMediaQuery } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

interface GrantDetailDocumentsModuleProps {
  code: string;
}

export function GrantDetailDocumentsModule(
  props: GrantDetailDocumentsModuleProps
) {
  useTitle("The Data Explorer - Grant Documents");
  const [search, setSearch] = React.useState("");

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.GrantDetailDocuments.fetch
  );
  const data = useStoreState(
    (state) =>
      get(
        state.GrantDetailDocuments.data,
        "data",
        []
      ) as ExpandableTableRowProps[]
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailDocuments.loading
  );

  React.useEffect(() => {
    if (props.code) {
      fetchData({ filterString: `grantId='${props.code}'` });
    }
  }, [props.code]);

  useUpdateEffect(() => {
    if (search.length === 0)
      fetchData({ filterString: `grantId='${props.code}'` });
  }, [search]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        fetchData({ filterString: `q=${search}&grantId='${props.code}'` });
      }
    },
    500,
    [search]
  );

  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const [page, setPage] = React.useState(1);

  if (isLoading) {
    return <PageLoader />;
  }
  if (isSmallScreen) {
    return (
      <>
        <DocumentsSubModule
          data={data.slice((page - 1) * 9, page * 9)}
          search={search}
          setSearch={setSearch}
          columns={["Name", "Documents"]}
        />
        <div>
          <Pagination
            css={`
              display: flex;
              justify-content: center;
            `}
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
      data={data}
      search={search}
      setSearch={setSearch}
      columns={["Name", "Documents"]}
    />
  );
}
