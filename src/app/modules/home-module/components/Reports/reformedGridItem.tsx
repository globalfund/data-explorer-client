import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as MenuIcon } from "app/modules/home-module/assets/menu.svg";
import { ReactComponent as EditIcon } from "app/modules/home-module/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "app/modules/home-module/assets/delete.svg";
import { ReactComponent as ClockIcon } from "app/modules/home-module/assets/clock-icon.svg";
import { ReactComponent as DuplicateIcon } from "app/modules/home-module/assets/duplicate.svg";

interface Props {
  date: Date;
  id?: string;
  title: string;
  descr: string;
  color: string;
  viz: JSX.Element;
  handleDelete?: (id: string) => void;
  handleDuplicate?: (id: string) => void;
  showMenuButton: boolean;
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
        position: relative;
      `}
    >
      <Link
        to={`/report/${props.id}`}
        css={`
          width: 296px;
          height: 161.59px;
          display: flex;
          color: #262c34;
          background: #fff;
          position: relative;
          padding: 12px 16px;
          text-decoration: none;
          flex-direction: column;
          border: 1px solid #fff;
          align-items: space-between;
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

            a {
              color: inherit;
              text-decoration: none;
            }
          `}
        >
          <div
            css={`
              width: 80%;
              margin-top: -7px;
            `}
          >
            <p
              css={`
                font-size: 18px;
                line-height: 22px;
                font-family: "Gotham Narrow Bold", sans-serif;
                margin-top: 2px;

                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 0;
              `}
            >
              <b>{props.title}</b>
            </p>
            <p
              css={`
                font-size: 12px;
                line-height: 14px;
                font-family: "Gotham Narrow ", sans-serif;
                margin-top: 1px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                color: #495057;
              `}
            >
              {props.descr}
            </p>
          </div>
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
        </div>
        <div
          css={`
            margin-top: 4px;
            position: absolute;
            bottom: -8px;
            svg {
              width: 119.722px;
              height: 83.717px;
            }
            rect:nth-of-type(2) {
              fill: ${props.color || "#231d2c"};
            }

            ${props.showMenuButton &&
            `
            bottom: -5px;
            transform: scale(0.7);
            transform-origin: left bottom;
          `}
          `}
        >
          {props.viz}
        </div>
        <div
          css={`
            position: absolute;
            bottom: 4px;
            right: 3%;
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
      </Link>
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
              position: absolute;
              right: 3%;
              z-index: 2;
              gap: 1rem;

              display: flex;
              height: 38px;
              width: 143px;
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
                onClick={() => {
                  props.handleDuplicate?.(props.id as string);
                  setMenuOptionsDisplay(false);
                }}
              >
                <Tooltip title="Duplicate">
                  <DuplicateIcon />
                </Tooltip>
              </IconButton>
            </div>
            <div>
              <Link to={`/report/${props.id}/edit`}>
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
              <IconButton
                onClick={() => props.handleDelete?.(props.id as string)}
              >
                <Tooltip title="Delete">
                  <DeleteIcon />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
