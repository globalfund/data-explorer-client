import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import {
  tab as tabcss,
  tabs,
  container,
  result as resultcss,
  results as resultscss,
  noresults,
} from "app/components/Search/components/results/styles";
import {
  SearchResultsTabModel,
  SearchResultModel,
} from "app/components/Search/components/results/data";

interface SearchResultsProps {
  results: SearchResultsTabModel[];
  activeTab: number;
  setActiveTab: (value: number) => void;
}

export function SearchResults(props: SearchResultsProps) {
  const results = get(props.results, `[${props.activeTab}].results`, []);

  return (
    <div css={container}>
      <div css={tabs}>
        {props.results.map((tab: SearchResultsTabModel, index: number) => (
          <div
            role="button"
            tabIndex={index + 1}
            css={tabcss(index === props.activeTab)}
            onClick={() => props.setActiveTab(index)}
            onKeyDown={() => props.setActiveTab(index)}
          >
            {tab.results.length} {tab.name}
          </div>
        ))}
      </div>
      <div css={resultscss}>
        {results.map((result: SearchResultModel) => (
          <Link to={result.link} css={resultcss}>
            {result.type && result.type.length > 0 && <div>{result.type}</div>}
            <div>
              <b>{result.label}</b>
            </div>
          </Link>
        ))}
        {results.length === 0 && <div css={noresults}>No results found.</div>}
      </div>
    </div>
  );
}
