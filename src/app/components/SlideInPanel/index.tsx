import React from "react";
import Slide from "@material-ui/core/Slide";
import { CloseIcon } from "app/assets/icons/Close";
import IconButton from "@material-ui/core/IconButton";

interface SlideInContainerProps {
  vizLevel: number;
  selected?: string;
  close: () => void;
  children: React.ReactNode;
}

export function SlideInContainer(props: SlideInContainerProps) {
  const [open, setOpen] = React.useState(
    props.vizLevel > 0 && props.selected !== undefined
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
        id="zoom-in-level"
        css={`
          top: 133px;
          right: 0;
          width: 60%;
          z-index: 2;
          display: flex;
          position: absolute;
          justify-content: flex-end;
          height: calc(100% - 133px);

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
            padding: 40px;

            > div {
              height: 100%;
            }

            * {
              overflow: visible !important;
            }
          `}
        >
          {open && props.children}
        </div>
      </div>
    </Slide>
  );
}
