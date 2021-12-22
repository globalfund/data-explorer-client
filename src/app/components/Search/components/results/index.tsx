import React from "react";
import get from "lodash/get";
import { useStoreState } from "app/state/store/hooks";
import { HashLink as Link } from "react-router-hash-link";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  SearchResultsTabModel,
  SearchResultModel,
} from "app/components/Search/components/results/data";
import {
  tab as tabcss,
  tabs,
  container,
  result as resultcss,
  results as resultscss,
  noresults,
} from "app/components/Search/components/results/styles";

interface SearchResultsProps {
  results: SearchResultsTabModel[];
  activeTab: number;
  setActiveTab: (value: number) => void;
  loading: boolean;
}

export function SearchResults(props: SearchResultsProps) {
  const results = get(props.results, `[${props.activeTab}].results`, []);
  const hasLoaded = useStoreState((state) => state.GlobalSearch.success);

  return (
    <div css={container}>
      {props.loading && (
        <LinearProgress
          css={`
            top: 0;
            margin-left: 15px;
            position: absolute;
            border-radius: 20px;
            width: calc(100% - 30px);

            @media (max-width: 767px) {
              margin: 0;
              top: -18px;
              width: 100%;
            }
          `}
        />
      )}
      <div css={tabs}>
        {props.results.map((tab: SearchResultsTabModel, index: number) => (
          <div
            role="button"
            key={tab.name}
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
        {results.map((result: SearchResultModel) => {
          if (result.link.indexOf("http") > -1) {
            return (
              <a href={result.link} css={resultcss} key={result.value}>
                {result.type && result.type.length > 0 && (
                  <div>{result.type}</div>
                )}
                <div>
                  <b>{result.label}</b>
                </div>
              </a>
            );
          }
          return (
            <Link
              smooth
              to={result.link}
              css={resultcss}
              key={result.value}
              scroll={(el) => {
                const yCoordinate =
                  el.getBoundingClientRect().top + window.pageYOffset;
                const yOffset = -130;
                window.scrollTo({
                  top: yCoordinate + yOffset,
                  behavior: "smooth",
                });
              }}
            >
              {result.type && result.type.length > 0 && (
                <div>{result.type}</div>
              )}
              <div>
                <b>{result.label}</b>
              </div>
            </Link>
          );
        })}
        {results.length === 0 && !props.loading && hasLoaded && (
          <div css={noresults}>No results found.</div>
        )}
        {props.loading && <div css={noresults}>Loading...</div>}
      </div>
    </div>
  );
}
