import React from "react";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { useStoreState } from "app/state/store/hooks";
import IconButton from "@material-ui/core/IconButton";
import { PageLoader } from "app/modules/common/page-loader";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface SlideInContainerProps {
  ref?: any;
  vizLevel: number;
  selected?: string;
  close: () => void;
  loading?: boolean;
  toolboxOpen?: boolean;
  children: React.ReactNode;
  bigHeader?: boolean;
  enableOverflow?: boolean;
}

export function SlideInContainer(props: SlideInContainerProps) {
  const location = useLocation();
  const [open, setOpen] = React.useState(
    props.vizLevel > 0 && props.selected !== undefined
  );

  const vizDrilldowns = useStoreState(
    (state) => state.PageHeaderVizDrilldownsState.value
  );

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  const isGrantDetail = location.pathname.indexOf("/grant/") > -1;
  const isPartnerDetail = location.pathname.indexOf("/partner/") > -1;
  const isLocationDetail = location.pathname.indexOf("/location/") > -1;
  let top = 133;
  if (vizDrilldowns.length > 0 || props.bigHeader) {
    top = 168;
    if (isMobile) {
      top = 195;
    }
  }
  if (isGrantDetail) {
    top = 203;
    if (isMobile) {
      top = 104;
      if (vizDrilldowns.length > 0) {
        top = 140;
      }
    }
  }
  if (isPartnerDetail || isLocationDetail) {
    top = 203;
    if (isMobile) {
      top = 196;
    }
  }

  React.useEffect(() => {
    const tmp = props.vizLevel > 0 && props.selected !== undefined;
    if (open !== tmp) {
      setOpen(tmp);
    }
  }, [props.vizLevel, props.selected]);

  return (
    <Slide in={open} mountOnEnter unmountOnExit timeout={500} direction="left">
      <div
        ref={props.ref}
        id="zoom-in-level"
        css={`
          z-index: 2;
          top: ${top}px;
          display: flex;
          position: absolute;
          justify-content: flex-end;
          height: calc(100vh - ${top}px);
          right: ${props.toolboxOpen ? "400px" : 0};
          width: ${props.toolboxOpen ? "50%" : "60%"};
          transition: right 500ms cubic-bezier(0, 0, 0.2, 1) 0ms;

          > div {
            width: 100%;
            background: #fff;
            margin: 0 !important;
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
          }

          @media (max-width: 767px) {
            width: 100vw;
            box-shadow: none;
            height: calc(100vh - 50px);

            > div {
              box-shadow: none;
            }
          }
        `}
      >
        {!isMobile && (
          <IconButton
            css={`
              top: ${isSmallScreen ? "15px" : "0"};
              left: ${isSmallScreen ? "0" : "-32px"};
              height: 30px;
              padding: 3px;
              background: #fff;
              border-radius: 5px;
              position: absolute;
              box-shadow: ${isSmallScreen
                ? "0"
                : "0px 0px 10px rgba(152, 161, 170, 0.6)"};
            `}
            onClick={props.close}
          >
            <CloseIcon color="primary" />
          </IconButton>
        )}
        <div
          css={`
            width: 100%;
            height: 100%;
            max-height: 100%;
            padding: ${props.loading ? "0px" : "20px 50px"};
            padding-top: ${isSmallScreen ? "44px !important" : ""};
            padding-left: ${isSmallScreen ? "33px !important" : ""};
            ${props.enableOverflow
              ? `overflow: visible;overflow-y: auto;`
              : ""};

            > div {
              height: calc(100% - 80px);
              overflow: visible !important;
            }

            @media (max-width: 767px) {
              padding: ${props.loading ? "0px" : "16px"} !important;

              > div {
                height: 100%;
              }
            }
          `}
        >
          {props.loading && <PageLoader inLoader />}
          {!props.loading && open && (
            <React.Fragment>
              {isMobile && (
                <Button
                  onClick={props.close}
                  css={`
                    z-index: 1;
                    width: 100%;
                    margin-bottom: 20px;
                    background: #dfe3e6;
                    border-radius: 22px;

                    &:hover {
                      background: #dfe3e6;
                    }

                    > span {
                      color: #262c34;
                      font-size: 14px;
                      font-weight: bold;
                      text-transform: none;
                      font-family: "GothamNarrow-Bold", "Helvetica Neue",
                        sans-serif;
                    }
                  `}
                >
                  Back
                </Button>
              )}
              {props.children}
            </React.Fragment>
          )}
        </div>
      </div>
    </Slide>
  );
}
