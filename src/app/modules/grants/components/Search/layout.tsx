import React from "react";
import { SearchIcon } from "app/assets/icons/Search";
import { container, input } from "app/modules/grants/components/Search/styles";
import { SearchResults } from "app/modules/grants/components/Search/components/results";
import { SearchResultModel } from "app/modules/grants/components/Search/components/results/data";

interface SearchLayoutProps {
  value: string;
  setValue: (value: string) => void;
  results: SearchResultModel[];
}

export function SearchLayout(props: SearchLayoutProps) {
  return (
    <div css={container}>
      <input
        type="text"
        css={input}
        tabIndex={0}
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(e.target.value)
        }
      />
      <SearchIcon />
      {props.value.length > 0 && <SearchResults results={props.results} />}
    </div>
  );
}
