import React from "react";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as ClockIcon } from "app/modules/home-module/assets/clock-icon.svg";
import { ReactComponent as EditIcon } from "app/modules/home-module/assets/edit.svg";
import { ReactComponent as DuplicateIcon } from "app/modules/home-module/assets/duplicate.svg";
import { ReactComponent as DeleteIcon } from "app/modules/home-module/assets/delete.svg";
import { ReactComponent as MenuIcon } from "app/modules/home-module/assets/menu.svg";
import { ReactComponent as DataCardImg } from "app/modules/home-module/assets/data-card-img.svg";

import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  path: string;
  title: string;
  descr: string;
  date: Date;
  showMenu?: boolean;
  handleDuplicate?: (id: string) => void;
  handleDelete?: (id: string) => void;
  id?: string;
}

export default function ReformedGridItem(props: Props) {
  const [menuOptionsDisplay, setMenuOptionsDisplay] = React.useState(false);

  const showMenuOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOptionsDisplay(!menuOptionsDisplay);
  };

  return (
    <div
      css={`
        width: 296px;
        height: 161.588px;
        display: flex;
        color: #262c34;
        background: #fff;
        position: relative;
        padding: 12px 16px;
        flex-direction: column;
        justify-content: space-between;
        &:hover {
          box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        }
      `}
    >
      <div
        css={`
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        `}
      >
        <div
          css={`
            width: 90%;
            height: 50px
            word-wrap: break-word;
            cursor: pointer;

          `}
        >
          <p
            css={`
               margin-top: -5px;

              font-size: 18px
              line-height: 22px;
              font-family: 'Gotham Narrow', sans-serif;
              overflow: hidden;
              margin-bottom: 2px;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            <b>{props.title}</b>
          </p>
          <p
            css={`
              font-size: 12px;
              line-height: 14px;
              margin-top: 1px;
              color: #495057;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            `}
          >
            {props.descr}
          </p>
        </div>
        {props.showMenu && (
          <IconButton
            css={`
              position: absolute;
              right: -2px;
              top: 0px;
              cursor: pointer;

              &:hover {
                background: transparent;
              }
            `}
            onClick={showMenuOptions}
          >
            <MenuIcon />
          </IconButton>
        )}
      </div>
      <div
        css={`
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
        `}
      >
        <div
          css={`
            margin-top: 8px;
            svg {
              width: 119.084px;
              height: 69.761px;
            }
          `}
        >
          <DataCardImg />
        </div>
        <div
          css={`
            display: flex;
            font-size: 12px;
            justify-content: flex-end;
            align-items: center;
            gap: 3px;

            > p {
              margin: 0;
            }
          `}
        >
          <ClockIcon />
          <p>{moment(props.date).format("MMMM YYYY")}</p>
        </div>
      </div>
      {menuOptionsDisplay && (
        <React.Fragment>
          <div
            css={`
              top: 0;
              left: 0;
              z-index: 1;
              width: 100vw;
              height: 100vh;
              position: fixed;
            `}
            onClick={() => setMenuOptionsDisplay(false)}
          />
          <div
            css={`
              top: 38px;

              gap: 1rem;
              right: 3%;
              z-index: 2;

              display: flex;
              height: 38px;
              width: 143px;
              position: absolute;
              background: #adb5bd;
              border-radius: 100px;
              align-items: center;
              justify-content: center;
              a {
                :hover {
                  svg {
                    path {
                      fill: #fff;
                    }
                  }
                }
              }
              button {
                padding: 4px;
                :hover {
                  background: transparent;
                  svg {
                    path {
                      fill: #fff;
                    }
                  }
                }
              }
            `}
          >
            <div>
              <IconButton
                onClick={() => props.handleDuplicate?.(props.id as string)}
              >
                <Tooltip title="Duplicate">
                  <DuplicateIcon />
                </Tooltip>
              </IconButton>
            </div>
            <div>
              <Link to="#">
                <Tooltip title="Edit">
                  <EditIcon
                    css={`
                      margin-top: 4px;
                    `}
                  />
                </Tooltip>
              </Link>
            </div>
            <div>
              <Tooltip title="Delete">
                <span>
                  <IconButton
                    onClick={() => props.handleDelete?.(props.id as string)}
                    disabled={true}
                    css={`
                      svg {
                        path {
                          fill: gray;
                        }
                      }
                    `}
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
