import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as MenuIcon } from "app/modules/home-module/assets/menu.svg";
import { ReactComponent as EditIcon } from "app/modules/home-module/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "app/modules/home-module/assets/delete.svg";
import { ReactComponent as DuplicateIcon } from "app/modules/home-module/assets/duplicate.svg";

interface Props {
  date: Date;
  id?: string;
  title: string;
  descr: string;
  viz: JSX.Element;
  handleDelete?: (id: string) => void;
  handleDuplicate?: (id: string) => void;
}

export default function GridItem(props: Props) {
  const [menuOptionsDisplay, setMenuOptionsDisplay] = React.useState(false);

  const showMenuOptions = () => {
    setMenuOptionsDisplay(!menuOptionsDisplay);
  };

  return (
    <div
      css={`
        background: #ffffff;
        width: 296px;
        position: relative;

        padding: 0rem 1.2rem;
        padding-bottom: 0.2rem;
        padding-top: 0.2rem;

        color: #262c34;
        height: 125px;
      `}
    >
      <div
        css={`
          display: flex;
          justify-content: space-between;
          align-items: center;

          height: 100px;
          a {
            text-decoration: none;
            color: inherit;
          }
        `}
      >
        <div
          css={`
            width: 60%;
            align-self: flex-start;
          `}
        >
          <Link to={`/report/${props.id}`}>
            <p
              css={`
                font-size: 14px;
                margin-top: 8px;
                line-height: 16.8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 0;
              `}
            >
              <b>{props.title}</b>
            </p>
          </Link>

          <p
            css={`
              font-size: 10px;
              line-height: 12px;
              margin-top: 3px;
            `}
          >
            {props.descr}
          </p>
        </div>
        <div>{props.viz}</div>
        <IconButton
          css={`
            padding: 0;
            margin-top: -60px;
          `}
          onClick={showMenuOptions}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          margin-top: -1.2rem;
          font-size: 12px;
        `}
      >
        <p>Creation date</p>
        <p>{moment(props.date).format("DD-MM-YYYY")}</p>
      </div>
      {menuOptionsDisplay && (
        <div>
          <div
            css={`
              top: 0;
              left: 0;
              z-index: 1;
              width: 100vw;
              height: 100vh;
              position: fixed;
            `}
            onClick={showMenuOptions}
          />
          <div
            css={`
              top: 30%;
              gap: 1rem;
              right: 3%;
              z-index: 2;
              width: 160px;
              display: flex;
              padding: 6px 15px;
              position: absolute;
              background: #f4f4f4;
              align-items: center;
              border-radius: 100px;
              justify-content: center;
            `}
          >
            <div>
              <IconButton
                css={`
                  padding: 0;
                `}
                onClick={() => {
                  props.handleDuplicate?.(props.id as string);
                  setMenuOptionsDisplay(false);
                }}
              >
                <DuplicateIcon
                  css={`
                    cursor: pointer;

                    :hover {
                      opacity: 0.5;
                    }
                  `}
                />
              </IconButton>
            </div>
            <div>
              <Link to={`/report/${props.id}/edit`}>
                <EditIcon
                  css={`
                    cursor: pointer;
                    margin-top: 6px;
                    :hover {
                      opacity: 0.5;
                    }
                  `}
                />
              </Link>
            </div>
            <div>
              <IconButton
                css={`
                  padding: 0;
                `}
                onClick={() => props.handleDelete?.(props.id as string)}
              >
                <DeleteIcon
                  css={`
                    cursor: pointer;
                    :hover {
                      opacity: 0.5;
                    }
                  `}
                />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
