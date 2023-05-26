import React from "react";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as ClockIcon } from "app/modules/home-module/assets/clock-icon.svg";
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

export default function ReformedGridItem(props: Props) {
  const [menuOptionsDisplay, setMenuOptionsDisplay] = React.useState(false);

  const showMenuOptions = () => {
    setMenuOptionsDisplay(!menuOptionsDisplay);
  };

  return (
    <div
      css={`
        width: 100%;
        height: 220px;
        display: flex;
        color: #262c34;
        background: #fff;
        position: relative;
        padding: 12px 16px;
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
            height: 77px;
            word-wrap: break-word;
          `}
        >
          <p
            css={`
              margin-top: 0;
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
            `}
          >
            {props.descr}
          </p>
        </div>
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
        <p>{moment(props.date).format("DD-MM-YYYY")}</p>
      </div>
    </div>
  );
}
