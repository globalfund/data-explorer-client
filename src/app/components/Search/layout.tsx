/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import get from "lodash/get";
import { SearchIcon } from "app/assets/icons/Search";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconChevronRight from "app/assets/icons/IconChevronRight";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { SearchResults } from "app/components/Search/components/results";
import { SearchResultsTabModel } from "app/components/Search/components/results/data";
import {
  container,
  input,
  mobilecontainer,
  mobilebackbutton,
} from "app/components/Search/styles";

interface SearchLayoutProps {
  value: string;
  loading: boolean;
  activeTab: number;
  forceFocus?: boolean;
  onClose?: () => void;
  results: SearchResultsTabModel[];
  setValue: (value: string) => void;
  setActiveTab: (value: number) => void;
}

export function SearchLayout(props: SearchLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = React.useState(
    props.value.length > 0 ||
      (props.forceFocus !== undefined && props.forceFocus)
  );

  React.useEffect(() => {
    if (!props.forceFocus) {
      const newOpen = props.value.length > 0;
      if (newOpen !== open) {
        setOpen(newOpen);
      }
    }
  }, [props.value]);

  React.useEffect(() => {
    setOpen(
      props.value.length > 0 ||
        (props.forceFocus !== undefined && props.forceFocus)
    );
  }, [props.forceFocus]);

  return (
    <div css={mobilecontainer(open)}>
      <div css={container(open)}>
        {isMobile && open && (
          <span
            css={mobilebackbutton}
            onClick={() => {
              props.setValue("");
              if (props.onClose) {
                props.onClose();
              }
            }}
          >
            <IconChevronRight />
          </span>
        )}
        <input
          type="text"
          css={input}
          tabIndex={0}
          value={props.value}
          placeholder="e.g. Kenya"
          autoFocus={props.forceFocus}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.setValue(e.target.value)
          }
        />
        <SearchIcon />
        {open && (
          <ClickAwayListener
            onClickAway={(event: React.MouseEvent<Document, MouseEvent>) => {
              if (
                get(event.target, "tagName", "") !== "INPUT" &&
                !isMobile &&
                !props.forceFocus
              ) {
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
    </div>
  );
}
