/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import { FiltersIcon } from "app/assets/icons/Filters";
import { useUnmount, useUpdateEffect } from "react-use";
import { isTouchDevice } from "app/utils/isTouchDevice";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useMediaQuery, IconButton, Slide } from "@material-ui/core";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DataPathPanel } from "app/components/ToolBoxPanel/components/datapath";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { SubToolBoxPanel } from "app/components/ToolBoxPanel/components/subtoolboxpanel";
import { ToolBoxPanelIconButtons } from "app/components/ToolBoxPanel/components/iconbuttons";

export interface ToolBoxPanelProps {
  open: boolean;
  vizWrapperRef: any;
  isGrantDetail?: boolean;
  isLocationDetail?: boolean;
  filterGroups: FilterGroupProps[];
  onCloseBtnClick: (value?: boolean) => void;
  getAllAvailableGrants?: () => Promise<any>;
}

export function ToolBoxPanel(props: ToolBoxPanelProps) {
  const history = useHistory();
  const fabBtnRef = React.useRef(null);
  const [visibleVScrollbar, setVisibleVScrollbar] = React.useState(
    document.body.scrollHeight > document.body.clientHeight
  );

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const showDataPath = useStoreState(
    (state) => state.DataPathPanelVisibilityState.value
  );
  const setShowDataPath = useStoreActions(
    (state) => state.DataPathPanelVisibilityState.setValue
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

  React.useEffect(() => {
    if (dataPathSteps.length < 2 && showDataPath) {
      setShowDataPath(false);
    } else if (!showDataPath && dataPathSteps.length > 1) {
      setShowDataPath(true);
    }
  }, [dataPathSteps]);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  const isPartnerDetail = history.location.pathname.indexOf("/partner/") > -1;

  useUpdateEffect(() => {
    if (isMobile) {
      if (props.open) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }
  }, [props.open]);

  useUnmount(() => {
    document.body.style.overflowY = "auto";
  });

  let top = 112;

  if (!props.isGrantDetail && !props.isLocationDetail) {
    if (isSmallScreen) {
      top = 92;
      if (isMobile) {
        top = 148;
      }
    } else {
      top = 112;
    }
  }
  if (isSmallScreen) {
    if (props.isGrantDetail) {
      top = 113;
      if (isMobile) {
        top = 92;
      }
    }
    if (props.isLocationDetail || isPartnerDetail) {
      top = 113;
      if (isMobile) {
        top = 148;
      }
    }
  } else if (props.isGrantDetail || props.isLocationDetail) {
    top = 112;
  }

  return (
    <React.Fragment>
      <ClickAwayListener
        onClickAway={(event: React.MouseEvent<Document, MouseEvent>) => {
          if (
            props.open &&
            get(event.target, "tagName", "") !== "A" &&
            get(event.target, "tagName", "") !== "rect" &&
            get(event.target, "tagName", "") !== "svg" &&
            get(event.target, "id", "") !== "page-header-toolbox-btn" &&
            get(event.target, "id", "") !== "result-see-more-button" &&
            get(event.target, "id", "") !== "viz-back-button" &&
            get(event.target, "id", "") !== "appbar-datasets" &&
            get(event.target, "id", "") !== "appbar-expandable-item" &&
            get(event.target, "id", "") !== "drilldown-arrow-selector-prev" &&
            get(event.target, "id", "") !== "drilldown-arrow-selector-next" &&
            get(event.target, "className", "")
              .toString()
              .indexOf("treemapnode") === -1
          ) {
            if (props.vizWrapperRef) {
              if (!props.vizWrapperRef.current.contains(event.target)) {
                if (
                  fabBtnRef &&
                  fabBtnRef.current &&
                  (fabBtnRef.current as any).contains(event.target)
                ) {
                  return;
                }
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

              @media (max-width: 767px) {
                width: 100vw;
                box-shadow: none;
                overflow-y: auto;
                height: calc(100vh - ${top + 56}px);
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
              {!isMobile && (
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
                  onClick={() => props.onCloseBtnClick()}
                >
                  <TriangleXSIcon />
                </div>
              )}
              {!showDataPath ? (
                <React.Fragment>
                  {isMobile && (
                    <div
                      css={`
                        width: 100%;
                        padding: 16px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        border-bottom: 1px solid #dfe3e6;
                      `}
                    >
                      <div
                        css={`
                          font-size: 18px;
                          font-weight: bold;
                          font-family: GothamNarrow-Bold;
                        `}
                      >
                        Toolbox
                      </div>
                      <IconButton
                        css={`
                          width: 14px;
                          height: 14px;
                        `}
                        onClick={() => props.onCloseBtnClick()}
                      >
                        <CloseOutlinedIcon
                          htmlColor="#2E4063"
                          viewBox=" -4 -4 30 30"
                        />
                      </IconButton>
                    </div>
                  )}
                  <ToolBoxPanelIconButtons
                    getAllAvailableGrants={props.getAllAvailableGrants}
                  />
                  <SubToolBoxPanel
                    filterGroups={props.filterGroups}
                    closePanel={props.onCloseBtnClick}
                  />
                </React.Fragment>
              ) : (
                <DataPathPanel />
              )}
            </div>
          </div>
        </Slide>
      </ClickAwayListener>
      {isMobile && (
        <div
          ref={fabBtnRef}
          css={`
            z-index: 4;
            right: 20px;
            bottom: 70px;
            position: fixed;

            > button {
              box-shadow: none;
              width: 48px;
              height: 48px;
            }
          `}
          onClick={() => props.onCloseBtnClick()}
        >
          <Fab color="primary" aria-label="filters">
            <FiltersIcon />
          </Fab>
        </div>
      )}
    </React.Fragment>
  );
}
