/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
import { isTouchDevice } from "app/utils/isTouchDevice";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useMediaQuery, IconButton, Slide } from "@material-ui/core";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { SubToolBoxPanel } from "app/components/ToolBoxPanel/components/subtoolboxpanel";
import { ToolBoxPanelIconButtons } from "app/components/ToolBoxPanel/components/iconbuttons";

export interface ToolBoxPanelProps {
  open: boolean;
  vizWrapperRef: any;
  isGrantDetail?: boolean;
  isLocationDetail?: boolean;
  onCloseBtnClick: () => void;
  filterGroups: FilterGroupProps[];
}

export function ToolBoxPanel(props: ToolBoxPanelProps) {
  const history = useHistory();
  const [visibleVScrollbar, setVisibleVScrollbar] = React.useState(
    document.body.scrollHeight > document.body.clientHeight
  );

  // viz drilldown items
  const vizDrilldowns = useStoreState(
    (state) => state.PageHeaderVizDrilldownsState.value
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

  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  let top = 133;

  if (
    !props.isGrantDetail &&
    !props.isLocationDetail &&
    vizDrilldowns.length === 0
  ) {
    if (isSmallScreen) {
      top = 149;
    } else {
      top = 133;
    }
  }
  if (isSmallScreen && vizDrilldowns.length > 0) {
    top = 185;
    if (props.isGrantDetail) {
      top = 206;
    }
    if (props.isLocationDetail) {
      top = 222;
    }
  } else if (isSmallScreen) {
    if (props.isGrantDetail) {
      top = 168;
    }
    if (props.isLocationDetail) {
      top = 187;
    }
  } else if (vizDrilldowns.length > 0) {
    if (props.isGrantDetail) {
      top = 202;
    } else {
      top = 168;
    }
  } else if (props.isGrantDetail) {
    top = 168;
  }

  return (
    <ClickAwayListener
      onClickAway={(event: React.MouseEvent<Document, MouseEvent>) => {
        if (
          props.open &&
          get(event.target, "tagName", "") !== "A" &&
          get(event.target, "id", "") !== "page-header-toolbox-btn"
        ) {
          if (props.vizWrapperRef) {
            if (!props.vizWrapperRef.current.contains(event.target)) {
              props.onCloseBtnClick();
            }
          } else {
            props.onCloseBtnClick();
          }
        }
      }}
    >
      <Slide direction="left" in={props.open}>
        <div
          css={`
            right: 0;
            z-index: 20;
            width: 400px;
            top: ${top}px;
            position: fixed;
            background: #f5f5f7;
            height: calc(100vh - ${top}px);
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
            {isSmallScreen ? (
              <div css="height:24px;background-color: #373D43;width:100%;">
                <IconButton
                  css="width:12px;height:12px;"
                  onClick={props.onCloseBtnClick}
                >
                  <CloseOutlinedIcon
                    htmlColor="#ffffff"
                    viewBox=" -4 -4 30 30"
                  />
                </IconButton>
              </div>
            ) : (
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
                  // left: -${!visibleVScrollbar || props.open ? 16 : 22}px;
                  // ${isTouchDevice() ? `left: -16px;` : ""}
                  left: -16px;

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
                onClick={props.onCloseBtnClick}
              >
                <TriangleXSIcon />
              </div>
            )}
            <ToolBoxPanelIconButtons />
            <SubToolBoxPanel filterGroups={props.filterGroups} />
          </div>
        </div>
      </Slide>
    </ClickAwayListener>
  );
}
