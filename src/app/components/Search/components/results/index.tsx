import React from "react";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { useStoreState } from "app/state/store/hooks";
import { getIcon } from "app/components/Search/icons";
import { HashLink as Link } from "react-router-hash-link";
import LinearProgress from "@material-ui/core/LinearProgress";
import { SearchResultModel } from "app/components/Search/components/results/data";
import {
  noresults,
  container,
  result as resultcss,
  results as resultscss,
} from "app/components/Search/components/results/styles";

interface SearchResultsProps {
  loading: boolean;
  results: SearchResultModel[];
}

export function SearchResults(props: SearchResultsProps) {
  const cmsData = useCMSData({ returnData: true });
  const hasLoaded = useStoreState((state) => state.GlobalSearch.success);

  return (
    <div css={container} id="search-results-container">
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
      <div css={resultscss}>
        {props.results.map((result: SearchResultModel) => {
          if (result.link.indexOf("http") > -1) {
            return (
              <a
                css={resultcss}
                key={result.value}
                onClick={() => window.open(result.link, "_blank")}
              >
                {result.type && result.type.length > 0 && getIcon(result.type)}
                <div>{result.label}</div>
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
              {result.type && result.type.length > 0 && getIcon(result.type)}
              <div>{result.label}</div>
            </Link>
          );
        })}
        {props.results.length === 0 && !props.loading && hasLoaded && (
          <div css={noresults}>
            {get(cmsData, "componentsSearch.noResults", "")}
          </div>
        )}
        {props.loading && (
          <div css={noresults}>
            {get(cmsData, "componentsSearch.loading", "")}
          </div>
        )}
      </div>
    </div>
  );
}
