/* third-party */
import React from "react";
import get from "lodash/get";
import { useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { SearchLayout } from "app/components/Search/layout";
import { SearchResultsTabModel } from "app/components/Search/components/results/data";

export function Search() {
  const [value, setValue] = React.useState("");
  const [activeTab, setActiveTab] = React.useState(0);

  // api call & data
  const fetchData = useStoreActions((store) => store.GlobalSearch.fetch);
  const data = useStoreState(
    (state) =>
      get(state.GlobalSearch.data, "data", []) as SearchResultsTabModel[]
  );
  const isLoading = useStoreState((state) => state.GlobalSearch.loading);

  useUpdateEffect(() => {
    if (value.length === 0) {
      fetchData({
        filterString: `q=${value}`,
      });
    }
  }, [value]);

  const [,] = useDebounce(
    () => {
      if (value.length > 0) {
        fetchData({
          filterString: `q=${value}`,
        });
      }
    },
    500,
    [value]
  );

  return (
    <SearchLayout
      value={value}
      results={data}
      loading={isLoading}
      setValue={setValue}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}
