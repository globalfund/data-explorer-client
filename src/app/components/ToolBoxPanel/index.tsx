/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { ToolBoxPanelIconButtons } from "app/components/ToolBoxPanel/components/iconbuttons";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { useMediaQuery } from "@material-ui/core";
import { SubToolBoxPanel } from "./subToolBox";

export interface ToolBoxPanelProps {
  open: boolean;
  isGrantDetail?: boolean;
  onButtonClick: () => void;
  filterGroups: FilterGroupProps[];
}

export function ToolBoxPanel(props: ToolBoxPanelProps) {
  const history = useHistory();
  const [visibleVScrollbar, setVisibleVScrollbar] = React.useState(
    document.body.scrollHeight > document.body.clientHeight
  );

  React.useLayoutEffect(() => {
    setVisibleVScrollbar(
      document.body.scrollHeight > document.body.clientHeight
    );
  }, []);

  React.useEffect(() => {
    setVisibleVScrollbar(
      document.body.scrollHeight > document.body.clientHeight
    );
  }, [history.location.pathname]);

  return (
    <ClickAwayListener
      onClickAway={(event: React.MouseEvent<Document, MouseEvent>) => {
        if (props.open && get(event.target, "tagName", "") !== "A") {
          props.onButtonClick();
        }
      }}
    >
      <Slide direction="left" in={props.open}>
        <div
          css={`
            right: 0;
            top: 133px;
            z-index: 20;
            width: 500px;
            position: fixed;
            background: #f5f5f7;
            height: calc(100vh - 133px);
            visibility: visible !important;
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);

            @media (max-width: 500px) {
              width: calc(100vw - 50px);
            }
          `}
        >
          <div
            css={`
              width: 100%;
              height: 100%;
              display: flex;
              position: relative;
              flex-direction: column;
            `}
          >
            <div
              role="button"
              tabIndex={-1}
              css={`
                top: 38%;
                color: #fff;
                width: 16px;
                height: 133px;
                display: flex;
                cursor: pointer;
                position: absolute;
                background: #495057;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                border-radius: 10px 0px 0px 10px;
                transition: background 0.2s ease-in-out;
                left: -${!visibleVScrollbar || props.open ? 17 : 22}px;

                &:hover {
                  background: #13183f;
                }

                > svg {
                  transform: rotate(${!props.open ? "-" : ""}90deg);
                  > path {
                    fill: #fff;
                  }
                }
              `}
              onClick={() => props.onButtonClick()}
            >
              <TriangleXSIcon />
            </div>
            <ToolBoxPanelIconButtons />
            <SubToolBoxPanel filterGroups={props.filterGroups} />
          </div>
        </div>
      </Slide>
    </ClickAwayListener>
  );
}
