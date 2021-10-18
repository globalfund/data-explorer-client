/* third-party */
import React from "react";
import get from "lodash/get";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useDebounce, useUpdateEffect, useSessionStorage } from "react-use";
/* project */
import { SearchLayout } from "app/components/Search/layout";
import { SearchResultsTabModel } from "app/components/Search/components/results/data";

export function Search() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [storedValue, setStoredValue] = useSessionStorage(
    "stored-search-string",
    ""
  );
  const [value, setValue] = React.useState(storedValue);

  // api call & data
  const fetchData = useStoreActions((store) => store.GlobalSearch.fetch);
  const data = useStoreState(
    (state) =>
      get(state.GlobalSearch.data, "data", []) as SearchResultsTabModel[]
  );
  const isLoading = useStoreState((state) => state.GlobalSearch.loading);

  useUpdateEffect(() => {
    setStoredValue(value);
    // if (value.length === 0) {
    //   fetchData({
    //     filterString: `q=${value}`,
    //   });
    // }
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
