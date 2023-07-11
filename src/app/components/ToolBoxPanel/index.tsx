/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import Fab from "@material-ui/core/Fab";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { FiltersIcon } from "app/assets/icons/Filters";
import { useUnmount, useUpdateEffect } from "react-use";
import { isTouchDevice } from "app/utils/isTouchDevice";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { filterExpandedGroup } from "app/state/recoil/atoms";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useMediaQuery, IconButton, Slide } from "@material-ui/core";
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
  const fabBtnRef = React.useRef<any>(null);
  const cmsData = useCMSData({ returnData: true });

  const [expandedGroup] = useRecoilState(filterExpandedGroup);

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

  let top = 168;

  if (!props.isGrantDetail && !props.isLocationDetail) {
    if (isSmallScreen) {
      top = 92;
      if (isMobile) {
        top = 148;
      }
    }
  }
  if (isSmallScreen) {
    if (props.isGrantDetail) {
      top = 168;
      if (isMobile) {
        top = 149;
      }
    }
    if (props.isLocationDetail || isPartnerDetail) {
      top = 168;
      if (isMobile) {
        top = 148;
      }
    }
  } else if (props.isGrantDetail || props.isLocationDetail) {
    top = 168;
  }

  return (
    <React.Fragment>
      <Slide direction="left" in={props.open}>
        <div
          css={`
            right: 0;
            z-index: 20;
            width: 400px;
            top: ${top}px;
            position: fixed;
            background: ${appColors.TOOLBOX.BACKGROUND_COLOR};
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
                  color: ${appColors.TOOLBOX.BUTTON_COLOR};
                  width: 16px;
                  height: 133px;
                  display: flex;
                  cursor: pointer;
                  position: absolute;
                  background: ${appColors.TOOLBOX.BUTTON_BACKGROUND_COLOR};
                  align-items: center;
                  flex-direction: column;
                  justify-content: center;
                  border-radius: 10px 0px 0px 10px;
                  transition: background 0.2s ease-in-out;
                  // left: -${!visibleVScrollbar || props.open ? 16 : 22}px;
                  // ${isTouchDevice() ? `left: -16px;` : ""}
                  left: -16px;

                  &:hover {
                    background: ${appColors.TOOLBOX
                      .BUTTON_BACKGROUND_HOVER_COLOR};
                  }

                  > svg {
                    transform: rotate(${!props.open ? "-" : ""}90deg);
                    > path {
                      fill: ${appColors.COMMON.WHITE};
                    }
                  }
                `}
                onClick={() => props.onCloseBtnClick()}
              >
                <TriangleXSIcon />
              </div>
            )}
            {isMobile && (
              <div
                css={`
                  width: 100%;
                  padding: 16px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  border-bottom: 1px solid
                    ${appColors.TOOLBOX.SECTION_BORDER_BOTTOM_COLOR};
                `}
              >
                <div
                  css={`
                    font-size: 18px;
                    font-weight: bold;
                    font-family: GothamNarrow-Bold;
                  `}
                >
                  {get(cmsData, "componentsSidebar.toolbox", "")}
                </div>
                <IconButton
                  css={`
                    width: 14px;
                    height: 14px;
                  `}
                  onClick={() => props.onCloseBtnClick()}
                >
                  <CloseOutlinedIcon
                    htmlColor={appColors.COMMON.PRIMARY_COLOR_1}
                    viewBox=" -4 -4 30 30"
                  />
                </IconButton>
              </div>
            )}
            {!expandedGroup && (
              <ToolBoxPanelIconButtons
                getAllAvailableGrants={props.getAllAvailableGrants}
              />
            )}
            <SubToolBoxPanel
              filterGroups={props.filterGroups}
              closePanel={props.onCloseBtnClick}
            />
          </div>
        </div>
      </Slide>
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
