import React from "react";
import { Search } from "app/modules/grants-module/components/Search";
import { GrantListItemModel } from "../data";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { GrantsList } from "../components/List";
import Pagination from "@material-ui/lab/Pagination";

interface GrantsGridProps {
  openToolboxPanel: boolean;
  pushValue: number;
  vizWrapperRef: React.MutableRefObject<null>;
  search: string;
  page: number;
  pages: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  isToolboxOvervlayVisible(): 0 | 1;
  setSearchProps?: (search: string) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  data: GrantListItemModel[];
}
export default function GrantsGrid(props: GrantsGridProps) {
  return (
    <>
      <div
        css={`
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${props.openToolboxPanel
            ? `calc(100% - ${props.pushValue}px)`
            : "100%"};
        `}
        ref={props.vizWrapperRef}
      >
        <Search
          value={props.search || props.search}
          setValue={props.setSearchProps || props.setSearch}
        />
        <div css="width: 100%;height: 25px;" />
        {props.data.length === 0 ? (
          <NoDataLabel />
        ) : (
          <GrantsList listitems={props.data} />
        )}
        <div css="width: 100%;height: 25px;" />
        {props.data.length > 0 && (
          <Pagination
            page={props.page}
            size="large"
            count={props.pages}
            onChange={props.handleChange}
            css={`
              > ul {
                justify-content: center;
              }
            `}
          />
        )}
      </div>
      <div css="width: 100%;height: 56px;" />
      <div
        css={`
          left: 0;
          top: 48px;
          z-index: 15;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${props.isToolboxOvervlayVisible()};
          visibility: ${props.isToolboxOvervlayVisible()
            ? "visible"
            : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </>
  );
}
