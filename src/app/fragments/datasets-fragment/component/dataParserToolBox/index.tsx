import {
  Box,
  ClickAwayListener,
  Slide,
  useMediaQuery,
} from "@material-ui/core";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import SimpleSelect from "app/components/Select/simple/simpleSelect";
import { isTouchDevice } from "app/utils/isTouchDevice";
import React from "react";
import DataParsingOptions from "./dataParsingOptions";

interface Props {
  open: boolean;

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
              top: 100px;
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
              `}
            >
              <DataParsingOptions />
            </div>
          </div>
        </Slide>
      </ClickAwayListener>
    </div>
  );
}
