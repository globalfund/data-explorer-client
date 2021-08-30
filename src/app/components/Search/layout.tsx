import React from "react";
import { SearchIcon } from "app/assets/icons/Search";
import { container, input } from "app/components/Search/styles";
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
  return (
    <div css={container}>
      <input
        type="text"
        css={input}
        tabIndex={0}
        value={props.value}
        placeholder="e.g. Kenya"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(e.target.value)
        }
      />
      <SearchIcon />
      {props.value.length > 0 && (
        <SearchResults
          loading={props.loading}
          results={props.results}
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
      )}
    </div>
  );
}
