import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@material-ui/core";
import { ReactComponent as EditIcon } from "app/modules/home-module/assets/edit.svg";
import { ReactComponent as MenuIcon } from "app/modules/home-module/assets/menu.svg";
import { ReactComponent as DeleteIcon } from "app/modules/home-module/assets/delete.svg";
import { ReactComponent as ClockIcon } from "app/modules/home-module/assets/clock-icon.svg";
import { ReactComponent as DuplicateIcon } from "app/modules/home-module/assets/duplicate.svg";

interface Props {
  id: string;
  path: string;
  title: string;
  date: string;
  viz: React.ReactNode;
  handleDelete?: (id: string) => void;
  handleDuplicate?: (id: string) => void;
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
        to={`/chart/${props.id}`}
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
              width: 90%;
              margin-top: -9px;
            `}
          >
            <p
              css={`
                font-size: 14px;
                font-family: "Gotham Narrow Bold", sans-serif;
                margin-top: 6px;
                overflow: hidden;
                margin-bottom: 0;
                white-space: nowrap;
                text-overflow: ellipsis;
              `}
            >
              <b>{props.title}</b>
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
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              margin-top: 2px;
            `}
          >
            {props.viz}
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
                onClick={() => {
                  props.handleDuplicate?.(props.id);
                  setMenuOptionsDisplay(false);
                }}
              >
                <Tooltip title="Duplicate">
                  <DuplicateIcon />
                </Tooltip>
              </IconButton>
            </div>
            <div>
              <Link to={`/chart/${props.id}/mapping`}>
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
              <IconButton onClick={() => props.handleDelete?.(props.id)}>
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
