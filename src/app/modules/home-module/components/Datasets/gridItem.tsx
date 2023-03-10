import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../components/assets/menu.svg";
import { ReactComponent as DeleteIcon } from "../../components/assets/delete.svg";
import { ReactComponent as EditIcon } from "../../components/assets/edit.svg";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  path: string;
  title: string;
  descr: string;
  date: string;
  showMenu?: boolean;
  handleDelete?: (id: string) => void;
  id?: string;
}
export default function GridItem(props: Props) {
  const [menuOptionsDisplay, setMenuOptionsDisplay] = useState(false);
  const showMenuOptions = () => {
    setMenuOptionsDisplay(!menuOptionsDisplay);
  };
  const history = useHistory();
  const onEdit = (data: Props) => {
    history.push(`/dataset/${data.title}/overview`);
  };

  return (
    <div
      css={`
        background: #ffffff;
        width: 296px;
        height: 125px;
        padding: 0rem 1rem;
        position: relative;
        color: #262c34;
        font-family: "Gotham Narrow";
      `}
    >
      <div
        css={`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div>
          <p
            css={`
              font-size: 14px;
              margin-top: 10px;
              margin-bottom: 0;
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
        {props.showMenu && (
          <MenuIcon
            onClick={showMenuOptions}
            css={`
              margin-top: 17px;
              cursor: pointer;
            `}
          />
        )}
      </div>

      <div
        css={`
          display: flex;
          justify-content: space-between;
          margin-top: 0.9rem;
          font-size: 12px;
        `}
      >
        <p>Creation date</p>
        <p>{props.date}</p>
      </div>
      {menuOptionsDisplay ? (
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
              top: 46%;
              padding: 12px 0;
            `}
          >
            <div>
              <IconButton
                css={`
                  padding: 0;
                `}
                onClick={() => onEdit(props)}
              >
                <EditIcon
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
      ) : (
        ""
      )}
    </div>
  );
}
