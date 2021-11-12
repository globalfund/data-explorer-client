import React from "react";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { Search } from "app/modules/grants-module/components/Search";
import { ResultListItemModel } from "app/modules/results-module/data";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { ResultsList } from "app/modules/results-module/components/List";

export const DataList = (props: {
  isLoading: boolean;
  search: string;
  setSearch: any;
  selectedYear: string;
  data: ResultListItemModel[];
  openToolboxPanel: boolean;
  pushValue: number;
}) => {
  return (
    <>
      {props.isLoading && <PageLoader />}
      <div
        css={`
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${props.openToolboxPanel
            ? `calc(100% - ${props.pushValue}px)`
            : "100%"};
        `}
      >
        <Search value={props.search} setValue={props.setSearch} />
        <div css="width: 100%;height: 25px;" />
        <div
          css={`
            gap: 6px;
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={`
              font-weight: bold;
              margin-right: 10px;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            Year {props.selectedYear}
          </div>
        </div>
        <div css="width: 100%;height: 25px;" />
        {props.data.length === 0 ? (
          <NoDataLabel />
        ) : (
          <ResultsList
            listitems={props.data}
            isToolboxOpen={props.openToolboxPanel}
          />
        )}
      </div>
    </>
  );
};
