import React from "react";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as MenuIcon } from "app/modules/home-module/assets/menu.svg";
import { ReactComponent as EditIcon } from "app/modules/home-module/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "app/modules/home-module/assets/delete.svg";

interface Props {
  path: string;
  title: string;
  descr: string;
  date: Date;
  showMenu?: boolean;
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
        width: 296px;
        display: flex;
        height: 125px;
        color: #262c34;
        background: #fff;
        position: relative;
        padding: 0rem 1.2rem;
        padding-bottom: 0.5rem;
        flex-direction: column;
        justify-content: space-between;
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
            height: 80px;
            word-wrap: break-word;
          `}
        >
          <p
            css={`
              font-size: 14px;
              line-height: 16px;
              margin-bottom: 6px;
            `}
          >
            <b>{props.title}</b>
          </p>
          <p
            css={`
              font-size: 10px;
              line-height: 12px;
              margin-top: 1px;
            `}
          >
            {props.descr}
          </p>
        </div>
        <div>
          {props.showMenu && (
            <IconButton
              css={`
                padding: 0;
                margin-top: 14px;
              `}
              onClick={showMenuOptions}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
      </div>
      <div
        css={`
          display: flex;
          font-size: 12px;
          justify-content: space-between;

          > p {
            margin: 0;
          }
        `}
      >
        <p>Creation date</p>
        <p>{moment(props.date).format("DD-MM-YYYY")}</p>
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
            onClick={showMenuOptions}
          />
          <div
            css={`
              top: 30%;
              gap: 1rem;
              right: 3%;
              z-index: 2;
              width: 128px;
              display: flex;
              padding: 7px 0;
              position: absolute;
              border-radius: 13px;
              background: #f4f4f4;
              align-items: center;
              justify-content: center;
            `}
          >
            <div>
              <EditIcon
                css={`
                  cursor: pointer;
                  margin-top: 6px;
                  :hover {
                    opacity: 0.5;
                  }
                `}
              />
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
        </React.Fragment>
      )}
    </div>
  );
}
