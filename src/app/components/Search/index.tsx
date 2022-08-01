/* third-party */
import React from "react";
import get from "lodash/get";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useDebounce, useUpdateEffect, useSessionStorage } from "react-use";
/* project */
import { categories } from "app/components/Search/data";
import { SearchLayout } from "app/components/Search/layout";
import { SearchResultsTabModel } from "app/components/Search/components/results/data";

export function Search() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [category, setCategory] = React.useState(categories[0].label);
  const [storedValue, setStoredValue] = useSessionStorage(
    "stored-search-string",
    ""
  );
  const [value, setValue] = React.useState(storedValue);

  // api call & data
  const clearData = useStoreActions((store) => store.GlobalSearch.clear);
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
      } else {
        clearData();
      }
    },
    500,
    [value]
  );

  return (
    <div
      onClick={(e: any) => {
        e.stopPropagation();
        e.preventDefault();
        if (!open) {
          setOpen(true);
        }
      }}
      css={`
        width: 100%;
      `}
    >
      <SearchLayout
        value={value}
        results={data}
        loading={isLoading}
        setValue={setValue}
        category={category}
        setCategory={setCategory}
        forceFocus={isMobile && open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
