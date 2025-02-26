/* third-party */
import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useDebounce, useUpdateEffect, useSessionStorage } from "react-use";
/* project */
import { categories } from "app/components/search/data";
import { SearchLayout } from "app/components/search/layout";
import { SearchResultsTabModel } from "app/components/search/components/results/data";

export function Search(props: {
  hocClose?: () => void;
  withCatMenu?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState(categories[0].label);
  const [storedValue, setStoredValue] = useSessionStorage(
    "stored-search-string",
    "",
  );
  const [value, setValue] = React.useState(storedValue);

  // api call & data
  const clearData = useStoreActions((store) => store.GlobalSearch.clear);
  const fetchData = useStoreActions((store) => store.GlobalSearch.fetch);
  const data = useStoreState(
    (state) =>
      get(state.GlobalSearch.data, "data", []) as SearchResultsTabModel[],
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
    [value],
  );

  function onClose() {
    setOpen(false);
    if (props.hocClose) {
      props.hocClose();
    }
  }

  return (
    <Box
      onClick={(e: any) => {
        e.stopPropagation();
        e.preventDefault();
        if (!open) {
          setOpen(true);
        }
      }}
      sx={{
        width: "80%",
        "@media (max-width: 767px)": {
          width: "100%",
        },
      }}
    >
      <SearchLayout
        value={value}
        results={data}
        onClose={onClose}
        loading={isLoading}
        setValue={setValue}
        category={category}
        setCategory={setCategory}
        withCatMenu={props.withCatMenu}
        setStoredValue={setStoredValue}
        hideClearBtn={Boolean(props.hocClose)}
      />
    </Box>
  );
}
