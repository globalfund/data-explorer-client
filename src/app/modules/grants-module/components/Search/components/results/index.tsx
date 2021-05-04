import React from "react";
import {
  tab as tabcss,
  tabs,
  container,
  result as resultcss,
  results as resultscss,
  noresults,
} from "app/modules/grants-module/components/Search/components/results/styles";
import { SearchResultModel } from "app/modules/grants-module/components/Search/components/results/data";

interface SearchResultsProps {
  results: SearchResultModel[];
}

export function SearchResults(props: SearchResultsProps) {
  return (
    <div css={container}>
      <div css={resultscss}>
        {props.results.map((result: SearchResultModel) => (
          <div css={resultcss}>
            <div>
              <b>{result.label}</b>
            </div>
          </div>
        ))}
        {props.results.length === 0 && (
          <div css={noresults}>No results found.</div>
        )}
      </div>
    </div>
  );
}
