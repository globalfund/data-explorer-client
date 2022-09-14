/* third-party */
import React from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  useDebounce,
  useUpdateEffect,
  useSessionStorage,
  useUnmount,
} from "react-use";
/* project */
import { SearchLayout } from "app/components/Search/layout";
import { SearchResultsTabModel } from "app/components/Search/components/results/data";

export function MobileAppbarSearch() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
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

  React.useEffect(() => {
    history.listen(() => {
      if (open) {
        setOpen(false);
      }
    });
  }, [history]);

  useUpdateEffect(() => {
    const gihubBtn = document.getElementById("github-linkbtn");
    if (open) {
      document.body.style.overflowY = "hidden";
      if (gihubBtn) {
        gihubBtn.style.display = "none";
      }
    } else {
      document.body.style.overflowY = "auto";
      if (gihubBtn) {
        gihubBtn.style.display = "inherit";
      }
    }
  }, [open]);

  useUnmount(() => {
    document.body.style.overflowY = "auto";
  });

  useUpdateEffect(() => {
    setStoredValue(value);
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
    <React.Fragment>
      {!open && (
        <IconButton
          css={`
            padding-right: 0;
          `}
          onClick={() => setOpen(!open)}
        >
          <SearchIcon htmlColor="#fff" />
        </IconButton>
      )}
      {open && (
        <div
          css={`
            @media (max-width: 767px) {
              top: 0;
              left: 0;
              width: 100vw;
              position: absolute;
              height: calc(100vh - 56px);

              > div {
                height: 100% !important;
              }
            }
          `}
        >
          <SearchLayout
            forceFocus
            value={value}
            results={data}
            loading={isLoading}
            setValue={setValue}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </React.Fragment>
  );
}
