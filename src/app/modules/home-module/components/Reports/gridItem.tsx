import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as MenuIcon } from "app/modules/home-module/assets/menu.svg";
import { ReactComponent as EditIcon } from "app/modules/home-module/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "app/modules/home-module/assets/delete.svg";

interface Props {
  title: string;
  descr: string;
  date: Date;
  viz: JSX.Element;
  handleDelete?: (id: string) => void;
  id?: string;
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
              position: fixed;
              height: 100vh;
              width: 100vw;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;

              z-index: 1;
            `}
            onClick={showMenuOptions}
          />
          <div
            css={`
              background: #f4f4f4;
              border-radius: 13px;
              z-index: 2;
              width: 128px;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1rem;
              position: absolute;
              right: 3%;
              top: 30%;
              padding: 7px 0;
            `}
          >
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
