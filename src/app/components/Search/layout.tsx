import React from "react";
import get from "lodash/get";
import { SearchIcon } from "app/assets/icons/Search";
import { container, input } from "app/components/Search/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { SearchResults } from "app/components/Search/components/results";
import { SearchResultsTabModel } from "app/components/Search/components/results/data";

interface SearchLayoutProps {
  value: string;
  setValue: (value: string) => void;
  activeTab: number;
  setActiveTab: (value: number) => void;
  results: SearchResultsTabModel[];
  loading: boolean;
}

export function SearchLayout(props: SearchLayoutProps) {
  const [open, setOpen] = React.useState(props.value.length > 0);

  React.useEffect(() => {
    const newOpen = props.value.length > 0;
    if (newOpen !== open) {
      setOpen(newOpen);
    }
  }, [props.value]);

  return (
    <div css={container}>
      <input
        type="text"
        css={input}
        tabIndex={0}
        value={props.value}
        placeholder="e.g. Kenya"
        data-cy="general-search-input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(e.target.value)
        }
      />
      <SearchIcon />
      {open && (
        <ClickAwayListener
          onClickAway={(event: React.MouseEvent<Document, MouseEvent>) => {
            if (get(event.target, "tagName", "") !== "INPUT") {
              props.setValue("");
            }
          }}
        >
          <div>
            <SearchResults
              loading={props.loading}
              results={props.results}
              activeTab={props.activeTab}
              setActiveTab={props.setActiveTab}
            />
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
