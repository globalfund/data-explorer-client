import React from "react";
import Slide from "@material-ui/core/Slide";
import { CloseIcon } from "app/assets/icons/Close";
import { useStoreState } from "app/state/store/hooks";
import IconButton from "@material-ui/core/IconButton";
import { PageLoader } from "app/modules/common/page-loader";

interface SlideInContainerProps {
  ref?: any;
  vizLevel: number;
  selected?: string;
  close: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export function SlideInContainer(props: SlideInContainerProps) {
  const [open, setOpen] = React.useState(
    props.vizLevel > 0 && props.selected !== undefined
  );

  const vizDrilldowns = useStoreState(
    (state) => state.PageHeaderVizDrilldownsState.value
  );

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
          right: 0;
          width: 60%;
          z-index: 2;
          display: flex;
          position: absolute;
          justify-content: flex-end;
          top: ${vizDrilldowns.length > 0 ? "168px" : "133px"};
          height: calc(100% - ${vizDrilldowns.length > 0 ? "168px" : "133px"});

          @media (max-width: 768px) {
            width: 100%;
          }

          > div {
            width: 100%;
            background: #fff;
            margin: 0 !important;
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
          }
        `}
      >
        <IconButton
          css={`
            top: 0;
            left: -50px;
            position: absolute;
          `}
          onClick={props.close}
        >
          <CloseIcon />
        </IconButton>
        <div
          css={`
            width: 100%;
            height: 100%;
            max-height: 100%;
            overflow: visible;
            overflow-y: auto;
            padding: ${props.loading ? "0px" : "20px 50px"};

            > div {
              height: calc(100% - 80px);
              overflow: visible !important;
            }
          `}
        >
          {props.loading && <PageLoader inLoader />}
          {!props.loading && open && props.children}
        </div>
      </div>
    </Slide>
  );
}
