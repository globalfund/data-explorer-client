import React from "react";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DataParsingOptions from "app/fragments/datasets-fragment/component/dataParserToolBox/dataParsingOptions";

interface Props {
  open: boolean;
  handleNext: () => void;
  onCloseBtnClick: (value?: boolean) => void;
}

export default function DataParserToolBox(props: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div>
      <ClickAwayListener
        onClickAway={(e) => {
          if (props.open) {
            return;
          } else {
            props.onCloseBtnClick();
          }
        }}
      >
        <Slide direction="left" in={props.open}>
          <div
            css={`
              right: 0;

              width: 400px;
              top: 98px;

              position: fixed;
              background: #f4f4f4;

              visibility: visible !important;
              box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);

              @media (max-width: 767px) {
                width: 100vw;
                box-shadow: none;
                overflow-y: auto;
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
                    top: 21rem;
                    color: #fff;
                    width: 16px;
                    height: 133px;
                    display: flex;
                    cursor: pointer;
                    position: absolute;
                    background: #231d2c;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    border-radius: 10px 0px 0px 10px;
                    transition: background 0.2s ease-in-out;

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
            </div>
            <div
              css={`
                padding-right: 9%;
                padding-left: 7%;

                height: calc(100vh - 98px);
              `}
            >
              <DataParsingOptions handleNext={props.handleNext} />
            </div>
          </div>
        </Slide>
      </ClickAwayListener>
    </div>
  );
}
