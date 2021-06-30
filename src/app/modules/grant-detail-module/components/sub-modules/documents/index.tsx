/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DocumentsSubModule } from "app/modules/common/documents";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";

interface GrantDetailDocumentsModuleProps {
  code: string;
}

export function GrantDetailDocumentsModule(
  props: GrantDetailDocumentsModuleProps
) {
  useTitle("The Data Explorer - Grant Documents");
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

  if (isLoading) {
    return <PageLoader />;
  }

  return <DocumentsSubModule data={data} columns={["Name", "Documents"]} />;
}
